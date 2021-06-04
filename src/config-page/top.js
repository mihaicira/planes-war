import React, {Component} from 'react';
import './top.css'

class Top extends Component{
    componentDidMount() {
        document.addEventListener("scroll",function(e){
            try{
                var newViewBox = "0 "+window.scrollY/1.8+" 1440 713"
                const svg = document.querySelector("#svg-window>svg")
                svg.setAttribute("viewBox",newViewBox)
            }
            catch{
                //page has been changed
            }

        })
    }

    render() {
        return(<>
            <h2>Configure room</h2>
            <div id="svg-window">
                <svg viewBox="0 0 1440 713" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="-170" width="1441" height="828" fill="#C4C4C4"/>
                    <rect width="1441" height="500" fill="url(#paint0_linear)"/>
                    <rect y="426" width="1440" height="238" fill="#C4C4C4"/>
                    <rect y="426" width="1440" height="238" fill="url(#paint1_linear)"/>
                    <path d="M1242.11 263.223H953.516V262.718L953.938 261.791L955.879 259.769L957.989 257.578L960.353 255.387L963.138 253.281L966.093 251.427L968.878 249.657L971.579 248.225L975.209 246.455L978.501 245.191L983.396 244.349H1006.78L1006.95 241.652L1007.88 238.956L1009.23 236.597L1010.66 233.732L1012.52 230.783L1014.8 228.171L1017.08 226.064L1019.52 224.042L1022.31 222.441L1025.26 221.093L1028.47 219.913L1032.61 218.902H1041.39V215.869L1041.81 211.656L1042.31 207.527L1042.99 204.156L1043.83 200.28L1045.1 196.151L1046.28 192.191L1047.8 187.725L1049.66 183.428L1051.68 180.395L1053.54 177.698L1055.9 174.665L1058.52 171.126L1060.72 168.514L1063.5 165.733L1066.37 163.374L1069.24 161.099L1072.79 158.571L1076.16 156.38L1079.37 154.526L1083.51 152.757L1087.89 150.987L1092.12 149.471L1096.25 148.123L1102.67 147.027L1121.66 146.859L1125.37 147.533L1129.26 148.375L1132.88 149.386L1136.01 150.313L1139.72 151.662L1142.84 153.01L1146.31 154.526L1149.09 155.959L1151.62 157.476L1154.24 159.245L1156.6 161.015L1158.8 162.784L1161.5 165.228L1163.53 166.997L1165.55 168.767L1167.41 170.705L1169.26 172.727L1170.95 175.17L1172.3 177.193L1173.49 179.383L1174.67 181.659L1175.85 184.692H1190.79H1193.32L1196.44 184.86L1199.23 185.282L1202.1 185.956L1204.89 187.135L1207.42 188.399L1209.7 189.663L1212.06 191.264L1214 192.865L1216.03 194.55L1217.88 196.236L1219.49 198.005L1221.09 200.027L1222.7 202.471L1224.05 204.662L1225.4 207.274L1226.58 209.633L1227.68 212.582L1228.52 215.616L1229.28 218.565L1230.12 222.441V238.956L1231.47 239.546L1233.42 240.81L1235.27 242.664L1237.47 245.276L1239.83 248.815L1241.27 252.017L1242.11 255.471V263.223Z" fill="#ECE9E9"/>
                    <path d="M1242.11 263.223H953.516V262.718L953.938 261.791L955.879 259.769L957.989 257.578L960.353 255.387L963.138 253.281L966.093 251.427L968.878 249.657L971.579 248.225L975.209 246.455L978.501 245.191L983.396 244.349H1006.78L1006.95 241.652L1007.88 238.956L1009.23 236.597L1010.66 233.732L1012.52 230.783L1014.8 228.171L1017.08 226.064L1019.52 224.042L1022.31 222.441L1025.26 221.093L1028.47 219.913L1032.61 218.902H1041.39V215.869L1041.81 211.656L1042.31 207.527L1042.99 204.156L1043.83 200.28L1045.1 196.151L1046.28 192.191L1047.8 187.725L1049.66 183.428L1051.68 180.395L1053.54 177.698L1055.9 174.665L1058.52 171.126L1060.72 168.514L1063.5 165.733L1066.37 163.374L1069.24 161.099L1072.79 158.571L1076.16 156.38L1079.37 154.526L1083.51 152.757L1087.89 150.987L1092.12 149.471L1096.25 148.123L1102.67 147.027L1121.66 146.859L1125.37 147.533L1129.26 148.375L1132.88 149.386L1136.01 150.313L1139.72 151.662L1142.84 153.01L1146.31 154.526L1149.09 155.959L1151.62 157.476L1154.24 159.245L1156.6 161.015L1158.8 162.784L1161.5 165.228L1163.53 166.997L1165.55 168.767L1167.41 170.705L1169.26 172.727L1170.95 175.17L1172.3 177.193L1173.49 179.383L1174.67 181.659L1175.85 184.692H1190.79H1193.32L1196.44 184.86L1199.23 185.282L1202.1 185.956L1204.89 187.135L1207.42 188.399L1209.7 189.663L1212.06 191.264L1214 192.865L1216.03 194.55L1217.88 196.236L1219.49 198.005L1221.09 200.027L1222.7 202.471L1224.05 204.662L1225.4 207.274L1226.58 209.633L1227.68 212.582L1228.52 215.616L1229.28 218.565L1230.12 222.441V238.956L1231.47 239.546L1233.42 240.81L1235.27 242.664L1237.47 245.276L1239.83 248.815L1241.27 252.017L1242.11 255.471V263.223Z" fill="url(#paint2_linear)"/>
                    <path d="M567.827 424.22L614.804 353.71L644.939 386.489C681.419 333.906 754.096 223.299 752.96 201.538C751.824 179.776 803.938 284.813 830.136 340.052L938.803 133.475C970.178 204.476 1027.23 343.523 1023.11 372.46C1034.27 360.97 1060.27 336.778 1076.96 321.5L1109.93 382.164L1134.45 362.36L1183.56 437.195H567.827V424.22Z" fill="#E4AFAF"/>
                    <path d="M966.209 594.195C957.723 630.607 644.646 678.718 582.444 618.571C520.243 558.424 506.994 483.415 515.479 447.003C523.965 410.59 727.894 428.819 708.342 447.003C688.79 465.187 998.711 560.759 966.209 594.195Z" fill="url(#paint3_linear)"/>
                    <path d="M1056.78 256.395C1051.79 310.773 974.898 451.284 941.001 518H1439.84C1439.58 456.633 1439.22 327.525 1439.84 302.031C1440.62 270.163 1447.72 196.212 1414.45 205.65C1381.18 215.088 1341.36 423.84 1325.39 416.511C1309.42 409.183 1272.6 12 1266.72 12C1262.02 12 1157.11 318.909 1105.25 472.363C1085.25 372.799 1062.89 189.855 1056.78 256.395Z" fill="#C07676"/>
                    <path d="M0 327.62C6.54128 318.705 45.7284 164.547 64.5043 88.5825C89.9222 173.765 138.035 338.319 141.622 363.132C146.315 328.645 221.423 23.6475 220.2 18.0766C218.901 12.1533 434.382 447.139 444.83 525.833C453.188 588.787 151.759 514.006 0 468.746V327.62Z" fill="#C07676"/>
                    <path d="M517.086 223.459H228.492V222.954L228.914 222.027L230.856 220.005L232.966 217.814L235.329 215.623L238.115 213.517L241.069 211.663L243.855 209.893L246.556 208.461L250.185 206.691L253.477 205.427L258.373 204.585H281.754L281.923 201.888L282.852 199.192L284.202 196.833L285.637 193.968L287.494 191.019L289.773 188.407L292.052 186.3L294.5 184.278L297.285 182.677L300.24 181.329L303.447 180.149L307.583 179.138H316.362V176.105L316.784 171.891L317.29 167.763L317.966 164.392L318.81 160.516L320.076 156.387L321.258 152.427L322.777 147.961L324.634 143.664L326.66 140.631L328.517 137.934L330.88 134.901L333.497 131.362L335.692 128.75L338.477 125.969L341.347 123.61L344.217 121.335L347.762 118.807L351.138 116.616L354.346 114.762L358.482 112.993L362.871 111.223L367.092 109.707L371.228 108.359L377.643 107.263L396.635 107.095L400.349 107.769L404.232 108.611L407.861 109.622L410.984 110.549L414.698 111.897L417.822 113.246L421.282 114.762L424.068 116.195L426.6 117.712L429.217 119.481L431.58 121.25L433.775 123.02L436.476 125.464L438.502 127.233L440.528 129.003L442.385 130.941L444.242 132.963L445.93 135.406L447.28 137.429L448.462 139.619L449.644 141.894L450.825 144.928H465.766H468.298L471.421 145.096L474.207 145.518L477.077 146.192L479.862 147.371L482.394 148.635L484.673 149.899L487.037 151.5L488.978 153.101L491.004 154.786L492.861 156.472L494.465 158.241L496.069 160.263L497.672 162.707L499.023 164.898L500.373 167.51L501.555 169.869L502.653 172.818L503.497 175.852L504.256 178.801L505.1 182.677V199.192L506.451 199.782L508.392 201.046L510.249 202.9L512.444 205.512L514.807 209.051L516.242 212.253L517.086 215.707V223.459Z" fill="#ECE9E9"/>
                    <path d="M517.086 223.459H228.492V222.954L228.914 222.027L230.856 220.005L232.966 217.814L235.329 215.623L238.115 213.517L241.069 211.663L243.855 209.893L246.556 208.461L250.185 206.691L253.477 205.427L258.373 204.585H281.754L281.923 201.888L282.852 199.192L284.202 196.833L285.637 193.968L287.494 191.019L289.773 188.407L292.052 186.3L294.5 184.278L297.285 182.677L300.24 181.329L303.447 180.149L307.583 179.138H316.362V176.105L316.784 171.891L317.29 167.763L317.966 164.392L318.81 160.516L320.076 156.387L321.258 152.427L322.777 147.961L324.634 143.664L326.66 140.631L328.517 137.934L330.88 134.901L333.497 131.362L335.692 128.75L338.477 125.969L341.347 123.61L344.217 121.335L347.762 118.807L351.138 116.616L354.346 114.762L358.482 112.993L362.871 111.223L367.092 109.707L371.228 108.359L377.643 107.263L396.635 107.095L400.349 107.769L404.232 108.611L407.861 109.622L410.984 110.549L414.698 111.897L417.822 113.246L421.282 114.762L424.068 116.195L426.6 117.712L429.217 119.481L431.58 121.25L433.775 123.02L436.476 125.464L438.502 127.233L440.528 129.003L442.385 130.941L444.242 132.963L445.93 135.406L447.28 137.429L448.462 139.619L449.644 141.894L450.825 144.928H465.766H468.298L471.421 145.096L474.207 145.518L477.077 146.192L479.862 147.371L482.394 148.635L484.673 149.899L487.037 151.5L488.978 153.101L491.004 154.786L492.861 156.472L494.465 158.241L496.069 160.263L497.672 162.707L499.023 164.898L500.373 167.51L501.555 169.869L502.653 172.818L503.497 175.852L504.256 178.801L505.1 182.677V199.192L506.451 199.782L508.392 201.046L510.249 202.9L512.444 205.512L514.807 209.051L516.242 212.253L517.086 215.707V223.459Z" fill="url(#paint4_linear)"/>
                    <path d="M1363.84 428.42C1363.84 400.427 1341.27 334 1313.42 334C1285.58 334 1263 400.427 1263 428.42C1263 435.077 1264.3 441.67 1266.84 447.821C1269.37 453.973 1273.08 459.562 1277.76 464.27C1282.45 468.978 1288.01 472.713 1294.12 475.261C1300.24 477.809 1306.8 479.121 1313.42 479.121C1320.04 479.121 1326.6 477.809 1332.72 475.261C1338.84 472.713 1344.39 468.978 1349.08 464.27C1353.76 459.562 1357.47 453.973 1360 447.821C1362.54 441.67 1363.84 435.077 1363.84 428.42V428.42Z" fill="#C4C4C4"/>
                    <path d="M1363.84 428.42C1363.84 400.427 1341.27 334 1313.42 334C1285.58 334 1263 400.427 1263 428.42C1263 435.077 1264.3 441.67 1266.84 447.821C1269.37 453.973 1273.08 459.562 1277.76 464.27C1282.45 468.978 1288.01 472.713 1294.12 475.261C1300.24 477.809 1306.8 479.121 1313.42 479.121C1320.04 479.121 1326.6 477.809 1332.72 475.261C1338.84 472.713 1344.39 468.978 1349.08 464.27C1353.76 459.562 1357.47 453.973 1360 447.821C1362.54 441.67 1363.84 435.077 1363.84 428.42V428.42Z" fill="url(#paint5_linear)"/>
                    <path d="M1313.42 582C1313.6 582 1313.77 581.956 1313.9 581.878C1314.03 581.8 1314.1 581.695 1314.1 581.585V376.657C1314.1 376.547 1314.03 376.441 1313.9 376.363C1313.77 376.285 1313.6 376.242 1313.42 376.242C1313.24 376.242 1313.07 376.285 1312.94 376.363C1312.81 376.441 1312.74 376.547 1312.74 376.657V581.585C1312.74 581.695 1312.81 581.8 1312.94 581.878C1313.07 581.956 1313.24 582 1313.42 582Z" fill="#1D1301"/>
                    <path d="M1313.16 410.308C1313.22 410.308 1313.27 410.297 1313.32 410.276C1313.37 410.254 1313.42 410.223 1313.46 410.184L1333.74 389.904C1333.82 389.825 1333.86 389.718 1333.86 389.607C1333.86 389.496 1333.82 389.389 1333.74 389.31C1333.66 389.231 1333.55 389.187 1333.44 389.187C1333.33 389.186 1333.22 389.23 1333.14 389.308L1312.86 409.588C1312.8 409.647 1312.76 409.722 1312.75 409.804C1312.73 409.886 1312.74 409.971 1312.77 410.048C1312.8 410.125 1312.86 410.19 1312.93 410.237C1313 410.283 1313.08 410.308 1313.16 410.308V410.308Z" fill="#1C1401"/>
                    <path d="M1313.68 445.055C1313.76 445.055 1313.85 445.03 1313.91 444.984C1313.98 444.938 1314.04 444.872 1314.07 444.795C1314.1 444.718 1314.11 444.634 1314.09 444.552C1314.08 444.471 1314.04 444.396 1313.98 444.337L1280.07 410.429C1279.99 410.351 1279.88 410.307 1279.77 410.308C1279.66 410.308 1279.56 410.352 1279.48 410.431C1279.4 410.509 1279.35 410.616 1279.35 410.727C1279.35 410.838 1279.4 410.945 1279.48 411.024L1313.38 444.932C1313.42 444.971 1313.47 445.002 1313.52 445.023C1313.57 445.044 1313.63 445.055 1313.68 445.055V445.055Z" fill="#1C1401"/>
                    <path d="M499.275 368.058C499.275 349.659 484.439 306 466.137 306C447.836 306 433 349.659 433 368.058C432.999 372.434 433.855 376.767 435.52 380.81C437.184 384.853 439.625 388.527 442.702 391.621C445.78 394.716 449.433 397.17 453.454 398.845C457.475 400.52 461.785 401.382 466.137 401.382C470.49 401.382 474.8 400.52 478.821 398.845C482.842 397.17 486.495 394.716 489.572 391.621C492.65 388.527 495.09 384.853 496.755 380.81C498.42 376.767 499.276 372.434 499.275 368.058V368.058Z" fill="#C4C4C4"/>
                    <path d="M499.275 368.058C499.275 349.659 484.439 306 466.137 306C447.836 306 433 349.659 433 368.058C432.999 372.434 433.855 376.767 435.52 380.81C437.184 384.853 439.625 388.527 442.702 391.621C445.78 394.716 449.433 397.17 453.454 398.845C457.475 400.52 461.785 401.382 466.137 401.382C470.49 401.382 474.8 400.52 478.821 398.845C482.842 397.17 486.495 394.716 489.572 391.621C492.65 388.527 495.09 384.853 496.755 380.81C498.42 376.767 499.276 372.434 499.275 368.058V368.058Z" fill="url(#paint6_linear)"/>
                    <path d="M466.137 469C466.256 469 466.37 468.971 466.454 468.92C466.538 468.869 466.585 468.799 466.585 468.727V334.037C466.585 333.964 466.538 333.895 466.454 333.844C466.37 333.793 466.256 333.764 466.137 333.764C466.018 333.764 465.905 333.793 465.821 333.844C465.737 333.895 465.689 333.964 465.689 334.037V468.727C465.689 468.799 465.737 468.869 465.821 468.92C465.905 468.971 466.018 469 466.137 469Z" fill="#1D1301"/>
                    <path d="M465.966 356.154C466.003 356.154 466.039 356.147 466.072 356.133C466.106 356.119 466.136 356.098 466.162 356.073L479.491 342.744C479.543 342.692 479.572 342.621 479.571 342.548C479.571 342.475 479.542 342.405 479.49 342.353C479.438 342.301 479.368 342.272 479.295 342.272C479.222 342.272 479.152 342.301 479.1 342.352L465.771 355.681C465.732 355.72 465.705 355.769 465.695 355.823C465.684 355.877 465.69 355.932 465.711 355.983C465.731 356.033 465.767 356.077 465.813 356.107C465.858 356.138 465.912 356.154 465.966 356.154V356.154Z" fill="#1C1401"/>
                    <path d="M466.309 378.992C466.363 378.992 466.417 378.975 466.462 378.945C466.508 378.915 466.543 378.872 466.564 378.821C466.585 378.771 466.59 378.715 466.58 378.661C466.569 378.608 466.543 378.558 466.504 378.52L444.218 356.233C444.166 356.182 444.096 356.154 444.023 356.154C443.95 356.154 443.88 356.183 443.828 356.235C443.776 356.286 443.747 356.356 443.747 356.429C443.747 356.502 443.775 356.572 443.827 356.624L466.113 378.911C466.139 378.936 466.169 378.957 466.203 378.971C466.236 378.985 466.272 378.992 466.309 378.992V378.992Z" fill="#1C1401"/>
                    <path d="M1102.84 419.684C1102.84 379.754 1070.64 285 1030.92 285C991.2 285 959.001 379.754 959.001 419.684C958.998 429.181 960.856 438.585 964.469 447.359C968.082 456.133 973.379 464.106 980.058 470.822C986.736 477.538 994.665 482.866 1003.39 486.5C1012.12 490.135 1021.47 492.006 1030.92 492.006C1040.36 492.006 1049.72 490.135 1058.45 486.5C1067.17 482.866 1075.1 477.538 1081.78 470.822C1088.46 464.106 1093.75 456.133 1097.37 447.359C1100.98 438.585 1102.84 429.181 1102.84 419.684V419.684Z" fill="#C4C4C4"/>
                    <path d="M1102.84 419.684C1102.84 379.754 1070.64 285 1030.92 285C991.2 285 959.001 379.754 959.001 419.684C958.998 429.181 960.856 438.585 964.469 447.359C968.082 456.133 973.379 464.106 980.058 470.822C986.736 477.538 994.665 482.866 1003.39 486.5C1012.12 490.135 1021.47 492.006 1030.92 492.006C1040.36 492.006 1049.72 490.135 1058.45 486.5C1067.17 482.866 1075.1 477.538 1081.78 470.822C1088.46 464.106 1093.75 456.133 1097.37 447.359C1100.98 438.585 1102.84 429.181 1102.84 419.684V419.684Z" fill="url(#paint7_linear)"/>
                    <path d="M1030.92 638.757C1031.18 638.757 1031.42 638.694 1031.61 638.583C1031.79 638.472 1031.89 638.321 1031.89 638.164V345.848C1031.89 345.691 1031.79 345.54 1031.61 345.429C1031.42 345.318 1031.18 345.255 1030.92 345.255C1030.66 345.255 1030.41 345.318 1030.23 345.429C1030.05 345.54 1029.95 345.691 1029.95 345.848V638.164C1029.95 638.321 1030.05 638.472 1030.23 638.583C1030.41 638.694 1030.66 638.757 1030.92 638.757Z" fill="#1D1301"/>
                    <path d="M1030.55 393.848C1030.63 393.848 1030.71 393.833 1030.78 393.803C1030.85 393.772 1030.92 393.728 1030.97 393.672L1059.9 364.744C1060.01 364.631 1060.08 364.479 1060.07 364.32C1060.07 364.161 1060.01 364.009 1059.9 363.897C1059.79 363.784 1059.63 363.721 1059.48 363.721C1059.32 363.72 1059.16 363.783 1059.05 363.894L1030.12 392.822C1030.04 392.906 1029.98 393.013 1029.96 393.13C1029.94 393.247 1029.95 393.367 1029.99 393.477C1030.04 393.587 1030.12 393.681 1030.21 393.747C1030.31 393.813 1030.43 393.848 1030.55 393.848V393.848Z" fill="#1C1401"/>
                    <path d="M1031.29 443.413C1031.41 443.413 1031.52 443.378 1031.62 443.312C1031.72 443.246 1031.8 443.152 1031.84 443.043C1031.89 442.933 1031.9 442.812 1031.88 442.696C1031.86 442.58 1031.8 442.473 1031.71 442.389L983.347 394.021C983.234 393.91 983.082 393.848 982.923 393.848C982.765 393.849 982.613 393.912 982.501 394.024C982.389 394.136 982.326 394.288 982.325 394.446C982.325 394.605 982.387 394.757 982.498 394.87L1030.87 443.237C1030.92 443.293 1030.99 443.337 1031.06 443.368C1031.13 443.398 1031.21 443.413 1031.29 443.413V443.413Z" fill="#1C1401"/>
                    <path d="M322.835 385.712C322.835 337.175 283.697 222 235.418 222C187.138 222 148 337.175 148 385.712C147.997 397.255 150.255 408.686 154.647 419.351C159.039 430.017 165.477 439.708 173.595 447.871C181.713 456.035 191.351 462.511 201.959 466.929C212.566 471.347 223.936 473.621 235.418 473.621C246.9 473.621 258.269 471.347 268.877 466.929C279.484 462.511 289.122 456.035 297.24 447.871C305.358 439.708 311.796 430.017 316.188 419.351C320.58 408.686 322.838 397.255 322.835 385.712V385.712Z" fill="#C4C4C4"/>
                    <path d="M322.835 385.712C322.835 337.175 283.697 222 235.418 222C187.138 222 148 337.175 148 385.712C147.997 397.255 150.255 408.686 154.647 419.351C159.039 430.017 165.477 439.708 173.595 447.871C181.713 456.035 191.351 462.511 201.959 466.929C212.566 471.347 223.936 473.621 235.418 473.621C246.9 473.621 258.269 471.347 268.877 466.929C279.484 462.511 289.122 456.035 297.24 447.871C305.358 439.708 311.796 430.017 316.188 419.351C320.58 408.686 322.838 397.255 322.835 385.712V385.712Z" fill="url(#paint8_linear)"/>
                    <path d="M235.419 652C235.732 652 236.032 651.924 236.254 651.789C236.476 651.654 236.6 651.471 236.6 651.28V295.962C236.6 295.771 236.476 295.588 236.254 295.453C236.032 295.318 235.732 295.242 235.419 295.242C235.105 295.242 234.805 295.318 234.583 295.453C234.362 295.588 234.237 295.771 234.237 295.962V651.28C234.237 651.471 234.362 651.654 234.583 651.789C234.805 651.924 235.105 652 235.419 652Z" fill="#1D1301"/>
                    <path d="M234.968 354.308C235.064 354.308 235.159 354.289 235.247 354.252C235.336 354.215 235.417 354.162 235.484 354.094L270.647 318.931C270.783 318.794 270.859 318.608 270.858 318.415C270.858 318.222 270.781 318.037 270.644 317.901C270.508 317.764 270.323 317.687 270.13 317.687C269.937 317.686 269.751 317.762 269.614 317.898L234.451 353.061C234.349 353.163 234.279 353.293 234.251 353.435C234.223 353.576 234.238 353.723 234.293 353.857C234.348 353.99 234.442 354.104 234.562 354.184C234.682 354.265 234.823 354.308 234.968 354.308V354.308Z" fill="#1C1401"/>
                    <path d="M235.869 414.555C236.014 414.555 236.155 414.512 236.275 414.432C236.395 414.352 236.488 414.238 236.543 414.105C236.598 413.972 236.613 413.825 236.585 413.683C236.557 413.542 236.487 413.412 236.385 413.31L177.593 354.518C177.456 354.383 177.271 354.307 177.078 354.308C176.886 354.308 176.701 354.385 176.565 354.521C176.429 354.657 176.352 354.842 176.352 355.035C176.351 355.227 176.426 355.412 176.562 355.549L235.354 414.341C235.421 414.409 235.502 414.463 235.59 414.5C235.679 414.536 235.774 414.555 235.869 414.555V414.555Z" fill="#1C1401"/>
                    <circle cx="1216.5" cy="71.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="744.5" cy="85.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="941.5" cy="52.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="1069.5" cy="96.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="1036.5" cy="18.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="907.5" cy="97.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="1133.5" cy="48.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="1396.5" cy="29.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="1346.5" cy="84.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="833.5" cy="17.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="609.5" cy="107.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="685.5" cy="56.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="455.5" cy="89.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="428.5" cy="23.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="561.5" cy="56.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="327.5" cy="94.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="507.5" cy="38.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="134.5" cy="82.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="173.5" cy="16.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="317.5" cy="15.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="60.5" cy="38.5" r="0.5" fill="#EDFF1B"/>
                    <circle cx="266.5" cy="46.5" r="0.5" fill="#EDFF1B"/>
                    <defs>
                        <linearGradient id="paint0_linear" x1="720.5" y1="-45.8015" x2="720.5" y2="672.559" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#659999"/>
                            <stop offset="1" stopColor="#D23200" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear" x1="720" y1="426" x2="720" y2="664" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#808177"/>
                            <stop offset="1" stopColor="#BBC08B"/>
                        </linearGradient>
                        <linearGradient id="paint2_linear" x1="1097.81" y1="146.859" x2="1097.81" y2="263.223" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#D8CACA"/>
                            <stop offset="1" stopColor="#FAF8F8" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="paint3_linear" x1="697.044" y1="238.218" x2="628.465" y2="560.205" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#7F7FD5"/>
                            <stop offset="0.484375" stopColor="#BDBDE9" stopOpacity="0.515625"/>
                            <stop offset="0.484475" stopColor="#86A8E7"/>
                            <stop offset="1" stopColor="#71D8D1"/>
                        </linearGradient>
                        <linearGradient id="paint4_linear" x1="372.789" y1="107.095" x2="372.789" y2="223.459" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#D8CACA"/>
                            <stop offset="1" stopColor="#FAF8F8" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="paint5_linear" x1="1313.42" y1="334" x2="1313.42" y2="596.308" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#538F2E"/>
                            <stop offset="1" stopColor="#0A1603"/>
                        </linearGradient>
                        <linearGradient id="paint6_linear" x1="466.137" y1="306" x2="466.137" y2="478.404" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#538F2E"/>
                            <stop offset="1" stopColor="#0A1603"/>
                        </linearGradient>
                        <linearGradient id="paint7_linear" x1="1030.92" y1="285" x2="1030.92" y2="659.166" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#538F2E"/>
                            <stop offset="1" stopColor="#0A1603"/>
                        </linearGradient>
                        <linearGradient id="paint8_linear" x1="235.418" y1="222" x2="235.418" y2="676.808" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#538F2E"/>
                            <stop offset="1" stopColor="#0A1603"/>
                        </linearGradient>
                    </defs>
                </svg>

            </div>
        </>)
    }
}

export default Top;