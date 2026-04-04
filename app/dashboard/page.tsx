import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { WhatsAppConnectButton } from "@/components/WhatsAppConnectButton"
import LeadsDataTable from "./leads-data-table"

export const metadata = {
  title: "Dashboard — GrowScaleX",
}

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("[dashboard] Failed to fetch leads:", error)
  }

  const { data: waRows } = await supabase
    .from("whatsapp_accounts")
    .select("phone_number_id")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(1)

  const primaryPhoneId = waRows?.[0]?.phone_number_id
  const connectionSummary = primaryPhoneId
    ? `Connected · …${primaryPhoneId.slice(-4)}`
    : null

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Lead Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time WhatsApp qualification funnel
            </p>
          </div>
          <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center sm:gap-4">
            <WhatsAppConnectButton connectionSummary={connectionSummary} />
            <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs text-muted-foreground">Live</span>
            </div>
          </div>
        </div>

        <LeadsDataTable initialLeads={leads ?? []} />
      </div>
    </main>
  )
}
