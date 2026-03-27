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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664D6C2AM6%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T083531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJIMEYCIQDmZ9nRPEDNnpaNpZNOF4p2mRltogguGTXw7ADEFPdpqgIhAMTF2v5x3OI1uXuqiQci8YdrqHOm2zCZHJKsUcAf%2BW1%2BKogECNn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx5uP39TQ8lwBkWm%2FUq3APlxOfvkIJzk1F9VTqbu5kuwvFhfc23JPfQyIMv48qUkHEwevVSfA1FwVgRoQaOg8Q2AkGkaa%2BCWOgA0ZRhs4Arw9aEK292g3huy4BKNcNUxy%2FSlulcoAI8KRl3Kh7VbR2rcm2NeXYhUZLI3ZuIlFX6faerSdvkzdXwjJimF6jHq0%2FJcjqh71rdFEaYj3qFlSxpR8nJTsNvlzekkUSBtLP7xjA0I%2Fgpl4%2BfrtQojI3o%2BB9U5YyKcK2Bf3ALEyPUs8NBKqwJ94VxHIz%2FO0tHRU5DkX%2BBAm4okLJAs7soxr3uW4sAI4I3MaqjlLTu%2FsQRMcciStDOgVmo%2BcoOO5Ba9VCnIJRQr1zqRmEe14sRDtfPrAaxPXCSRwMhpNFgPT7fCXrCJPBWinSsh0gYuVGAQr7pA3tmpTn4AmnZ3UVsEXzGFXLEGgRJlE6DxHrjHzAfvK3s7vx4h0s6BZ2L8FtYIaxuV2mQOiBJhfBTLzS9kI5Iyrf4Z8PVNTfLk8ZT0e8WPwO05lKYeQL48S9SxzPiq2rOjMeEHhesfV918hpdEp877O0hTYMth0wW66Pkgd2%2F9hACpU8upBdjqR8RW5BDMoXbS8wZnVC1xKKfIQHHiUjbb06ikqo3V0d%2FFQieNDCq7ZjOBjqkAXspbJQqS7zSYm2oH2WDgkRi%2BrYYxyy1dasUoIZf9%2F0SbBkQxoiZHnbHNJ%2BaK8Y0M0Ih3hj6oRayHRdll2NN5BMiA%2F9Q0hhND5OnnTy0D6RlH6ZRxYdpYzlnmf5fFGmlTtO5TCQi9j1rkhYDh%2FCFDtBO16tD80zXMZFhDF9VbhUlxNnOU8Zt6JyeEV1OpsveWUldKRwTwBW0ISYLUuYTUT7yTvK9&X-Amz-Signature=98cf1fd48b814ec368a80425b96377eedad9092c7cdfc9eb08a72e2d5f70f6cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664D6C2AM6%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T083531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJIMEYCIQDmZ9nRPEDNnpaNpZNOF4p2mRltogguGTXw7ADEFPdpqgIhAMTF2v5x3OI1uXuqiQci8YdrqHOm2zCZHJKsUcAf%2BW1%2BKogECNn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx5uP39TQ8lwBkWm%2FUq3APlxOfvkIJzk1F9VTqbu5kuwvFhfc23JPfQyIMv48qUkHEwevVSfA1FwVgRoQaOg8Q2AkGkaa%2BCWOgA0ZRhs4Arw9aEK292g3huy4BKNcNUxy%2FSlulcoAI8KRl3Kh7VbR2rcm2NeXYhUZLI3ZuIlFX6faerSdvkzdXwjJimF6jHq0%2FJcjqh71rdFEaYj3qFlSxpR8nJTsNvlzekkUSBtLP7xjA0I%2Fgpl4%2BfrtQojI3o%2BB9U5YyKcK2Bf3ALEyPUs8NBKqwJ94VxHIz%2FO0tHRU5DkX%2BBAm4okLJAs7soxr3uW4sAI4I3MaqjlLTu%2FsQRMcciStDOgVmo%2BcoOO5Ba9VCnIJRQr1zqRmEe14sRDtfPrAaxPXCSRwMhpNFgPT7fCXrCJPBWinSsh0gYuVGAQr7pA3tmpTn4AmnZ3UVsEXzGFXLEGgRJlE6DxHrjHzAfvK3s7vx4h0s6BZ2L8FtYIaxuV2mQOiBJhfBTLzS9kI5Iyrf4Z8PVNTfLk8ZT0e8WPwO05lKYeQL48S9SxzPiq2rOjMeEHhesfV918hpdEp877O0hTYMth0wW66Pkgd2%2F9hACpU8upBdjqR8RW5BDMoXbS8wZnVC1xKKfIQHHiUjbb06ikqo3V0d%2FFQieNDCq7ZjOBjqkAXspbJQqS7zSYm2oH2WDgkRi%2BrYYxyy1dasUoIZf9%2F0SbBkQxoiZHnbHNJ%2BaK8Y0M0Ih3hj6oRayHRdll2NN5BMiA%2F9Q0hhND5OnnTy0D6RlH6ZRxYdpYzlnmf5fFGmlTtO5TCQi9j1rkhYDh%2FCFDtBO16tD80zXMZFhDF9VbhUlxNnOU8Zt6JyeEV1OpsveWUldKRwTwBW0ISYLUuYTUT7yTvK9&X-Amz-Signature=98cf1fd48b814ec368a80425b96377eedad9092c7cdfc9eb08a72e2d5f70f6cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SPLBRJD%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T083531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJIMEYCIQC0PJoNMZKAHOanoS0gVht62kA3d2kJDZy0PDbnOvMb%2FAIhAKJRsH8FjhNx77bkd%2B5bBJ8wICz1p%2FLl1WRKirg6bWv6KogECNn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxdQ%2FeDiP1TnixqC4wq3AM3DxqnFZBjAOwQ%2BYittuQXp%2FxMIp8BbrAdHYkNqyXZkGr%2FRC7B3SPd8xGvWp%2FBTEsGq2LCfWlg86kKLwyn45XUre4wfxrEqTqk%2BJHHT1IwjqnpbATtn3JCSwj0lRcP8TlnZ68EqDwtCGFPYUquN%2FMnp3nl7Kq4Z12Ag0yo96CoysjjI5jEGA8M%2Fi5%2B6RQ6aJxh7ZP%2FDFUfyomnAkWCoVH%2B8gJXr8hKbm8ugmxKsVFxIhqnvlT6Aike844SE2WKg2VwX3GujXXHGn79LG2gahdJ4uTGpP0%2FBpL%2F%2B2ow6vUXDsgWOHOCvEsonGoXQ%2FLlk8d9yXIyRmZkjacLRI6QtkegtB134Oq7JCwoREpM1EENHpRnY92UIK6oCGB%2F%2FFuYxpbRLN%2FH8Mupwfn9V78iwouGuOIm0JMQaTJPkMkXza74Ypdf9Nvlr%2F7gFA1jqc75atdp3uYPnQ4jJHGYg3haT6L9b%2FSQAPb5Oowxl5UBZSTbbuZJgPj8pmcAptXOwAlOa0ReE3VpPuxltctiaLGzPUP34J0fyO1P4t25jN16lIQyJ%2Fs9j6DXivkFeb%2BIagUrGXpzEdFnx%2FOrehqrwGhy5c93l59sBWx4PZPa4cQ6zdq9yW2BnFGDVamCy2BV1zD47ZjOBjqkAW0ZN1eHyB9gY5WAMxclZK0lF%2BlKwDOS%2BuKPK3W7ldwEossot9Hw2%2Fg0gsexP50jutAHk6udgPIydaWJJsks6AW3g7c94X612e6mwSJiHrXGkITYaCtKdCTNQNir2WvyJypSRegoRzMFL91%2Bpremr0iQP8tXNbgirc%2BjZHAomyWtidsGvDdKlRlU0XjIcf%2BrrqJiPZ8KYAv9rESW6s7KhbpItFpF&X-Amz-Signature=28ab85576a5776f8b70cff02e6e5f12a9f47fbf14dbde8c5062724cfeaeaa535&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZK6SRGBE%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T083534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIQCJ6KZoqjjjlBPHK38gWHhfoyBcI0KtEkUGJ0ncWYRySAIgS4D4lhG%2F8zFIuEQ%2BRKwDSFtCl6hhN1rr0cdyZWxBNegqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBcVb%2FCxSr2fpAzTMCrcA%2BytO8HGcZzdL%2BG0x5wx35yr%2F6I0%2FR42Ecr894F1hbzvpIPRoHsIx1lflTAnT5CbX3DXo8QZz27inCcO%2BmGYUXmi933wERZ70hVq87%2Bo%2BInV8LHKZAcKLF%2F4NYut%2F%2FdWklN5QH9B3xEVdyooYn%2FocUH0%2F%2F8T449au3Y8VU25I%2B1KwDxSovlNZBwyWPYG5pL1Q88WqBjBJpqwkX0kyaLVHMDK1A2OlEXgBwA97Fxf7c9%2B7rCB7QLS03Q2PZ0ArKBXuxVqTS2MebVCSukWtWD68ikkpoFL5gglKHuCS%2F%2F79FiBDggFH8zHx26QzqXsWShgjW%2BMFWAbhzDp%2BD6gnBU42Ae%2BldXWNBtXLgMlBp0kHpacyQc4Hom04Vb%2B8T7uAxruAAtuIQ9f7vzElJUY5%2FFg7lcwzTJnhLgjWosGBh%2FTQ7RIHe4kYx6q%2BqHc7n2N%2F292Cdz7aKtqlALOpz2dwFHOLFGZqmadhB2cqtRsn7FVJeLwu1WpXaJeZbzDkXWtqwNhVK41%2FkniezYfC9ihbGdapNTBG0SM8uaHlYyGSmYoQYf7nWgjKLXc53TQbYPQ%2BEZGMAaH9sOKpeP5rExW%2B%2BKrIdoluilPEqtGlQsOsTTxO1O%2BCGst9lYCkveSsfE3MI%2FumM4GOqUBuZp2RmaAAZTmRQ4FUuyt6XE7zUE%2Bj79kTivqW60eGQABNztOlzULChmF03W8f%2FMDeK%2FMVFLNfVzgVYnDJOqattpJdQax%2FeozWEtiIlr%2FlBal4Et8igoo7EdWoGS%2B1Gsss5RT57VGAtrm3yrV7dLS1iITR6jJMSafg%2FfY1tiPECu88hUnqmsQVv7zFZ1norNbI5LLOKNEyZMmOC%2BhOayswcfohthe&X-Amz-Signature=5b3855e1d958700eb29599629067bfe513f8a8924785e99c31a5189b348d9464&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZK6SRGBE%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T083534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIQCJ6KZoqjjjlBPHK38gWHhfoyBcI0KtEkUGJ0ncWYRySAIgS4D4lhG%2F8zFIuEQ%2BRKwDSFtCl6hhN1rr0cdyZWxBNegqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBcVb%2FCxSr2fpAzTMCrcA%2BytO8HGcZzdL%2BG0x5wx35yr%2F6I0%2FR42Ecr894F1hbzvpIPRoHsIx1lflTAnT5CbX3DXo8QZz27inCcO%2BmGYUXmi933wERZ70hVq87%2Bo%2BInV8LHKZAcKLF%2F4NYut%2F%2FdWklN5QH9B3xEVdyooYn%2FocUH0%2F%2F8T449au3Y8VU25I%2B1KwDxSovlNZBwyWPYG5pL1Q88WqBjBJpqwkX0kyaLVHMDK1A2OlEXgBwA97Fxf7c9%2B7rCB7QLS03Q2PZ0ArKBXuxVqTS2MebVCSukWtWD68ikkpoFL5gglKHuCS%2F%2F79FiBDggFH8zHx26QzqXsWShgjW%2BMFWAbhzDp%2BD6gnBU42Ae%2BldXWNBtXLgMlBp0kHpacyQc4Hom04Vb%2B8T7uAxruAAtuIQ9f7vzElJUY5%2FFg7lcwzTJnhLgjWosGBh%2FTQ7RIHe4kYx6q%2BqHc7n2N%2F292Cdz7aKtqlALOpz2dwFHOLFGZqmadhB2cqtRsn7FVJeLwu1WpXaJeZbzDkXWtqwNhVK41%2FkniezYfC9ihbGdapNTBG0SM8uaHlYyGSmYoQYf7nWgjKLXc53TQbYPQ%2BEZGMAaH9sOKpeP5rExW%2B%2BKrIdoluilPEqtGlQsOsTTxO1O%2BCGst9lYCkveSsfE3MI%2FumM4GOqUBuZp2RmaAAZTmRQ4FUuyt6XE7zUE%2Bj79kTivqW60eGQABNztOlzULChmF03W8f%2FMDeK%2FMVFLNfVzgVYnDJOqattpJdQax%2FeozWEtiIlr%2FlBal4Et8igoo7EdWoGS%2B1Gsss5RT57VGAtrm3yrV7dLS1iITR6jJMSafg%2FfY1tiPECu88hUnqmsQVv7zFZ1norNbI5LLOKNEyZMmOC%2BhOayswcfohthe&X-Amz-Signature=2fe49d92a82b334c94be4d5ce937f6cf5e8e896a7c13237785652f7119d4dd5c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LSTPVJR%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T083537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIQDYWP5EA1Gs7w8hjcTp2dqCN0qY%2BQlKakbfxMxuL3uC5QIgGxq7QAUI70Nv4jISNSK1b2nOvPfvP2Kx3tYbEGos%2BQIqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAg3atzIrQVR8KroqyrcA%2BMCVWASLCln9DHecNFv%2FXKQgkj7oq2UzIZkaOm3UoqmLxdrdrAULkr9VyUivfz4aYR2ei46D%2F9FTCjl9ALOdduZPmhD9nPx6ekYnv001XLFjYz1J7oYkdLIeZyJIeq4hNDTFs%2BlFb%2BZO%2F6E8E3MpoW%2BklNN1fEUUsb3wdf55ZRpj76H0EkPBPMsdP28OxTEd%2FxkuEGHFbm0w43os2%2BgQbrSP3BaTxS7TwEjGycxqPmlNkxdWMJPbPMvdniAY3FAWv6OoLDutZDY6cF7KyFEsIpExSiGjoxrXb7DaA1khlnPOgPx%2Fo9Oj6MkEeXlzgwX6XXlVisbs4Kfn8Kl1A28OJ%2Ft2Ka56MxwmxRBQsIthpV8HZFKRnZdjLUyyTLlmnrwMuSOwj1iX%2BsFrPjBdt9BvfBiqF62flvtkHLO%2F8AdkUZKuRk08Il1ScdAOq3dfVvW6Y1VRpFmPLSlO%2B4dTil8yt6CzyyKSIpAfN1q3QDR0ObBLHz%2F8R7LKI2mERSKZvY0RxTojRtlpz2z8BszjfV6pqCJejmjE1BR6ka3IKp2R%2BoHMrv%2F6xKfGCE23cIFu6TQfETgCA%2F%2B4%2ByBYAWJm17bnQI7BL4IjW5kc7dpUks73%2F0HdnE5utk4lAGEeg3VMLTumM4GOqUBf%2FpY8GbWRNN9d4JMwbcpy5FOC6gDp54O4X55hTo2Ygo5wv%2FlrzozOUOCiPfhhr1vMCY2GCG6cqqGjVoS2Oe1g5XhPp8HibjSwEizXLR4j%2FgP9j2LFc8hJrykltfNlDNyOSF1iapM7daHL%2FkNQG%2FbvOEYlG1dXsTFN6pwsN%2B2E8lrq%2BIByko22iE9y%2FGTA3FRVxyDVFoMqeU0Fp4ZSMQOvJueT2Qx&X-Amz-Signature=bb5f86ac99ce5973f1463188ddb2d750481a64b289be579955ebd724cc6cc60c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBVGDEQ3%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T083538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJIMEYCIQC2yhtaiUxB3u6F%2FH0G%2BmKfva6e4pJwmGFmahS2uHRUKgIhAJG9AOY1aH5vd2%2FbO1DV3zgRT6yJ2AwUPzAupAMpG4lmKogECNn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxFsPXLiw3QXZfrau0q3ANQbkp90Wi5aLizKQ47mJoJU22XuI4ugw5tjJLlD44gcaVRjpvyioKKO%2Bgs%2FZ%2FCyu%2FwO%2Bxcg8AjiXa1kL2ACJXNw0A7ebOZWAwAlBHCgorGBTBO6XYVmhcIycCGrXXBckkiabfYIpAdCm7QUWhYrrffzJ4ABE9g0Gj%2BcpH5ntG29VPBzwhnZRXNCk%2Bdy4Htk%2B5Mgb%2BWKr8LuBzfIHWPgD9bYS6HZqNBaYV%2BE07Za52HMC8kJHH02NVTQ%2FMZH7rI79tnXsvtKVuWHI4ScLTnV2406MwOJJueOTNF0d0w9EQc4IlKWm8qCtSQMwNDwvAVEfmqz91HyCPePRnUwbiV0zd8QAhce7SLW7J29dii5ZAIn49%2BUTeKTkoewLI%2BjvXs08ptSoZt%2BffxUZk%2FgxIquDX3O2fehmBuSXhE%2F4uqr3PbiWwlRYGXmMl2ZdEnc3lxbMD1%2F7Zf6gsxdxFiCgN7AXmrrPs1cf3TgcBgHkYf9PebxCP1EBpHelMGOQO01xuEyY0BzxnUtvSNTCeEPK4mVQf6yMg3EUr67OqsYTNuQEqVIK7Q%2B%2FynnTNOYo6vdjX2GTRWHyF2PSEhXnxR0A%2Bn%2B1ocIGkzgoIJuMaLwO%2F%2BcQ8OUOvTZrx%2F%2FvT1MkdOrjDw7pjOBjqkAVkMR9c5hi2qlvAtaseHF4m%2BAvn22EuHHUwvm9R8n%2F1LRsoEojuKHY6eWNOtR%2FjEjhJ3iHARIfYq%2BpKz3uit30GQcGIpnuvPUnnS%2Bqy8Dna%2BBV33F9dAMIOiY%2FcdWAceVMEYS22dXrZM6fgbYEgrfEbOv3d3Tec%2FYe69lFTz7LMy0E2g7WeoT9X1GldNlTodMJ1F22Uvx43TtW2spJFVRqG9VNHI&X-Amz-Signature=2b21c25d8790300231a2956c42830de94201b2cfa2f43fc871ca8d585d437344&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663P7N5NOP%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T083539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJIMEYCIQDT9%2BB6jY%2BEC8ugaOt5hsKbfGZoMARUR8rjiRtvNTWnLQIhALbc6xT869fOD5ByrbRtAyo6LRSkKenffaZUfN%2FrLUqMKogECNn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxjGmZcAc2RnszPh%2B0q3AMqnIQPHYlG9k52E%2Be3yxIeERKH8K%2BGLxLUgvXdOsljC01Ip7OHh5fVIqycBWzCutIuBm738%2BKVY4A2xPGfyKw%2BIKUbAU5RiQO9Scbqgppwup9eqyi8KHhMEPskHeN8qheBILlVWzlNuE3ekX67Nu5739LZrum79uGrSiR2957ktLyaShv0f7X2S0X275rsN6ebrQ0nZHA1uIVV7ucISOgofI4%2BYNix8YOOrWaUyAE55rW2I%2Bga9mSMdqVc8%2BcIsDecuaw1HuRsRmh9ohJ79JlwXdFDioLMTy13RfJ82onqI3JuqOOxgwlQr7963Mupiwc7GSu7JSV4PILZ9X7%2F%2FYE%2FywEeUFbMrrHc4L1rbOzyDcgXTCXBn%2FFKdasCTvzH8oldpyXDLe%2F7fPICwSz1n%2Fyc%2Buhsb6LVUBPcWYk0ovpJ%2FwxeOGZhlKbGodmWYIYKV7Th4jY6EOvKFtub8FR6wq%2F0QojtkltJMR6266tKQ4kDhJvxP7nrMXlEAXLK35sWlWhWCwJlLNIMalWz9u8sfQ78CnbNRkl6pSnxsIwME%2Fb%2FImXQ0r%2FHNP4VP145YqGvrNDuLZaquHqr6BkRQqSqzd6mQlR2MvOrCWu6PFkoPoPOF0hQMS%2BbedqWOgaKpzCC7pjOBjqkAQudhN3I73x0jw5bZMHlHIL67UFhgRvyuZYw5iJG4f1wvpaLldrNjq0%2FBeZDgCDpxSPHT7RG05fcNuRj%2B6HkJI7vRzUMsPpRNRS88bb51BSxGmlekcCUoORp29hoMK6i4JLUvxmt3jijHIYp7M9JpNQbiL9WLylouSO24UDP5MFuHbNzM%2FaqfOXKUUqZZOg5qltd%2BzAoqPSejs6hu%2BZtkIMSbISi&X-Amz-Signature=1dc204dec75a83169240319a7b70874e545a3cdb81d33d2ecd7d57d156fbd913&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BWACFON%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T083540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIQDJcHVYKXS39eCM6Pky5LpMXWiKriIw1Aj7%2Bv7NIfVwbAIgZbJuiFsshpmxhWhmirRrRrLpXFISkT3fppf0kTiNf%2BkqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCcVvmSm0b9svyxOKSrcA8gPYPVjEaGgXbG1Qd4FapbEbCpfGQnDjVhGScosgVpa21g1lFs1YclvTT8gPUYYsmsZjAe7jqDlQOKLqjS0WaYRjsN21w%2BfEQz4b8v96p%2FoqAWEfvgSG%2BsjSj9QD%2BF3TGBp6G1AM7rwuGs2hqAaEwihkkVNphwsXlExZ2y%2B9UXsUeNLbSzdNb9iFxSyiJOQIP7m%2FupGcHkVK%2F07NgnEvQgpXqaBEXMW4FBo2k6DdGygm3YWEE9nVa9643KoR0dzfFGxtyIoeFdjl1%2Bse2pyzt5ZtxLtV%2BYKcDWrM6WvDARNytpqtRMta5n1l2kCTrPpnL6eYcCRkE%2BuNFZwz6mx1xit3GZVL3TwaNO2teue19FoA3D8QnOnC3gYCSvE3h2UBB9lWo1Z32DljVVeWU%2Fi4ckYizROWEhRO%2BeLlPpgeinEZUS9OWGWerIFy%2BCeEhDF0eoKDrTLDCciJGr7pzA9MdAd79sDNvBjPoH6aF8FcyV7gF1luP3CeqHI64CmTsWN4dfXk6z7KzU3lIq5dSKDUMm45Psz2Tv3xOB3H3KEMUb9jyeQrLXpgc3fGA%2Fl49v0L91frPzMBCDGYgLiFnarnqL9P%2Fp8ZbPUhq744L1YyWT7LNtgTslNK9pP2O6yMNzvmM4GOqUBrIgaQYrvLtgJgPJpK5uxCdziCtYnGwO7C8uoxrGwMhoDyHR9N%2FaqilbYJ4h49m1TTODWmFMDgKU8b1yURCjKDjhJWYSwEDxEqOsDm0gLWJPHLP3fK3Hn6tciZ0Atvr74ztsG9r9CDWQjqJf2XgSHXnupwD7AaPsFgpO8R0IarUJ%2F1MpJ2Mu8zTuBqtRrKsJcF7NvUolEWqce8DBrET%2BUmMwJt7RZ&X-Amz-Signature=2fc09e50cf86d8066c720389862236faca2aed90a97b7380ec933bb196954cd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BWACFON%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T083540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIQDJcHVYKXS39eCM6Pky5LpMXWiKriIw1Aj7%2Bv7NIfVwbAIgZbJuiFsshpmxhWhmirRrRrLpXFISkT3fppf0kTiNf%2BkqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCcVvmSm0b9svyxOKSrcA8gPYPVjEaGgXbG1Qd4FapbEbCpfGQnDjVhGScosgVpa21g1lFs1YclvTT8gPUYYsmsZjAe7jqDlQOKLqjS0WaYRjsN21w%2BfEQz4b8v96p%2FoqAWEfvgSG%2BsjSj9QD%2BF3TGBp6G1AM7rwuGs2hqAaEwihkkVNphwsXlExZ2y%2B9UXsUeNLbSzdNb9iFxSyiJOQIP7m%2FupGcHkVK%2F07NgnEvQgpXqaBEXMW4FBo2k6DdGygm3YWEE9nVa9643KoR0dzfFGxtyIoeFdjl1%2Bse2pyzt5ZtxLtV%2BYKcDWrM6WvDARNytpqtRMta5n1l2kCTrPpnL6eYcCRkE%2BuNFZwz6mx1xit3GZVL3TwaNO2teue19FoA3D8QnOnC3gYCSvE3h2UBB9lWo1Z32DljVVeWU%2Fi4ckYizROWEhRO%2BeLlPpgeinEZUS9OWGWerIFy%2BCeEhDF0eoKDrTLDCciJGr7pzA9MdAd79sDNvBjPoH6aF8FcyV7gF1luP3CeqHI64CmTsWN4dfXk6z7KzU3lIq5dSKDUMm45Psz2Tv3xOB3H3KEMUb9jyeQrLXpgc3fGA%2Fl49v0L91frPzMBCDGYgLiFnarnqL9P%2Fp8ZbPUhq744L1YyWT7LNtgTslNK9pP2O6yMNzvmM4GOqUBrIgaQYrvLtgJgPJpK5uxCdziCtYnGwO7C8uoxrGwMhoDyHR9N%2FaqilbYJ4h49m1TTODWmFMDgKU8b1yURCjKDjhJWYSwEDxEqOsDm0gLWJPHLP3fK3Hn6tciZ0Atvr74ztsG9r9CDWQjqJf2XgSHXnupwD7AaPsFgpO8R0IarUJ%2F1MpJ2Mu8zTuBqtRrKsJcF7NvUolEWqce8DBrET%2BUmMwJt7RZ&X-Amz-Signature=c7cf7b2f81317215e9e97c10e28777274fdcf6eb8bba41b7fdc328b39a4885d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRPVOHTV%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T083521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJIMEYCIQDFfPxr75VhNHID9jg%2BY0KDsPcQMH39YJfRMzEQTe4BIQIhAOOi6bkLEZRVHbaPeFlVmTa10it4L9FvCP5KSC4tsEYDKogECNn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwaLOfJIYibpYexVO8q3APovwCXB%2BRgVf5BaV4IfJiyKlSQnPvJVkDVUvJbaosUh8ve905Yyq8N2IscTsdIjSH5y1ofveXoVRVf6bOhl6xt5TFzD%2F0HuKHwS0aqXb05uxkDHpAGdr4cww2VvoJIUbfFcfFX3qvB8s9SoQS9Phtx0rsuJHYXtEvir9Fjotca4NwhWoF%2FJe%2B7UOJDlI2En2srtqilUe4ZzIwKMGYIbo2W%2FU3ZCgQXf2ahLWx0NU9ArbDJXF1IAd2cN6QGfCDFGR2PW%2FX2i6z8CHFUAH9KKtSZJYuR2kT4CQRJzKPMoEJ8O%2F9bZplMh3cc6iALIWdnAYTH1nMNkhVqPmVJ6oPQtWdLjildAUZMPDpl2omCPRAG9IXfa%2B77bbXSkIw98ZxuCaxydRhoSueTQ2Vg%2BxbdIbajwf4EHnYa%2BOJ58iT6RurtmBRw1j2LiDhOK7hRrRLncK9%2BRmMn4JeIg7uGJgXjc6DD1HWiBhB4%2BibfarP38Qt7jIA2T7If8wRO90NTuF5mxabqXeCL69tt94OrgYpFXe96YNTyq3gWU7Y5F8iSfdtzprCmAiyHX8WRpcbK8nyPRE0AZ43xBZ0BcZveK948Ek247Jm%2FwLovKMq3RxsHpOY0XS0qWlrz9DEwow3JdjC27pjOBjqkAdn1fi2yK2Xn4%2FIUxQWDR42TAvfCKZ1BGL1BqALPE%2BDW0F1FvCtWw7mS%2FcnB00PvjAEnPhK8YcI2GVHSEue36Ot%2FLwV0wuFplf74Kb1%2Fo97EaQvx0ZbZewc7rcurVTSWxDjKWVG6Wga%2BYbNwabJdKy3SE%2Bup7XWC4DWDa6LmFmCKRT1NSlmGlhGTFecuKoh%2BdMXKlvzrbkZHaqdzhEfD9NW%2FEa70&X-Amz-Signature=f0c7600e7133efbd2f426ce7c0474ec5e0423e9d202d4e801db05ad8851deffa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7MWZHSX%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T083542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIFOHaCASHqG%2Bw4s3BKZM04zTkf84sD0L5cNMEL36uGbuAiEA02wJmKEUhW0svcAkpTogPeKQ2pn1dh%2FOXo9J6oHGzlAqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOaSa5MiAZ5Nlg5YwCrcA8uMbc9TKfI4dDDPZWtLU82KRNFCCZrjllVbmO541Sp%2F56Z7t4WVGqqX%2FXcj8uU0QZ1SM0MtR4xTzd4GPo5hJjC5IKlFYCa7GEydSAUE4UvHwUx0POex6uFRY928uq4A0xp6Pg5FoEn0DiHmhZaQSN6oi2kFfNeToDpVB%2BhZAd%2F1AU5LfOIDgu8Xeug0syskdn2s9K%2FIis%2BHAlqQ3M3qz9e9uca2CLNheiHMPQI88age77FQVxaMUlKC%2FZlHPNhpeW2M1863B0KzQkEZazMEpLHdZ%2Fixb1nXID8A3gFHzm6oD8fmNTF4NIuYJVqfe8pzk7WNcPNRg6HZLWc0MsoXJPtC%2FUcBWiN0%2BXf3UFhQF0VC1Sh%2F3e9aPJoLZIXiJFvQlVZbBJ1lfdAFCdATIkcRC0EUlypy1ekYkeoi6AJcpbnphikJx5vtN7cTtkHO2350TWehbOJbDGqxjLGKEOqmnXnlT1dAojcy6w6J0r1oICrcwcJTcl6LcxKDVz%2Bmy2tGsoZZviC%2F3LsUYP1N48h60R068vkP00q9FL9bVA3DLRnltsd35ziymAVJwvwZT%2Fb5Ipszhxgyq8pGuY%2BxY%2Fi2Z0m2jOSF9NbqVkUyFyXw%2F3WqBpFQhvroIUccLeW6MKXumM4GOqUB0uU893b7p5Nx3NI51WJXhBPtSYajvaMkXq%2FL7utN9JJJIrjDir2itL1ro%2Bn7bYIOLNtC8BaqdrujGpjDO%2FsyQLQXJIG%2Fzl75jMvp%2Fn988ZyyaK%2FFquywJbVv0yHJfzCg%2FBL%2BRaBQteQV9NSVv1FrghoEa%2F4IXwhaCjvDSpdhTh2J%2BDsxnZwFkMwayKRHNA5rl0XWnuDITttF4DeVn0bujFby2Rl3&X-Amz-Signature=2ce506f9303f8fa16d5fd607841222d3d6354d40095d6e452d780d03f49d0c82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7MWZHSX%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T083542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIFOHaCASHqG%2Bw4s3BKZM04zTkf84sD0L5cNMEL36uGbuAiEA02wJmKEUhW0svcAkpTogPeKQ2pn1dh%2FOXo9J6oHGzlAqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOaSa5MiAZ5Nlg5YwCrcA8uMbc9TKfI4dDDPZWtLU82KRNFCCZrjllVbmO541Sp%2F56Z7t4WVGqqX%2FXcj8uU0QZ1SM0MtR4xTzd4GPo5hJjC5IKlFYCa7GEydSAUE4UvHwUx0POex6uFRY928uq4A0xp6Pg5FoEn0DiHmhZaQSN6oi2kFfNeToDpVB%2BhZAd%2F1AU5LfOIDgu8Xeug0syskdn2s9K%2FIis%2BHAlqQ3M3qz9e9uca2CLNheiHMPQI88age77FQVxaMUlKC%2FZlHPNhpeW2M1863B0KzQkEZazMEpLHdZ%2Fixb1nXID8A3gFHzm6oD8fmNTF4NIuYJVqfe8pzk7WNcPNRg6HZLWc0MsoXJPtC%2FUcBWiN0%2BXf3UFhQF0VC1Sh%2F3e9aPJoLZIXiJFvQlVZbBJ1lfdAFCdATIkcRC0EUlypy1ekYkeoi6AJcpbnphikJx5vtN7cTtkHO2350TWehbOJbDGqxjLGKEOqmnXnlT1dAojcy6w6J0r1oICrcwcJTcl6LcxKDVz%2Bmy2tGsoZZviC%2F3LsUYP1N48h60R068vkP00q9FL9bVA3DLRnltsd35ziymAVJwvwZT%2Fb5Ipszhxgyq8pGuY%2BxY%2Fi2Z0m2jOSF9NbqVkUyFyXw%2F3WqBpFQhvroIUccLeW6MKXumM4GOqUB0uU893b7p5Nx3NI51WJXhBPtSYajvaMkXq%2FL7utN9JJJIrjDir2itL1ro%2Bn7bYIOLNtC8BaqdrujGpjDO%2FsyQLQXJIG%2Fzl75jMvp%2Fn988ZyyaK%2FFquywJbVv0yHJfzCg%2FBL%2BRaBQteQV9NSVv1FrghoEa%2F4IXwhaCjvDSpdhTh2J%2BDsxnZwFkMwayKRHNA5rl0XWnuDITttF4DeVn0bujFby2Rl3&X-Amz-Signature=2ce506f9303f8fa16d5fd607841222d3d6354d40095d6e452d780d03f49d0c82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662O6I3ANP%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T083542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJIMEYCIQDghVz0inVLpC0N5H8gnB9Zs7FdtYFr%2F0s2lvaGK4%2FbdgIhANwkBaNeo5k%2F6PQCZJRy8v5fvgmU%2FCQXN6JUhKmltjWuKogECNn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwOLsTwiUDG%2FMVBKbIq3AMSC7bcZiaIbfH43n6uEloqIr%2FHyOOXR6uYDYAHRN25YRUhw3fI5PdG2n4vp3udt5Nimk0O0wFrDYBlj7c0lnH3gRw70EP3lZxzBOK9tEyRon9nswL32ofgE3xyZ6e4iX%2B6bbgsy6F5MRZ4uOMHlqKmXVO2AXyv%2Fd3K4OySUwYuZz2buYdcdunwM2KOHiq8ftuGgWWpxn6Sjuh4zHSByKtOjBb3YY5RsbbS%2F2Q4hxQr9%2FcosM7LtoytztJnTUjKg49phw1CDviocrHNqZNSNn4VTpmryhGIvSzwFq6kEpRRoVk7kOzKGefXV0z9feJTLJc3Os1RuPbiIx07UFaYZoqJky1BbTcsM6cENuLY1r0rmJut5QX9SBCPTGWmKdk2MQ0kWoLj6AYHTe0kB8jb5MU9FWPBvw5diWRkMd1MXfsChA6iGg05nXjvtG6ULlgiv4qvFrmIEdtIDo25vDnd1SEa9eIdnWvKmxlrhHp%2BTAOG9H7UJkt05Fg%2FRCMb1BsKpoh05y%2Bc%2F%2FODEjEdGNu40L3PQhE5ObYJ7m0qx1whiJnmndGFMk%2FRs2pt8fu0hPZc1B6oXVjIyJEbaKfKHYovWYhhLJdbroTyTfi%2B8o30vWGqi%2BQUpaPMWFUVLg0tjTCW7ZjOBjqkAVVdqSpmgoRoEqkfodohuBvdyU%2Fjhw392PF7fVDJOzWOshTBYIcdSM6gGkkasmrcXUy7q2NjIuxgIHEzrHPmSd9f74a9pQhkktzIxnWq8FmSxE0PbkACdf1HvxUcJq3ELXpJcXNuVZeUvhfodEe3DTliE7IuUJ6wCppoju99JGD25DiW5K4e8VbjvdYyT9L1iVNTA5MljyBXaUHT84%2FeuCdgxMNz&X-Amz-Signature=2dbdbefa7b108ab720ff76a1c73d452a01b41a0800f211337892e2444bfd33c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

