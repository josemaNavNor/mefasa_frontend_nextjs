
import Image from 'next/image'
 
export default function LogoMefasa() {
  return (
    <div className="w-50 h-40 relative mx-auto">
      <Image
        src="/LOGOMEFASA.png"
        alt="Logo de Mefasa"
        fill
        className="object-contain"
      />
    </div>
  )
}