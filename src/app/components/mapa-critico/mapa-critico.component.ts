import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DatosExcelService } from '../../services/datos-excel.service';

@Component({
  selector: 'app-mapa-critico',
  templateUrl: './mapa-critico.component.html',
  styleUrls: ['./mapa-critico.component.scss']
})
export class MapaCriticoComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  datos: any[] = [];
  mapaCargado: boolean = false;
  lastHoveredMunicipio: string | null = null;

  constructor(private datosExcelService: DatosExcelService) {}

  ngOnInit(): void {
    this.datosExcelService.getDatos().subscribe(
      (data) => {
        this.datos = data;
        this.cargarMapa();
        const canvasEl = this.canvas.nativeElement;
        canvasEl.addEventListener('mousemove', this.mostrarInfo.bind(this));
      },
      (error) => {
        console.error('Error al cargar datos:', error);
      }
    );
  }

  ngOnDestroy(): void {
    const canvasEl = this.canvas.nativeElement;
    canvasEl.removeEventListener('mousemove', this.mostrarInfo.bind(this));
  }

  cargarMapa(): void {
    const canvasEl = this.canvas.nativeElement;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) {
      console.error("No se pudo obtener el contexto del canvas.");
      return;
    }

    const img = new Image();
    img.src = 'assets/images/potosi-mapa-blanco4.svg';
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvasEl.width, canvasEl.height);
      this.mapaCargado = true;
      this.dibujarPuntos(); // Dibujar puntos una vez cargado el mapa
    };
  }

  dibujarPuntos() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx && this.mapaCargado) {
      this.datos.forEach((dato) => {
        const { id, municipio } = dato;
        const gravedad = (dato.total_casos / dato.poblacion) * 100000;
        const color = this.obtenerColorPorGravedad(gravedad);
        const coordenadas = this.obtenerCoordenadas(id);

        ctx.beginPath();
        ctx.arc(coordenadas.x, coordenadas.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

         // Dibuja el nombre del municipio junto al punto
         ctx.fillStyle = 'black';
         ctx.font = 'bold 10px Arial';
         ctx.fillText(municipio, coordenadas.x + 1, coordenadas.y - 5);
      });
    }
  }

  mostrarInfo(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const scaleX = this.canvas.nativeElement.width / rect.width;
    const scaleY = this.canvas.nativeElement.height / rect.height;
    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;
    const canvasEl = this.canvas.nativeElement;
    const img = new Image();
    img.src = 'assets/images/potosi-mapa-blanco4.svg';


    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx && this.mapaCargado) {
      let found = false;

      this.datos.forEach((dato) => {
        const { id, municipio } = dato;
        const coordenadas = this.obtenerCoordenadas(id);
        const distancia = Math.sqrt(
          Math.pow(mouseX - coordenadas.x, 2) + Math.pow(mouseY - coordenadas.y, 2)
        );

        if (distancia < 5) {
          if (this.lastHoveredMunicipio !== municipio) {
            this.lastHoveredMunicipio = municipio;

            // Limpiar solo el área de hover anterior y dibujar el nuevo nombre de municipio
            ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
            ctx.drawImage(img, 0, 0, canvasEl.width, canvasEl.height);
            this.dibujarPuntos();

            // Mostrar el nombre del municipio
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.fillRect(mouseX + 10, mouseY - 20, municipio.length * 12, 25);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 18px Arial';
            ctx.fillText(municipio, mouseX + 12, mouseY - 5);
          }
          found = true;
        }
      });

      if (!found && this.lastHoveredMunicipio) {
        this.lastHoveredMunicipio = null;
        ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        ctx.drawImage(img, 0, 0, canvasEl.width, canvasEl.height);
        this.dibujarPuntos();
      }
    }
  }

  obtenerCoordenadas(id: number) {
    const coordenadasMapa: { [key: number]: { x: number; y: number } } = {
      1: { x: 575, y: 345 },  //POTOSI
      2: { x: 565, y: 290 }, //TINQUIPAYA
      3: { x: 550, y: 320 }, //YOCALLA
      4: { x: 510, y: 321 }, //URMIRI
      5: { x: 435, y: 165 }, //UNCIA
      6: { x: 470, y: 160 }, //CHAYANTA
      7: { x: 430, y: 150 }, //LLALLAGUA
      8: { x: 650, y: 335 }, //BETANZOS
      9: { x: 620, y: 350 }, //CHAQUI
      10: { x: 630, y: 285 },  //TACOBAMBA
      11: { x: 535, y: 190 },  //COLQUECHACA  
      12: { x: 630, y: 210 },  //RAVELO
      13: { x: 510, y: 185 },  //POCOATA
      14: { x: 590, y: 215 },  //OCURI
      15: { x: 535, y: 105 },  //SAN PEDRO DE B. V.
      16: { x: 590, y: 90 },  //TORO TORO
      17: { x: 600, y: 580 },  //COTAGAITA
      18: { x: 620, y: 475 },  //VITICHI
      19: { x: 475, y: 80 },  //SACACA
      20: { x: 458, y: 100 },  //CARIPUYO
      21: { x: 580, y: 700 },  //TUPIZA
      22: { x: 485, y: 615 }, //ATOCHA
      23: { x: 225, y: 550 }, //COLCHA K
      24: { x: 155, y: 568 }, //SAN PEDRO DE QUEMES
      25: { x: 410, y: 750 }, //SAN PABLO DE LIPEZ
      26: { x: 465, y: 765 }, //MOJINETE
      27: { x: 440, y: 790 }, //SAN ANTONIO DE ESMORUCO
      28: { x: 630, y: 395 }, //PUNA
      29: { x: 590, y: 435 }, //CAIZA D
      30: { x: 395, y: 530 }, //UYUNI
      31: { x: 420, y: 445 }, //TOMAVE
      32: { x: 525, y: 390 }, //PORCO
      33: { x: 530, y: 50 }, //ARAMPAMPA
      34: { x: 535, y: 70 }, //ACASIO
      35: { x: 135, y: 385 }, //LLICA
      36: { x: 215, y: 397 }, //TAHUA
      37: { x: 590, y: 810 }, //VILLAZON
      38: { x: 222, y: 640 }, //SAN AGUSTIN

      // Continúa para cada ID del JSON
    };
    return coordenadasMapa[id] || { x: 0, y: 0 };
  }

  obtenerColorPorGravedad(gravedad: number): string {
    if (gravedad > 500) return '#ff0000'; // Muy grave ROJO
    if (gravedad > 300) return '#ff8000';  // Grave NARANJA OSCURO
    if (gravedad > 100) return '#ffbf00';  // Moderado NARANJA CLARO
    return '#00ff00';                      // Bajo VErde
  }
}
