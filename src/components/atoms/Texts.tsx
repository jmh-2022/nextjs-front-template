import { makeClass } from '@/utils/util';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type TextProps = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;

export type TitleProps = TextProps & {
  numberOfLines?: number;
};

//제목 영역
/**
    제목 1
 * 페이지 단위 타이틀로 사용 권장 예시) 화면을 명시하는 타이틀
 * @date 5/17/2023 - 12:54:11 PM
 *
 * @param {TitleProps} {className: _className,  ...props}
 * @returns {*}
 */
export const Title1 = ({ className: _className, ...props }: TitleProps) => {
  const className = makeClass('font-spoqa text-title1 font-medium whitespace-normal', _className);

  return <p {...props} className={className} />;
};

export const Title2 = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = makeClass('font-spoqa text-title2 font-medium', _className);

  return <p {...props} className={className} />;
};

export const Title3 = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = makeClass('font-spoqa text-title3 font-medium', _className);

  return <p {...props} className={className} />;
};

export const Subtitle1 = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = makeClass('font-spoqa text-subtitle1 font-medium', _className);

  return <p {...props} className={className} />;
};

export const Subtitle2 = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = makeClass('font-spoqa text-subtitle2 font-medium', _className);

  return <p {...props} className={className} />;
};

export const BodyStrong = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = makeClass('font-spoqa text-body-strong font-bold', _className);

  return <p {...props} className={className} />;
};
export const BodyStrong2 = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = makeClass('font-spoqa text-body-strong2 font-bold', _className);

  return <p {...props} className={className} />;
};

export const Body = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = makeClass('font-spoqa text-body font-regular ', _className);

  return <p {...props} className={className} />;
};
export const Caption1Strong = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = makeClass('font-spoqa text-caption1-strong font-bold', _className);

  return <p {...props} className={className} />;
};

export const Caption1 = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = makeClass('font-spoqa text-caption1 font-regular', _className);

  return <p {...props} className={className} />;
};

export const Caption2Strong = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = makeClass('font-spoqa text-caption2 font-bold', _className);

  return <p {...props} className={className} />;
};
export const Caption2 = ({
  className: _className,

  ...props
}: TitleProps) => {
  const className = ['font-spoqa text-caption2 font-regular', _className].join(' ');

  return <p {...props} className={className} />;
};
