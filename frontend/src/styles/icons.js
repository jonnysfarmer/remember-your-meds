import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

//SVG icons
function MenuIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </SvgIcon >
  )
}
function PrescriptionIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M18,14H14V18H10V14H6V10H10V6H14V10H18M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
    </SvgIcon >
  )
}
function ProfileIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M6,17C6,15 10,13.9 12,13.9C14,13.9 18,15 18,17V18H6M15,9A3,3 0 0,1 12,12A3,3 0 0,1 9,9A3,3 0 0,1 12,6A3,3 0 0,1 15,9M3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5C3.89,3 3,3.9 3,5Z" />
    </SvgIcon >
  )
}
function LogoutIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z" />
    </SvgIcon >
  )
}
function ReminderIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M7.25,3C7.9,3 8.5,3.21 9,3.56V3A2,2 0 0,1 11,1A2,2 0 0,1 13,3V3.57C13.5,3.22 14.1,3 14.75,3A3,3 0 0,1 17.75,6C17.75,7.58 16.54,8.87 15,9H13V10H14.24L14.72,10.13L19.31,12.42C20.13,12.73 20.53,13.34 20.53,14.25L20.5,14.39V14.53L19.5,21.28C19.44,21.75 19.22,22.16 18.84,22.5C18.47,22.84 18.05,23 17.58,23H10C9.45,23 9,22.81 8.58,22.41L2,15.84L3.05,14.77C3.33,14.5 3.69,14.34 4.13,14.34H4.45L9,15.33V10L9,9H7V9C5.46,8.86 4.25,7.57 4.25,6A3,3 0 0,1 7.25,3M9,6A1.75,1.75 0 0,0 7.25,4.25A1.75,1.75 0 0,0 5.5,6C5.5,6.88 6.15,7.61 7,7.73V7.75H9V6M15,7.75V7.74C15.85,7.62 16.5,6.89 16.5,6C16.5,5.04 15.72,4.26 14.75,4.26C13.78,4.26 13,5.04 13,6V7.75H15Z" />
    </SvgIcon >
  )
}

export {
  MenuIcon,
  PrescriptionIcon,
  ProfileIcon,
  LogoutIcon,
  ReminderIcon
}

