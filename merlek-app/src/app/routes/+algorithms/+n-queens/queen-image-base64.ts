const queenImageBase64 =
  'data:image/svg+xml;base64,PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAv' +
  'c3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMCIgd2lkdGg9' +
  'IjUwNCIgaGVpZ2h0PSI1MDQiIGlkPSJzdmcyNTg4Ij4KICA8ZGVmcyBpZD0iZGVmczI1OTAiLz4KICA8' +
  'ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTIwLjMwODczLC0xNTYuNTM3OSkiIGlkPSJsYXllcjEiPgog' +
  'ICAgPHBhdGggZD0iTSAxODAuOTE3MTgsNDczLjYwNTE2IEMgMTYwLjIxMzM4LDQ3Mi4xNTM0IDE0MC45' +
  'Njk5NSw0NjguMTMyNjggMTI1LjUyODQ3LDQ2Mi4wMzIyNCBDIDExNi4xODY1Myw0NTguMzQxNTQgMTA0' +
  'LjUyNDA0LDQ1Mi4zMzI0NiAxMDMuNTA1OTcsNDUwLjY4NTE5IEMgMTAzLjE4NTg5LDQ1MC4xNjczIDEw' +
  'Ny4yMTYxMSw0MzkuODc1NDUgMTEyLjQ2MjAxLDQyNy44MTQ0MyBDIDExNy43MDc5LDQxNS43NTM0MyAx' +
  'MjIsNDA1LjM2MDEyIDEyMiw0MDQuNzE4MjMgQyAxMjIsNDAzLjQ2MzA3IDEwNi4xNDc5MSwzNjYuNzg3' +
  'NCAxMDMuMDE0ODEsMzYwLjc5Mzc0IEMgMTAxLjk3NDU1LDM1OC44MDM3NCA5My4wMzkxLDM0Ny4zMjk0' +
  'MSA4My4xNTgyNSwzMzUuMjk1MjYgTCA2NS4xOTMwNzcsMzEzLjQxNDk4IEwgNjQuMDA4NzIsMzAzLjc5' +
  'NTI2IEMgNjMuMzU3MzIsMjk4LjUwNDQxIDU4LjQ2Mzk4LDI1OS4zMDA4OCA1My4xMzQ2MSwyMTYuNjc2' +
  'MyBMIDQzLjQ0NDg1OSwxMzkuMTc3MDYgTCAzNy43NDg2NSwxMzguNDY1NTUgQyAyMS4zMDMzOSwxMzYu' +
  'NDExMzEgMTEuNDgxMywxMjEuNzg1NDIgMTYuNDY2ODcsMTA2Ljc3NTI3IEMgMTguNTg1ODAxLDEwMC4z' +
  'OTU3NyAyMS44MjUsOTYuNDUwOTYgMjcuODU1NCw5Mi45MDU5MiBDIDMxLjc5OSw5MC41ODc2MTggMzMu' +
  'NjMxOTYsOTAuMTc1NTMgNDAsOTAuMTc1NTMgQyA0Ni4zNjgwNCw5MC4xNzU1MzEgNDguMjAxLDkwLjU4' +
  'NzYyIDUyLjE0NDYsOTIuOTA1OTIgQyA1OC4xNzUsOTYuNDUwOTU4IDYxLjQxNDIsMTAwLjM5NTc3IDYz' +
  'LjUzMzEzLDEwNi43NzUyNyBDIDY3LjE1MTQzOSwxMTcuNjY5IDYyLjQ0MDA2LDEyOS44NTI4NSA1Mi40' +
  'NDY2MywxMzUuNDQ1NDYgQyA1MS4yOTA3NjEsMTM2LjA5MjMxIDU4LjY4ODMxLDE1Mi4wNzc3MyA4OS4x' +
  'MzAzOCwyMTQuNzE1NjIgQyAxMTAuMTAyNzUsMjU3Ljg2ODU3IDEyNy4zMjI2NCwyOTMuMjU3NjQgMTI3' +
  'LjM5Njc4LDI5My4zNTggQyAxMjcuNjAyMDEsMjkzLjYzNTc2IDEzOC4wOTgzNCwxMDUuNTU4NDkgMTM4' +
  'LjA0NTgzLDEwMi41NDQyNSBDIDEzOC4wMDY1NywxMDAuMjkwOTIgMTM3LjM4MjI4LDk5Ljc1NzQyIDEz' +
  'My42OTk1MSw5OC44MzAwOSBDIDEyNy43Mjg5LDk3LjMyNjY2NyAxMjEuNjUwNzksOTIuNjM5NTEgMTE4' +
  'LjMxNjg2LDg2Ljk2NzY5IEMgMTE1Ljg5NzA3LDgyLjg1MTA0IDExNS41LDgxLjEwNzI2IDExNS41LDc0' +
  'LjU5NzExIEMgMTE1LjUsNjcuOTEwMjczIDExNS44NTYzNyw2Ni40Mzk2OCAxMTguNTI5MTQsNjIuMDk3' +
  'MTEgQyAxMjguNTc4NjEsNDUuNzY5Mjc5IDE1MS40MjEzOSw0NS43NjkyOCAxNjEuNDcwODYsNjIuMDk3' +
  'MTEgQyAxNjQuMTUwNzksNjYuNDUxMzE5IDE2NC41LDY3LjkwMTM5IDE2NC41LDc0LjY3NTUzIEMgMTY0' +
  'LjUsODEuNDM5NzExIDE2NC4xNDgxMiw4Mi45MDYxNCAxNjEuNDgxNzIsODcuMjUzOTUgQyAxNTkuNjgw' +
  'MjksOTAuMTkxMzI4IDE1Ni40MzE0MSw5My41MTcxNiAxNTMuNDIzMjQsOTUuNTAzMjggTCAxNDguMzgz' +
  'MDYsOTguODMxMDMyIEwgMTc5LjkzOCwxOTAuMjUzMjggQyAxOTcuMjkzMjMsMjQwLjUzNTUyIDIxMS43' +
  'MTk1NCwyODEuNjc1MjUgMjExLjk5NjQ4LDI4MS42NzQ5MSBDIDIxMi4zNDM1NCwyODEuNjc0NSAyNDUu' +
  'MTMxMjksOTUuMTE4NTYgMjQ3LjM3NjkyLDgwLjM2NzA1IEMgMjQ3LjQ0NDYyLDc5LjkyMjM5IDI0NS44' +
  'MTE1OSw3OC45NjI2IDI0My43NDc5Nyw3OC4yMzQxOSBDIDIzOC4yMzE0OCw3Ni4yODY5OTggMjMzLjQw' +
  'OTI1LDcyLjIyODA5IDIzMC4yNzIzLDY2Ljg5MTY0IEMgMjI3LjkwMTMzLDYyLjg1ODIzIDIyNy41LDYx' +
  'LjA3ODQ4IDIyNy41LDU0LjU5NzExIEMgMjI3LjUsNDcuOTEwMjY5IDIyNy44NTYzNyw0Ni40Mzk2OCAy' +
  'MzAuNTI5MTQsNDIuMDk3MTEgQyAyNDAuNTc4NjEsMjUuNzY5Mjc5IDI2My40MjEzOSwyNS43NjkyOCAy' +
  'NzMuNDcwODYsNDIuMDk3MTEgQyAyNzYuMTQzNjMsNDYuNDM5Njc5IDI3Ni41LDQ3LjkxMDI3IDI3Ni41' +
  'LDU0LjU5NzExIEMgMjc2LjUsNjEuMDc4NDc5IDI3Ni4wOTg2OCw2Mi44NTgyMyAyNzMuNzI3Nyw2Ni44' +
  'OTE2NCBDIDI3MC41OTA3Niw3Mi4yMjgwOSAyNjUuNzY4NTIsNzYuMjg3IDI2MC4yNTIwMyw3OC4yMzQx' +
  'OSBDIDI1OC4xODg0LDc4Ljk2MjU5OCAyNTYuNTU1MzgsNzkuOTIyMzkgMjU2LjYyMzA4LDgwLjM2NzA1' +
  'IEMgMjU4Ljg2ODcxLDk1LjExODU2IDI5MS42NTY0NiwyODEuNjc0NDkgMjkyLjAwMzUyLDI4MS42NzQ5' +
  'MSBDIDI5Mi4yODA0NywyODEuNjc1MjYgMzA2LjcwNjc3LDI0MC41MzU1MiAzMjQuMDYxOTksMTkwLjI1' +
  'MzI4IEwgMzU1LjYxNjk0LDk4LjgzMTAzMiBMIDM1MC41NzY3NSw5NS41MDMyODEgQyAzNDcuNTY4NTks' +
  'OTMuNTE3MTYgMzQ0LjMxOTcxLDkwLjE5MTMzIDM0Mi41MTgyOCw4Ny4yNTM5NSBDIDMzOS44NTE4OCw4' +
  'Mi45MDYxMzggMzM5LjUsODEuNDM5NzEgMzM5LjUsNzQuNjc1NTMgQyAzMzkuNSw2Ny45MDEzOTEgMzM5' +
  'Ljg0OTIxLDY2LjQ1MTMyIDM0Mi41MjkxNCw2Mi4wOTcxMSBDIDM1Mi41Nzg2MSw0NS43NjkyNzkgMzc1' +
  'LjQyMTM5LDQ1Ljc2OTI4IDM4NS40NzA4Niw2Mi4wOTcxMSBDIDM4OC4xNDM2Myw2Ni40Mzk2NzkgMzg4' +
  'LjUsNjcuOTEwMjcgMzg4LjUsNzQuNTk3MTEgQyAzODguNSw4MS4xMDcyNjMgMzg4LjEwMjkzLDgyLjg1' +
  'MTA0IDM4NS42ODMxNCw4Ni45Njc2OSBDIDM4Mi4zNDkyMSw5Mi42Mzk1MSAzNzYuMjcxMSw5Ny4zMjY2' +
  'NyAzNzAuMzAwNDksOTguODMwMDkgQyAzNjYuNjE3NzMsOTkuNzU3NDE3IDM2NS45OTM0MiwxMDAuMjkw' +
  'OTIgMzY1Ljk1NDE3LDEwMi41NDQyNSBDIDM2NS45MDE2NywxMDUuNTU4NDkgMzc2LjM5Nzk5LDI5My42' +
  'MzU3NiAzNzYuNjAzMjIsMjkzLjM1OCBDIDM3Ni42NzczNywyOTMuMjU3NjQgMzkzLjg5NzI1LDI1Ny44' +
  'Njg1NyA0MTQuODY5NjIsMjE0LjcxNTYyIEMgNDQ1LjMxMTY4LDE1Mi4wNzc3MyA0NTIuNzA5MjQsMTM2' +
  'LjA5MjMyIDQ1MS41NTMzNywxMzUuNDQ1NDYgQyA0NDEuNTU5OTMsMTI5Ljg1Mjg0IDQzNi44NDg1Niwx' +
  'MTcuNjY5IDQ0MC40NjY4NywxMDYuNzc1MjcgQyA0NDIuNTg1ODEsMTAwLjM5NTc3IDQ0NS44MjUsOTYu' +
  'NDUwOTYgNDUxLjg1NTQsOTIuOTA1OTIgQyA0NTUuNzk4OTksOTAuNTg3NjE4IDQ1Ny42MzE5Niw5MC4x' +
  'NzU1MyA0NjQsOTAuMTc1NTMgQyA0NzAuMzY4MDQsOTAuMTc1NTMxIDQ3Mi4yMDEsOTAuNTg3NjIgNDc2' +
  'LjE0NDYsOTIuOTA1OTIgQyA0ODIuMTc0OTgsOTYuNDUwOTU4IDQ4NS40MTQxNywxMDAuMzk1NzcgNDg3' +
  'LjUzMzE3LDEwNi43NzUyNyBDIDQ5Mi41MTg2NywxMjEuNzg1NDIgNDgyLjY5NjU3LDEzNi40MTEzMSA0' +
  'NjYuMjUxMzUsMTM4LjQ2NTU0IEwgNDYwLjU1NTE1LDEzOS4xNzcwNiBMIDQ1MC44NjUzOSwyMTYuNjc2' +
  'MyBDIDQ0NS41MzYwMiwyNTkuMzAwODggNDQwLjY0MjY4LDI5OC41MDQ0MSA0MzkuOTkxMjgsMzAzLjc5' +
  'NTI2IEwgNDM4LjgwNjkyLDMxMy40MTQ5OCBMIDQyMC44NDE3NCwzMzUuMjk1MjYgQyA0MTAuOTYwOSwz' +
  'NDcuMzI5NDEgNDAyLjAyNTQ1LDM1OC44MDM3MyA0MDAuOTg1MTksMzYwLjc5Mzc0IEMgMzk3Ljg1MjA4' +
  'LDM2Ni43ODc0MSAzODIsNDAzLjQ2MzA3IDM4Miw0MDQuNzE4MjMgQyAzODIsNDA1LjM2MDEyIDM4Ni4y' +
  'OTIxLDQxNS43NTM0MiAzOTEuNTM3OTksNDI3LjgxNDQzIEMgMzk2Ljc4Mzg5LDQzOS44NzU0NiA0MDAu' +
  'ODE0MTEsNDUwLjE2NzI5IDQwMC40OTQwMyw0NTAuNjg1MTkgQyAzOTguMTk5NzMsNDU0LjM5NzQ3IDM3' +
  'NC4xNTMwNSw0NjQuNDcyMjkgMzU4LjY5NjM5LDQ2OC4xOTcxNSBDIDMzNi4zMDE1Nyw0NzMuNTk0MDIg' +
  'MzMxLjgyMjg0LDQ3My44NTk3NiAyNTksNDc0LjExMjc0IEMgMjIxLjg3NSw0NzQuMjQxNzIgMTg2Ljcz' +
  'NzczLDQ3NC4wMTMyOSAxODAuOTE3MTcsNDczLjYwNTE1IEwgMTgwLjkxNzE4LDQ3My42MDUxNiB6IiB0' +
  'cmFuc2Zvcm09InRyYW5zbGF0ZSg1MjAuMzA4NzMsMTU2LjUzNzkpIiBpZD0icGF0aDI2MTEiIHN0eWxl' +
  'PSJmaWxsOiMwMDAwMDAiLz4KICAgIDxwYXRoIGQ9Ik0gMTMwLjUwMzYsMzYxLjY3NDE5IEMgMTQ3Ljc5' +
  'NiwzNTUuMTkzODUgMTY0LjkzOTkxLDM1MC4yODkyMSAxODMsMzQ2LjY1NTY2IEMgMjA5LjM2NTU5LDM0' +
  'MS4zNTExMSAyMjAuODQwMTUsMzQwLjI5MzAyIDI1MiwzNDAuMjkzMDIgQyAyODMuMTU5ODUsMzQwLjI5' +
  'MzAxIDI5NC42MzQ0MSwzNDEuMzUxMTIgMzIxLDM0Ni42NTU2NiBDIDMzOS4xNTA0NiwzNTAuMzA3Mzgg' +
  'MzU2LjIxNTcsMzU1LjE5ODI0IDM3My44MDAzMywzNjEuNzg4MDggQyAzODguNzYxNzgsMzY3LjM5NDg3' +
  'IDM5MS4xMzE4OCwzNjcuNDc2MzcgMzkzLjkzNjA1LDM2Mi40ODA0IEMgMzk2LjI0ODM1LDM1OC4zNjA3' +
  'NSAzOTQuNDg3ODMsMzU0LjY2NTkzIDM4OC44ODgwMiwzNTEuODg1OTUgQyAzODAuNjA1NjksMzQ3Ljc3' +
  'NDI3IDM1Ni40MzI1NiwzMzkuODI4IDMzOS43OTM5NiwzMzUuNzQ3NiBDIDMwNi44MDg1LDMyNy42NTgz' +
  'NCAyODYuMzI5OSwzMjUuMTk3NDIgMjUyLDMyNS4xOTc0MiBDIDIzNi40Mjc3MywzMjUuMTk3NDIgMjIx' +
  'LjE3MDE0LDMyNS43MzAxMyAyMTUsMzI2LjQ4OTI1IEMgMTgwLjU1NjEsMzMwLjcyNjkxIDE1MC40NzU4' +
  'NCwzMzcuOTg1MjYgMTIyLjI1NjYyLDM0OC44NjgxNCBDIDExMS43Nzc0MywzNTIuOTA5NSAxMDksMzU1' +
  'LjEyNTE2IDEwOSwzNTkuNDQzNDkgQyAxMDksMzYyLjEwOTgxIDExMy4xMjQ2OSwzNjYuNjc1NTMgMTE1' +
  'LjUzMzQzLDM2Ni42NzU1MyBDIDExNi40MjY4MiwzNjYuNjc1NTIgMTIzLjE2MzQsMzY0LjQyNDkyIDEz' +
  'MC41MDM2LDM2MS42NzQxOCBMIDEzMC41MDM2LDM2MS42NzQxOSB6IiB0cmFuc2Zvcm09InRyYW5zbGF0' +
  'ZSg1MjAuMzA4NzMsMTU2LjUzNzkpIiBpZD0icGF0aDIzODgiIHN0eWxlPSJmaWxsOiNmZmZmZmYiLz4K' +
  'ICAgIDxwYXRoIGQ9Ik0gMTU0LjAwMjQ5LDQwNC44ODAxIEMgMTczLjk1Mjc0LDM5Ni4yOTEwNCAxOTQu' +
  'NjEwMSwzOTAuNDI2ODUgMjE3LDM4Ni45OTY0NCBDIDIzMy4wMzQ1MiwzODQuNTM5NzYgMjcwLjg2OTQ5' +
  'LDM4NC41MzEzMiAyODcsMzg2Ljk4MDg0IEMgMzEwLjMzODAyLDM5MC41MjQ4OCAzMzIuODQxMzIsMzk3' +
  'LjE2MTYzIDM1NS40MDkxLDQwNy4xNTYzMSBDIDM2NS42ODI2OSw0MTEuNzA2MjEgMzY3Ljc1NDM3LDQx' +
  'Mi4zMDg1MiAzNzAuMTk5MTgsNDExLjQ1NjI1IEMgMzc1LjcwNTA1LDQwOS41MzY5IDM3Ni42OTU5LDQw' +
  'My4yODAzMiAzNzIuMTA1NjcsMzk5LjQxNzkgQyAzNjUuMTg2NTksMzkzLjU5NTg4IDMzMS41ODUzNSwz' +
  'ODEuMDk5MzggMzEwLDM3Ni4zMjA0MiBDIDI4Ny4zNzYwNSwzNzEuMzExNTEgMjc3LjExMTc5LDM3MC4y' +
  'MzQ0OSAyNTIsMzcwLjIzNDQ5IEMgMjI2Ljg4ODIxLDM3MC4yMzQ0OCAyMTYuNjIzOTUsMzcxLjMxMTUy' +
  'IDE5NCwzNzYuMzIwNDIgQyAxNzIuNDE0NjUsMzgxLjA5OTM3IDEzOC44MTM0LDM5My41OTU4OSAxMzEu' +
  'ODk0MzMsMzk5LjQxNzkgQyAxMjcuMzczNzcsNDAzLjIyMTY5IDEyOC4xMDU1OSw0MDguOTc1NTQgMTMz' +
  'LjM5MjcsNDExLjE5ODYgQyAxMzUuOTQzMyw0MTIuMjcxMDQgMTM3LjAxMzcsNDEyLjI2NTI4IDEzOS40' +
  'OTMwNCw0MTEuMTY1NzMgQyAxNDEuMTQ2ODcsNDEwLjQzMjI4IDE0Ny42NzYxMiw0MDcuNjAzNzUgMTU0' +
  'LjAwMjQ4LDQwNC44ODAxIEwgMTU0LjAwMjQ5LDQwNC44ODAxIHoiIHRyYW5zZm9ybT0idHJhbnNsYXRl' +
  'KDUyMC4zMDg3MywxNTYuNTM3OSkiIGlkPSJwYXRoMjM4NiIgc3R5bGU9ImZpbGw6I2ZmZmZmZiIvPgog' +
  'ICAgPHBhdGggZD0iTSAxMjEuNzk5NjYsNDU2LjI4NTA2IEMgMTI2Ljk5MjM2LDQ1My42MTExNyAxNTYu' +
  'NjA3ODQsNDQzLjkxNDAyIDE2OSw0NDAuODI5OTkgQyAxODMuMTE3ODQsNDM3LjMxNjQ5IDE5OS4zMDI3' +
  'OCw0MzQuNDE4NjYgMjE1LjUsNDMyLjUwNDQgQyAyMjkuODUwODcsNDMwLjgwODM1IDI3NC4xNDkxMyw0' +
  'MzAuODA4MzQgMjg4LjUsNDMyLjUwNDQgQyAzMjAuMzU4NzQsNDM2LjI2OTYyIDM0OS41MjgyLDQ0My40' +
  'NDY4MiAzNzcuMjEwMjYsNDU0LjMzMTc0IEwgMzg1LjkyMDUzLDQ1Ny43NTY3MSBMIDM5MC4wMDg5Nyw0' +
  'NTUuNjcwOTYgQyAzOTQuNTc3NTgsNDUzLjM0MDIyIDM5NS41MDUxLDQ1MS44MjQxMyAzOTQuNTkwODYs' +
  'NDQ4LjE4MTUzIEMgMzkzLjc3NTksNDQ0LjkzNDQ1IDM4OC40MTQyLDQ0Mi4yNTk1NCAzNzAsNDM1Ljkx' +
  'MzQgQyAyOTEuODAyNzUsNDA4Ljk2NDAzIDIxMi4xOTcyNSw0MDguOTY0MDIgMTM0LDQzNS45MTM0IEMg' +
  'MTE1LjU4NTgsNDQyLjI1OTU1IDExMC4yMjQxMSw0NDQuOTM0NDQgMTA5LjQwOTE0LDQ0OC4xODE1MyBD' +
  'IDEwOC41MDkxNiw0NTEuNzY3MzQgMTA5LjQwNzMyLDQ1My4zMTY0NiAxMTMuNjk5NTEsNDU1LjU4MTU0' +
  'IEMgMTE4LjMwOTY1LDQ1OC4wMTQ0MSAxMTguNDIyMjIsNDU4LjAyNDE5IDEyMS43OTk2Niw0NTYuMjg1' +
  'MDUgTCAxMjEuNzk5NjYsNDU2LjI4NTA2IHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUyMC4zMDg3Mywx' +
  'NTYuNTM3OSkiIGlkPSJwYXRoMjM4NCIgc3R5bGU9ImZpbGw6I2ZmZmZmZiIvPgogIDwvZz4KPC9zdmc+';

export default queenImageBase64;
