// CandlestickChart.tsx

type CandleData = {
  left: string;
  top: string;
  scale: number;
  opacity: number;
  rectY: number;
  rectHeight: number;
  lineY1: number;
  lineY2: number;
};

const staticCandlestickData: CandleData[] = [
  { left: "2.4236249542749464%", top: "2.636460861822929%", scale: 0.9663815912398415, opacity: 0.08697149696027864, rectY: 37, rectHeight: 24, lineY1: 13, lineY2: 60 },
  { left: "26.366268834580826%", top: "2.4324129389052764%", scale: 1.9066316037114301, opacity: 0.05732043187577414, rectY: 25, rectHeight: 28, lineY1: 18, lineY2: 60 },
  { left: "53.83019470536358%", top: "2.035980128376228%", scale: 1.9412240188705212, opacity: 0.09762412975796605, rectY: 36, rectHeight: 35, lineY1: 16, lineY2: 66 },
  { left: "77.76026120850254%", top: "1.5297133604477064%", scale: 1.725995414265792, opacity: 0.048468018908155844, rectY: 19, rectHeight: 41, lineY1: 15, lineY2: 63 },
  { left: "2.534257563290545%", top: "17.619722909695934%", scale: 1.4222340214258322, opacity: 0.068316814198941, rectY: 30, rectHeight: 30, lineY1: 15, lineY2: 53 },
  { left: "27.713654681579367%", top: "19.56933163789431%", scale: 0.9194365600953593, opacity: 0.08692151413934539, rectY: 24, rectHeight: 32, lineY1: 10, lineY2: 62 },
  { left: "50.4537245745969%", top: "15.608126896537842%", scale: 1.2323420489197603, opacity: 0.0642892211229244, rectY: 25, rectHeight: 21, lineY1: 8, lineY2: 66 },
  { left: "78.1785138371567%", top: "16.9125915325631%", scale: 1.2674290969222874, opacity: 0.04784129184614837, rectY: 23, rectHeight: 18, lineY1: 18, lineY2: 59 },
  { left: "1.6373585698754367%", top: "31.829490905487667%", scale: 1.2046148738881195, opacity: 0.07400904809038844, rectY: 27, rectHeight: 15, lineY1: 19, lineY2: 53 },
  { left: "27.85254086196756%", top: "34.151259810554606%", scale: 1.8323300602195287, opacity: 0.04401644715956643, rectY: 23, rectHeight: 32, lineY1: 10, lineY2: 57 },
  { left: "52.96718473029624%", top: "33.119651287260574%", scale: 1.5643261704147309, opacity: 0.09100733849118614, rectY: 32, rectHeight: 16, lineY1: 15, lineY2: 62 },
  { left: "75.26433826093479%", top: "32.60489653359741%", scale: 1.7382701721100065, opacity: 0.07029810224134365, rectY: 31, rectHeight: 34, lineY1: 17, lineY2: 53 },
  { left: "0.09805249908423352%", top: "49.23616163058368%", scale: 1.475104330098568, opacity: 0.056516069587499954, rectY: 20, rectHeight: 44, lineY1: 17, lineY2: 55 },
  { left: "25.772044543597417%", top: "48.79150736931708%", scale: 2.0036810957810784, opacity: 0.09036271571263493, rectY: 21, rectHeight: 36, lineY1: 8, lineY2: 63 },
  { left: "50.065635872357866%", top: "49.76657293029673%", scale: 1.8191242504490184, opacity: 0.0854561754106119, rectY: 32, rectHeight: 39, lineY1: 8, lineY2: 58 },
  { left: "79.16104648647925%", top: "45.82370082325776%", scale: 1.9497217838698675, opacity: 0.04041317429738262, rectY: 37, rectHeight: 36, lineY1: 10, lineY2: 63 },
  { left: "2.640613218194355%", top: "63.82195809112589%", scale: 1.4947782366510713, opacity: 0.07090797599140272, rectY: 34, rectHeight: 22, lineY1: 11, lineY2: 57 },
  { left: "29.86549019173292%", top: "63.02763174530138%", scale: 1.4739823001001926, opacity: 0.05819530969920446, rectY: 30, rectHeight: 43, lineY1: 16, lineY2: 61 },
  { left: "52.05099777962812%", top: "62.6622465046932%", scale: 1.2104720075436686, opacity: 0.07811683947680606, rectY: 31, rectHeight: 17, lineY1: 17, lineY2: 63 },
  { left: "78.78458181030135%", top: "61.55839748866009%", scale: 1.415129598186006, opacity: 0.09702082265363081, rectY: 28, rectHeight: 41, lineY1: 13, lineY2: 63 },
  { left: "90.78458181030135%", top: "80.55839748866009%", scale: 1.415129598186006, opacity: 0.09702082265363081, rectY: 28, rectHeight: 41, lineY1: 13, lineY2: 63 },
];

const CandlestickBackground : React.FC = () => {
  return (
    <div className="absolute top-0 w-full h-full overflow-hidden pointer-events-none m-0">
      {staticCandlestickData.map((data, i) => (
        <svg
          key={i}
          className="absolute"
          style={{
            left: data.left,
            top: data.top,
            transform: `scale(${data.scale})`,
            opacity: data.opacity,
          }}
          width="40"
          height="60"
          viewBox="0 0 40 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="black" stroke="black" strokeWidth="1">
            <rect x="18" y={data.rectY} width="4" height={data.rectHeight} />
            <line x1="20" y1={data.lineY1} x2="20" y2={data.lineY2} />
          </g>
        </svg>
      ))}
    </div>
  );
};

export default CandlestickBackground;
