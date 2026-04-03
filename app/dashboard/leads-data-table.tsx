"use client"

import { useEffect, useState, useCallback } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { createBrowserSupabaseClient } from "@/lib/supabase/browser"
import type { Lead } from "@/lib/supabase/types"

// ─── Step labels ──────────────────────────────────────────────────────────────

const STEP_LABELS: Record<number, string> = {
  1: "Welcome",
  2: "Qualifier",
  3: "Complete",
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status, isPaused }: { status: string; isPaused: boolean }) {
  if (isPaused) {
    return (
      <Badge variant="outline" className="border-yellow-500 text-yellow-600">
        Paused
      </Badge>
    )
  }
  if (status === "qualified") {
    return <Badge variant="default" className="bg-green-600 hover:bg-green-700">Qualified</Badge>
  }
  return <Badge variant="secondary">In Progress</Badge>
}

// ─── Column definitions ───────────────────────────────────────────────────────

const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "phone_number",
    header: "Phone",
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.original.phone_number}</span>
    ),
  },
  {
    accessorKey: "full_name",
    header: "Name",
    cell: ({ row }) => row.original.full_name ?? <span className="text-muted-foreground">—</span>,
  },
  {
    accessorKey: "country_choice",
    header: "Country",
    cell: ({ row }) =>
      row.original.country_choice ?? <span className="text-muted-foreground">—</span>,
  },
  {
    accessorKey: "budget_choice",
    header: "Budget",
    cell: ({ row }) =>
      row.original.budget_choice ?? <span className="text-muted-foreground">—</span>,
  },
  {
    accessorKey: "current_step",
    header: "Step",
    cell: ({ row }) => {
      const step = row.original.current_step
      return (
        <span className="text-sm">
          <span className="font-semibold">{step}</span>
          <span className="text-muted-foreground"> / 3 — {STEP_LABELS[step] ?? "Unknown"}</span>
        </span>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} isPaused={row.original.is_paused} />
    ),
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  initialLeads: Lead[]
}

export default function LeadsDataTable({ initialLeads }: Props) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [sorting, setSorting] = useState<SortingState>([])

  const upsertLead = useCallback((updated: Lead) => {
    setLeads((prev) => {
      const exists = prev.some((l) => l.id === updated.id)
      if (exists) {
        return prev.map((l) => (l.id === updated.id ? updated : l))
      }
      // New lead → prepend
      return [updated, ...prev]
    })
  }, [])

  useEffect(() => {
    const supabase = createBrowserSupabaseClient()

    const channel = supabase
      .channel("leads-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "leads" },
        (payload) => upsertLead(payload.new as Lead)
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "leads" },
        (payload) => upsertLead(payload.new as Lead)
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [upsertLead])

  const table = useReactTable({
    data: leads,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="rounded-lg border bg-card">
      {/* Summary bar */}
      <div className="flex items-center gap-4 px-4 py-3 border-b text-sm text-muted-foreground">
        <span>Total: <strong className="text-foreground">{leads.length}</strong></span>
        <span>
          Qualified:{" "}
          <strong className="text-green-600">
            {leads.filter((l) => l.status === "qualified").length}
          </strong>
        </span>
        <span>
          Paused:{" "}
          <strong className="text-yellow-600">
            {leads.filter((l) => l.is_paused).length}
          </strong>
        </span>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="font-semibold">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted/40">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-32 text-center text-muted-foreground"
              >
                No leads yet. Waiting for first WhatsApp message…
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
