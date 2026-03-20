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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QX3H27JU%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T231625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIFhOUp4kuXD%2B6f2wzUXHd2szm0rxSLhBFTCAi7%2FNzxGzAiAGwfzVALuWAb9NJ6m92lU6Vd7oFYl09e8URj6Xv2J4Sir%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMIvDkZ6OTqfK0Fsa1KtwDeB%2BDc6B7GPsFL4caSwX0ddL2igReqEQxaCL4aAZxo5dkAMRjZxCLvK%2Fne0ccQg1nOjW2wnxHugJ2aViuwPMsCj%2BaOakILPDNK51CgnFM%2BSR6%2ByYibPRc7kVKdkQ6DZusR3Hv2rR4TjMAn4gctsjNwwYbEOpf0Z7lexxTCV4Gna4K7vUfgewCQWDUL0sRhh65J9ZjBBbPg4oRJycYJ4OwQNR%2BdHgsGvdzYyiTs%2BzImlOebnvyEFL%2BClD4QIrO0lapDQEFaTFp%2BBgF0sgxvn9%2FP9N4QjpVI62pg1IFgzzfzrBumuBmaO5ZVlfeqOw0EFMy6u1bOgvSSIQndFfV4Mx52g0SWapRaGevcDgK7U9LZPjcHEObmgG6UaLC6i3lhIUoJHbZW71qSfhutC3U2bQ8zMKdIlLf3bTmm8%2BAMBfp4cHrBw2w09BsjTTP1BHGcgohgNpc31pVRcorMv4XiaT3i7YHM1zRY4my%2B6NG49klLinuDpZqq4hlAyIJBcfB%2B89Tpgp9clwwbvp1iGDV1toiW3bmbdTHnHUQGrhA%2F7FzKD4%2FXNHmDqYdKrgwfVBvNnEjuUeJzryN%2FfLEyADfZQYYcO7nf%2BzBh9dfs4f0DMJNUki4ily10w8AMY%2BxlbowrLv2zQY6pgHzQjVJw7j3ckpf%2BBJtT8jPfXhuxIEVFcHjADxuVUtK%2BSCPIDP1DNLi2O8f65vWvegnGUZy2LIcFbT82DapXtdgW5i8GMZSiY0oFNs3tBbSe0%2BJoyQW28GX8kOfx%2BtuSxzBxJWeev9SXmv4m97Dcro2WxHQSNxYBxx%2FgAeVehgKqhod8lae7Rinwku%2FG5zgSiGRBqL4Xk55Pw%2FplJiesZqGINyWFwIg&X-Amz-Signature=e665dc5a8f4077c8852506aecebb64ea62f5e36695ef668a2e07ab4ef7c99233&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QX3H27JU%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T231625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIFhOUp4kuXD%2B6f2wzUXHd2szm0rxSLhBFTCAi7%2FNzxGzAiAGwfzVALuWAb9NJ6m92lU6Vd7oFYl09e8URj6Xv2J4Sir%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMIvDkZ6OTqfK0Fsa1KtwDeB%2BDc6B7GPsFL4caSwX0ddL2igReqEQxaCL4aAZxo5dkAMRjZxCLvK%2Fne0ccQg1nOjW2wnxHugJ2aViuwPMsCj%2BaOakILPDNK51CgnFM%2BSR6%2ByYibPRc7kVKdkQ6DZusR3Hv2rR4TjMAn4gctsjNwwYbEOpf0Z7lexxTCV4Gna4K7vUfgewCQWDUL0sRhh65J9ZjBBbPg4oRJycYJ4OwQNR%2BdHgsGvdzYyiTs%2BzImlOebnvyEFL%2BClD4QIrO0lapDQEFaTFp%2BBgF0sgxvn9%2FP9N4QjpVI62pg1IFgzzfzrBumuBmaO5ZVlfeqOw0EFMy6u1bOgvSSIQndFfV4Mx52g0SWapRaGevcDgK7U9LZPjcHEObmgG6UaLC6i3lhIUoJHbZW71qSfhutC3U2bQ8zMKdIlLf3bTmm8%2BAMBfp4cHrBw2w09BsjTTP1BHGcgohgNpc31pVRcorMv4XiaT3i7YHM1zRY4my%2B6NG49klLinuDpZqq4hlAyIJBcfB%2B89Tpgp9clwwbvp1iGDV1toiW3bmbdTHnHUQGrhA%2F7FzKD4%2FXNHmDqYdKrgwfVBvNnEjuUeJzryN%2FfLEyADfZQYYcO7nf%2BzBh9dfs4f0DMJNUki4ily10w8AMY%2BxlbowrLv2zQY6pgHzQjVJw7j3ckpf%2BBJtT8jPfXhuxIEVFcHjADxuVUtK%2BSCPIDP1DNLi2O8f65vWvegnGUZy2LIcFbT82DapXtdgW5i8GMZSiY0oFNs3tBbSe0%2BJoyQW28GX8kOfx%2BtuSxzBxJWeev9SXmv4m97Dcro2WxHQSNxYBxx%2FgAeVehgKqhod8lae7Rinwku%2FG5zgSiGRBqL4Xk55Pw%2FplJiesZqGINyWFwIg&X-Amz-Signature=e665dc5a8f4077c8852506aecebb64ea62f5e36695ef668a2e07ab4ef7c99233&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RW75B7RP%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T231625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIAQnTK8%2Bs%2Bj81YQGr0YR5TG5TV6ENhySIPh2tu%2FxbZpfAiAYZFK37j0zfvWUraxGFW32908mqkNT0Ji1oktcL0dx5yr%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMIHVAZMOll3BmWi75KtwDKO2Em%2Fp%2FmVqSVs1w9AVYEBifWHppRit%2BdRDBk3X07Wl8qlYs%2BU7Id7KEZkrf%2FlXmcQoWkp2ZGaOFq2guZxZJmkKoOeu%2BzMLFjPyNO13L6uE6uVd10UEg9JlYrpL5%2FXzuZDhulJ4SPOt0YgXDOt7fq77Th49oyzUXOMt4k3aqHvaJer3xel4KsKdGMaWMgu09a0hZk7T4wUiI1jqREio07FDs92Eqrrt0i2jrUQNNOnTUCYoINIDklCgD8X73lcW72ero%2BglA75PBHOKuAS2izNtz8egsTfQLpGtcX1iIrpNVDpwWSDIHs44eD87kN7MDMSyjiBV4F1iDFCcTA%2Bg%2B7lhZ4l7iyN3Q4VfeXT70ko8IA3X5BsYGrjxuKUt5Ah8Se6lXsAbR9gFWS78Vx5hAsBTsmDYrTWRbAFR8vXwJQSq3%2B3%2BXZ4p8uOqrf2dgzLyjX3v1lC15hcdiV3kTmwa61sCa0EwM6%2FKTbDSSXSLIpzhYIdGr2zpcSLG7Gi2gnegagiP9%2FEdebhxuANXJtoGTNGMfVcQ0kDOJ4nqoHqIAnb575KE0eMIEoZ0rfPYQlhzsngMS%2BpiOh6YFSNaOtQUQc1mwkZKH3zAhOkpnH0e10HC7H4L8WDja%2BAWx4Xsw7Lz2zQY6pgE3Q9tN32S0XFmkqYPGLLuURluSyqmtaxSawzuYn6SNBZiqAYh3jMCQppc6Om1qVCmvr%2Fl5IuvqC07B5WIghLh6LPdXCKQbpDP8nxcCtOVGGyXbZULa0Y1t4PLsTSeLaKMXYdPM7RRAeeTqHCcJ8D1ByGEuaja7s%2BfSz8nerDCrEXgLMoXTcytNQLAS%2BiWi6ZmEDUt5Uf%2Be%2FcEXB3bp09bFh3oRfZYw&X-Amz-Signature=305f814b44baa182c910cc2ba21ce09ad5345eb44754454e8158a1dfa050cd41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAVMEXMP%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T231629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDKVcEiDtyyE5%2F1mC6i%2Fr2jYSrbJ6h5mwy%2B067APTMwbwIhAJFs%2BqUA9Vnh3eK2aa1BLMqMy629bC2Aaat0AD7krXweKv8DCDwQABoMNjM3NDIzMTgzODA1Igxxw92730lK8qOcg5Uq3AMbxhk4558gz4pxv09M93Xy2NJqeVChom98SipyLLYG4GZZ9TVX7nfm1CbAVcxWQ69ZsvoJPY0ZWoh2tp%2BuevIeoR%2BnFvlunfHQDZ7DOiYK8YIg1JSrSpTaaQunzUctQSgoYSA%2F5msG0UzBnVKt3pweOdHI0YX6xK4cdDiEjQWZFkk1BvSe02Zc28B0zP%2BzdaozAdPZwQsF5OAYIcebrox8tLvGWHg28%2BF9gsiEmQa0%2Fi73YOlqCLW9v8y%2FSKUAoa%2Bmy%2BlxdUOOhslAWNqzUdciF3L%2F0nsmoaEtYiIgbgjv1FfYm56rEYEAUAhENmrlV1C217iXn5b0wNbgyTPnP8qHxRN9JIZhe8U%2FN5c%2FI2OrnpYM5TUAO9njs85gF5NR52m%2Bko5bAzSF0K3tHdDtwubSX6VxKgkMlPyiclvZuGV5js8A60Eyi86i7E78TFPJdiJpYbxo5uLq0Gd08xo7zHiZijkweHLnS1ueZiOWn3EIW5IFn58z4zLXNjSv5Oxzh58jEyzXcIqqYqCCqDyb251fWMF473i80wrFKiyWL1Jsb0Sp4MPwU0EeDyTP7lhywuA9pg05bYcaNb1Sm19cPhsqQ3xWMUkmc7XcNPtlQCCQIT4RDXDUMuSyGx1aDzDvvPbNBjqkAd0MjGlMtNESiVmkP68ePQgP59iRz0uDEJQm61WqRyziihXYrnGQzS0bevOYHZZUazeD8lRhSIhlDgCjKYtKFBmT1gBf8JbU%2BZCWJ4jNgYbC2VZZGLXcXv1AD2EeqgggDkicuNeB08gqKsJe%2BZEWJiigPqGKLiNu%2BsZbN7FAtkMN4wG7fvlufa7dmVO%2FOJJ494GCDizbHUTnaEiia8V56BlWTpU2&X-Amz-Signature=2a9879fbd631de8f60a1afec9340733966478acbe4c51c673e62bd55dddd1655&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAVMEXMP%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T231629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDKVcEiDtyyE5%2F1mC6i%2Fr2jYSrbJ6h5mwy%2B067APTMwbwIhAJFs%2BqUA9Vnh3eK2aa1BLMqMy629bC2Aaat0AD7krXweKv8DCDwQABoMNjM3NDIzMTgzODA1Igxxw92730lK8qOcg5Uq3AMbxhk4558gz4pxv09M93Xy2NJqeVChom98SipyLLYG4GZZ9TVX7nfm1CbAVcxWQ69ZsvoJPY0ZWoh2tp%2BuevIeoR%2BnFvlunfHQDZ7DOiYK8YIg1JSrSpTaaQunzUctQSgoYSA%2F5msG0UzBnVKt3pweOdHI0YX6xK4cdDiEjQWZFkk1BvSe02Zc28B0zP%2BzdaozAdPZwQsF5OAYIcebrox8tLvGWHg28%2BF9gsiEmQa0%2Fi73YOlqCLW9v8y%2FSKUAoa%2Bmy%2BlxdUOOhslAWNqzUdciF3L%2F0nsmoaEtYiIgbgjv1FfYm56rEYEAUAhENmrlV1C217iXn5b0wNbgyTPnP8qHxRN9JIZhe8U%2FN5c%2FI2OrnpYM5TUAO9njs85gF5NR52m%2Bko5bAzSF0K3tHdDtwubSX6VxKgkMlPyiclvZuGV5js8A60Eyi86i7E78TFPJdiJpYbxo5uLq0Gd08xo7zHiZijkweHLnS1ueZiOWn3EIW5IFn58z4zLXNjSv5Oxzh58jEyzXcIqqYqCCqDyb251fWMF473i80wrFKiyWL1Jsb0Sp4MPwU0EeDyTP7lhywuA9pg05bYcaNb1Sm19cPhsqQ3xWMUkmc7XcNPtlQCCQIT4RDXDUMuSyGx1aDzDvvPbNBjqkAd0MjGlMtNESiVmkP68ePQgP59iRz0uDEJQm61WqRyziihXYrnGQzS0bevOYHZZUazeD8lRhSIhlDgCjKYtKFBmT1gBf8JbU%2BZCWJ4jNgYbC2VZZGLXcXv1AD2EeqgggDkicuNeB08gqKsJe%2BZEWJiigPqGKLiNu%2BsZbN7FAtkMN4wG7fvlufa7dmVO%2FOJJ494GCDizbHUTnaEiia8V56BlWTpU2&X-Amz-Signature=825923d8198bb39b3e7ca6cd1446a6cfbc48d3bcb40201096a6152de1e6b9396&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XD72KGN5%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T231629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDsHdqc9ePdArX1DC3bxfm7RZNEA%2FAeu5Sv3sScB4MH3gIhAP8gvAYzcxUFFVa8zJsSnb2fONR0k1n1RdN6PG5EJTGPKv8DCDwQABoMNjM3NDIzMTgzODA1Igyw1%2Bky%2B1RR3uEVIVMq3AOyZqdaNzzvSVeNlBn%2FFzAKm7vxhdTWFd%2FfknRfcrzwvh6QbUA22FLNqLv5Zj0P5G8B16jn2rJekeAmFEzdFWaoYEbLUH83YZBVgVZcR0kPQRsxRVu2K8jhhf2nTytmdXIHUtSqxt%2Fn30JQ1KucKiS0XX4lpwKTO08YfLscAjtDjVytG4N0uXPxfiooNfEwsywIRspe3PKm7uFYFokgsqXiFw1jNtxV84D2Q8RnabxQKli3tnD%2BEpVU%2FN5zC3lqF5YZaRHgwxm2USQbN1wkSsE89FlEECIrbGe4oAFjuX3Uq42mioTvBJO%2BhCmsva6pz8rt1WsfoW7oBInhjKs6dOOFqn4%2FSIe1UVI4OOi%2FLmovCw6dfrK9ZdveGxVz8HqEMCRHBopioOXdLNc3Q7pFh0pT%2FTeekKGOwA2Qra4mJA410%2BjbfzweEpkhu08Xi7dSLdJNe82uRwkANSfAb8%2BfUE6eoPKnqUKWChbtTeAN5ltlhTQRwBU7zTNNXf48UlqncFQpKdbZbD9WmLFi0JYJOCHhaPWtDBDMdrBOHl9bcgGYb%2BTfkTUh%2FgPTmwQ3Xc2Z8TcAHPK8J6Th8Gp3%2FO6SLVyTlmQLfjc3WO8v4yHtGmIvC6bpXb6jBNomUVReoTC0vPbNBjqkAUDgEgyLsHgoS6ErhdDyOLNwqUz5yoWvo%2FJSppInQEj1oPcV8RCc7Kv1bnzbtXS6Dj1x16O%2BQJsy8xFUDCdv%2FJDwInLHKnqARq9gCt12z0rF9zxfGXtc0nKI6QVpIwhWUzc%2Fiw5iv75b1m3bXvaWJ9MgUFgHudrY6fH0SmKUzWrAq7tAnWFX7vl%2BrCmZMLEI3GhoshjHXgF1m2X7%2BQB8W%2FKVHewv&X-Amz-Signature=0481717dff571085a2e763f6a4dbf651ee23926f0d2c7d52f2153c9ee4374c0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHDC5L55%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T231630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIB6d1auukMDQhcLmzFJTNytjOQhw9X%2B3QxZHwsiKBijhAiB8iZUn6PSqh7yECCG%2BFW%2BD09k4YXUN%2FkaVkgMaadMy0Sr%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMYY1vXEiyldCoeG0eKtwDzLxF2Jh2fiCAbqaldcndC5VppjsIpbVEodBEkq9uxYFc85j6UPR40x0d%2BZmt7b7AaXHrT%2BCDs0Yd5%2B%2B3ZJ7OWSq7e7nb9IhQPYSTbXzJZjkBepnFoYvKdxT3l0ICjszOkLH4kxqWvHv9zag8rubeF51s7cX6FrUE0cuS71VhE22tp%2BnVhzq5gfwQr4q1sHvgCfVaXMs5LLDr28tBpcWtBOVGEWpJKLlCdOz%2F1zzLjaS7wsj%2FVR5ZdpSKuqQqGYm6Hi4RaIsG3I99aCYG5Tq1fBboi9aB1JcrZM50PrwA%2FqE55vg1ZqDraT9mJ2n14qHn6oIPilf1ubh0o9ZF%2F80%2B0QxAsN4rxVAfvyuzn%2FtPP92YHQjF5kGzgxE1ai2gwSI%2FkQlP9uHcy434OMS397gp%2FESREccXfdOur9QAF58psZ%2BS2OzxQ3mVsh0yB1krfTnKebmEl6Qhu3YxfXoLAk6uRK%2FMmuD3WejlI9W25i36GWvr4dP6ow2a%2F%2B2Ekvv0uEAIK2bd1FgNOPhiwC74Ct%2FLfzmku5c8PnO7EV1d1SqY%2FvqhV88Z2KvoJ4XHUgpfpNODXNxnJeXf%2BUbdTvVGs7s9vP7aHTmkhLMv4Vk7h4cMWJtktdLGljNLH%2FmAV0EwsLv2zQY6pgHJ1sW2R9YH0jhjwL7uQxdkWh7ee8TEuPsaMB2yB1MoilvFb96ZXzfBBAaC2Ig1kzSqgr%2BC5BR%2BwIiZeZieFXld1kci2qXfPxEOMt1oIvHjZauR9eOXuPn5rx%2B3UfJVOqGSNd2LzgbXcPLKNFhDPP8nKbeZIi76cpkSqppeyX2FfiOGMpdEkXxeiW3H4qrAyVw%2F%2BN33LKAV5QW5roARiTLLz4ZGaJgH&X-Amz-Signature=fb984319566d7f41dc5bfed97769e80d89f0d36fc0a2dd5f13c08298c79b6a86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667V54JPMY%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T231631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDR6hRsoTFRv579U5N9WUJJgBtBEU3U5%2FOLbHHzXufjQwIhAJJ0QlMDLLVwdQyHzt20C3pAPbCV2kVlA%2BvRJQ8EKzzqKv8DCDwQABoMNjM3NDIzMTgzODA1IgxXCXC6D1IHHZtrtqgq3APgkdXl4TBSCkoxkg77kthwFiOvaMyY5WdZzlndg4FYg3r7dacHRs0TCPoKw5s6YONAbMNmvgx17DAPh0S5oE6t1YZdV7vGjNd%2BI63RMtic5NYvB68H%2ByxXNz4pB1HiYhOPKGdU5yBxQmPOR9jgT9pyHhuutZVO%2FHg60VqPX7JliomHdTMO8fknFVsF0NJC0%2B0XOEYfyatnDf0qFSgmVJ%2FwdPz7%2FJa8vvUpZMFN1gWDJ2XA2uduRFQNqcJhlqcRxba8evg9OEyVb%2ByXPcqv0Ojn5BCcqNZXOD8Vw0LVmwRMixD4itEnibFlvJF68w5Skf5M%2BTkBC6T1sd8ECd2Fy33h5wlJY7KWpb7zUBgJmyF5cZKJBSdldvSeOEWMeJAwubP4bfbt7SEe6zSbkmCnOBmeyxQ9i%2Ff49q63zf1GoF7XBejaAtzhomunUPm7hvGku9O3lQejL%2Bc42KyHeCnnSFtw5qLrdbKgVhxtQKfuFHV%2Ffmb57Wwm1RIo7HVDVfIM90%2BnxXMokRifjTKOh%2FxiwZfJvSWANZIhMx6SR4n0rXZT%2FQjatb9Sm6olxRH2OZCkMF30V%2BzDgdfP5Dkuu6Eu49xpVo0ecx09IAJantgOE1Br584R%2FgLtF18BNRc%2BWjC5vPbNBjqkAXOaEgFUGJpU6DpfQqtWLpiNhlzB20X3OJFG9oiEumKkpWv7gqYGGByuTku5m9GcZeuqlWHPaBdi%2BNesFN8PSWg6llnIuQl1V4ZPmGbYi4cWmKDUOvGvy6u8pSDHfXbB7qdTC3yiLDSbEY8DNEmgCzYV1q20NqOSVRSecOq73Gsk7QZggLBGBrRbC1cK0NCdcXffoqldiNqLMAXMZoOhgeF0BCry&X-Amz-Signature=5bafbb6f0e81207650141936d36880a66e395dd5d14b1d4b2753fd28fdef9925&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RM2QSS3H%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T231636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIElqr%2FNjtizd3IU5rf9%2BTk2lpY4Qr7nJRgvtoO%2Be%2BwW9AiAbFKnX06Aqm5XoLgJw14e7KZpWzHX8PE5OKJ0wURbEeyr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMC8kRcxqtWtGq2TtDKtwDk5ziRK45lHwLWwWOpImi77FmsOCB5c%2FEMYygxj6PotwZHDzCOtqgz9ERyXI7xAgHgpyoHyoP2YHBCs2gzKBeQmsnuudLoIJQ%2B%2Be%2BrSyldWgkxogwQBc3TnrlRBz3jZlP5Zl2Af7%2FrAh0qXiw6vdw0s%2F%2BRajeZbGV5HYNNKJWGxbM13cmzWCqksuc8USaJhWtXbVgN8Nn6%2FkWyzyKindQkfia3dtKtPu%2Fc8FGSIDzDSxcC%2B8Y1Rbmo%2BIKfeCnEEK%2F5nIPJR0bVbMNPgJEQlIR%2FtuoctoLLOjHWz5jbvKcz2qHJqTISS8%2FIknTjeb9ht9t1FcDS4%2BPI43UVT%2FaXDeHJiNMTK5A3n7moAyldvrVe7v1V3ReYusq9VAzoj6inyi0MkYw4JfeBMRBCKDbQXz2yPH1kXUM9UYR08N9YRHLEm3Vhv5vp7geMsC0cW8C4y7ucwLoTjLUaWIz8WYrKM%2BRQ0d25kZLnr3HXx6sNjQYtRmPYJJUz040FeqYUntL5gHNXtG0dHyGbynXLQNNiDlmPr93Kn8PwKFErMR1AtUUr%2FUCuOYOWg1d4NfW%2BlYwKEU1mgWQCztvPGkSsvwWkNMoPlxnYyTwiM63%2FGOgPEUQxKQsqT4jIDmSbkN7NAAwupz3zQY6pgH1638SVV5p%2BHhnTlrMdnxhP3pp7HOVVfFZCINAYpaNO1Sbu0Q20G5tTMJlETJbyIRT1orHethDIboojCCrus%2FN0ChtElrwNTKmeFpaTSV3VVCoyPebKKjN%2BnyBy0Q1c%2F8KvThW6Rkk3i7Tx%2Bh%2FOZXPwoFWSPVaexYMVGOiQdYwITBLQnBJ%2Fcb%2FAKlQnJZqUyNdFqFuaMU6VmvnhpXDW6%2Fr7Y1h4vaK&X-Amz-Signature=f8d908b77bcfda7d7a10b3a1f8c357c2dddf1f9ba829ea0deb1d4b134417aa4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RM2QSS3H%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T231636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIElqr%2FNjtizd3IU5rf9%2BTk2lpY4Qr7nJRgvtoO%2Be%2BwW9AiAbFKnX06Aqm5XoLgJw14e7KZpWzHX8PE5OKJ0wURbEeyr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMC8kRcxqtWtGq2TtDKtwDk5ziRK45lHwLWwWOpImi77FmsOCB5c%2FEMYygxj6PotwZHDzCOtqgz9ERyXI7xAgHgpyoHyoP2YHBCs2gzKBeQmsnuudLoIJQ%2B%2Be%2BrSyldWgkxogwQBc3TnrlRBz3jZlP5Zl2Af7%2FrAh0qXiw6vdw0s%2F%2BRajeZbGV5HYNNKJWGxbM13cmzWCqksuc8USaJhWtXbVgN8Nn6%2FkWyzyKindQkfia3dtKtPu%2Fc8FGSIDzDSxcC%2B8Y1Rbmo%2BIKfeCnEEK%2F5nIPJR0bVbMNPgJEQlIR%2FtuoctoLLOjHWz5jbvKcz2qHJqTISS8%2FIknTjeb9ht9t1FcDS4%2BPI43UVT%2FaXDeHJiNMTK5A3n7moAyldvrVe7v1V3ReYusq9VAzoj6inyi0MkYw4JfeBMRBCKDbQXz2yPH1kXUM9UYR08N9YRHLEm3Vhv5vp7geMsC0cW8C4y7ucwLoTjLUaWIz8WYrKM%2BRQ0d25kZLnr3HXx6sNjQYtRmPYJJUz040FeqYUntL5gHNXtG0dHyGbynXLQNNiDlmPr93Kn8PwKFErMR1AtUUr%2FUCuOYOWg1d4NfW%2BlYwKEU1mgWQCztvPGkSsvwWkNMoPlxnYyTwiM63%2FGOgPEUQxKQsqT4jIDmSbkN7NAAwupz3zQY6pgH1638SVV5p%2BHhnTlrMdnxhP3pp7HOVVfFZCINAYpaNO1Sbu0Q20G5tTMJlETJbyIRT1orHethDIboojCCrus%2FN0ChtElrwNTKmeFpaTSV3VVCoyPebKKjN%2BnyBy0Q1c%2F8KvThW6Rkk3i7Tx%2Bh%2FOZXPwoFWSPVaexYMVGOiQdYwITBLQnBJ%2Fcb%2FAKlQnJZqUyNdFqFuaMU6VmvnhpXDW6%2Fr7Y1h4vaK&X-Amz-Signature=eee6ae3c0c8ad85dc035999199075f499488ac4e90b60b4daaa30679db3ba3ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665564CA3V%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T231623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDCHHRGn9EGhbc6ij2r3KetZTMFysiWa5u8OxICF12dyQIgfx285rcd%2F%2F%2F8YtUaLOEXSVqDu0LctFV2kdfwIUdU7fgq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDIdFgZqx2Ka2q3JjLyrcA4t46o5dXjJx4iRJBj2BDyF4tsFO7w4U4qdN8vEfseuoWNMqhLu7JZ%2Fkq0dPtDPHIDp%2BlAEu05qRLW%2BIoiZ6c%2BKDcr%2FADC58axSc8FvZ6H5r7LkmTEbMDCjIxqZuC9bRQZDqgkjrdwMm9AG4FG9wUmjSNbx16BXfsf48r1uMvUcRiWlwbq7Yb0OP00kuTBxt3j0xTl%2F6gGEfZk7Vh18ICSIXTnhAGf%2B2%2FdTs3ONJKVyNbokj6gqsl1b0nRKz%2FIVetxGPKlfXSkVfVO3ks9AE1t7C9g2VzlTJbISFfybYWFDsSeTmZQsutKEMh8l6E3sl5Q5VvKWOVNOK%2B%2FkdTeqHeeZAQmZ6B2FxlkX3UngnpH5LS1c7ddKyAaiQUAwvs9vR6yWURt%2BGMjuEVUac4jeC3tRsFqIwknRl67CCH%2F%2B6btPQOHpzHrQj55R1cGp6KL34uYA0KP6X0m5b3iDiw92Lx0WMTdkN008NABB4qftKSjfJgbVw1FQwx22BadpHx9KiOcAARprtZruNVwkLGTuv%2B2xomw%2Bmkx8DGwLUfV5B8DZiRwAP2KpK63wRXawJhIp2KqYpfnJV6MpkCuwXvZ00eHXEyh2GofVUKmUaQLJ8LQUwLGzGTxwnHjAxQ611MMy79s0GOqUB7yvDBhI8LfuoYu6QpagUfkkZa5ziEK9Rvp5ba1JbooTUr05ZKVv%2FJlAmZuVqRUtbDGakM842cOoNkGLV42m0S9RHG7QT77JRpQ2Md8tSmqcPsrB5ne8BUqbKUjg8Ae%2BGuqCnG8OICetrH9BxA4911gVhL309NKmSsR7qExJnEgEk%2FeYmqSW%2FPimOjVY9sPIJwxM769XvODh1wsE0AG0NWhkOm40g&X-Amz-Signature=cbc837b4f4ee8c3ed00dac05955cee7a95cb03d5ac6d9b5d5121150bf0829c8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TY6GI3HQ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T231638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDy3LazU2FA0z0lft1UWRVyKPuzdufZpak63NSEIQD9wQIhAIJ26KYk1sAUCTqJHb6VzetUgvkbhV01HDObwJl7G8uiKv8DCDwQABoMNjM3NDIzMTgzODA1IgxojBYoXtbku7g%2FNPIq3AM%2BDQUyXljd0uzrkd01uedWnWaMk%2BbNkNZFBJOuRvMV4dp6EWXx84HAIeGcuQuijIiSU88xn6MFeeNbRXwnkZFVz4bB4zzaUskFlKu2nwl3tiTs4vgSy10wn9U%2BdrYHWJCLp%2FgWbhj1ToCOnRefwHo0iR2a7SVSsRktaH%2BUHrJl9zMUgBFGbbDj5QspSlmTvz%2F8hR91Vdb1NOcg1a1c2MSwVWLxt00PwitCDcl%2Flc6z8q56gz5R4YWoXcfvYvgOjQjypf05So6cJRkBZ7jSQZGByJsgShAB7vc0HGYM4aUZLVFqmMpTLqWVAMYj%2BU%2Bte%2BYxVeS1jUaJyjCJ7W8msbT7FehDXMzp2nnYBmbiQHVHtO1op6umBFzMUv6yHShZ1FFs6bFLokpBZ%2FZ%2B3KlfuWcFLh4PQftjfiMN7dI9AMpDGgNTaA9Fro9hpKK3oySJ0sN8rd0ttqIN9liPOTkxOVTLpVa5vr%2BlnmsIiwKQ358UeWbyi2imu2tTzjZW2YnoFjJSLnNHaW9UfFETp19v5hSPmct5xAQsB3WJcwZdzG122%2FXmSUrelF%2BlhWq3cYsicpxHRv0VNRlMZQ1yaApYtXzddm7wrwUVs6fqALFr49LDYQtEVWmOZT7MkBuoKjC0u%2FbNBjqkAUafHebxEuLeAFkqyipcBHgR19im6HXLRfwwgebrylGoGv2BJXlRGer5Kr%2BETGtsED%2BIR47JXVrclsbPjv49TCE7uMwniqjVXIGG2KJBEe6X8qEPgGRo7c74y8To02fZA%2BLT68rz8iZLkVnGKpLkp1iWPH7E4FqZCKxN6IXlwq89pNNN8izIMcNaVPSKIs43irHHRMaadr9Iw1SLuLrKb6sygvTx&X-Amz-Signature=13295fa1122048353a7f41fc3a38307892a79908760fb411d2615836389239a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TY6GI3HQ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T231638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDy3LazU2FA0z0lft1UWRVyKPuzdufZpak63NSEIQD9wQIhAIJ26KYk1sAUCTqJHb6VzetUgvkbhV01HDObwJl7G8uiKv8DCDwQABoMNjM3NDIzMTgzODA1IgxojBYoXtbku7g%2FNPIq3AM%2BDQUyXljd0uzrkd01uedWnWaMk%2BbNkNZFBJOuRvMV4dp6EWXx84HAIeGcuQuijIiSU88xn6MFeeNbRXwnkZFVz4bB4zzaUskFlKu2nwl3tiTs4vgSy10wn9U%2BdrYHWJCLp%2FgWbhj1ToCOnRefwHo0iR2a7SVSsRktaH%2BUHrJl9zMUgBFGbbDj5QspSlmTvz%2F8hR91Vdb1NOcg1a1c2MSwVWLxt00PwitCDcl%2Flc6z8q56gz5R4YWoXcfvYvgOjQjypf05So6cJRkBZ7jSQZGByJsgShAB7vc0HGYM4aUZLVFqmMpTLqWVAMYj%2BU%2Bte%2BYxVeS1jUaJyjCJ7W8msbT7FehDXMzp2nnYBmbiQHVHtO1op6umBFzMUv6yHShZ1FFs6bFLokpBZ%2FZ%2B3KlfuWcFLh4PQftjfiMN7dI9AMpDGgNTaA9Fro9hpKK3oySJ0sN8rd0ttqIN9liPOTkxOVTLpVa5vr%2BlnmsIiwKQ358UeWbyi2imu2tTzjZW2YnoFjJSLnNHaW9UfFETp19v5hSPmct5xAQsB3WJcwZdzG122%2FXmSUrelF%2BlhWq3cYsicpxHRv0VNRlMZQ1yaApYtXzddm7wrwUVs6fqALFr49LDYQtEVWmOZT7MkBuoKjC0u%2FbNBjqkAUafHebxEuLeAFkqyipcBHgR19im6HXLRfwwgebrylGoGv2BJXlRGer5Kr%2BETGtsED%2BIR47JXVrclsbPjv49TCE7uMwniqjVXIGG2KJBEe6X8qEPgGRo7c74y8To02fZA%2BLT68rz8iZLkVnGKpLkp1iWPH7E4FqZCKxN6IXlwq89pNNN8izIMcNaVPSKIs43irHHRMaadr9Iw1SLuLrKb6sygvTx&X-Amz-Signature=13295fa1122048353a7f41fc3a38307892a79908760fb411d2615836389239a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKLEQ2ZE%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T231638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDl4NapxxFDq3clx%2F8%2B8vaL2CCBXfa5KsuAtm8nPl8FwQIhAMH3bH2EQkAfRrBnaoxaKxzGMNflY6K%2BybFp18crzkfgKv8DCDwQABoMNjM3NDIzMTgzODA1IgwZSC%2BB57e1B%2FEk0Gwq3AM77tgNT5LWPMztYUrnK2uw8u0Gy9FswcjNNnxU4svQAX2Jwh7g6FYbMxvhsiCjLAVI%2BZzpsQsHIMJ6maCWStScZZAzCALuF%2FXSnPF%2BJ6CeniEDxWpS%2FD8TV1o%2BkXxvpThRLWuNIT0WCdoeLfCLs%2FmeSHUauYA%2BMMGLkjVJsoUkiYZM1dllue50jLW2oIHd7A2LpwjG%2FNFzfzqFKUo3tvKwtnhpuLAGoQP8JbdD6VuA9OJ1dPoWKWB2jmNpFvHhRx%2B6J%2BIXKEE5F5ORaXmGzWsW6nFp2tdV2ZhlNLkTaaHezowi1ep30%2F7oEP9TF6u8UoYZfx%2FGlC1tga5U4A00Oz0XAkuNKIhlnocaR2rHWKzDsVtZcRXlCITUoJZHIcRZZv5m2LHBWTHryMVmit9gehppGHhPdNGzdndIv%2FM2N8O2I%2FrUqsLkJONoA0RNloUVOGFWEChO6mnbVwNshWeXZr8jcao3IyTjwxVdGkrJEu%2B%2FG5X6GMLQKqEjt0AtcSsiozpQFyeXHlbBSLEsfbRDzR5jXhIukHGZHM4dHYYwR8qJcHhSnvICXSyouoTkthtDPRRRrnukBy2l5NDgs8hkefTgzSDQ6TanQIFwWHIE6WFnHyoJYbHnvj667rkqsDDHu%2FbNBjqkAcDebQjY5iJGFeKgSY8INeP3sIC3B%2BPerB16yrwBQ%2FyZwcqdh7YoTfySPIZuG7N%2BsAiJWHoAL8JRP6MUOZjmRypNYlrUQ3BzZFOoLKtMKdS1576eRyYuYUpzjXX8dU%2FwpEUyN%2F%2FXTt1G%2FqFjR0wrr%2B77jLcdW%2FycSimI%2BsJ6XXHpBFvu5u%2Fv7g8BH9hLWEb5i%2BWvLj%2Fu%2FFmCOuPW3WGyci3OtD6G&X-Amz-Signature=3805773bad88172c1f7200991f5aa0bab58fd9a3a309cc365bd6d03a722e9b2e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

