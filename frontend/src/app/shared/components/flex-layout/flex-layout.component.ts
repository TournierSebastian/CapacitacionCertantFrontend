import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

type FlexDirection = 'row' | 'column';

type FlexAlignment =
  | 'start'
  | 'center'
  | 'end'
  | 'stretch'
  | 'baseline';

type FlexJustification =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

const ALIGN_VALUES: Record<FlexAlignment, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const JUSTIFY_VALUES: Record<FlexJustification, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

@Component({
  selector: 'app-flex-layout',
  standalone: true,
  templateUrl: './flex-layout.component.html',
  styleUrl: './flex-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexLayoutComponent {
  readonly direction = input<FlexDirection>('row');
  readonly align = input<FlexAlignment>('stretch');
  readonly justify = input<FlexJustification>('start');
  readonly gap = input('0');
  readonly wrap = input(false);
  readonly growChildren = input(false);

  readonly layoutStyles = computed(() => ({
    'flex-direction': this.direction(),
    'align-items': ALIGN_VALUES[this.align()],
    'justify-content': JUSTIFY_VALUES[this.justify()],
    'gap': this.gap(),
    'flex-wrap': this.wrap() ? 'wrap' : 'nowrap',
  }));

  readonly layoutClasses = computed(() => [
    'flex-layout',
    this.growChildren() ? 'flex-layout--grow-children' : '',
  ]);
}