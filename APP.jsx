import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  Bookmark, 
  PlusCircle, 
  VolumeX, 
  Flame, 
  Zap, 
  Dog, 
  Droplet, 
  ShieldCheck, 
  X, 
  ChevronRight, 
  Compass, 
  Trash2,
  TreePine,
  Map as MapIcon
} from 'lucide-react';

// Sample Data for Quiet Car Camping Spots in Korea
const INITIAL_SPOTS = [
  {
    id: 'spot-1',
    name: '평창 순개울 숲속 노지',
    region: '강원',
    subRegion: '평창군',
    address: '강원특별자치도 평창군 대관령면 숲길 45',
    category: '숲속',
    quietScore: 4.9,
    noiseLevel: '아주 조용함 (밤 9시 이후 정적)',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    tags: ['화장실', '계곡', '반려견동반', '불멍가능'],
    hasToilet: true,
    toiletCleanliness: '양호 (도보 3분)',
    hasElectricity: false,
    hasWater: true,
    petFriendly: true,
    fireAllowed: true,
    viewCount: 1420,
    bookmarkCount: 389,
    description: '울창한 잣나무 숲에 둘러싸인 조용한 노지 차박지입니다. 인근에 작은 계곡이 있어 물소리를 들으며 힐링할 수 있는 최고의 아지트입니다.',
    rules: [
      '모든 쓰레기는 종량제 봉투에 담아 가져가기',
      '밤 10시 이후 매너 타임 준수 (음악/큰 소리 금지)',
      '지정된 화로대 사용 필수 (바닥 불 피우기 절대 금지)'
    ],
    reviews: [
      { id: 1, user: '캠핑조아', rating: 5, text: '진짜 새소리와 바람 소리만 납니다. 조용히 힐링하기 최고의 장소!' },
      { id: 2, user: '차박러99', rating: 5, text: '화장실도 가까운 편이고 주차 공간도 여유로워요.' }
    ]
  },
  {
    id: 'spot-2',
    name: '태안 안면도 은하수 해변 노지',
    region: '충청남도',
    subRegion: '태안군',
    address: '충청남도 태안군 안면읍 해안관광로 112',
    category: '바다',
    quietScore: 4.7,
    noiseLevel: '조용함 (파도 소리가 소음을 덮어줌)',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    tags: ['화장실', '노을명소', '전기사용가능', '불멍가능'],
    hasToilet: true,
    toiletCleanliness: '매우 깨끗함 (관리형 공중화장실)',
    hasElectricity: true,
    hasWater: true,
    petFriendly: true,
    fireAllowed: true,
    viewCount: 2150,
    bookmarkCount: 512,
    description: '서해의 붉은 노을과 밤하늘의 은하수를 관람할 수 있는 호젓한 차박지입니다. 평일에는 인적이 매우 드물어 조용합니다.',
    rules: [
      '해변 가로등 구역 내 장기 박영 금지',
      '폭죽 사용 절대 금지',
      '클린 차박 후 주변 쓰레기 3개 줍기 운동 동참'
    ],
    reviews: [
      { id: 1, user: '별빛캠퍼', rating: 5, text: '일몰이 너무 아름답고 해 떨어지면 조용해집니다.' }
    ]
  },
  {
    id: 'spot-3',
    name: '포천 산정호수 안쪽 차박 스팟',
    region: '경기',
    subRegion: '포천시',
    address: '경기도 포천시 영북면 산정호수로 320',
    category: '호수/강',
    quietScore: 4.5,
    noiseLevel: '보통 (주말 낮엔 방문객 있음, 밤엔 정숙)',
    image: 'https://images.unsplash.com/photo-1476514525535-ce74f45814d0?auto=format&fit=crop&w=800&q=80',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    tags: ['화장실', '개수대', '반려견동반'],
    hasToilet: true,
    toiletCleanliness: '보통',
    hasElectricity: false,
    hasWater: true,
    petFriendly: true,
    fireAllowed: false,
    viewCount: 980,
    bookmarkCount: 210,
    description: '산정호수 안쪽에 위치한 한적한 주차공간 스팟입니다. 산자락 바람과 맑은 공기가 느껴지는 곳입니다.',
    rules: [
      '산불 예방을 위해 취사 및 불멍 금지 (가스버너 사용 가능)',
      '야간 고성방가 금지'
    ],
    reviews: [
      { id: 1, user: '포천주민', rating: 4, text: '불멍은 안되지만 주차하기 편하고 호수 산책로가 정말 좋아요.' }
    ]
  },
  {
    id: 'spot-4',
    name: '진안 용담호 수변공원 노지',
    region: '전라북도',
    subRegion: '진안군',
    address: '전북특별자치도 진안군 안천면 용담호수로 88',
    category: '호수/강',
    quietScore: 4.9,
    noiseLevel: '아주 조용함 (물안개가 운치있는 한적한 곳)',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    tags: ['화장실', '물안개', '반려견동반', '불멍가능'],
    hasToilet: true,
    toiletCleanliness: '양호',
    hasElectricity: false,
    hasWater: false,
    petFriendly: true,
    fireAllowed: true,
    viewCount: 1890,
    bookmarkCount: 430,
    description: '아침 일찍 피어오르는 물안개가 절경인 용담호변 차박지입니다. 조용한 스팟을 찾는 차박러들에게 알려진 보석 같은 곳입니다.',
    rules: [
      '수질 오염 방지를 위해 세제 사용 자제',
      '쓰레기 필히 회수'
    ],
    reviews: [
      { id: 1, user: '감성캠퍼', rating: 5, text: '새벽 물안개가 미쳤습니다... 진짜 아무도 없고 힐링 그 자체' }
    ]
  },
  {
    id: 'spot-5',
    name: '울진 불영계곡 한적한 자갈밭',
    region: '경상북도',
    subRegion: '울진군',
    address: '경상북도 울진군 금강송면 불영계곡로 450',
    category: '계곡',
    quietScore: 4.8,
    noiseLevel: '아주 조용함 (물소리만 은은하게 들림)',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    tags: ['계곡', '클린존', '불멍가능'],
    hasToilet: false,
    toiletCleanliness: '화장실 없음 (간이화장실 준비 추천)',
    hasElectricity: false,
    hasWater: true,
    petFriendly: true,
    fireAllowed: true,
    viewCount: 1120,
    bookmarkCount: 295,
    description: '울진의 맑은 계곡물이 흐르는 자갈밭 차박지입니다. 화장실은 없지만 그만큼 오염되지 않고 사람의 발길이 적어 매우 조용합니다.',
    rules: [
      '화장실이 없으므로 이동식 변기 사용 필수',
      '자연 훼손 금지, 잔불 확인 필수'
    ],
    reviews: [
      { id: 1, user: '자연주의자', rating: 5, text: '화장실 없는게 아쉽지만 조용함 하나만큼은 전국 최상위권입니다.' }
    ]
  },
  {
    id: 'spot-6',
    name: '제주 수월봉 해안도로 오션뷰 스팟',
    region: '제주',
    subRegion: '제주시',
    address: '제주특별자치도 제주시 한경면 고산리 3615',
    category: '바다',
    quietScore: 4.6,
    noiseLevel: '조용함 (해안 파도소리와 바람)',
    image: 'https://images.unsplash.com/photo-1537905569837-0239bd917242?auto=format&fit=crop&w=800&q=80',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    tags: ['화장실', '노을명소', '반려견동반'],
    hasToilet: true,
    toiletCleanliness: '매우 깨끗함',
    hasElectricity: false,
    hasWater: true,
    petFriendly: true,
    fireAllowed: false,
    viewCount: 3100,
    bookmarkCount: 780,
    description: '차 안에서 서해 퐁당 일몰을 감상할 수 있는 제주 차박 성지 중 한 곳입니다. 밤에는 조용하고 파도 소리만 정겹게 들립니다.',
    rules: [
      '제주 클린하우스에 맞춰 쓰레기 분리배출',
      '취사 시 바람주의 (화기 사용 주의)'
    ],
    reviews: [
      { id: 1, user: '제주살이', rating: 5, text: '차 문 열고 누워서 보는 일몰이 예술입니다.' }
    ]
  },
  {
    id: 'spot-7',
    name: '인천 무의도 하나개 해변 노지 스팟',
    region: '바닷가',
    subRegion: '인천 무의도',
    address: '인천광역시 중구 무의동 85',
    category: '바다',
    quietScore: 4.6,
    noiseLevel: '조용함 (밀물 파도소리)',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackBranding.mp4',
    tags: ['화장실', '바닷가', '반려견동반', '불멍가능'],
    hasToilet: true,
    toiletCleanliness: '양호',
    hasElectricity: false,
    hasWater: true,
    petFriendly: true,
    fireAllowed: true,
    viewCount: 1650,
    bookmarkCount: 420,
    description: '수도권에서 접근하기 좋은 호젓한 바닷가 차박지입니다. 갯벌 체험과 서해 바다 감상이 동시에 가능한 장소입니다.',
    rules: [
      '만조 시 해안 접근 주의',
      '쓰레기는 전량 회수 필수'
    ],
    reviews: [
      { id: 1, user: '서해캠퍼', rating: 5, text: '노을 젖은 갯벌 풍경이 인상적인 바닷가 스팟입니다.' }
    ]
  }
];

