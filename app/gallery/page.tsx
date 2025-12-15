import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ImageGallery } from "@/components/image-gallery"
import { LogOut, Upload } from "lucide-react"
import { redirect } from "next/navigation"

export default async function GalleryPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: images, error } = await supabase.from("images").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching images:", error)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Minha Galeria Privada</h1>
          <div className="flex items-center gap-3">
            <Button asChild variant="default">
              <Link href="/admin">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Link>
            </Button>
            <form action="/auth/logout" method="post">
              <Button variant="outline" type="submit">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!images || images.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">
              Nenhuma imagem encontrada. Faça upload de suas primeiras imagens!
            </p>
            <Button asChild>
              <Link href="/admin">
                <Upload className="h-4 w-4 mr-2" />
                Adicionar Imagens
              </Link>
            </Button>
          </div>
        ) : (
          <ImageGallery images={images} />
        )}
      </main>
    </div>
  )
}
