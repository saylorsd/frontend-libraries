import * as React from 'react';

// todo: export these from one of our libraries
import { useOverlayTriggerState } from '@react-stately/overlays';
import { OverlayContainer, OverlayProvider } from '@react-aria/overlays';
import { useButton } from '@react-aria/button';
import { Dialog } from '../packages/@wprdc-components/dialog';

export default {
  title: 'Dialog',
};

export const Default = () => {
  let state = useOverlayTriggerState({});
  let openButtonRef = React.useRef<HTMLAnchorElement>(null);
  let closeButtonRef = React.useRef<HTMLAnchorElement>(null);

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // dialog closes.
  let { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => state.open(),
    },
    openButtonRef,
  );

  let { buttonProps: closeButtonProps } = useButton(
    {
      onPress: () => state.close(),
    },
    closeButtonRef,
  );

  return (
    <OverlayProvider>
      <button {...openButtonProps} ref={openButtonRef}>
        Open Dialog
      </button>
      {state.isOpen && (
        <OverlayContainer>
          <Dialog
            size="Full"
            title="Enter some things here"
            isOpen
            onClose={state.close}
            isDismissable
          >
            <form style={{ display: 'flex', flexDirection: 'column' }}>
              <label>
                First Name: <input placeholder="John" />
              </label>
              <label>
                Last Name: <input placeholder="Smith" />
              </label>
              <button
                {...closeButtonProps}
                ref={closeButtonRef}
                style={{ marginTop: 10 }}
              >
                Submit
              </button>
            </form>
          </Dialog>
        </OverlayContainer>
      )}
    </OverlayProvider>
  );
};
