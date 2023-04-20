const navigation = () => {
  return [
    {
      sectionTitle: 'Apps & Pages'
    },
    {
      title: 'Email',
      icon: 'tabler:mail',
      path: '/apps/email'
    },
    {
      title: 'Chat',
      icon: 'tabler:messages',
      path: '/apps/chat'
    },
    {
      title: 'Calendar',
      icon: 'tabler:calendar',
      path: '/apps/calendar'
    },
    {
      title: 'User',
      icon: 'tabler:user',
      children: [
        {
          title: 'List',
          path: '/apps/user/list'
        },
        {
          title: 'View',
          children: [
            {
              title: 'Account',
              path: '/apps/user/view/account'
            },
            {
              title: 'Security',
              path: '/apps/user/view/security'
            },
            {
              title: 'Billing & Plans',
              path: '/apps/user/view/billing-plan'
            },
            {
              title: 'Notifications',
              path: '/apps/user/view/notification'
            },
            {
              title: 'Connection',
              path: '/apps/user/view/connection'
            }
          ]
        }
      ]
    },
    {
      title: 'Roles & Permissions',
      icon: 'tabler:settings',
      children: [
        {
          title: 'Roles',
          path: '/apps/roles'
        },
        {
          title: 'Permissions',
          path: '/apps/permissions'
        }
      ]
    },
    {
      title: 'Auth Pages',
      icon: 'tabler:lock',
      children: [
        {
          title: 'Login',
          children: [
            {
              openInNewTab: true,
              title: 'Login v1',
              path: '/pages/auth/login-v1'
            },
            {
              openInNewTab: true,
              title: 'Login v2',
              path: '/pages/auth/login-v2'
            },
            {
              openInNewTab: true,
              title: 'Login With AppBar',
              path: '/pages/auth/login-with-appbar'
            }
          ]
        },
        {
          title: 'Register',
          children: [
            {
              openInNewTab: true,
              title: 'Register v1',
              path: '/pages/auth/register-v1'
            },
            {
              openInNewTab: true,
              title: 'Register v2',
              path: '/pages/auth/register-v2'
            },
            {
              openInNewTab: true,
              title: 'Register Multi-Steps',
              path: '/pages/auth/register-multi-steps'
            }
          ]
        },
        {
          title: 'Verify Email',
          children: [
            {
              openInNewTab: true,
              title: 'Verify Email v1',
              path: '/pages/auth/verify-email-v1'
            },
            {
              openInNewTab: true,
              title: 'Verify Email v2',
              path: '/pages/auth/verify-email-v2'
            }
          ]
        },
        {
          title: 'Forgot Password',
          children: [
            {
              openInNewTab: true,
              title: 'Forgot Password v1',
              path: '/pages/auth/forgot-password-v1'
            },
            {
              openInNewTab: true,
              title: 'Forgot Password v2',
              path: '/pages/auth/forgot-password-v2'
            }
          ]
        },
        {
          title: 'Reset Password',
          children: [
            {
              openInNewTab: true,
              title: 'Reset Password v1',
              path: '/pages/auth/reset-password-v1'
            },
            {
              openInNewTab: true,
              title: 'Reset Password v2',
              path: '/pages/auth/reset-password-v2'
            }
          ]
        },
        {
          title: 'Two Steps',
          children: [
            {
              openInNewTab: true,
              title: 'Two Steps v1',
              path: '/pages/auth/two-steps-v1'
            },
            {
              openInNewTab: true,
              title: 'Two Steps v2',
              path: '/pages/auth/two-steps-v2'
            }
          ]
        }
      ]
    },
    {
      title: 'Wizard Examples',
      icon: 'tabler:forms',
      children: [
        {
          title: 'Checkout',
          path: '/pages/wizard-examples/checkout'
        },
        {
          title: 'Property Listing',
          path: '/pages/wizard-examples/property-listing'
        },
        {
          title: 'Create Deal',
          path: '/pages/wizard-examples/create-deal'
        }
      ]
    },
    {
      icon: 'tabler:square',
      title: 'Dialog Examples',
      path: '/pages/dialog-examples'
    },
    {
      sectionTitle: 'Forms & Tables'
    },
    {
      title: 'Form Elements',
      icon: 'tabler:toggle-left',
      children: [
        {
          title: 'Text Field',
          path: '/forms/form-elements/text-field'
        },
        {
          title: 'Select',
          path: '/forms/form-elements/select'
        },
        {
          title: 'Checkbox',
          path: '/forms/form-elements/checkbox'
        },
        {
          title: 'Radio',
          path: '/forms/form-elements/radio'
        },
        {
          title: 'Custom Inputs',
          path: '/forms/form-elements/custom-inputs'
        },
        {
          title: 'Textarea',
          path: '/forms/form-elements/textarea'
        },
        {
          title: 'Autocomplete',
          path: '/forms/form-elements/autocomplete'
        },
        {
          title: 'Date Pickers',
          path: '/forms/form-elements/pickers'
        },
        {
          title: 'Switch',
          path: '/forms/form-elements/switch'
        },
        {
          title: 'File Uploader',
          path: '/forms/form-elements/file-uploader'
        },
        {
          title: 'Editor',
          path: '/forms/form-elements/editor'
        },
        {
          title: 'Slider',
          path: '/forms/form-elements/slider'
        },
        {
          title: 'Input Mask',
          path: '/forms/form-elements/input-mask'
        }
      ]
    },
    {
      icon: 'tabler:layout-navbar',
      title: 'Form Layouts',
      path: '/forms/form-layouts'
    },
    {
      title: 'Form Validation',
      path: '/forms/form-validation',
      icon: 'tabler:checkbox'
    },
    {
      title: 'Form Wizard',
      path: '/forms/form-wizard',
      icon: 'tabler:text-wrap-disabled'
    },
    {
      title: 'Table',
      icon: 'tabler:table',
      path: '/tables/mui'
    },
    {
      title: 'Mui DataGrid',
      icon: 'tabler:layout-grid',
      path: '/tables/data-grid'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      icon: 'tabler:shield',
      title: 'Access Control'
    },
    {
      title: 'Documentation',
      externalLink: true,
      openInNewTab: true,
      icon: 'tabler:book',
      path: 'https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/'
    }
  ]
}

export default navigation
