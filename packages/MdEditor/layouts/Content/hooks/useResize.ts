import { CSSProperties, RefObject, useEffect, useRef, useState } from 'react';
import { MinInputBoxWidth } from '~/config';

import { ContentProps } from '../props';

const useResize = (
  props: ContentProps,
  contentRef: RefObject<HTMLDivElement>,
  resizeRef: RefObject<HTMLDivElement>
) => {
  const [inputWrapperStyle, setInputWrapperStyle] = useState<CSSProperties>({
    width: props.inputBoxWitdh
  });

  const [resizeOperateStyle, setResizeOperateStyle] = useState<CSSProperties>({
    left: props.inputBoxWitdh
  });

  const resizedWidth = useRef<string | number | undefined>(props.inputBoxWitdh);

  useEffect(() => {
    // 挂载后计算宽度的数值
    const maxWidth = contentRef.current?.offsetWidth || 0;

    const contentX = contentRef.current?.getBoundingClientRect().x || 0;

    const resizeMousemove = (e: MouseEvent) => {
      // 新的宽度 = 鼠标的位置 - 图标的一半宽度 - 内容区域的横坐标
      let nextWidth = e.x - contentX;

      if (nextWidth < MinInputBoxWidth) {
        nextWidth = MinInputBoxWidth;
      } else if (nextWidth > maxWidth - MinInputBoxWidth) {
        nextWidth = maxWidth - MinInputBoxWidth;
      }

      const ibw = `${nextWidth}px`;

      setInputWrapperStyle((prevState) => {
        return {
          ...prevState,
          width: ibw
        };
      });

      setResizeOperateStyle((prevState) => {
        return {
          ...prevState,
          left: ibw
        };
      });

      resizedWidth.current = ibw;
      props.onInputBoxWitdhChange?.(ibw);
    };

    const resizeMousedown = () => {
      setResizeOperateStyle((prevState) => {
        return {
          ...prevState
        };
      });
      document.addEventListener('mousemove', resizeMousemove);
    };

    const resizeMouseup = () => {
      setResizeOperateStyle((prevState) => {
        return {
          ...prevState
        };
      });
      document.removeEventListener('mousemove', resizeMousemove);
    };

    resizeRef.current?.addEventListener('mousedown', resizeMousedown);
    document.addEventListener('mouseup', resizeMouseup);

    return () => {
      resizeRef.current?.removeEventListener('mousedown', resizeMousedown);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      resizeRef.current?.removeEventListener('mouseup', resizeMouseup);
    };
  }, [contentRef, props, resizeRef]);

  useEffect(() => {
    if (!props.setting.htmlPreview && !props.setting.preview) {
      setInputWrapperStyle((prevState) => {
        return {
          ...prevState,
          width: '100%'
        };
      });

      setResizeOperateStyle((prevState) => {
        return {
          ...prevState,
          display: 'none'
        };
      });
    } else {
      setInputWrapperStyle((prevState) => {
        return {
          ...prevState,
          width: resizedWidth.current
        };
      });

      setResizeOperateStyle((prevState) => {
        return {
          ...prevState,
          display: 'initial'
        };
      });
    }
  }, [props.setting.htmlPreview, props.setting.preview]);

  useEffect(() => {
    if (props.inputBoxWitdh) {
      setInputWrapperStyle((prevState) => {
        return {
          ...prevState,
          width: props.inputBoxWitdh
        };
      });

      setResizeOperateStyle((prevState) => {
        return {
          ...prevState,
          left: props.inputBoxWitdh
        };
      });
    }
  }, [props.inputBoxWitdh]);

  return { inputWrapperStyle, resizeOperateStyle };
};

export default useResize;
