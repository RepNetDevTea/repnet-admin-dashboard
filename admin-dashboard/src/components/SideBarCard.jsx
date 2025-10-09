import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
} from "@/components/ui/card";

export default function SidebarCard({teacherName, teacherClass}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>¡Bienvenido {teacherName}!</CardTitle>
        <Separator />
        <CardDescription className="max-w-100">
          <div className="text-sm h-6 flex items-center space-x-4">
            <Badge variant="outline" className='bg-[#FACC15] text-black leading-tight truncate'>Administrador </Badge>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}