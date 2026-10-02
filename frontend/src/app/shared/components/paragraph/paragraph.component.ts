import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

type ParagraphSize = 'sm' | 'md' | 'lg';
type ParagraphColor = 'primary' | 'secondary' | 'muted' | 'dark' | 'error';
@Component({
  selector: 'app-paragraph',
  standalone: true,
  templateUrl: './paragraph.component.html',
  styleUrl: './paragraph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParagraphComponent {
  readonly bold = input(false);
  readonly size = input<ParagraphSize>('md');
  readonly color = input<ParagraphColor>();

  readonly paragraphClasses = computed(() => [
    'paragraph',
    `paragraph--${this.size()}`,
    `paragraph--${this.color()}`,
    ...(this.bold() ? ['paragraph--bold'] : []),
  ]);
}