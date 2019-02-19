export const inputFields =
    page === 1
        ? [
              {
                  value: email,
                  onChange: this._handleInput,
                  name: 'email',
                  type: 'email',
                  label: 'Email',
                  placeholder: 'Enter your email here',
              },
          ]
        : page === 2
        ? [
              {
                  value: code,
                  onChange: this._handleInput,
                  name: 'code',
                  type: 'text',
                  label: 'Code',
                  placeholder: 'Enter code here',
              },
          ]
        : page === 3
        ? [
              {
                  value: newPassword,
                  onChange: this._handleInput,
                  name: 'newPassword',
                  type: 'password',
                  label: 'New password',
                  placeholder: 'Enter new password here',
              },
          ]
        : [
              {
                  value: confNewPassword,
                  onChange: this._handleInput,
                  name: 'confNewPassword',
                  type: 'password',
                  label: 'Confirm password',
                  placeholder: 'Confirm your new password',
              },
          ];
