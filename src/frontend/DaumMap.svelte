<script>
  import { onMount } from 'svelte';
  import { thirdPartyContext } from './store';

  const tmapApiKey = 'ab55d596-a04a-4b75-988a-2cc1c77268fb';
  const lat = 36.356869;
  const lng = 127.351463;
  let map;

  $: if ($thirdPartyContext.daumMap.ready) {
    const options = {
      center: new daum.maps.LatLng(lat, lng),
      level: 3,
      draggable: false,
      scrollwheel: false,
    };
    var _map = new daum.maps.Map(map, options);
    var marker = new daum.maps.Marker({
      position: new daum.maps.LatLng(lat, lng),
    });
    marker.setMap(_map);
  }

  const handleKakaoNavi = () => {
    Kakao.Navi.start({
      name: '유성컨벤션웨딩',
      x: lng,
      y: lat,
      coordType: 'wgs84',
    });
  };

  const handleTmap = () => {
    window.open(`https://api2.sktelecom.com/tmap/app/routes?appKey=${tmapApiKey}
    &name=유성컨벤션센터&lon=${lng}&lat=${lat}`);
  };
</script>

<style lang="scss">
  .contact-wrap {
    padding: 42px 20px;
  }

  .map {
    width: 100%;
    height: 300px;
  }

  .map-title {
    vertical-align: middle;
    font-size: 20px;
    font-weight: bold;
    line-height: 2;
    margin-top: 10px;
    &-first {
      margin-top: 0;
    }
  }

  .map-icon {
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    margin-right: 5px;
    background-size: 100%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }

  .ic {
    &-car {
      background-image: url('/assets/images/ic-car.png');
    }
    &-train {
      background-image: url('/assets/images/ic-train.png');
    }
    &-exprbus {
      background-image: url('/assets/images/ic-exprbus.png');
    }
    &-bus {
      background-image: url('/assets/images/ic-bus.png');
    }
    &-subway {
      background-image: url('/assets/images/ic-subway.png');
    }
    &-parking {
      background-image: url('/assets/images/ic-parking.png');
    }
    &-guitar {
      background-image: url('/assets/images/ic-guitar.png');
    }
  }

  .map-list {
    font-size: 18px;
    line-height: 1.5;
  }

  .location-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;

    .info-hall {
      font-size: 20px;
      line-height: 1.5;
      > a {
        text-decoration: underline;
      }
    }

    .navi-wrap {
      display: flex;

      .tmap {
        width: 40px;
        height: 40px;
        cursor: pointer;
        margin-right: 15px;
      }

      .kakaonavi {
        width: 40px;
        height: 40px;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 411px) {
    .map-title {
      font-size: 15px;
    }

    .map-list {
      font-size: 15px;
    }

    .location-wrap {
      .info-hall {
        font-size: 15px;
      }
    }
  }
</style>

<div id="id-map" class="section">
  <div class="grid">
    <div class="contact-wrap">
      <p class="sub-title align-center">오시는 길</p>

      <div class="map" bind:this={map} />

      <div class="location-wrap">
        <p class="info-hall align-left">
          <strong>유성컨벤션웨딩 2층 팰리스홀</strong>
          <br />
          대전 유성구 봉명동 692-4
          <br />
          <a href="tel:042-825-7070">042-825-7070</a>
        </p>
        <div class="navi-wrap">
          <div class="tmap" on:click={handleTmap}>
            <img src="/assets/images/ic-tmap.png" alt="tmap" />
          </div>
          <div class="kakaonavi" on:click={handleKakaoNavi}>
            <img src="/assets/images/ic-kakaonavi.png" alt="kakaonavi" />
          </div>
        </div>
      </div>

      <ul>
        <li class="map-title map-title-first">
          <i class="map-icon ic-car" />
          자가용안내
        </li>
        <li class="map-list">
          - 유성 IC > 홈플러스 유성점 > 만년교방향(약 3.7km)
        </li>
        <li class="map-title">
          <i class="map-icon ic-train" />
          기차안내
        </li>
        <li class="map-list">
          - 대전역 : 지하철 1호선 이용 또는 택시 (약 20분 소요)
        </li>
        <li class="map-list">
          - 서대전역 : 지하철 1호선 (서대전 네거리역)이용 또는 택시(약 20분
          소요)
        </li>
        <li class="map-title">
          <i class="map-icon ic-exprbus" />
          버스안내
        </li>
        <li class="map-list">
          - 대전복합터미널에서 버스 102번, 106번 승차 후 홈플러스 유성점에서
          하차
        </li>
        <li class="map-list">
          - 유성(금호)고속버스터미널에서 버스 102번 승차 후 홈플러스 유성점에서
          하차
        </li>
        <li class="map-title">
          <i class="map-icon ic-bus" />
          시내버스안내
        </li>
        <li class="map-list">
          - 102, 106, 108, 706, 113번 홈플러스 유성점에서 하차
        </li>
        <li class="map-title">
          <i class="map-icon ic-subway" />
          지하철안내
        </li>
        <li class="map-list">
          - 1호선 갑천역 하차, 3번 출구 돌다리 건너편 7분거리
        </li>
        <li class="map-list">
          - 또는 유성온천역 8번출구 이용시 도보 20분 거리
        </li>
        <li class="map-title">
          <i class="map-icon ic-parking" />
          주차안내
        </li>
        <li class="map-list">- 안내요원의 안내에 따라 주차</li>
        <li class="map-title">
          <i class="map-icon ic-guitar" />
          기타안내
        </li>
        <li class="map-list">- 식사 시간은 오후 1시부터 4시까지 입니다.</li>
      </ul>
    </div>
  </div>
</div>
