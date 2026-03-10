---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664F47OVYV%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T201911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDGz7a5T07iHy8dQneh3qcwBiRmDPlVMMkRL%2FDDY1wxVQIgffF1rbKIIvUO6b95Z%2FI4F1GT5pA1gYeWLM%2B%2B%2B1AcdR8q%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDIKxUja0TkFDl3GUQircAyP3RVKPN7Sxoxfd262rXXfqz3kUrHejSp09u7tzL2qplYUyBFSwnpmwqnpPvxg50BnhiegSPkNSc8D%2BvXPu7SFF%2Fh3udnvaJzQ1QJotC0LE8kdkLioooQKW01cbymOw1ikJbzMcZzv%2BBo758RniRoMRX2Nkx7ThESEcPQcGhc4uQ4lRTrUKLyiJy2ul08kcVBFediRtPG0Ep704NPq5p73lMHry4R29br8DSlAo%2FDcA5S7S7yrp71Quc97IMqU9TREcU55yBuakflI1Qtt6ImGchrKlzOjpbU94XIVFl4Ke3bZtQ5XXZzFCh%2FCXGcV%2Bi09IKhqXHTOx7NIbRhrb8lQWWlzjrhsd%2BFcfCNjipBTmd9IAL5FRs%2BDHRa61wcpIlXulFHyNNF5f6VAAqPSfIGmTBvwFuE8KJstCxtQ7hotXt0%2BUY9o7wZCzrGm34%2BzXQxaGx8CLE4lgx84W6Iwg8wcX4RzkynW0P%2B1XGTRnltXi3YZzObrUa8qLvuAca2OZnD9nTco%2FrJmTBvyLTmClEvYhs0jurOpb94t7xJZyF3VQYeJMs5R5bY8zg%2FIp1Utugt2niEYUuMW6eugiGohuKztwEmdgWpUR6T3iwD6JPTGGlY6V7fs0RjWbtCtWMMDgwc0GOqUBoKD3cd169Me8XrXH4SvXXLwOKFEsI0h3B2UEPj51bIVfc3C65N1FYa9%2BIdfzjEfJqvR7f5m%2FZDCDnOLj2TtcPKPFai7oG3fzk0NzQtI38ytYgQ0MPCydR2mvIZDTr2ZOuRj5UZKGFwbpVrtwDc1l673AHXg7fAp1i6XtY%2F%2Fu77b2610hHQTAHvM57p3Mfex8xtnz%2FLfGImIX7sQWttRDxem8Igqi&X-Amz-Signature=634f719fafea2635e6b9bef6c8557e8837513e3e099e71336ff78ede802133e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664F47OVYV%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T201911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDGz7a5T07iHy8dQneh3qcwBiRmDPlVMMkRL%2FDDY1wxVQIgffF1rbKIIvUO6b95Z%2FI4F1GT5pA1gYeWLM%2B%2B%2B1AcdR8q%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDIKxUja0TkFDl3GUQircAyP3RVKPN7Sxoxfd262rXXfqz3kUrHejSp09u7tzL2qplYUyBFSwnpmwqnpPvxg50BnhiegSPkNSc8D%2BvXPu7SFF%2Fh3udnvaJzQ1QJotC0LE8kdkLioooQKW01cbymOw1ikJbzMcZzv%2BBo758RniRoMRX2Nkx7ThESEcPQcGhc4uQ4lRTrUKLyiJy2ul08kcVBFediRtPG0Ep704NPq5p73lMHry4R29br8DSlAo%2FDcA5S7S7yrp71Quc97IMqU9TREcU55yBuakflI1Qtt6ImGchrKlzOjpbU94XIVFl4Ke3bZtQ5XXZzFCh%2FCXGcV%2Bi09IKhqXHTOx7NIbRhrb8lQWWlzjrhsd%2BFcfCNjipBTmd9IAL5FRs%2BDHRa61wcpIlXulFHyNNF5f6VAAqPSfIGmTBvwFuE8KJstCxtQ7hotXt0%2BUY9o7wZCzrGm34%2BzXQxaGx8CLE4lgx84W6Iwg8wcX4RzkynW0P%2B1XGTRnltXi3YZzObrUa8qLvuAca2OZnD9nTco%2FrJmTBvyLTmClEvYhs0jurOpb94t7xJZyF3VQYeJMs5R5bY8zg%2FIp1Utugt2niEYUuMW6eugiGohuKztwEmdgWpUR6T3iwD6JPTGGlY6V7fs0RjWbtCtWMMDgwc0GOqUBoKD3cd169Me8XrXH4SvXXLwOKFEsI0h3B2UEPj51bIVfc3C65N1FYa9%2BIdfzjEfJqvR7f5m%2FZDCDnOLj2TtcPKPFai7oG3fzk0NzQtI38ytYgQ0MPCydR2mvIZDTr2ZOuRj5UZKGFwbpVrtwDc1l673AHXg7fAp1i6XtY%2F%2Fu77b2610hHQTAHvM57p3Mfex8xtnz%2FLfGImIX7sQWttRDxem8Igqi&X-Amz-Signature=634f719fafea2635e6b9bef6c8557e8837513e3e099e71336ff78ede802133e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667UAMUUC6%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T201911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCWC3QBH4Jxvs1ihmcWLXPVfdEGw3%2FjFFmy%2Bu5MkFhuFgIgcNR%2Bfb4VV3oQfrh6Ky%2BzhFWPkvqmemNb%2BZEW77eZdeUq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDD3wdO6s1hRcaq%2BMQircA8oQ22nN5RW%2FUX%2F0xFBGhvFDk553ZW%2F8SQBtLsZsZ6gJ%2BIPYxOhWFMjMQ0yi6dTkMWz5m3QJC9yDYCg%2FbzBQKQm5C71xMbt040II3kUILL0L%2BR5OKx4dmgC2ZnG9c75buSsfsqAAa0yCFwSa98BfIuqoFqrCtUB%2FZWVhV1E70pwi4ts%2BQHQYWlbvA%2Fdp2JoKFzqtSoSakQWyVsFTPMzOPQx8W9sYy5KOphNOgXvwRhci77tvLXMZTeEWM6TirAzF6wZHHF4bOFbh5irxqSPJeAhU2fQDNn9bJWlzXnL%2Bpgn282RsJu%2BOFElD0VSYyHgKz%2BG%2B%2BCNivJM7dcSwSoP%2F%2BvS330i8jylrd61O9LJcm20CMx%2BsH7kizGK%2BJJnhg8EVMvSKaSldl7esJZtHpvdcWGDtfN6qC20ru43VKllLCJWiVhmqI3434ENnwQrz0wzL%2BT6qwY2e%2BhIp5P1dLZR1V5dMVRp%2F6mI%2FR%2FAiUx10se35NPtv9cSxYC1FpTDddjuqHVq2w9UVo5zVkcgoD2JarAhX52eTWf1kOK0eqmjS3oQIXOwvGrZSAZLUxflMKToxyVoMTSocRsOlQA8G8XmNis0LDtZ4wBImI0dwCAWkJ9ev0auOV0bzToun9DGZML%2Fgwc0GOqUB7xGwsXg97shU2otZPT4cCl8lZ0MMbYqiTzBHpp8na0nXDsvc8qcdPpBgpHZOUVRQ%2BNS4fb1QuR3lgfOe%2F6DwuL3zquR%2FwHWSGlILZpK1E7nWxv6iV45DTkmLim%2FnHKR5EH2yPppWAKaqGW1QhfTJIlYFWj3Oz3k7w8BVHAfHxg3RG%2F7IrtgDaULnULyrqtzoPHZjnnJ%2Fq6hFQhxWI0DRECK%2FEa8q&X-Amz-Signature=b7d92444172e30124aead53b17f3b5d714e57db35ad3bb8df19ae1dbae64a965&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAVLYG7P%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T201916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDgLjvrPfU79BLxO1emkG6GViQdUlBRFX1oxkYUmCZG5AiEA%2FMSxuqwH2Kc3jfxqokH01Bt8rMXFRXKdJb2hbnThTH4q%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDFWyfEPykE4BKRVMPSrcA6mY9OnaGUdGY7GGhgrjLSCw9U7SSLv2ahhg6S9pcFv3Ub8gdwojhLvp4l8kLMhW3%2F%2Foxm%2B%2FKOSOoEc1%2FCNKc35IQox0Y1vdiXp2oXCju267lZuUyhR0qiGbM%2BhwqSfCuaJ%2BfKRBm2i18Eljbnvvzz9uZFo3vcYBwJFKF%2FBAH4BDdMSo5R0EFQlRGpRYXpv9ezt2Yy%2BWmtrp23wvfmAA9fWrTcoa%2FW0JTO4hsJR1XPT2kLWtPI4UG4dY2nO%2FpM2iT2SnmiwN7F%2FszSgEG4yp%2F8dSGW2DyYbGtkgkVGWFVCXKjVR1vCFpG52D30zBbY08GmJXoByOCi9kt1c1K1h7gP0gMIaWdkcd7TGUYlaekHCvGSykmDJ%2BykEEI6A%2Fyr9%2BXPNHMSTIgQTEJrvaf5hRMOed81SPWsDivh9IVsgHam4fwSnlf06jRhPg%2F9OpPao37japPR70D0j1lWLpWJnDFVOhkH7xN0jDDZxt%2BlGz%2BE0TxIDG173T5j7PFnE4AwyBD42GzxI4uIHZFPRZRK99v%2FN7crGYqt4FOiDy4cv9XptmWXreDbTeho5ccKX3RWF8lfav%2B9eyIIIxz4J0m1ub035yXpXs5Bj8DB08JpA2bazCyZU7YTA%2Bzz7cKh0tMKTgwc0GOqUBijQRoCeXQULbMZXCL3pavDlOjzQcRMf3qnE5iHiV9AyUtBaVaBjdmjGUFkSqkVtRQYiSP5x8zgmNPXDkj7KWaEOfZTo8yvb9qXdeugTgWx%2B3kzPaeCcrEhN98U7gbhVVYbEOZdaMDuHmMr5QtWiegkzt6cFAj%2FFhiIj8imVpXmYjE2GaGMdV9WaolwWLKgxjhIhOaaNNW0Y0sx4o5mOSyUGmEh%2F8&X-Amz-Signature=1cc49356b6fc505a5db8fbdbe143607d3d69ef0197847f70b5a314604a9948c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAVLYG7P%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T201916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDgLjvrPfU79BLxO1emkG6GViQdUlBRFX1oxkYUmCZG5AiEA%2FMSxuqwH2Kc3jfxqokH01Bt8rMXFRXKdJb2hbnThTH4q%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDFWyfEPykE4BKRVMPSrcA6mY9OnaGUdGY7GGhgrjLSCw9U7SSLv2ahhg6S9pcFv3Ub8gdwojhLvp4l8kLMhW3%2F%2Foxm%2B%2FKOSOoEc1%2FCNKc35IQox0Y1vdiXp2oXCju267lZuUyhR0qiGbM%2BhwqSfCuaJ%2BfKRBm2i18Eljbnvvzz9uZFo3vcYBwJFKF%2FBAH4BDdMSo5R0EFQlRGpRYXpv9ezt2Yy%2BWmtrp23wvfmAA9fWrTcoa%2FW0JTO4hsJR1XPT2kLWtPI4UG4dY2nO%2FpM2iT2SnmiwN7F%2FszSgEG4yp%2F8dSGW2DyYbGtkgkVGWFVCXKjVR1vCFpG52D30zBbY08GmJXoByOCi9kt1c1K1h7gP0gMIaWdkcd7TGUYlaekHCvGSykmDJ%2BykEEI6A%2Fyr9%2BXPNHMSTIgQTEJrvaf5hRMOed81SPWsDivh9IVsgHam4fwSnlf06jRhPg%2F9OpPao37japPR70D0j1lWLpWJnDFVOhkH7xN0jDDZxt%2BlGz%2BE0TxIDG173T5j7PFnE4AwyBD42GzxI4uIHZFPRZRK99v%2FN7crGYqt4FOiDy4cv9XptmWXreDbTeho5ccKX3RWF8lfav%2B9eyIIIxz4J0m1ub035yXpXs5Bj8DB08JpA2bazCyZU7YTA%2Bzz7cKh0tMKTgwc0GOqUBijQRoCeXQULbMZXCL3pavDlOjzQcRMf3qnE5iHiV9AyUtBaVaBjdmjGUFkSqkVtRQYiSP5x8zgmNPXDkj7KWaEOfZTo8yvb9qXdeugTgWx%2B3kzPaeCcrEhN98U7gbhVVYbEOZdaMDuHmMr5QtWiegkzt6cFAj%2FFhiIj8imVpXmYjE2GaGMdV9WaolwWLKgxjhIhOaaNNW0Y0sx4o5mOSyUGmEh%2F8&X-Amz-Signature=8f23c40b442959e2f0cbf439b05cd20469747cba0b1cd8e06915221437b0befd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7IAF6M4%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T201916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCxCNxYwQmLD5NK1slvqw6idmc%2Fo6zGH2Sng7ptYipovwIhALCElLLt3djxFPrBvEur29S%2FwwtL29zAwys5A0YjYYw3Kv8DCE0QABoMNjM3NDIzMTgzODA1IgzgYlt%2FwpjFxf2IAeUq3AMajppBxCqd%2BJAGlq3vlJrJauXgmoTubPCJ%2FaMsHRwT90CPuLzXnkbQyPJ1fN%2Fed4Pum5ChlhTlpeNGIPu5DDl6bj3g7wFWAUaRQgDnGg%2FS2wwN9IN3KGI4NG8k5vDz7hyMnFynCU8MzrgiZ92U6WVjYqaFS1TrazoNO%2FVX0V4VRcN0i9rLIO9FeKtojRHsB9lP9DYOP2HcwUZCxsDBW8gYlP99D8SHAPdd9hfg3jDDybl2wVf660k%2BTKurIZL%2FjG4IIKoQCXIy6dEACswxlbjH%2B5MhzYoigQDzlAWOUFXRNr7oV%2BCB2LtJ6VojpIl%2BEC01WF27W%2BXD7oBS0e8JpSlbgehTwoV4OdEicsE2sgXFmQmuml55ISovm%2B0lJCyy%2BqM5bYntjwQjWuMW1xbtvJIkV4VZOHEUiLGkG3ibFY%2BE4xEctf6oUx3Oc5ldCkR1iLriYgX5omsyw%2FVUCUSQnW6FOGtfUFGmzL4qdXJUAxBUhuuUidrP6TA%2FqFL9FemLpPkoncx%2B6cW%2FfsX0QjCJhCkIk1SalArNmlOvrM1w1Buph6tlMt0n5ZGZqn3NgnCA2viIUpPoyNvKyTCnPSjmlg1bY%2FZuWZ2Dhwm7g0dhFkehIJRR9QzogLMY6reCATCI4cHNBjqkAcJAT2%2FD0%2BMnCESgqR4IMpoL7zMr8tkBMNb4d7Dp%2FsORC6PY06RH8A25i60Nxi9KOaAXP19tOY7oyVYnPpnzH8cshffmdaozAL2NCvGsjQQX3f4Ba2wQ9yXgK3AMV%2BAvwshypH%2BBlMeyxWUpEMLluzsxtS5O9krZIjER28h3xVyYW7nX%2Br86jIwHjh8i8Npo86maOT%2Fkyl5rL97iI0Zl55XcAdV%2B&X-Amz-Signature=8b3c73316ba60f7d7f8804724fc8da4293049bed1fa7a28726a9aee595ce2b99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHQRQNXF%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T201917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHSx94K4ltZrGsuvBrsuJAljAcMf7B4lGTRSYbG%2BZlccAiEA5hMfCPOAv%2BreDfRJu5aWUOqkdzCEEAv663MAnJY9gzgq%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDEf5EPxxANOXE2MVJyrcA73akJCFmYs6LTXXNugeVhzjxennAL45x%2BgcKwKEIL1OQ11lolhZdHxdrLjNfRs01%2BTCU2kg%2FWnTG9ur6Z8OZTbDQYwP0sBSpjnfxxCzH9VcPUSUs3kVWuOkkqxtYWxddNEtXfrOHOUF4kbm%2Bo2Qdffsy5fOpmDY4Gxd%2F5Sgnq%2Bc0DQvzYQzaoQe4iBDzVjsZRJAZ58anNVeMXjxY7aeiRCl1jTv0wsITPvqJQ0HeN%2BtkyN99E4XXwStLpS3jJ2IznF6JiSgH3PuIM822jJyTRjVuje1F5T6CTSu68NDouIUDLE%2F%2FAJsCMv3I4WOzP6EfztUdRnDvMsX8PX9xSlKGar26hw7kfAzDGnYbbVf5iz0qWF%2BHiYYKTeMhuVmCzQSwPzCg7i9Vz4ywiJ2jI7QkufrF49REaXOvDI6WmwaRx%2BQ9mEUEkocNRWeeO2FaGcisxR6dCtAHiF51AlAoJ5vPW1iu9tYBUQt23vD6E2fw0yConzv0Khlc6Wo%2Fyh8WcKeWcNhL9dRk5O845nUX%2B8XvW3LmqWq6os4fmA4w4q%2Bz2bWOgpliFWpdWYnymVzu%2Fp80Pq9sRM1EOkPFh1kFp11CfUqsxUYOPV7I0AK9I%2BaX3P1yKOoL21wV8eJ28bYMKHgwc0GOqUBMeWRO3uotwCCTkBvEIrSvFjDv5nKp011qAMbPyC3oNk8lgRFYBRFLm37SmnJuEeCQVLJ3xlGi9N6xAz%2FEOlw5A7cJL%2BndmPzvUxTDoqHdqXDNwWwKwgZC09DVEMNcC1ego1ADTVfju6eHuEbSjXL0ZM6x6t9pKK3fJOoAod5QTl5Ueqdobosvl4RKq37aHzs8ntXp0EtCDZqt%2FqzidgHkcZZ18kp&X-Amz-Signature=79df95be73bc78c801666bfe8f97c7e9fbebbe433a9f0d06bc8e5194807a748c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZBMYA4S%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T201918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDqQb4wGr7TQnoF8YneifUvTpj3ulkbCY01VNAUCJy0bwIhAOdoC%2BRbZ4vdPrMYZgN8J%2BsNj8EbpEJSBxJDYaieAJUeKv8DCE0QABoMNjM3NDIzMTgzODA1IgwbBsW3Zn1dNYAL7I4q3APvkXThsvD%2B1lSpNmTfyaFdiQZHM%2F%2FueNzDz8HFCQeJoSvTqiPPfsg1ysN15GGNLO57bxqfc%2FNH1I98IZJfKVwnOhS%2B5uVJu1Y0iQkoX0L69AUXnyzObIeVCoGG33KASpDAQE1%2FG86DFU5MwB%2BtgAoRNI8Ibtj9DV8OxtnOkOuW7ZPT%2BaU1En8vJ3rirtuFhhAv40v6DsR30Npjp2pPxB0jiG1VljJCNz5eY5j5RDFLKhX%2FnuICpiSQYygIKvX2ClQs6DTckOGIN0hpl5wgonK79uXlAC%2BpjffiO4tXlG0rmIGCMtLG0zy4il0o4unONk3HmDYrussHGeAxap6me3ZBEpO8jLh%2BCw8VcwMfJ%2FA1o829Rb8tspVFI9auDeAcfEtUucnG6ty96UJCMk%2BCNDSE0Q5tWZO%2B3cSJHp6KgJof4Pt4CWXv4MYKOSDgivFmpXsXJzYHIwTLIIMPVnJcuTVwpLUmfWHDU%2B51L7N8%2B9c1a3J%2FfkJMzcip8hr8%2BCRxwcSIn%2BNEm60z7sFCB4b8TFXKUuuMJTrnyVMCq34xSc39g90%2BHsxQltFOkxSFNtqJKHDd29JbwNz%2FMaSjvYuKoD5Z2cnBth4836RNa%2F9srFxXviMjawyrNiQp8WEP8zCs4cHNBjqkAXM%2F97G8PnPcrYL9yonE01Kq%2BMHObB5xVZx9Jd5KX624wiMawaHHKL6tPpS1N6XjRRovWitHKoTcIm2dVZrClQxIZRsqTfBlxcNOxJztjkBBD3VfKgq3F7tzW9wZoWjr3EdzgGSvGzwnNoLSaLjne8a6lJ0JSGxUptcgw%2BhR7a9hxYRWQtaYNBH8rAFkV5511hyh4Z82nyKXdsg0opOkF2c%2B1qo3&X-Amz-Signature=d6ab6e5b6d40a58bd35952e6ea849f0350e94e67b1527f970758d987041be468&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662E53QWKB%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T201921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAS5EbzwW0POp7PrFKRzPS9ApCRQg5zioz9C%2F8FV88xOAiABMtaSJu93L4%2BvYM64Ou%2Fr8P95g5Ni8Mz6KftcZV5Cnyr%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIMoyEckW0TQudIIsrBKtwDyLMl76FYVL8u0R8%2FeQW3Sl%2BQMYVxjLy3%2FcH6LXFkPS9Pzv1SDSaY3WowHimHBDpUENkiGY2a%2FgqnJ1qlkJafmRTm1wbK1HFvsVzThQi7yXj2jeDIQ%2FnFhw%2Blixg6UJjzixY0e5vYrp6vImE%2BARV5v%2FDZum%2Fx9mjMov%2FaWqPZksia9kcyrF6S4KDJ9BO9lunJYuzMrCQplw06egTjUXaOKar4gJtcuImJXYlR7DSlFG9efp8AS%2FPIpS17PpDioMuR%2FPBf2p3vAJ0P7W2uMQzDTcYQ%2BGiEJ10P7bf8PEH8PfWZaewZsgtCokCKZ5fzMBQfQMkP1RLoeWchFbeiJ6sG9ayTbeTb3I4VZsNxFhNW3SBkx6s8VVB%2FSAjQTeCD4bg158vWGfa1DrL9yr1VhdJzXQYfvCpcvf3eSshc5zWF1NW6dzTufS15hwWRasI2LkJlPWZHxEbXWO4jrsDo0aqh5XGfpdoRDiVmZJvvee1Huwi2FTV4JUYDUidFH7JI0vcozk9F%2BJvx9AshDqlnfD6WN8HRjFQ64LRW%2Bm1JTvm%2FfCzaAzQAgJBnqRpFHZ489ak6Mv%2BwFzRb7bV5VHUGL8g%2F2lwR4DyETHWYZNQzhpqEwGrqZIsbHdxtW4Xm3kcw5eHBzQY6pgFgYoOr4g6cwx6ouAnz9Q4vM9fKunRWtineNMgd4OQkJbvBY%2B6GZMFif4wCNUQf0JQG%2BoieIard1fDbyHitHW79BJYBPBEkUX4ZaZuK9Lkl36hef9yqWiF%2BvQuZN9m8NmyoS2aK4FVwmUjgORJueJI84Sae%2B4t1hBKRE5%2BxFksEtWAu1XMSv%2BVQkRDSHHRmV4jnI9BQSQmtyaHDx5qpUD28W8JAWtwu&X-Amz-Signature=9753977228521346d40e7d4e7204033b059dc8c63068e296f60c3a86cab845e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662E53QWKB%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T201921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAS5EbzwW0POp7PrFKRzPS9ApCRQg5zioz9C%2F8FV88xOAiABMtaSJu93L4%2BvYM64Ou%2Fr8P95g5Ni8Mz6KftcZV5Cnyr%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIMoyEckW0TQudIIsrBKtwDyLMl76FYVL8u0R8%2FeQW3Sl%2BQMYVxjLy3%2FcH6LXFkPS9Pzv1SDSaY3WowHimHBDpUENkiGY2a%2FgqnJ1qlkJafmRTm1wbK1HFvsVzThQi7yXj2jeDIQ%2FnFhw%2Blixg6UJjzixY0e5vYrp6vImE%2BARV5v%2FDZum%2Fx9mjMov%2FaWqPZksia9kcyrF6S4KDJ9BO9lunJYuzMrCQplw06egTjUXaOKar4gJtcuImJXYlR7DSlFG9efp8AS%2FPIpS17PpDioMuR%2FPBf2p3vAJ0P7W2uMQzDTcYQ%2BGiEJ10P7bf8PEH8PfWZaewZsgtCokCKZ5fzMBQfQMkP1RLoeWchFbeiJ6sG9ayTbeTb3I4VZsNxFhNW3SBkx6s8VVB%2FSAjQTeCD4bg158vWGfa1DrL9yr1VhdJzXQYfvCpcvf3eSshc5zWF1NW6dzTufS15hwWRasI2LkJlPWZHxEbXWO4jrsDo0aqh5XGfpdoRDiVmZJvvee1Huwi2FTV4JUYDUidFH7JI0vcozk9F%2BJvx9AshDqlnfD6WN8HRjFQ64LRW%2Bm1JTvm%2FfCzaAzQAgJBnqRpFHZ489ak6Mv%2BwFzRb7bV5VHUGL8g%2F2lwR4DyETHWYZNQzhpqEwGrqZIsbHdxtW4Xm3kcw5eHBzQY6pgFgYoOr4g6cwx6ouAnz9Q4vM9fKunRWtineNMgd4OQkJbvBY%2B6GZMFif4wCNUQf0JQG%2BoieIard1fDbyHitHW79BJYBPBEkUX4ZaZuK9Lkl36hef9yqWiF%2BvQuZN9m8NmyoS2aK4FVwmUjgORJueJI84Sae%2B4t1hBKRE5%2BxFksEtWAu1XMSv%2BVQkRDSHHRmV4jnI9BQSQmtyaHDx5qpUD28W8JAWtwu&X-Amz-Signature=284b9234559c6182ba2e4028910e0e2b6d1a4dda0df6cfb33ad1c4ae1cd6d811&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRIVP4LK%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T201905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCoVy7PN910Ruihqw4tv3zyte4l%2BnwRHqwRonCE4ymI%2BAIgcQ4Bln9My0QYIGoJyN0sF1Bv31QWkruawVR2bo1YqO8q%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDKI2DZzh1ACMP3UhPyrcA7q2o3R5luJhGm6swfAIblH0l2wdrOHh26pT4WmTD8QfADXYb4d2UsKycqmDeOtVuVnCLqLQH8t8e0IPc8YR6FttWuLCZb8tlBNfKrWC9yCr15jQxcvJstkPwUe%2BCPBjgRurYseqAomE3RYBfSILLHToU8OAiEBS%2Bsgotzl9Xoen22%2FYzxh%2F%2FvDPGJyRvWP3YoMTl0hjSEO8tsUDJCUir5vy9S9YH5O6yKYmXhbw0FMHSJe7C%2BfZXI6PXYhs8TbPDcyLJ6OAtzTuryH7bMDRQOrMvD674wX7yQecSXtBZKiZqyjE41CU%2FjRXlxMKMj%2B9BDl5At2LGA%2By2HqWhytgaoX1DTZo2dft1l2w7geOeTwtq3eO4wEQigwPHHPkqWL43EANUWYW2YMykQHVsWu%2B4JIB%2Bt9ph5cYSy7RtGZTNK16RY902SqeAdPgW0WCJrIg0lZk%2FawASmN4sS94UkQKlEOHBITayPFbqOlIc54MutPT8Vg2JI8VwbsgPmIDjd9E7oUe%2BV72wQoONXbZU%2F896KMvzHeAfqEb44X0Vu5zBtJ8ehJw1QaNxionl2iifT2UkoPv49sw4DkxZJdCFE4P0YGlggiWoAEWHZTGzIH9pb1yiqVybYaWATxL0MakMKzhwc0GOqUBD2FEZLnNlQk5UOZwFDP2%2FX2jtEEU4RgeNfm017xiJNFR9mcMdNGYEeI%2Fvx4CBFU4YKYTX5BxRB%2BeIt6zQWLQqI6XL3Ay1r08cVFX3qS402c%2FgA8MkY0856c3uewqm00qkXvp3oL7aEFsVsKNSAQ1neizFoQ9wdvU8s35KJ8EJOKZrxTmOBaD27YNq%2F2%2FZR1L41TK7nU99H5T6gwB6JD6sWuBCyry&X-Amz-Signature=169a4d7ab45003bacca21b5fc1227cebc136fc133c675e6eb970916716693e2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4F4VV2I%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T201923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG96KvygvW5DGcDJUT8J%2FAWgYQ58y1XynKEsByV60XSMAiAdtimsjxXjqTVFecS4OMViZYn1siIwGEwBn9eRa2xO1Cr%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIMDX9eQNmvsMY%2ByFYpKtwDVYuMaVyaR1cQ28y8nl72zIAIMDmfRhiuwzAuvmTX%2F12jVbxQRFRtdK4wruaIrDzBbli1AfFDWefTBGrHMINrrgceopYRPwKTSuQB2OFXWObaqvsAVbLZTR6ylqvx45x%2F10bgRa16Xr1RacunPW9ZV6yVrZcQj5Vb%2Bw7CzIgyfEBe%2FBh5aotYvgwszyCDKOflfcmtOhxE2qHfF3Bidu9yrfh5kSsIPkwCAbYIuDTak%2Fg4lkVF6Qa%2F%2F3TXo5nJgXay2vR%2BizLlTfYkKZmdZ3Ey4p9okIYyBtqdduJRXY0jbhFwaUISqhB43WG2VYc0AYSqs9olxZ05tPeS3WjCOdDBoqoy4rlq7az3qjnnL5Fj%2Bh1Li86L64vr6gtMJJMTZd8z03GmwpjgR6rJSwlUm9rv99%2Fl5mLPfA0ADZ9drOlgHjONTLiWNUrUZYJNs8MbWyIWsoK45Em9svmIiuyGofUAUjSxkRcPwhuaW0qWd0ZMuBOFF5JyZu6PR%2F77PmTR8GRc%2F%2BEmCGXdxMAyoxI2UqeYQyTQlwq1rn03rItjfTPFd4MLMKERSFtTXdguqb8zxjjfSsmXyhln9RWd6Wu2OzXvo9uHXcAcCa8EBZU3K0%2Bx3SxshAo8xK%2BSVCS7Geww5%2BHBzQY6pgHGnJQQu6kstAYeOtRfUoA8zYw8jJpYVW7xV9VWQQa4EsBlR5AfSGhuOuvD%2F3vpqJ%2BU8iKlyYrmBwlxCiUTGOdorB4uJwvY3Jg3ubleRYvj4SeQyUeJrBJXgn792Q5dnhxaRXWv6XUo9Pg5%2BTzkR%2B4HS76bVIwvv8J6tIFLeEUrS%2Fd%2FwCxCkfk1dT7EN67gssk8EBWifPUwSQCRd37OD4gj3UWud2Ne&X-Amz-Signature=fe71ca61e22d0f9cfe9567ae79133bcc9cbe7bbec819c37188cb4ffa9701baa8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4F4VV2I%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T201923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG96KvygvW5DGcDJUT8J%2FAWgYQ58y1XynKEsByV60XSMAiAdtimsjxXjqTVFecS4OMViZYn1siIwGEwBn9eRa2xO1Cr%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIMDX9eQNmvsMY%2ByFYpKtwDVYuMaVyaR1cQ28y8nl72zIAIMDmfRhiuwzAuvmTX%2F12jVbxQRFRtdK4wruaIrDzBbli1AfFDWefTBGrHMINrrgceopYRPwKTSuQB2OFXWObaqvsAVbLZTR6ylqvx45x%2F10bgRa16Xr1RacunPW9ZV6yVrZcQj5Vb%2Bw7CzIgyfEBe%2FBh5aotYvgwszyCDKOflfcmtOhxE2qHfF3Bidu9yrfh5kSsIPkwCAbYIuDTak%2Fg4lkVF6Qa%2F%2F3TXo5nJgXay2vR%2BizLlTfYkKZmdZ3Ey4p9okIYyBtqdduJRXY0jbhFwaUISqhB43WG2VYc0AYSqs9olxZ05tPeS3WjCOdDBoqoy4rlq7az3qjnnL5Fj%2Bh1Li86L64vr6gtMJJMTZd8z03GmwpjgR6rJSwlUm9rv99%2Fl5mLPfA0ADZ9drOlgHjONTLiWNUrUZYJNs8MbWyIWsoK45Em9svmIiuyGofUAUjSxkRcPwhuaW0qWd0ZMuBOFF5JyZu6PR%2F77PmTR8GRc%2F%2BEmCGXdxMAyoxI2UqeYQyTQlwq1rn03rItjfTPFd4MLMKERSFtTXdguqb8zxjjfSsmXyhln9RWd6Wu2OzXvo9uHXcAcCa8EBZU3K0%2Bx3SxshAo8xK%2BSVCS7Geww5%2BHBzQY6pgHGnJQQu6kstAYeOtRfUoA8zYw8jJpYVW7xV9VWQQa4EsBlR5AfSGhuOuvD%2F3vpqJ%2BU8iKlyYrmBwlxCiUTGOdorB4uJwvY3Jg3ubleRYvj4SeQyUeJrBJXgn792Q5dnhxaRXWv6XUo9Pg5%2BTzkR%2B4HS76bVIwvv8J6tIFLeEUrS%2Fd%2FwCxCkfk1dT7EN67gssk8EBWifPUwSQCRd37OD4gj3UWud2Ne&X-Amz-Signature=fe71ca61e22d0f9cfe9567ae79133bcc9cbe7bbec819c37188cb4ffa9701baa8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672QKRLXI%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T201923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH9dN86W4Jo2KSgciaoLWq0DauQe7rwkgsZx5c%2Bniv3hAiAO13pF4Dy4N8mQZz%2FQzORZ0LPGPTFjjjIKHvwZ50vVMyr%2FAwhMEAAaDDYzNzQyMzE4MzgwNSIMw1qy1wvP45cKA8fhKtwDOFkc9%2F6ptkZq%2F5k07yUn9%2F4rw%2FgLzYNNO75YfDufCQLyJ8r9GhxOz4hCLQCm%2FsuI8dWnSNxEmYHGARpX0KvIRwnnMuNPTMnLHDbxemXWUGIogz1bQuUcJhPa%2FOuW9Jav9kjlRbER0kRJt8A%2BaiSwYJZPsGfSR80pb0QUFq3f%2FEc2ZeJjcMi1pGqCUYXEQRgyW4YaJ%2FPjj%2FDEOHMy2UCSGeCPPLKnDFwc6G18y5ADrlrY3ufabkb829g6mAj86ehJlSttc4fBULaoFK3beL%2BTDnQ89fu0Zp5NMXjKZHD%2F0r9DT7oIlOkr4sn2jPpmcFqtCRa8uoW3WtsR6H%2BU24kjx74GrdIeXqnhhGYdV%2B5L0YSE7TDbFKkSghO5W2k6eoGIQ0h5%2F8VqWdb%2F8y%2B09TxgQUXej5C28ZIWJpHyB%2Fusz4jeFAFGOe3vLAPeZH8%2B%2B%2FNVlsF%2B%2FgjqkGzGlAAFhHubX0OpIfrK%2BPpuxE%2BNWK2lnyMqI8OG%2BAfpSFWoy21BBeiqNGcjDdc7x%2BIUBRBeKhmLBQkcXUqqJZN69orMIqrAtgmOKc1x0O03OR%2FinSHF9gNwlSHjqJG6oqzuWxI7%2B70d9DP624HDESiAmmgRvCBLML%2BxorXwCzVldG54DRwwtuDBzQY6pgEy4juTsYGe8Nc1B8OZpzFWU%2FbyS9C8cZ0x96BXHz4d%2FwzZ2WCZ5fLBeFjMx6DUCFVZYHZW7ueAZBABtw4wInS4siBRzYnA%2Fm5pELxIeQnxLF6fQKBWJGTrW3TlVdC6X1z0O0%2F6MbPE%2FbuAiQ0u03UHl7ZN%2Bp48Nz%2Fyvx%2BcbISXH%2FEJXy%2BW6qLZ39%2F%2FWEdV8%2BmKT4O8WNWAugLAAmBxGq5vHmwxaRha&X-Amz-Signature=df8efad622853efdb7dc76cb8ef07d4f0496d2aea79c7b888f8bf7f2b0c588e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

