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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBE5ZFSK%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T201549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCiijgMyMGM36%2F2uIp84iSWNxzk5i1Uk6MHFRzAkhYkbgIgAakP%2F4MQ0F7g%2BpDVf46ZOmC00q0%2Bgh6CglLHC9rWmSoq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDH6zDcbjAW2w5CsTpCrcA2DGCU2MtwSNbz8vfKn%2FRUXUhcrfe1261aC3t1WjI%2BBcPukTjQZsny7U1tVQFyP6%2BhM0Uir%2Fpzksu5Yo3ix1%2FRmANVWv%2B12z89BCGXol6%2BaEstpN%2FdSuYGAfrQMkqwTag8RsDysp7PMX5OrR%2BIj9e2OPlOASws8QuMiPAY0QSVDUlbL59%2BjvdYTU2ydJvrfJMdhG9ffzMbEc5d7RszgoBP%2BO4Qja3Ncc6hoc1Akb798JvWD15XK8k%2BkFAj8zN0D%2FHdIak6d0foGDXPRvDKXFowBdPQkIMC1ceZ5CqMW24hcG8dqndJFK%2F%2F3P7y%2BYMYzCU8sH1oxP1N%2B9aE9CtA42MENlyslApF3OeP5b9nKOHZG4IgTAtptJiugHCwwqehdkHd8quKjNAmdeDfImEs74uDKIahHaEGXKRvo30oCcGRRq0IaaZSiJKxQ2wlf5cl%2FjBjMVhrceCFn7FXFK4O1tzxhOi5ZhQ4gNWeBEgAv4vRUuKljHB%2B9P7aCFlkKSADF5YZltMBPsbk3lQcIYjULW97LiCjpdxr9GFVLL6vxHeKimSAkv8XMfeTJrp8rXxBmQ64v9PFI%2FM7zGaPSqUd8b10sWQO8sp6gh%2FF1tfdY4uzDWdBS6McHeYuu%2FjicqMIPnzcwGOqUB6Nwcn7R8XDFnBc3E6Nr4kHqGSU1ckdZQ3lM4iyvfUsQ2LBmOe3uXmcvBm2D0%2FmjMcOd2Uy8XiAlVmPDfOz2VokY4IogqJT%2B07%2BJm8raGb97TLPXzkrsHSwF6yUVDlRHPlqzxNzhLYILBGDeYJ5rxQ4vZf89liwbxnKUFcFSdWl4W6YnkQAp2JH4XADbessucPuD2FTBtaxvMLjD1XYRU976kM%2BK5&X-Amz-Signature=88d4eb83440d7d07a3b2e5807bd082908d21f0bf81af494b5903248424ac220b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBE5ZFSK%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T201549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCiijgMyMGM36%2F2uIp84iSWNxzk5i1Uk6MHFRzAkhYkbgIgAakP%2F4MQ0F7g%2BpDVf46ZOmC00q0%2Bgh6CglLHC9rWmSoq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDH6zDcbjAW2w5CsTpCrcA2DGCU2MtwSNbz8vfKn%2FRUXUhcrfe1261aC3t1WjI%2BBcPukTjQZsny7U1tVQFyP6%2BhM0Uir%2Fpzksu5Yo3ix1%2FRmANVWv%2B12z89BCGXol6%2BaEstpN%2FdSuYGAfrQMkqwTag8RsDysp7PMX5OrR%2BIj9e2OPlOASws8QuMiPAY0QSVDUlbL59%2BjvdYTU2ydJvrfJMdhG9ffzMbEc5d7RszgoBP%2BO4Qja3Ncc6hoc1Akb798JvWD15XK8k%2BkFAj8zN0D%2FHdIak6d0foGDXPRvDKXFowBdPQkIMC1ceZ5CqMW24hcG8dqndJFK%2F%2F3P7y%2BYMYzCU8sH1oxP1N%2B9aE9CtA42MENlyslApF3OeP5b9nKOHZG4IgTAtptJiugHCwwqehdkHd8quKjNAmdeDfImEs74uDKIahHaEGXKRvo30oCcGRRq0IaaZSiJKxQ2wlf5cl%2FjBjMVhrceCFn7FXFK4O1tzxhOi5ZhQ4gNWeBEgAv4vRUuKljHB%2B9P7aCFlkKSADF5YZltMBPsbk3lQcIYjULW97LiCjpdxr9GFVLL6vxHeKimSAkv8XMfeTJrp8rXxBmQ64v9PFI%2FM7zGaPSqUd8b10sWQO8sp6gh%2FF1tfdY4uzDWdBS6McHeYuu%2FjicqMIPnzcwGOqUB6Nwcn7R8XDFnBc3E6Nr4kHqGSU1ckdZQ3lM4iyvfUsQ2LBmOe3uXmcvBm2D0%2FmjMcOd2Uy8XiAlVmPDfOz2VokY4IogqJT%2B07%2BJm8raGb97TLPXzkrsHSwF6yUVDlRHPlqzxNzhLYILBGDeYJ5rxQ4vZf89liwbxnKUFcFSdWl4W6YnkQAp2JH4XADbessucPuD2FTBtaxvMLjD1XYRU976kM%2BK5&X-Amz-Signature=88d4eb83440d7d07a3b2e5807bd082908d21f0bf81af494b5903248424ac220b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662R4RNWXL%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T201549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCoxziXSwR3km3MsWOX7h%2BDVsyeBZIqGf15m0UgLTqbsQIhANcmvqnwtalJCZhtvwtIuGMnj4Ayl0AgueYKXyuG5jteKv8DCD0QABoMNjM3NDIzMTgzODA1Igw0C2sKFJNWb0Lh1yQq3ANkzfQTDisvQMuahK3vhGWwS9CyL75DwsZ14ilvKRNrVoy%2BTwFjfD0HmPQsiOSxUVNDz7Z1uLzXepYDHgultst1SfXoR0Kiu3sHYGa7QWHUZA%2BvPlQ4bVEb%2B5e0AhBpQp40yxCDMz7lH9Zbb%2BhyZpFXQnP8MHAeIWMBaVhYAUFvEmLif9lLiNTTqHzZDPoD5L1AfwQ9O2TkHzDXdC0veqwExysBW3nVAmplrLIuaV4S2nnsGnu%2FXFnpQ6kANYhznmJqcgv3mIGvzjqI0sj%2F5k3oKkI%2BQvhB1ZqxhSvqQxKAJCeBJWdqrxQzNBfHtfXEKz3csur1KnajIvKMv6UV7t5mf%2FF4zuD0QHysYWzLMRDQFA4aRbQ4vPvOQuKySgYlT264XV3FFds%2FWGaxtVCyc%2FYE79nfBiCk%2BqEGeMAQ%2FhzYoVE1BpdjgTDfrH%2F6wYK6BRnDyiluRPr0UNjgNAsSFySHgbPNEg9hQEBtmcz2VY46HW4xO6w7BWpSKmufivJhFJhpxv9uVP9FAW2qNsB19cxh3gLdG0t9iUMp17CGv%2B%2BER%2FeHEfzpPV8%2Fsr9XdZbhQTPFKHjCej0EEsWa1gj14cput6NTKq3hHP1KwghQuxLoVPzTrh5WZhJU%2F8w61TCt583MBjqkAd3G25bUKlMtkuSfvByqXfcfRic8M48rmYdAqYDRFm8Myu2XPbEW1FpGr2HzGiBVpdqTqMsZf9oPqw6pWTU0NltEbt5aSxs0A0gOyazEV%2FrjfpNAh%2B5RjkfJNQMYlpaqUsf1jOn4iMcwXj4mf2n2fwajjwEw%2FrNLtzxrBHkUUa84VfuK%2FXwnpgEUayMGG7iBe9Hz3XLYmSqrfKqtlrZu%2F43Xx9Zn&X-Amz-Signature=c8b2b09cd3e5a114a43152a71a5486b1dac9330193a3f81013c672cd24ae4517&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RW4NDBRM%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T201551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCgtwSIW%2FScep%2F3g4ncJxxWHPYOSm8f8gor8jvGimsBoAIhAIxDCZPc8Av4Ua9%2BjP5TtVYteEE8oT2aUFY5RaHebMcHKv8DCD0QABoMNjM3NDIzMTgzODA1IgzR3x8rAF%2Bo7CBUv68q3AMOIS%2BM2TbLMr6xxrjhw4JXmiFjixuTYDY%2BAmAWbnkMeVk2hLXAnfmzi0ZApLZb%2F4dSVoRqnAUyMH0JGSQ4bMVj29k0Ufg%2BwywSbfbl6scX4iwaAV9EH%2FPFlb6MvksNVV5C2wiLejCCJ2h5JiiCd4ztk9Rt299h3BR7Qn03cqB5pswfiqX8qlD4GYZWbjSioo%2B1FuVFWRoW8uVJjtv8qTJhmsjlmdPQMmZSt1NUNei2yQyJwTTIJy276p63cgmD68D68bIbDk0Fp4eJgd1N1cI3Yywa3fKDn%2B9Dpc2IKjGd6%2FPuVRj3nKnBoda7TOy7YqFYjkLLm4iaykEJ13ZwcIlKGImLRrwqwl%2BlyHJUKZWa0e3CZ9JxvQgL1XXGrEDlkniPcw%2FIRj3lM502p75Myv4%2FOXb%2F0z3sneOxje2RpTvFdIVDuU6LG1BXasBNttjVJfPUNVtHXzhhrffdiP%2BTivkYEibyeoQO1se7ehxl85TjeUeff9NMDrBFPwUVh8Hu9LW%2Bpav9WN4izzgjZqMWk9K04e4bvnKQU9jYBVv33SSu6n3lEIahTjoRWC01APOTm4LXQjE0jdyBxke4OXw%2F3UC11uQi%2BYsYQLiXrQe8awMnoHrzJu7ETKQ6lx3rEDDV583MBjqkATjVohAQ8suHcxtzoytr2E4rRgsZr6Bmm0lf5RptYc1dslbya%2FWYa1dQsW1rcBIniX%2F6Q%2FYz2qK918XJl1vmTuaeXBqAJiY1HJBJWnAWwwWRO%2F4denHo%2FF4fg26fboFOtUIom32YzN%2FOcVsori1OThrma%2BAu1U9%2FmO77E5zS97aCKSBPMpkm%2F68be%2FSD0XG1CDieOckJfl9CwHbmj8eSdfyY2qx2&X-Amz-Signature=8f11e435c52f55c5ad89c422087be5e0b14192b4c82a09c3bfb9a04880146c9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RW4NDBRM%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T201551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCgtwSIW%2FScep%2F3g4ncJxxWHPYOSm8f8gor8jvGimsBoAIhAIxDCZPc8Av4Ua9%2BjP5TtVYteEE8oT2aUFY5RaHebMcHKv8DCD0QABoMNjM3NDIzMTgzODA1IgzR3x8rAF%2Bo7CBUv68q3AMOIS%2BM2TbLMr6xxrjhw4JXmiFjixuTYDY%2BAmAWbnkMeVk2hLXAnfmzi0ZApLZb%2F4dSVoRqnAUyMH0JGSQ4bMVj29k0Ufg%2BwywSbfbl6scX4iwaAV9EH%2FPFlb6MvksNVV5C2wiLejCCJ2h5JiiCd4ztk9Rt299h3BR7Qn03cqB5pswfiqX8qlD4GYZWbjSioo%2B1FuVFWRoW8uVJjtv8qTJhmsjlmdPQMmZSt1NUNei2yQyJwTTIJy276p63cgmD68D68bIbDk0Fp4eJgd1N1cI3Yywa3fKDn%2B9Dpc2IKjGd6%2FPuVRj3nKnBoda7TOy7YqFYjkLLm4iaykEJ13ZwcIlKGImLRrwqwl%2BlyHJUKZWa0e3CZ9JxvQgL1XXGrEDlkniPcw%2FIRj3lM502p75Myv4%2FOXb%2F0z3sneOxje2RpTvFdIVDuU6LG1BXasBNttjVJfPUNVtHXzhhrffdiP%2BTivkYEibyeoQO1se7ehxl85TjeUeff9NMDrBFPwUVh8Hu9LW%2Bpav9WN4izzgjZqMWk9K04e4bvnKQU9jYBVv33SSu6n3lEIahTjoRWC01APOTm4LXQjE0jdyBxke4OXw%2F3UC11uQi%2BYsYQLiXrQe8awMnoHrzJu7ETKQ6lx3rEDDV583MBjqkATjVohAQ8suHcxtzoytr2E4rRgsZr6Bmm0lf5RptYc1dslbya%2FWYa1dQsW1rcBIniX%2F6Q%2FYz2qK918XJl1vmTuaeXBqAJiY1HJBJWnAWwwWRO%2F4denHo%2FF4fg26fboFOtUIom32YzN%2FOcVsori1OThrma%2BAu1U9%2FmO77E5zS97aCKSBPMpkm%2F68be%2FSD0XG1CDieOckJfl9CwHbmj8eSdfyY2qx2&X-Amz-Signature=73925725fe5307c822b8f15deee8a1e2bb235162e7e3f3bf508f50ef25e272f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVCUXM6Q%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T201551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIHnh6hegypp2f4uw%2BlTJp5TyeVuItJsPEY5T3iHLBKcSAiBGFsTku%2Bjn%2BMKYeyd%2Fchu%2Bpk%2Fkkjgy4cdgLDkL7enYMyr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMHurgRuJiLJuq2HOwKtwDeg3zGv2TAHzEzOIRIWr8%2BjwzXco82GS5nB1N7SGeNifx02ILn6PfrFrKaBYdVMARNwXBXg1wRIjcI2muelUJtqetm2u7klntrQ4tsrDj1O3P73CgCgT1e5nVTCNk0LVGKfjZ9YAwSXluxR8%2BTD%2BBz9W0oOmg13hc37jFmOLmKDREg1VEEXBpvoNQ04U0Vwq8hx5nnc%2BABfV8M7x2RExdIdTw8Y0DWnuaRVeKiVkCszhaqGtOQbVCuvULSo3a%2BWcoYH%2BCxLdHSPmRpFm%2FrZBHF8pcxHX%2FwsCN1NyYXbW8d4Ty8fmFBE4ulPFgszKkudN%2BtRJgMtX7g62O1I3BQZvQDtCI4Sa8RcFeIEI9Q7kGk2aG6kj5SRJJGC%2F3nfFdU3n0Lng2fwlrHwo9qHPYvZV5Ogqcm2CQZmKUI5E%2FnrSdKiwhA4zw%2Fldc8g6rjzxb0smCyEksexeSeYC6CNdBqwJoRhromCkJ3HjMavBNunQDMU%2FJX1Mp7AhnBZkk0aGucWHrth4zCvnihLDk7LSp%2FX%2FQdeFAW8Zh%2FF665I2B3J9ZjOTUO71RGrnWsT4DlL%2B3vIYXQBfMLvnftKbk8E%2FLeaoJe%2FVpdj8P46A%2B0JCbvDVj9hHsWxRUIfiaRSWNUpUw1ufNzAY6pgHchrVnjrugsj480uJYlkBfotOFyPW0%2FO%2B5%2FGEP6bsgvzc4I3jToCrUAPDM49%2BTWsd4%2FqwMvNSRSb0A%2FroUKZmTJBHrzeZlTiIoE2%2FlfjACJ7evGSpLwYjRI73CxCWh4OAOTKu6%2FD0d67xepptgB1WYWZRX8HJtE84y%2FGDhB1GrfCIWVzjRhNDxAvMGPX9F%2BuSyQQ%2FN%2BtsIC34vktzZw7zL8V5MDpx8&X-Amz-Signature=18ca6b6ac162d732ce651704b060d004c30f7e9e030ff71bec06fe7c57c3c383&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZW2R6TNS%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T201552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIFPw%2BY9StIVsNRCd49o6ahLgFRz2OnjZXTWDfmi2Fv99AiBVR9e%2FugGVPEkr4N4twdrSaIwcq5U5rhBBt2dWHb0Q9yr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMu1jremdfGuOc5vhxKtwDgC3b%2FFTcJU3H4FCZV4X%2Bdbq%2Fmxr8EWEAGOdUKdP%2FJj69rpq9iXYdRAYymPrO8Da8Ssvqtkyzw8ZROAtVHSB%2BwQSTdiN9EZ5PsWTcRFkPW6Bj41HlJPZjUfzvgXU5VW1Qwo15NFQN%2BF%2BUcxd09RxLpsw1jW2XxJjHLjmwpuMAkHyPTuZf48Jj4zeKzSV%2FJQ3bKY8Ez4pzxe9rmpJ8MdW%2BVI55ZqUEaGmY6OAS48vj8CpYNSMLdVak3q5pGS7JbDeOESvyjOWoff8C80x%2FMRtDnq75Kj358tGBko597PlS1ML8VyTaq1%2BRgifII67bpEWlOpso70u%2FZ6mBeQ%2BzZFgrhs%2BBwKaWIW9DZNZU2ZS33SHlWS64FKkO7txfOw6OE9GCGAhOiN0h9mkka2wqFZVMoMdUvAlk7g%2BFxczyJJApcA1RW%2FXjkqDTvcGb7oGwC6Jxk2cbVbmc%2Bqf3yiA2Iu2g%2FoP1b1rDiP2r0lvQCCY907jjk2UrPYETyDvRmI7f%2BZmXkfWq7vwWtvh4oBkLN%2Bs2lhAe7IJOl2tB8zJ%2BowTRf%2FxO5MapjXJo6mSXYLpn5%2BXunl2eUUv5uLIeiVpt1FeqC3eJ2FDi%2B384dEBNY7nF%2BRCjev0q4NeBHoK1Cq4w1%2BfNzAY6pgGamlbrHyTqOsUXO6kiJiHplNzH0vga0IQdRd%2BUIlUYna0VqDuQa0XwJ1DOZ1yFEBLyPHRc0UIgIGWwKaRxGNgVVJ8%2FQo1jf6PduLaB1pbnRnpFwCqQq4jPEB%2F%2B4CVHKkFjo220MSzEjcwTACfo4YN7b2sebFRdoKp%2BmwWbSaFJG%2BpkukygJCS3fuQGngvIxN1%2Fp9%2FgXXCw%2BYuYde8lltW1CofG5EA3&X-Amz-Signature=50ca462dc6b0edd4c00a701551d9fb5638ee716d4afa984c26cecd97b8bf8cba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46636MWSUNO%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T201553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIFT3uKLKij%2F%2BO%2FZg2AT4BR4EaukVlaO6m%2Byy1xJwU%2Bk7AiBMyMyWmoTpZf82ayyl9iz68PVDtfKFEgdVEWYxEQxWAyr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMJBdQen1OHIrMFizcKtwDUn897VsLGWJlRWTDkhxYiA%2BSqTYttXieN4KZeXz0OVl0vRGGU2VEhVR4PkQFSf6kL%2BgvMXJDnLL42YvnkfvdS%2BoUg9o9IjIk1QixGeREfV%2F0TTbNdPMZIJADS9AQ1Tm88oRiHzL23deKRQeKSQ7IS7SFeAQPXZfoZ8RMt68da%2FKXkD22aYv%2BKer46sz84C34FBTLzESegsc%2Bt5fBPxRyFICxaCDby41tby7frPvmFCVXRSkGUAnE4KIQwxGzkW17zKKDZ8H0ypSwLMeURMJGQrxkoHvAF27y47V8Eih6nV1UGfzP7MlWvRvsUPXrdLliwodiZMKiah4KVk2WLU6am0qvocCQtjTaG9kko%2FBip8PnFz%2FLAdx6MXfXS6I1IoQgk11sjnQqLLLXddRXJ9b3Fe1wvta99l%2FOYk92Z0z6ItNNW7FM1Drr5Eg%2BNUY9iryBFDQEQhZNcTsEw8%2BAUkqQDvwLI8XbQ6jlQhXzRg6zMa4QqbVBBr1vnLHHRZE87mkiM33e2EE6%2B6Q3Wex9svhaaMN98u%2FAraXc8NXj262hk%2BYMGRk6bHoPPNKKCRdbBEFpOx3T8cl5O6sY29n1XdyqMN%2BWAUhD6TfX8yK6bJISBsT6FSQt4k9RZRl05YgwrufNzAY6pgGQVLU9TdvROubF%2Fes7RZxdo%2BAvXkCsCAPCi0tXQsExiCFVKYrcfM1RZAkbHioiQt9IZ0gwCKvDEnp9yBUz2fx2ug9Ki5JSiBy2Btehf9QMCqvpTpHcR9oHQ8J9h4UhvhWaOfN0Z3BV1G9JLpTi3b7z%2FY%2BpMFXJcniip8hdJhHU30dAshokByoOpzNxRFvLOLUzBFpbZ%2BhPP7NUNt0F42ptdtk%2BEoBA&X-Amz-Signature=560dabca0b711ab411ce6fe1f05979323dbf7cd30938db9de6caac762b52c908&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AR6VMVT%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T201556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIHIK3f%2FzTDQ3p4pNwkFmWbIvNr%2FP4%2B0sYsYOVHeGl%2BB2AiEAiXUFpmvhO6Dq989dsx4j%2FjmU%2FUXxOvCEG0Z%2F%2F78KHngq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDPWApcjWzwastQYlCyrcAwNFGM8ACJFPQgblNN9KsjWQgHXFyoWlqtLvk1Cqpnw%2BGje4QMf1gUO1Cec%2BU%2B%2B66OPGvSX1gsQy%2Bbm6n2%2FOhNg5aOf58ZPN03FSyFtYbGKzGWMwrfjFIZ%2BWPVOduZY4c98L6DdvS3qM0f8bUeucMTzOEOdRU7HF58yEFSChcXZJqUyzOU1EFK6fLgv9pz3ImT0rhWCgzT7GQg%2BeY%2FMVZUi2izc%2BnngYA8OtoqyERTweAJ4MPvHP%2B1H3PlLNAZeRkxAocRu06zcxhL9f03liljGRuTDtHooq6SxCpiF2sW6xqSctfOaAZjkndcWJc7g0y%2BpEWiUZ1DmO1Uw76vlWFKqZPgVd8dZQt%2BFZSVjCcyKzVimnRirbH5PewzIvY7YG1q9K0Bh9Fj17RN4WOuxZ2j6msc1iz5Kn8FOfHG%2FGU%2BbcTRTi%2FDjus0F9867NGdzopoHxGiGSoEoAUjqaKi4Xy3pmeQulk7SMMwJ8oyB2vS%2FxSphTMSJ4yjvZwU4NIW3Bpl9PUiAzyQAUdd6OfxppF2VnMazxfZ%2FhHbaPcIu1rVW9uojDEHqmP%2BsoFerSrHdEh7NxNx9CPVNYMmSPSUFYtmGeaBPs5M4LYc7O1SXZJQn9djsE4Rk6pfTqoCKXMLPozcwGOqUBCiktRHUI6ho00juaQY5zMMFDDKuHapbTEwluYt4aqs0CTiyG2nJ3oFcc6OGfs%2Buj4Yth77Xyi%2FWfrswW8bGhAWOPqXLNGwGq9YOO%2BIs3dwGx7UDn6uXhKs1T0pGGc9g0C4ShNLIz2nps3IDMjRf%2FyoGGhS18DSn4ba7y21IWOmv6r3%2BkDp%2FKOXbbjCmg99PmHSIpIlRzsy9zIp25i%2FTHLohvZ%2FSc&X-Amz-Signature=e6cccd1d0c97edaf16dd7da8eb0d5643474a8c7dcf3b8ae8d8c8ad7d780fc8a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AR6VMVT%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T201556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIHIK3f%2FzTDQ3p4pNwkFmWbIvNr%2FP4%2B0sYsYOVHeGl%2BB2AiEAiXUFpmvhO6Dq989dsx4j%2FjmU%2FUXxOvCEG0Z%2F%2F78KHngq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDPWApcjWzwastQYlCyrcAwNFGM8ACJFPQgblNN9KsjWQgHXFyoWlqtLvk1Cqpnw%2BGje4QMf1gUO1Cec%2BU%2B%2B66OPGvSX1gsQy%2Bbm6n2%2FOhNg5aOf58ZPN03FSyFtYbGKzGWMwrfjFIZ%2BWPVOduZY4c98L6DdvS3qM0f8bUeucMTzOEOdRU7HF58yEFSChcXZJqUyzOU1EFK6fLgv9pz3ImT0rhWCgzT7GQg%2BeY%2FMVZUi2izc%2BnngYA8OtoqyERTweAJ4MPvHP%2B1H3PlLNAZeRkxAocRu06zcxhL9f03liljGRuTDtHooq6SxCpiF2sW6xqSctfOaAZjkndcWJc7g0y%2BpEWiUZ1DmO1Uw76vlWFKqZPgVd8dZQt%2BFZSVjCcyKzVimnRirbH5PewzIvY7YG1q9K0Bh9Fj17RN4WOuxZ2j6msc1iz5Kn8FOfHG%2FGU%2BbcTRTi%2FDjus0F9867NGdzopoHxGiGSoEoAUjqaKi4Xy3pmeQulk7SMMwJ8oyB2vS%2FxSphTMSJ4yjvZwU4NIW3Bpl9PUiAzyQAUdd6OfxppF2VnMazxfZ%2FhHbaPcIu1rVW9uojDEHqmP%2BsoFerSrHdEh7NxNx9CPVNYMmSPSUFYtmGeaBPs5M4LYc7O1SXZJQn9djsE4Rk6pfTqoCKXMLPozcwGOqUBCiktRHUI6ho00juaQY5zMMFDDKuHapbTEwluYt4aqs0CTiyG2nJ3oFcc6OGfs%2Buj4Yth77Xyi%2FWfrswW8bGhAWOPqXLNGwGq9YOO%2BIs3dwGx7UDn6uXhKs1T0pGGc9g0C4ShNLIz2nps3IDMjRf%2FyoGGhS18DSn4ba7y21IWOmv6r3%2BkDp%2FKOXbbjCmg99PmHSIpIlRzsy9zIp25i%2FTHLohvZ%2FSc&X-Amz-Signature=a956cb7e3c9fbdd4237eb304fd0cd4091d310623678ee5d2f0ee336a4b53a410&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TFZ7EH6%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T201547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQD%2BEM0%2BnOYkfm7992ZghuH26zQXFEwfjoM5AhPxEDjz1AIgLg6Z%2Futpfw880CNjuvrlBxaYYlsK0Qsn3%2Buiqig95JUq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDCo1eLLgoW0UzWWwwyrcA%2F7BeiXTYkQtB9RKwHM9rZ%2FUgGNBKZgYAmP0ACmh9r42zRnNfIqGF1QUyK40Qw4CWeEK8bpc7dZCKGlEfScSLv%2FJe8o424%2BBpl6AVskLmrwro0GIg2WPuHUmfHJ%2BxKqEUflpdwSNNom%2FbLx2MJiO5kuKL%2BOMvGGjDT4JDBC7RyCXWk3d27%2BMtpJIRw4HzingiWAb%2BgHXgmWulB%2Fq%2F55VYsIaeAgUuBa%2BOEFAH6BgGkiT5Y3%2BEF9x0ex5gaaYlAiZvzpo5mef40XsOLOSMwtbHkRpf%2FNrbVGrrdcJxnULDTobecn0Rq4Kozbel9ZRrvQ0UuPMNZJDRTQP6%2Fk7%2Fdxc6qp%2FTqq%2FPLteWAUd7%2BnZSBknHRZOQXmQ9PzzjBRyyBFuwv2lTYtoxeIFVzWYMyp50o9TA02c809M4dqKMS1T7RRWu7P%2F3EGvhnFh78zjnVr3zvxNIEFWex9VIlgnvt6y%2F4lYJKbtlvToq%2BFF%2Be0SFnjiL1h%2BxFrXqv9TQrkkVzAOQgmF644UxaJ6u45HxLg2aZX3CoZgoOoMbSZNN80tdSOmBBAMmqXa4IC8eYFyVsB3ku%2BCaJkuTHvUi%2BfhskmJNsNsB1vTyQEALhIzXqcdxsyULKouVHSoURLlO8MyMMnnzcwGOqUBe5DQcIqojp9nzWrgJE7UJdRHklGRSgke8tQEXWMsy7xvXKnZUmiuT4QuNGO5YYRO9IubYD2sVDsPhKVvrCEn5%2BSTTq3IVmprro%2FA%2B1B5%2B9vAgbGyw0riO0SGVt88%2BcZaUHxeQyQ6r%2F%2BZ0aqsE2sQ%2B4Zdn7uDaDaH%2Fz2zSmeODWfLlpSw9DAFYvEU7KaiSRKdFPPd1bhpjP%2Fb9rJN2v9NOixrPbs4&X-Amz-Signature=a66031521816d9bbcf581fe28514aad0ea94443e47140c8c5b654e873bec1742&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665353M4I7%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T201559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIFMG8P6i8zf7zPQRbE2GZwGTE9X5iT34FkJv4qbXhjj%2FAiEAujsWnxAeZTEKZN3zowYiKLc0UlPq9n85szqTif8cxiEq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDDI0og00yhj5OUc0JCrcA%2FfVzfd4LOVkpNgXZb%2B%2F%2BKmMx3F9pbeO6cXssf2WTDX4%2Bg3b2s6BsLOWwB4EZXbFi4E%2F0OI3okdfGhWgSeZlQlURfceTLReoU3pHJparAksVgds45dJI54QUOAbDAM3vvdLFaa4VllbMUZCHLPdbgdJy3OkdFhIulp4QgejEB7kawdUARhTNuCQVHCAa3uwbShXd%2BnuVId3D83vMSCzXKnPXDAef4JiSFLBMyvhkn3Qds4yF7m%2FwWMyqGYMra7eag%2FNxbOXMfm6Ytc5Pv2nzcnq0TQOzhQlde3byd65D9zQWJlfDBbJZeQSuICCTTVVE7e5ItwdpJXu3TDhNvTJqn9TXMNeDWhSr3bG%2BbwsDDrUvIrXBoFaKqgAac9jYOpJwmzI3S5AE3S3HG2VeeoVKFkyQcTLuJmKSANPSsbk99ruEUdW5CDOPYI8sbxZ3fnK%2Fhm8%2ByTP5YDrjt4AMthy0j1VJ1J4R5GzFEsoZ9ycreCsZTTiZc2pTHQMUkFpsT2y4DB9515dyn7yHAytEj%2BD%2B1Xc7Sl%2FSQRDaldneG6dzmRwndRBad0WAnK79QPGBxfZfdw3ED5j4OLFE0vG%2BDyfrXWqFkuNPYwce6vp56NU51%2BrToDFogwIIW2E%2BAg4jMOLnzcwGOqUBAsVOrLHWqf1KoYbp%2BSI3zuS%2F2MMR73%2FNZgf6hUMl560oc4ii%2F48MMQvppp86ybLg7BT8ZVLBwD6S1GXwDy4CBih4io3tWqoja8DSGdoWcd7QFOv2lw1N6Wi%2F9MIW%2FZ1kJ%2B0QQZ7urkKyCIcTL0xzU087AXvOdFDqy0YQdsbG1uW83WIsmSq6qL0oPUz8GIdIaRlUJR0CLvp07c9qI3v6owuqDE%2Fb&X-Amz-Signature=beb3005c3ef5757786d7b2edd53280191e443e478c48671b67f96e044f9355a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665353M4I7%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T201559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIFMG8P6i8zf7zPQRbE2GZwGTE9X5iT34FkJv4qbXhjj%2FAiEAujsWnxAeZTEKZN3zowYiKLc0UlPq9n85szqTif8cxiEq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDDI0og00yhj5OUc0JCrcA%2FfVzfd4LOVkpNgXZb%2B%2F%2BKmMx3F9pbeO6cXssf2WTDX4%2Bg3b2s6BsLOWwB4EZXbFi4E%2F0OI3okdfGhWgSeZlQlURfceTLReoU3pHJparAksVgds45dJI54QUOAbDAM3vvdLFaa4VllbMUZCHLPdbgdJy3OkdFhIulp4QgejEB7kawdUARhTNuCQVHCAa3uwbShXd%2BnuVId3D83vMSCzXKnPXDAef4JiSFLBMyvhkn3Qds4yF7m%2FwWMyqGYMra7eag%2FNxbOXMfm6Ytc5Pv2nzcnq0TQOzhQlde3byd65D9zQWJlfDBbJZeQSuICCTTVVE7e5ItwdpJXu3TDhNvTJqn9TXMNeDWhSr3bG%2BbwsDDrUvIrXBoFaKqgAac9jYOpJwmzI3S5AE3S3HG2VeeoVKFkyQcTLuJmKSANPSsbk99ruEUdW5CDOPYI8sbxZ3fnK%2Fhm8%2ByTP5YDrjt4AMthy0j1VJ1J4R5GzFEsoZ9ycreCsZTTiZc2pTHQMUkFpsT2y4DB9515dyn7yHAytEj%2BD%2B1Xc7Sl%2FSQRDaldneG6dzmRwndRBad0WAnK79QPGBxfZfdw3ED5j4OLFE0vG%2BDyfrXWqFkuNPYwce6vp56NU51%2BrToDFogwIIW2E%2BAg4jMOLnzcwGOqUBAsVOrLHWqf1KoYbp%2BSI3zuS%2F2MMR73%2FNZgf6hUMl560oc4ii%2F48MMQvppp86ybLg7BT8ZVLBwD6S1GXwDy4CBih4io3tWqoja8DSGdoWcd7QFOv2lw1N6Wi%2F9MIW%2FZ1kJ%2B0QQZ7urkKyCIcTL0xzU087AXvOdFDqy0YQdsbG1uW83WIsmSq6qL0oPUz8GIdIaRlUJR0CLvp07c9qI3v6owuqDE%2Fb&X-Amz-Signature=beb3005c3ef5757786d7b2edd53280191e443e478c48671b67f96e044f9355a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QO4TKDYU%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T201559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCICRnZDLt0BmpKEXHGh0kJEN6s950bTEgASRRFnMwrRuRAiA6mYEL9WeszTORTEK%2BEip3iLRZp9Q4Jt5amo3XUzP%2BaCr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMdRTTogPoMNYzRorvKtwDDep%2Fiu7f8%2Bjgw4CGV8QZfV7U1nBMcVpxlYrgYjpEJJxH1lUeK%2FRJkvZxvWiiE4XCW%2BOMLOvNchUcNESN6TRTfb%2F%2BcuxqKSQeMR7aEWoeNcw%2FwEEeeWtgtLYSYFa6wYOHeUV2iSZ3mL286g3aGnz6GuRQQzU96U8%2BTdKl9Rm7cNXOwnAwSKmlFcnGOPIOziPQWx7U4pd3NL%2BDtlXswTph1ZmZBGM9Zrq5RmFJg7egZeqynPpo4Jw0wpVbExiiaLEbex17MZC4sbG2IwdHtEYlGDhAsZcwEetOgYpbd0XPLh68UvPviKJhw4A3wecokMQDEjo2DxeaFaBwqfdMR14uQqMQwF%2FjIPuqvBXZPjOhjliV07XiNSkNdS9UtTwmvgFQxuwq4lrUNco8xwFe64PYnjr64hrFK%2Bx%2FW9TsfgaJxWTAaW3OgDLqiqz2KXk9sllabs76WVdsQtvSiSoy7%2BqtJhc%2FJp152P%2FanarZtRfZqsAGmUu3IALZHA6ZlWdRq12A6Y3JKw2KewYXs75i2%2BJ6ZGLV2lq7r7r8kP%2B8igA0oyBCILqaHietiUXvBTCrWiCuqCYJXUMsKvyKqZtjEWy%2BGZs3RDgEU8BlBt5nrVzcv4KFw0D%2BSk8TCxuPE%2BswrefNzAY6pgGQlbbqzbGvOr1wQHiQnQpTFnuHHM6W%2Bm81JSEG%2BEavWE5fkPLjUPfXKL3H%2FsTg6mp5fnrisJGbtZnaUA5SDQ5Q95pqaJcvxCL9WBGDuWZYL%2BikjQLw8Zqxlwx2hYxlhyYOYU9jzo9ZKRs%2FUa5scxuf9%2BGB8KLRij1FhkRK3onfGXrDHkcugZdJcIrPWhdJsbCnkFsoP7T%2B5s4uMscqmyM92K7LlbpJ&X-Amz-Signature=6caf5fbd5443a2f626b21e084efd252d8f18dcc369f7a9a0d437296c226c9bf4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

