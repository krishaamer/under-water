type District = {
  id: string;
  name: string;
  d: string;
  climateImpact: number; // Climate impact level (0 - 1, where 1 is the most severe)
};

export const districts: District[] = [
  {
    id: "phra_nakhon",
    name: "Phra Nakhon",
    d: "M250,200 L260,190 L270,200 L260,210 Z",
    climateImpact: 0.2,
  },
  {
    id: "dusit",
    name: "Dusit",
    d: "M240,180 L270,180 L270,210 L240,210 Z",
    climateImpact: 0.4,
  },
  {
    id: "nong_chok",
    name: "Nong Chok",
    d: "M400,60 L460,60 L460,120 L400,120 Z",
    climateImpact: 0.8,
  },
  {
    id: "bang_kapi",
    name: "Bang Kapi",
    d: "M340,220 L380,220 L380,260 L340,260 Z",
    climateImpact: 0.6,
  },
  {
    id: "pathumwan",
    name: "Pathumwan",
    d: "M270,210 L300,210 L300,240 L270,240 Z",
    climateImpact: 0.1,
  },
  {
    id: "bang_khen",
    name: "Bang Khen",
    d: "M270,120 L310,120 L310,160 L270,160 Z",
    climateImpact: 0.3,
  },
  {
    id: "chatuchak",
    name: "Chatuchak",
    d: "M240,160 L280,160 L280,200 L240,200 Z",
    climateImpact: 0.7,
  },
  {
    id: "bang_sue",
    name: "Bang Sue",
    d: "M220,180 L240,180 L240,200 L220,200 Z",
    climateImpact: 0.5,
  },
  {
    id: "phaya_thai",
    name: "Phaya Thai",
    d: "M280,200 L300,200 L300,220 L280,220 Z",
    climateImpact: 0.9,
  },
  {
    id: "din_daeng",
    name: "Din Daeng",
    d: "M300,220 L320,220 L320,240 L300,240 Z",
    climateImpact: 0.3,
  },
  {
    id: "huai_khwang",
    name: "Huai Khwang",
    d: "M320,200 L350,200 L350,230 L320,230 Z",
    climateImpact: 0.8,
  },
  {
    id: "ratchathewi",
    name: "Ratchathewi",
    d: "M260,220 L280,220 L280,240 L260,240 Z",
    climateImpact: 0.5,
  },
  {
    id: "khlong_toei",
    name: "Khlong Toei",
    d: "M300,260 L330,260 L330,290 L300,290 Z",
    climateImpact: 0.4,
  },
  {
    id: "sathon",
    name: "Sathon",
    d: "M270,250 L300,250 L300,270 L270,270 Z",
    climateImpact: 0.6,
  },
  {
    id: "bang_rak",
    name: "Bang Rak",
    d: "M280,240 L300,240 L300,260 L280,260 Z",
    climateImpact: 0.7,
  },
  {
    id: "bangkok_noi",
    name: "Bangkok Noi",
    d: "M220,220 L240,220 L240,240 L220,240 Z",
    climateImpact: 0.2,
  },
  {
    id: "bangkok_yai",
    name: "Bangkok Yai",
    d: "M210,230 L230,230 L230,250 L210,250 Z",
    climateImpact: 0.9,
  },
  {
    id: "thon_buri",
    name: "Thon Buri",
    d: "M200,240 L220,240 L220,260 L200,260 Z",
    climateImpact: 0.1,
  },
];
