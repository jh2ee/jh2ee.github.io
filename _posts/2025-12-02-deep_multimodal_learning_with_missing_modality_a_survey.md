---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2WVWTAQ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T230057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIH3vYj7415VER53Udh9Ukv32Py%2FmUgZnnobYn608iTGNAiEA%2FTSfrx7yS7xeAQiqxwSGDZ8F4e71v3%2FCMdwOkuRR808q%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDATMTm6NNUa789X%2FeSrcA3Scnf4D8nFDQMoW9B40SX%2FaBsvDpvT62WG355298pLaZfBsNpXyrgvxRl5GrQtbieOQ2hgx19SeFQzFa409Fonk2ixGYrVSuu%2F%2FebW38mG8Nv1Qb5SzPePZ4Il0yDNxYg2pkjeED49qu40n%2Bcs6SXzKaYp%2BxaNdjov4sZ97L7I03lIaDSwvmBiiNG9se9d5kSx4wvZJzgdp7%2FYiWuWNMFlVAtLAXLXUy9mSVHhTuVp2FgAyNTB0EzyHp52cJt9panLUxQsnMZBJEkVFnrDhU%2BkXFbBi%2FROINZwWqFlG8bs%2B90wgA7cl0zOWiS68uQl6D2kReKPlgNiMwLsiXDlwXGFDMJAGVQGRO3wL9BQVnK%2FMKdWhe88YtV1RxG6EYHEIJSM3OpCGYeiHq6FzuKF%2FLnJ3e8FCCjpoKg4BOikrfWpURsVPRRxEMNkaTNIF%2F7NnQbqZXfrt8b6zhomqJBURpHSAl3Kgtjmf4e10jrIt6EBc%2F09P3I%2FKrkxvMM7ipO4vENNqMVrVmNsV9Cwy71vFVZ1B0mv5Wyu%2Bo4tlt8J9QTfv9yal4AVVRhQ8qZ5O6lisfRYhv6F%2BGngdu80P37xv5Zt1WhdDYIrQf37afQgg13hLFa3ATBviO%2Fgqz0QrMOHRvckGOqUBg0oh9KA%2BOw9FhCUrKqIpYb86SkXq85dnZAqV%2BJrtMIsels40GFQXMdToJaFTzV8rIxdFxVvNb15FrXxCh1MIawUPX8QQrsvGiH8nxQtVJx542M6k21w6%2F8SDOBG0LnG5nV5eL0siBXy1%2BR5zsqk0ou5Sezp0XD6E998twSXPlHSOtzc5yVs%2FwX1Fo2T6UN58QRFoGE9ThjMC6x%2Bd8J3zf4JDQkOR&X-Amz-Signature=b6f38a0241899a2e061c532d3676c7f2972c71a5edc9927cc16ec60debaff461&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2WVWTAQ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T230057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIH3vYj7415VER53Udh9Ukv32Py%2FmUgZnnobYn608iTGNAiEA%2FTSfrx7yS7xeAQiqxwSGDZ8F4e71v3%2FCMdwOkuRR808q%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDATMTm6NNUa789X%2FeSrcA3Scnf4D8nFDQMoW9B40SX%2FaBsvDpvT62WG355298pLaZfBsNpXyrgvxRl5GrQtbieOQ2hgx19SeFQzFa409Fonk2ixGYrVSuu%2F%2FebW38mG8Nv1Qb5SzPePZ4Il0yDNxYg2pkjeED49qu40n%2Bcs6SXzKaYp%2BxaNdjov4sZ97L7I03lIaDSwvmBiiNG9se9d5kSx4wvZJzgdp7%2FYiWuWNMFlVAtLAXLXUy9mSVHhTuVp2FgAyNTB0EzyHp52cJt9panLUxQsnMZBJEkVFnrDhU%2BkXFbBi%2FROINZwWqFlG8bs%2B90wgA7cl0zOWiS68uQl6D2kReKPlgNiMwLsiXDlwXGFDMJAGVQGRO3wL9BQVnK%2FMKdWhe88YtV1RxG6EYHEIJSM3OpCGYeiHq6FzuKF%2FLnJ3e8FCCjpoKg4BOikrfWpURsVPRRxEMNkaTNIF%2F7NnQbqZXfrt8b6zhomqJBURpHSAl3Kgtjmf4e10jrIt6EBc%2F09P3I%2FKrkxvMM7ipO4vENNqMVrVmNsV9Cwy71vFVZ1B0mv5Wyu%2Bo4tlt8J9QTfv9yal4AVVRhQ8qZ5O6lisfRYhv6F%2BGngdu80P37xv5Zt1WhdDYIrQf37afQgg13hLFa3ATBviO%2Fgqz0QrMOHRvckGOqUBg0oh9KA%2BOw9FhCUrKqIpYb86SkXq85dnZAqV%2BJrtMIsels40GFQXMdToJaFTzV8rIxdFxVvNb15FrXxCh1MIawUPX8QQrsvGiH8nxQtVJx542M6k21w6%2F8SDOBG0LnG5nV5eL0siBXy1%2BR5zsqk0ou5Sezp0XD6E998twSXPlHSOtzc5yVs%2FwX1Fo2T6UN58QRFoGE9ThjMC6x%2Bd8J3zf4JDQkOR&X-Amz-Signature=b6f38a0241899a2e061c532d3676c7f2972c71a5edc9927cc16ec60debaff461&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WAU2T3AI%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T230057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQDTLo7WIArRA7Oe6fyww5FZ%2BVF4XQMl5GwgR%2FKWsmytMwIgAyPPsONRYS60buSK9HfUhiDgScnkOeVSdS%2FI2Sg03DYq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDOqNHYNq3SA7%2BNDAOSrcA3vOcVy5Ct5DtVQ4ucS2zvL8aOughcHCiUva5f033ZzJIYPWt%2Fbb2PBvDPD%2F7XRDnLCz1KvAsH2%2F0f%2Bbjd%2F6synHYotdmTsR0hvA%2BvJLRZZS1610pflZTf2VYkTHatOdmEtscAbLfX8fxHYqzIv7kC5ERHRnos9IQ8MDVV1EolEcA5YR2YUUH5jaMH%2BG6ORLzUQMKOcmuZcMJRnIzXN24HZ%2FzBpWbzG107nV5Z2AwnhTTn0lJf7lvARrdzJ71G6%2Be%2FAWRJ75eAj61NGVr35ubch2PIkLjYQKYVPqRKdESUYVP2QopzuzcIQnW3ZZICmZiBq3wsFFZpx88hd4MF7tIoLooi8wE6g%2F4kttG6GcseRxdpHLF01HVtBXy0lH75XyCQuR1xOXePQdRBK1dqYaRK9IAxtgARj%2F9lZcHdMyS5qMANlzxs8YjtU%2BZCGLNH0BPUnuSdPhJGYEtmTuouhfKcD3cYJrowAS9w8QgJmM0wQpYAoL3bJCHQrAy6HkAGAdbUzoLVRMbnCqDGbRHTfIAy8TGr%2BU%2F2WQOJNp4pNTS3m2iS9GpYQRI%2B0Ckrog0AJ5kJBgnDkuRy7MpieW9fta9uCN82DCEd%2BG0JZoW%2BsH9Ne%2BbCgfO1Rrhf8oGHFtMNfWvckGOqUBO186elc1cfT8THFtltfP4CvORZwpWKmOXkgmDYdbBRotVKrq2bS1ZTFt4EEdaNXRk7L48ZuEDeBo3huY37vDhKnru3IRFdbsgtkiUxZg6w9XrDzeNdaeHLP12pjUmSOdNLZtncna0Lytb%2Bq%2FvN8%2B8%2BQM90LOgDnmMUTI5HB9PIaTmM305%2Fr3FvSV4NnYs%2BJism3t2BDbLBeIzoF80msV4rhiovDb&X-Amz-Signature=60b0323654c4897d8c4e56b88b325ef1d392c4f507c1ec052acd565caf7a28b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WAU2T3AI%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T230057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQDTLo7WIArRA7Oe6fyww5FZ%2BVF4XQMl5GwgR%2FKWsmytMwIgAyPPsONRYS60buSK9HfUhiDgScnkOeVSdS%2FI2Sg03DYq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDOqNHYNq3SA7%2BNDAOSrcA3vOcVy5Ct5DtVQ4ucS2zvL8aOughcHCiUva5f033ZzJIYPWt%2Fbb2PBvDPD%2F7XRDnLCz1KvAsH2%2F0f%2Bbjd%2F6synHYotdmTsR0hvA%2BvJLRZZS1610pflZTf2VYkTHatOdmEtscAbLfX8fxHYqzIv7kC5ERHRnos9IQ8MDVV1EolEcA5YR2YUUH5jaMH%2BG6ORLzUQMKOcmuZcMJRnIzXN24HZ%2FzBpWbzG107nV5Z2AwnhTTn0lJf7lvARrdzJ71G6%2Be%2FAWRJ75eAj61NGVr35ubch2PIkLjYQKYVPqRKdESUYVP2QopzuzcIQnW3ZZICmZiBq3wsFFZpx88hd4MF7tIoLooi8wE6g%2F4kttG6GcseRxdpHLF01HVtBXy0lH75XyCQuR1xOXePQdRBK1dqYaRK9IAxtgARj%2F9lZcHdMyS5qMANlzxs8YjtU%2BZCGLNH0BPUnuSdPhJGYEtmTuouhfKcD3cYJrowAS9w8QgJmM0wQpYAoL3bJCHQrAy6HkAGAdbUzoLVRMbnCqDGbRHTfIAy8TGr%2BU%2F2WQOJNp4pNTS3m2iS9GpYQRI%2B0Ckrog0AJ5kJBgnDkuRy7MpieW9fta9uCN82DCEd%2BG0JZoW%2BsH9Ne%2BbCgfO1Rrhf8oGHFtMNfWvckGOqUBO186elc1cfT8THFtltfP4CvORZwpWKmOXkgmDYdbBRotVKrq2bS1ZTFt4EEdaNXRk7L48ZuEDeBo3huY37vDhKnru3IRFdbsgtkiUxZg6w9XrDzeNdaeHLP12pjUmSOdNLZtncna0Lytb%2Bq%2FvN8%2B8%2BQM90LOgDnmMUTI5HB9PIaTmM305%2Fr3FvSV4NnYs%2BJism3t2BDbLBeIzoF80msV4rhiovDb&X-Amz-Signature=60b0323654c4897d8c4e56b88b325ef1d392c4f507c1ec052acd565caf7a28b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMHXYDBR%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T230056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJIMEYCIQDfPBrozpakjGpuvR2e4FdYzxmV%2Fk2L76k2TSxgt3m78QIhAPfczsgf3NkM%2Bc1lo0VFEc4euq0Kbl6O2wI315j4C1jtKv8DCCAQABoMNjM3NDIzMTgzODA1IgxH2lom2dUOrUBuHQMq3ANgO2h2abEte5AJ9bCsfAGE40ETCJgWMbEne4ehIAsiREaxQ6OgMPo6ls7IZqJZoErEDlOIc1X1PsrMxYC9HjPYXm8ASF40%2FFOd1mHvpM3CBrWElb3uxUFnoAWan9BKyGXwcN%2Bb8%2BaDgEzNh9h1hONZ%2BivPE3vRz02LVHjdjhXtuiAGcyAf%2FM27h81ZrAc1EEVBtl3e2WoXj6h1%2FYzxu48HAYFlrZ1T9FUncv%2FuhitvSRHf4VVBEHfv4yiZSvqCM4zbTUEoh8KGH1ZivFTnNjMdAAc1NjczX72V2vdsV96Wwc%2By38SXCqqIvnWzLMWkmqwLdLoKg%2F7gsNuQng90PcpTZ0yGbHDeKM6Udwjex8W3YENt5yzcSLR2XBBvVaIRWXwFIggTrTvw%2F%2BuWNGoQHQQRWg0%2BJx3zrigkAoZkIJ4YGiF4IFR1%2Bh7%2F%2FXN8FmsatrdgsVY1yTZdHE4zVkwjNOes4rwZeEcPAkK9rB%2FrY7ogHTp7AICTx8f5u3MyDal5QxrRVZkEiqKYxqJpxTd1s4%2BM6plF%2BoxK36toc4bTeCVKaB6OxvvCZcLV8aD9glx4YepwxQlr5Gz35YUROqQmHkhxRLNaAv675sNcsXyQM9xXG049bzjY5tWoAR81IjD70b3JBjqkAehrulra3UTRndWvNYga5l4kC7AiuWMJqapjUg3uTAUKWleyv%2Bbkxg77Oe98IcubfY8xkASgRshuXnJbbWHY9zcyEuwZD5h6M0mXp4FBviGtr9XaT9PpDONeby%2BKfCO9%2FsxYtK8x1M%2FIy%2B86DW7hvYZvKvBscHo5y8bCpuKsDO5NaXQ5UnvF0gEzLYs1raUc9forlQOyXl%2BFzFOrcKGhD5muPP3e&X-Amz-Signature=01eba0e271f968c6ce175332e5f8bf4f6f36769f2b0269388f64d43175a03683&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YF5QIAR3%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T230100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJIMEYCIQCnRNE0VeW1xOv%2BbxMfm4h66bh9FIwGXBNC3x3NRAaPgQIhAKbq7fM5XPsoUNroR9l7z7TKe95NdyvjJL9%2Bif5rtzEAKv8DCCAQABoMNjM3NDIzMTgzODA1IgySceJI6QL3OKWSHv8q3AOi9tgiZ09iASav5J48c1uckXSz2%2FEISKxT%2BYiq1vphD6mOuBQy8qG5496z9gdUQWQuv5P6i0WNg8nRJNnnWQhfwOyLAHTlgFi3IOk5ffGcgc%2F5F5aLYswPGUnpNh43FyMqYnMXJJqgeg2VZQBUkJregNOBFJZbH66kH6ZXuMrD5moeg26MYsTv64Og5FlWBWN1b2cvq8o2Vfs7RdCSDEn%2Bi5ujGAGcxnakHp4%2BKuQ3vNwDVEJ9T%2F%2BcNMn0DjwTB9arN1T3CSH0FLGAHBGHFjnWWebuwdJ46hlgZYAPRDAdYcJk9SWIOWDlr4XnSmQ8WMq8ssWCK3y9SHEO4EKn%2FRtji2T10kSqCCeUOPpwcSwutsKRjGf736x2QdpIdIXNfGwm5yKDeV7pEXts1krMjB4OGFPeSS8z8Wn9b7wkK3FlWuGSgfrnSYT23X6RYiakiUrO4qR2PnMqH%2Bgnt8d54%2BHVKYsvRO3XPBKKRosdn%2BpvtgSlXyIBYttyN4myqka6bdWwidW1B3TLJ2GxNaHuSwQSKxj5Uec0tjQ5x0U%2FQtAxPEy662Gu9ep82KVRx1QFUnzXYUneEheUdyxvFpwsKbraaAtpDRnHU%2BbsTbVM33xyEetln8LrY%2BrnU54%2BwzCE0r3JBjqkAYvlZC6YtIPZDTxdOzNDytkkSJHVuPilL8gKtACT%2FM8BZLc3Me29aRa64v5EoQ%2FJ7AEkNv14z0Ra04Gjl35PV6WcFXXLY2tZz16a%2ByzGnRPzpGY77lEYL0jbgJEFe94BbDjWnhBgHwrnaokKqT%2Bxh739jRf44ukB1qp5Mo4MB9ngqz6pUYXcYoksN9cXTE3Jv%2FzTa3IrWbfu7J8lC2AEonXyOkiq&X-Amz-Signature=728add0361d591c344d2046ab01c218d2634b969bbdb3f26f7616176548f7690&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YF5QIAR3%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T230100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJIMEYCIQCnRNE0VeW1xOv%2BbxMfm4h66bh9FIwGXBNC3x3NRAaPgQIhAKbq7fM5XPsoUNroR9l7z7TKe95NdyvjJL9%2Bif5rtzEAKv8DCCAQABoMNjM3NDIzMTgzODA1IgySceJI6QL3OKWSHv8q3AOi9tgiZ09iASav5J48c1uckXSz2%2FEISKxT%2BYiq1vphD6mOuBQy8qG5496z9gdUQWQuv5P6i0WNg8nRJNnnWQhfwOyLAHTlgFi3IOk5ffGcgc%2F5F5aLYswPGUnpNh43FyMqYnMXJJqgeg2VZQBUkJregNOBFJZbH66kH6ZXuMrD5moeg26MYsTv64Og5FlWBWN1b2cvq8o2Vfs7RdCSDEn%2Bi5ujGAGcxnakHp4%2BKuQ3vNwDVEJ9T%2F%2BcNMn0DjwTB9arN1T3CSH0FLGAHBGHFjnWWebuwdJ46hlgZYAPRDAdYcJk9SWIOWDlr4XnSmQ8WMq8ssWCK3y9SHEO4EKn%2FRtji2T10kSqCCeUOPpwcSwutsKRjGf736x2QdpIdIXNfGwm5yKDeV7pEXts1krMjB4OGFPeSS8z8Wn9b7wkK3FlWuGSgfrnSYT23X6RYiakiUrO4qR2PnMqH%2Bgnt8d54%2BHVKYsvRO3XPBKKRosdn%2BpvtgSlXyIBYttyN4myqka6bdWwidW1B3TLJ2GxNaHuSwQSKxj5Uec0tjQ5x0U%2FQtAxPEy662Gu9ep82KVRx1QFUnzXYUneEheUdyxvFpwsKbraaAtpDRnHU%2BbsTbVM33xyEetln8LrY%2BrnU54%2BwzCE0r3JBjqkAYvlZC6YtIPZDTxdOzNDytkkSJHVuPilL8gKtACT%2FM8BZLc3Me29aRa64v5EoQ%2FJ7AEkNv14z0Ra04Gjl35PV6WcFXXLY2tZz16a%2ByzGnRPzpGY77lEYL0jbgJEFe94BbDjWnhBgHwrnaokKqT%2Bxh739jRf44ukB1qp5Mo4MB9ngqz6pUYXcYoksN9cXTE3Jv%2FzTa3IrWbfu7J8lC2AEonXyOkiq&X-Amz-Signature=728add0361d591c344d2046ab01c218d2634b969bbdb3f26f7616176548f7690&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

