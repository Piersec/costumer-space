"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Palette, Users, FileText, Lock, Zap } from "lucide-react"
import { GeneralSettings } from "./GeneralSettings"
import { AppearanceSettings } from "./AppearanceSettings"
import { UsersSettings } from "./UsersSettings"
import { ContentSettings } from "./ContentSettings"
import { SecuritySettings } from "./SecuritySettings"
import { IntegrationsSettings } from "./IntegrationsSettings"

export function ConfigurationTabs() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-muted p-1">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Geral</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Aparência</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Usuários</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Conteúdo</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Segurança</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Integrações</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <AppearanceSettings />
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <UsersSettings />
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <ContentSettings />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <IntegrationsSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