const REGIONS = ['전국', '바닷가', '강원', '경기', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주'];

const SUB_REGIONS = {
  '전국': ['전체'],
  '바닷가': ['전체', '태안', '강릉', '양양', '여수', '울진', '거제', '인천 무의도', '제주'],
  '경기': ['전체', '포천시', '양평군', '가평군', '연천군', '용인시', '화성시', '남양주시'],
  '강원': ['전체', '평창군', '강릉시', '양양군', '홍천군', '영월군', '인제군', '속초시', '정선군'],
  '충청북도': ['전체', '단양군', '충주시', '제천시', '괴산군', '보은군', '영동군'],
  '충청남도': ['전체', '태안군', '보령시', '부여군', '서산시', '공주시', '금산군'],
  '전라북도': ['전체', '진안군', '무주군', '장수군', '고창군', '부안군', '순창군'],
  '전라남도': ['전체', '구례군', '여수시', '순천시', '고흥군', '신안군', '해남군'],
  '경상북도': ['전체', '울진군', '경주시', '영덕군', '청송군', '문경시', '봉화군'],
  '경상남도': ['전체', '밀양시', '산청군', '거제시', '남해군', '함양군', '통영시'],
  '제주': ['전체', '제주시', '서귀포시']
};

export default function App() {
  const [spots, setSpots] = useState(INITIAL_SPOTS);
  const [selectedRegion, setSelectedRegion] = useState('전국');
  const [selectedSubRegion, setSelectedSubRegion] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('explore'); 
  const [bookmarks, setBookmarks] = useState(['spot-1', 'spot-4']);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState('image'); // 'image' | 'video'

  // New Spot Form State
  const [newSpotData, setNewSpotData] = useState({
    name: '',
    region: '강원',
    subRegion: '',
    address: '',
    description: '',
    hasToilet: true,
    petFriendly: true,
    fireAllowed: true
  });

  // Filter Logic
  const filteredSpots = useMemo(() => {
    return spots.filter((spot) => {
      // 광역 지역 필터
      const matchesRegion =
        selectedRegion === '전국'
          ? true
          : selectedRegion === '바닷가'
          ? spot.region === '바닷가' || spot.category === '바다'
          : spot.region === selectedRegion;

      // 세부 시/군/구 필터
      const matchesSubRegion =
        selectedSubRegion === '전체'
          ? true
          : (spot.subRegion && spot.subRegion.includes(selectedSubRegion)) ||
            (spot.address && spot.address.includes(selectedSubRegion));

      // 검색어 필터
      const matchesSearch =
        searchQuery.trim() === ''
          ? true
          : spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            spot.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            spot.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (spot.subRegion && spot.subRegion.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesRegion && matchesSubRegion && matchesSearch;
    });
  }, [spots, selectedRegion, selectedSubRegion, searchQuery]);

  // Bookmarked Spots
  const bookmarkedSpots = useMemo(() => {
    return spots.filter((s) => bookmarks.includes(s.id));
  }, [spots, bookmarks]);

  // Toggle Bookmark
  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation();
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add New Spot
  const handleCreateSpot = (e) => {
    e.preventDefault();
    const created = {
      id: `spot-${Date.now()}`,
      name: newSpotData.name,
      region: newSpotData.region,
      subRegion: newSpotData.subRegion || '일대',
      address: newSpotData.address,
      category: '숲속',
      quietScore: 5.0,
      noiseLevel: '아주 조용함 (유저 제보)',
      image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      tags: ['유저제보', newSpotData.hasToilet ? '화장실' : '노지'],
      hasToilet: newSpotData.hasToilet,
      toiletCleanliness: newSpotData.hasToilet ? '확인 필요' : '없음',
      hasElectricity: false,
      hasWater: false,
      petFriendly: newSpotData.petFriendly,
      fireAllowed: newSpotData.fireAllowed,
      viewCount: 1,
      bookmarkCount: 0,
      description: newSpotData.description || '유저가 직접 제보한 숨은 차박지입니다.',
      rules: ['매너 타임 준수', '쓰레기 되가져가기'],
      reviews: []
    };

    setSpots([created, ...spots]);
    setIsAddModalOpen(false);
    setSelectedSpot(created);
    setActiveMediaTab('image');
  };

  const openSpotDetail = (spot) => {
    setSelectedSpot(spot);
    setActiveMediaTab('image');
  };

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-stone-900 pb-20">
      {/* Header */}
      <header className="bg-emerald-900 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TreePine className="w-6 h-6 text-emerald-400" />
            <h1 className="text-lg font-bold tracking-tight">고요한 차박지</h1>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>차박지 제보</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 pt-4">
        {/* TAB 1: EXPLORE */}
        {activeTab === 'explore' && (
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="장소명, 시/군/구 (예: 태안, 평창) 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl shadow-sm border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Region Filters (Primary: 시/도) */}
            <div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {REGIONS.map((region) => (
                  <button
                    key={region}
                    onClick={() => {
                      setSelectedRegion(region);
                      setSelectedSubRegion('전체');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedRegion === region
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>

              {/* Sub-Region Filters (Secondary: 시/군/구) */}
              {selectedRegion !== '전국' && SUB_REGIONS[selectedRegion] && (
                <div className="flex items-center gap-1.5 overflow-x-auto py-2 border-t border-stone-200/60 mt-1 scrollbar-none">
                  <span className="text-[11px] font-bold text-stone-400 shrink-0 mr-1">세부 지역:</span>
                  {SUB_REGIONS[selectedRegion].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubRegion(sub)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                        selectedSubRegion === sub
                          ? 'bg-amber-400 text-emerald-950 font-bold shadow-xs'
                          : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Spots Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSpots.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => openSpotDetail(spot)}
                  className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-md border border-stone-200 transition-all cursor-pointer flex flex-col group"
                >
                  {/* Card Thumbnail Area */}
                  <div className="relative h-48 bg-stone-900 overflow-hidden">
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Quiet Score Badge */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-amber-300 flex items-center gap-1">
                      <span>★</span>
                      <span>{spot.quietScore}</span>
                      <span className="text-[10px] text-stone-300 font-normal">고요지수</span>
                    </div>

                    {/* Video Badge Tag */}
                    {spot.video && (
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-lg border border-white/20 flex items-center gap-1">
                        <span>🎬 5초 풍경 동영상</span>
                      </div>
                    )}

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => toggleBookmark(spot.id, e)}
                      className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-stone-700 hover:text-amber-500 transition-colors shadow-xs"
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarks.includes(spot.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                        <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {spot.region} {spot.subRegion ? `• ${spot.subRegion}` : ''}
                        </span>
                        <span>•</span>
                        <span>{spot.category}</span>
                      </div>
                      <h3 className="font-bold text-stone-900 text-base group-hover:text-emerald-800 transition-colors">
                        {spot.name}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                        {spot.description}
                      </p>
                    </div>

                    {/* Tags List */}
                    <div className="flex flex-wrap gap-1 pt-1 border-t border-stone-100">
                      {spot.tags.map((tag, idx) => (
                        <span key={idx} className="bg-stone-100 text-stone-600 text-[11px] px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredSpots.length === 0 && (
              <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 p-6">
                <Compass className="w-12 h-12 text-stone-300 mx-auto mb-2 animate-bounce" />
                <p className="text-stone-600 font-bold text-sm">해당 조건에 일치하는 차박지가 없습니다.</p>
                <p className="text-stone-400 text-xs mt-1">다른 지역을 선택해보시거나 검색어를 바꿔보세요!</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BOOKMARKS */}
        {activeTab === 'bookmarks' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-stone-800 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
              내가 찜한 아지트 ({bookmarkedSpots.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedSpots.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => openSpotDetail(spot)}
                  className="bg-white rounded-3xl overflow-hidden shadow-xs border border-stone-200 flex cursor-pointer"
                >
                  <img src={spot.image} alt={spot.name} className="w-32 h-auto object-cover" />
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                        {spot.region} {spot.subRegion ? `• ${spot.subRegion}` : ''}
                      </span>
                      <h4 className="font-bold text-stone-900 text-sm mt-1">{spot.name}</h4>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">{spot.address}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-stone-400 pt-2">
                      <span>★ {spot.quietScore}</span>
                      <button
                        onClick={(e) => toggleBookmark(spot.id, e)}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1 text-[11px]"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> 삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {bookmarkedSpots.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
                <Bookmark className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                <p className="text-stone-500 text-sm font-semibold">아직 찜한 차박지가 없습니다.</p>
                <p className="text-stone-400 text-xs mt-1">마음에 드는 조용한 아지트를 저장해 보세요!</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MANNERS & RULES */}
        {activeTab === 'manners' && (
          <div className="space-y-4">
            <div className="bg-emerald-900 text-white p-6 rounded-3xl shadow-sm">
              <ShieldCheck className="w-10 h-10 text-amber-400 mb-2" />
              <h2 className="text-xl font-bold">클린 차박 & 고요함 준수 수칙</h2>
              <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
                조용한 차박 스팟이 폐쇄되지 않도록 모든 차박러가 함께 지켜야 할 매너 캠페인입니다.
              </p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 text-amber-800 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">밤 9시 이후 야간 정숙 (매너 타임)</h4>
                  <p className="text-stone-600 mt-0.5">
                    블루투스 스피커 사용을 금지하고, 대화 소리를 낮춰 자연과 다른 차박러에게 피해를 주지 않습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-amber-100 text-amber-800 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">흔적 남기지 않기 (LNT 원칙)</h4>
                  <p className="text-stone-600 mt-0.5">
                    내가 발생시킨 쓰레기는 전량 회수하며, 철수 시 주변 쓰레기 3개 더 줍기 캠페인에 동참합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-amber-100 text-amber-800 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">올바른 불멍 화기 사용</h4>
                  <p className="text-stone-600 mt-0.5">
                    맨땅에 불을 피우지 않고 반드시 불멍 전용 받침대와 화로대를 사용하며, 남은 재는 수거합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              activeTab === 'explore' ? 'text-emerald-800' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span>차박지 탐색</span>
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              activeTab === 'bookmarks' ? 'text-emerald-800' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <Bookmark className="w-5 h-5" />
            <span>찜한 아지트</span>
          </button>

          <button
            onClick={() => setActiveTab('manners')}
            className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              activeTab === 'manners' ? 'text-emerald-800' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span>차박 수칙</span>
          </button>
        </div>
      </nav>

      {/* SPOT DETAIL MODAL */}
      {selectedSpot && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
            {/* Modal Header & Media Display */}
            <div className="relative h-64 bg-stone-900 shrink-0">
              {/* Media Selection Bar */}
              <div className="absolute top-4 left-4 flex gap-1.5 z-20 bg-black/40 p-1 rounded-xl backdrop-blur-md border border-white/20">
                <button
                  onClick={() => setActiveMediaTab('image')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    activeMediaTab === 'image'
                      ? 'bg-white text-emerald-950 shadow-xs'
                      : 'text-stone-200 hover:text-white'
                  }`}
                >
                  📷 현장 사진
                </button>
                {selectedSpot.video && (
                  <button
                    onClick={() => setActiveMediaTab('video')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                      activeMediaTab === 'video'
                        ? 'bg-amber-400 text-emerald-950 font-bold shadow-xs'
                        : 'text-stone-200 hover:text-white'
                    }`}
                  >
                    🎬 5초 동영상
                  </button>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedSpot(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media Content View */}
              {activeMediaTab === 'video' && selectedSpot.video ? (
                <video
                  src={selectedSpot.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                  className="w-full h-full object-cover opacity-90"
                />
              ) : (
                <img 
                  src={selectedSpot.image} 
                  alt={selectedSpot.name} 
                  className="w-full h-full object-cover opacity-90" 
                />
              )}

              {/* Title Header Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                <div>
                  <span className="bg-amber-400 text-emerald-950 text-xs px-2.5 py-1 rounded-md font-bold">
                    {selectedSpot.region} {selectedSpot.subRegion ? `• ${selectedSpot.subRegion}` : ''} • {selectedSpot.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-white mt-1 drop-shadow-md">{selectedSpot.name}</h2>
                </div>
                <button
                  onClick={(e) => toggleBookmark(selectedSpot.id, e)}
                  className="bg-white/90 p-3 rounded-full text-stone-800 hover:text-amber-500 shadow-sm"
                >
                  <Bookmark className={`w-5 h-5 ${bookmarks.includes(selectedSpot.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <VolumeX className="w-4 h-4 text-purple-600" />
                  <span>야간 정숙 수준: {selectedSpot.noiseLevel}</span>
                </div>
                <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  {selectedSpot.address}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">스팟 소개</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{selectedSpot.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-2">편의시설 및 요건</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl flex items-center gap-2.5 border border-stone-100">
                    <Droplet className={`w-4 h-4 ${selectedSpot.hasToilet ? 'text-blue-600' : 'text-stone-300'}`} />
                    <div>
                      <div className="font-semibold text-stone-800">화장실</div>
                      <div className="text-[11px] text-stone-500">{selectedSpot.toiletCleanliness}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl flex items-center gap-2.5 border border-stone-100">
                    <Dog className={`w-4 h-4 ${selectedSpot.petFriendly ? 'text-amber-600' : 'text-stone-300'}`} />
                    <div>
                      <div className="font-semibold text-stone-800">반려견 동반</div>
                      <div className="text-[11px] text-stone-500">{selectedSpot.petFriendly ? '동반 가능' : '불가'}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl flex items-center gap-2.5 border border-stone-100">
                    <Flame className={`w-4 h-4 ${selectedSpot.fireAllowed ? 'text-orange-600' : 'text-stone-300'}`} />
                    <div>
                      <div className="font-semibold text-stone-800">불멍 / 화기</div>
                      <div className="text-[11px] text-stone-500">{selectedSpot.fireAllowed ? '화로대 사용 가능' : '화기 금지'}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl flex items-center gap-2.5 border border-stone-100">
                    <Zap className={`w-4 h-4 ${selectedSpot.hasElectricity ? 'text-yellow-600' : 'text-stone-300'}`} />
                    <div>
                      <div className="font-semibold text-stone-800">전기 사용</div>
                      <div className="text-[11px] text-stone-500">{selectedSpot.hasElectricity ? '전기 가능' : '전기 없음 (노지)'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedSpot.rules && selectedSpot.rules.length > 0 && (
                <div>
                  <h4 className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    이 장소의 클린 수칙
                  </h4>
                  <ul className="bg-emerald-50/60 border border-emerald-900/10 p-3.5 rounded-2xl space-y-1.5 text-xs text-emerald-950">
                    {selectedSpot.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-700 font-bold">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-2">실제 방문객 고요함 후기 ({selectedSpot.reviews.length})</h4>
                <div className="space-y-2">
                  {selectedSpot.reviews.map((rev) => (
                    <div key={rev.id} className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs space-y-1">
                      <div className="flex items-center justify-between font-semibold text-stone-700">
                        <span>{rev.user}</span>
                        <span className="text-amber-500">★ {rev.rating}.0</span>
                      </div>
                      <p className="text-stone-600">{rev.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedSpot(null)}
                className="bg-emerald-900 text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-emerald-800 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW SPOT REPORT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-bold text-stone-900 text-base">숨은 조용한 차박지 제보하기</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSpot} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">장소명</label>
                <input
                  type="text"
                  required
                  placeholder="예: 영월 주천강 노지 차박지"
                  value={newSpotData.name}
                  onChange={(e) => setNewSpotData({ ...newSpotData, name: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 rounded-xl border border-stone-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">광역 지역</label>
                  <select
                    value={newSpotData.region}
                    onChange={(e) => setNewSpotData({ ...newSpotData, region: e.target.value, subRegion: '' })}
                    className="w-full p-2.5 bg-stone-50 rounded-xl border border-stone-200"
                  >
                    {REGIONS.filter(r => r !== '전국').map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">세부 시/군/구</label>
                  <input
                    type="text"
                    placeholder="예: 영월군"
                    value={newSpotData.subRegion}
                    onChange={(e) => setNewSpotData({ ...newSpotData, subRegion: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 rounded-xl border border-stone-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">상세 주소 / 위치 설명</label>
                <input
                  type="text"
                  required
                  placeholder="예: 강원도 영월군 주천면 서강로 120 인근"
                  value={newSpotData.address}
                  onChange={(e) => setNewSpotData({ ...newSpotData, address: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 rounded-xl border border-stone-200"
                />
              </div>

              <div className="flex gap-4 py-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newSpotData.hasToilet}
                    onChange={(e) => setNewSpotData({ ...newSpotData, hasToilet: e.target.checked })}
                  />
                  <span>화장실 있음</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newSpotData.petFriendly}
                    onChange={(e) => setNewSpotData({ ...newSpotData, petFriendly: e.target.checked })}
                  />
                  <span>반려견 가능</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newSpotData.fireAllowed}
                    onChange={(e) => setNewSpotData({ ...newSpotData, fireAllowed: e.target.checked })}
                  />
                  <span>불멍 가능</span>
                </label>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">스팟 소개 및 팁</label>
                <textarea
                  rows={3}
                  placeholder="조용함 정도, 주의사항 등을 적어주세요."
                  value={newSpotData.description}
                  onChange={(e) => setNewSpotData({ ...newSpotData, description: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 rounded-xl border border-stone-200"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-400 font-bold text-emerald-950 hover:bg-amber-300"
                >
                  등록 신청하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}