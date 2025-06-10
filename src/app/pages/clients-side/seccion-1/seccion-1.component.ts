import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CajasService } from '../../../services/cajas.service';
import { CommonModule } from '@angular/common';
import { Subscription, timeout } from 'rxjs';
import Swal from 'sweetalert2';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-seccion-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-1.component.html',
  styleUrl: './seccion-1.component.css'
})
export class Seccion1Component implements OnInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  seccionLocal = 'poker-room';
  mensajeCaja: string | null = null;
  showVideo: boolean = false;
  videoFadingOut: boolean = false;
  videoTimeout: any;
  messageTimeout: any;

  constructor(private cajasSv: CajasService, private ws: WebsocketService) {}

  ngOnInit(): void {
    // Mostrar video inicialmente después de 3 segundos
    this.videoTimeout = setTimeout(() => {
      this.showVideo = true;
      // Esperamos a que el DOM se actualice para acceder al elemento de video
      setTimeout(() => {
        this.playVideo();
      }, 100);
    }, 3000);

    this.ws.startConnection().then(() => {
      this.ws.unirseASeccion(this.seccionLocal);
  
      this.ws.onAsignacion(({ nCaja, seccion }) => {
        if (seccion === this.seccionLocal) {
          console.log(`🟢 Asignación recibida para ${seccion}: Caja ${nCaja}`);
          
          // Limpiar timeouts existentes
          if (this.videoTimeout) clearTimeout(this.videoTimeout);
          if (this.messageTimeout) clearTimeout(this.messageTimeout);
          
          // Si el video está mostrándose, activar animación de salida
          if (this.showVideo) {
            this.videoFadingOut = true;
            setTimeout(() => {
              this.showVideo = false;
              this.videoFadingOut = false;
              this.mensajeCaja = `${nCaja}`;
            }, 500); // Tiempo de la animación de fade-out
          } else {
            this.mensajeCaja = `${nCaja}`;
          }
          
          // Configurar desaparición del mensaje después de 5 segundos
          this.messageTimeout = setTimeout(() => {
            this.mensajeCaja = null;
            
            // Mostrar video 3 segundos después de que desaparezca el mensaje
            this.showVideoAfterMessage();
          }, 5000);
        }
      });
    });
  }

  // Método para reproducir el video manualmente
  playVideo(): void {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      const video = this.videoPlayer.nativeElement;
      
      // Verificar si el video está cargado
      if (video.readyState >= 2) {
        const playPromise = video.play();
        
        // Manejar el error si el navegador bloquea la reproducción automática
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Error al reproducir el video:', error);
          });
        }
      } else {
        console.log("El video aún no está cargado");
        // Intentar reproducir cuando esté cargado
        video.addEventListener('loadeddata', () => {
          video.play().catch(error => {
            console.error('Error al reproducir el video después de cargar:', error);
          });
        });
      }
    }
  }

  // Actualizar el método que muestra el video después del mensaje
  showVideoAfterMessage(): void {
    this.videoTimeout = setTimeout(() => {
      this.showVideo = true;
      // Esperamos a que el DOM se actualice
      setTimeout(() => {
        this.playVideo();
      }, 100);
    }, 3000);
  }

  ngOnDestroy(): void {
    // Limpiar timeouts para evitar memory leaks
    if (this.videoTimeout) clearTimeout(this.videoTimeout);
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
  }
}