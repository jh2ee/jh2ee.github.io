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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBXARKXI%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T211251Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC8fFkf9E6IfWAxA1bhNVLEeLm2HVxrB%2BoHQUG27a4QygIgIODy42S15rg4Vh%2BvZ8PKPLYJgNyPzEXnMfBdlhwGKp4q%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDG9aqumGkNubiPfMeSrcAyUAFaIoGmba4g%2BVSn0Eo5c49tJ3LhDxAjQtO0u9inuXQDNRk5nMJZpfKInR4qyWSdywUNcYG3z6Bky87EW8Eo6aS%2BQi7xdWXLx64bT9do9TT8MZaJSnzweBAw37ZazaSzutt8KTR531EA20Yyjc0FfNqAIonb4McC%2BGspEeWXnjNk893LQWeN0Wed7K9Ws%2BKKoBnS2EghpaHaHb8Yr07SY%2F4ODUAY2dN0QyeIuuYYdLeuAID%2B2BltGJa1FF1C9ExhSM%2BZEK5FdEJQtgTiDsjm3OHvnm4SVLvU0sxIdXTOitcd45QTfxQgtkJO%2BZnLvx0jxp3DoTqsh6iNs9g809EvM9Qw%2B8nW%2ByVGF8Apl4jzZo2cmmeZMlv1BwckpzdZFqYZbvJtcDy%2FLrTErWlZcHkR33%2BmOMdm%2BW5zK2fo8ciK3%2F1z%2FoGVLB3h9y74tvwEpc8unDhZGeyb1am9RnxlXAQeuqVFK%2B%2FQmZrcjYiTPmn8kst3WOJc5D1YUjl3mOqLGVsY0aeXpD2%2BMpG1lHadAaoBC5q7KgZvgF0HVe3jjet39NvHrzNnV9I5WTySynqWda%2FTUprZe1QYJf7Fwhs8nqezrhs2YwnBh42CEoujPuz9P4ZOV%2FHVrCAY42mAQQMOLs%2B80GOqUBtBJZB6u835%2Fr3994uudRLPkqEU4yDC5D5%2F%2FxDNtlhN3mIWz9mwh9SKGiCgnccTFGtzYC7%2FOvmap5Wa7l852GHn4pzjDRyssDOVd5X7pSRMZO9UKqgHgimERCGiweS4ncpFAxiQWe55a3DNbvF%2Bg%2F2BkwL83Q7rdLL%2FVqqYTxpNPnNlUiBu3ik2YIx%2BBGPkpzECG1XllfLkLsrjxpFPEOdGBk%2F7xE&X-Amz-Signature=0330165d0a2d3b0a836bca57ba47783619449854e2f47e3dbcce453e08f255fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBXARKXI%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T211251Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC8fFkf9E6IfWAxA1bhNVLEeLm2HVxrB%2BoHQUG27a4QygIgIODy42S15rg4Vh%2BvZ8PKPLYJgNyPzEXnMfBdlhwGKp4q%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDG9aqumGkNubiPfMeSrcAyUAFaIoGmba4g%2BVSn0Eo5c49tJ3LhDxAjQtO0u9inuXQDNRk5nMJZpfKInR4qyWSdywUNcYG3z6Bky87EW8Eo6aS%2BQi7xdWXLx64bT9do9TT8MZaJSnzweBAw37ZazaSzutt8KTR531EA20Yyjc0FfNqAIonb4McC%2BGspEeWXnjNk893LQWeN0Wed7K9Ws%2BKKoBnS2EghpaHaHb8Yr07SY%2F4ODUAY2dN0QyeIuuYYdLeuAID%2B2BltGJa1FF1C9ExhSM%2BZEK5FdEJQtgTiDsjm3OHvnm4SVLvU0sxIdXTOitcd45QTfxQgtkJO%2BZnLvx0jxp3DoTqsh6iNs9g809EvM9Qw%2B8nW%2ByVGF8Apl4jzZo2cmmeZMlv1BwckpzdZFqYZbvJtcDy%2FLrTErWlZcHkR33%2BmOMdm%2BW5zK2fo8ciK3%2F1z%2FoGVLB3h9y74tvwEpc8unDhZGeyb1am9RnxlXAQeuqVFK%2B%2FQmZrcjYiTPmn8kst3WOJc5D1YUjl3mOqLGVsY0aeXpD2%2BMpG1lHadAaoBC5q7KgZvgF0HVe3jjet39NvHrzNnV9I5WTySynqWda%2FTUprZe1QYJf7Fwhs8nqezrhs2YwnBh42CEoujPuz9P4ZOV%2FHVrCAY42mAQQMOLs%2B80GOqUBtBJZB6u835%2Fr3994uudRLPkqEU4yDC5D5%2F%2FxDNtlhN3mIWz9mwh9SKGiCgnccTFGtzYC7%2FOvmap5Wa7l852GHn4pzjDRyssDOVd5X7pSRMZO9UKqgHgimERCGiweS4ncpFAxiQWe55a3DNbvF%2Bg%2F2BkwL83Q7rdLL%2FVqqYTxpNPnNlUiBu3ik2YIx%2BBGPkpzECG1XllfLkLsrjxpFPEOdGBk%2F7xE&X-Amz-Signature=0330165d0a2d3b0a836bca57ba47783619449854e2f47e3dbcce453e08f255fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S23HDDGZ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T211252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD0Km%2BPbPT2JCx8H2OWEfqh%2FZXsoK%2Be%2FeqkERweSKZECQIhAKA5V5Ygraf2dBOtdKu%2BAENGL26BkGn0wPJwkBT7sk4iKv8DCFUQABoMNjM3NDIzMTgzODA1IgwNg3pclT5FAFfjAUYq3AMiEuMMCU5CjdSSyAXR1YG9Vj%2Be7xk%2FRrKjaCa65EDo1vBPz6%2B28%2FtXa8JoqT0vO0ZU%2FCpVUxzauQnuVBcK4tUxflytvjnGeTzuhBWMk8Ldgts7oms1%2BEcVfqCRBQiQFIjAZlus7sTi3duePTYMUzj1WXrfYwM%2BJqz7rjCBMjB8pJJigm8tYsXYUd99cnAZCzvwlZmHCA5oIfeB6Kco6uZ9JXFhVtV5iwJbpbNdfFjXIEo8BZp79I7VmjnyjUjGhvgbOnQRO9Jl9lXlPrbFbCFMODyigzo3J2zYcULv9PJzo68wQHV16bQhojrIj1denxkUOFCrHOIHBCioVMDZTnwWFvtcMnlE77KtO3NXh%2BRQQiD1As7jWmm10KtrubP17vAXB1SnfdBtVHHKExIfEbgbyqVPde%2FPk1TjMqJUkiIUsh6G0LluLPZ%2FETVtbgY75d%2FQgEyUpC4x7JlZxajbf5mg3lYiYxwyzhaOFfPtONiS8G0jrnuRwdlFnLNF4shRMyGw2NPXVPOZvIUqIAyd9rmc5vW9%2FDNvWW%2FZz0F3qfb8RUr3Al1Bs%2BO6s36NdAP8sErH9mIWH%2BybyQmm7g7SDmvKXvOfsrPlI%2Fz7kSrPw3NYmRjNdyakHVxG93hAazDG7PvNBjqkAXE9oZuaqgGwBa%2BO7wjb8FzkYCTiKeLvf%2BhEa%2F2YBHkxqPi0hTYPTG%2BmbMvS1ZvAMYQYqFdl3ROCeqoxTDCIUVBhBf3ghZC5YXUQI9aRdJhmvQvoOf3%2B7u3UFTOuLxTcp9iGEd89IOydGDdwKH1Fowb6q0NDWGFu6ER%2BIeGNwLwNQzEuPkHvA0QysRFfDWMXYr%2FmfxJ6K43HGxuXTjzR4G6Edm%2Fb&X-Amz-Signature=f4918073d9be6ae3d44b86c17435292b4d55fc23e4fa8b6b2d0ce0399882601f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTWHAHDM%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T211253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC4vdTdOh9HO8Cun1PWYQvHZQaTIHOCjWMzrAS0WL3MdwIgQr5FW1auKZEtdTTvlmhG3CJQk8R%2BWHB0aPTY8Uxa93Mq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDOg3jfdj8I9XwSrSzircA5KHRyXWX06UtviHpRn%2F23nIW69VoEgA1Am9G5hSo8y5VxImKnOkF%2FGsJNm05NlIqKxECkt73p4TCZuprzSQgtxXI4ACxVvSgX9G9BsYPtudrxwIWLk9FGojE4r0kUYqDfFZYIfeazsFs%2Fs4glPDItyNtv8MzkxEU%2B7y%2Fr%2Flh47Y29jXElZDjg%2FfOPkHFSrHhxfvwcD5G6JZnJzOOmn7hk9GE1sstwdExv%2BlJHLxjZ%2FbcYckdkl%2BAehn%2BAl8uaLQKFtsC9JL7qr7LQ4C8GhF0LTn6ls6wv%2Bs3UG9lhukAwcFNHQqqkircDdYZUZBixbpj8tmz2E4s5dLSig7WBseDjTqj0A1PhPJHDQq9jwJlCRogedJbM02xFS8f9XXn%2FvXLzhHI58Ul8690xmktlMkDJamKJOvcAexACGxSwjSK7BKWs2fQHbwZJKHDhHVZug0eDWzFrY6Xv68RShdM2kvlxT9otsc6ttaMb0kk%2FGas9Ydo63l16bmeoPy4o%2BHrqPpAeIIcOGtEtyFwociikg164TgWPd411kt7nnurz6sqVu%2BBAGtlQq5o1PSYhCMCbUnu9d6Wf%2BpacM53xcf%2FZGsW8Rz8P1HngzvvjiGkz1lH%2Bv%2FhK3iC9P7m6LqnPwyMNrs%2B80GOqUBzI7W4b7GFqsVxxmK7bwkzmtKRChBU0YIMOZPO8bVnmYe%2F%2Ba0woc0GrdQHDMs4kKkBknVQIV3ybuje50XEyEUa6hKpl6oCYISZWUM%2B3Nkhs7fYkd17YqzvVlyGqmhpJOxYsO9O15KbPHzaFRZ67xZeJ%2Fg6ul8czKu0B5YIRO0P%2FA9lXg0PcY3CSowK%2FDp6GmoIaCvwinZnIuDXQC%2BeqZUIiOw%2FGFi&X-Amz-Signature=f9250017390457566d31faea325d67e7fbe7742618e620eec5bc004beefb0a70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTWHAHDM%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T211253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC4vdTdOh9HO8Cun1PWYQvHZQaTIHOCjWMzrAS0WL3MdwIgQr5FW1auKZEtdTTvlmhG3CJQk8R%2BWHB0aPTY8Uxa93Mq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDOg3jfdj8I9XwSrSzircA5KHRyXWX06UtviHpRn%2F23nIW69VoEgA1Am9G5hSo8y5VxImKnOkF%2FGsJNm05NlIqKxECkt73p4TCZuprzSQgtxXI4ACxVvSgX9G9BsYPtudrxwIWLk9FGojE4r0kUYqDfFZYIfeazsFs%2Fs4glPDItyNtv8MzkxEU%2B7y%2Fr%2Flh47Y29jXElZDjg%2FfOPkHFSrHhxfvwcD5G6JZnJzOOmn7hk9GE1sstwdExv%2BlJHLxjZ%2FbcYckdkl%2BAehn%2BAl8uaLQKFtsC9JL7qr7LQ4C8GhF0LTn6ls6wv%2Bs3UG9lhukAwcFNHQqqkircDdYZUZBixbpj8tmz2E4s5dLSig7WBseDjTqj0A1PhPJHDQq9jwJlCRogedJbM02xFS8f9XXn%2FvXLzhHI58Ul8690xmktlMkDJamKJOvcAexACGxSwjSK7BKWs2fQHbwZJKHDhHVZug0eDWzFrY6Xv68RShdM2kvlxT9otsc6ttaMb0kk%2FGas9Ydo63l16bmeoPy4o%2BHrqPpAeIIcOGtEtyFwociikg164TgWPd411kt7nnurz6sqVu%2BBAGtlQq5o1PSYhCMCbUnu9d6Wf%2BpacM53xcf%2FZGsW8Rz8P1HngzvvjiGkz1lH%2Bv%2FhK3iC9P7m6LqnPwyMNrs%2B80GOqUBzI7W4b7GFqsVxxmK7bwkzmtKRChBU0YIMOZPO8bVnmYe%2F%2Ba0woc0GrdQHDMs4kKkBknVQIV3ybuje50XEyEUa6hKpl6oCYISZWUM%2B3Nkhs7fYkd17YqzvVlyGqmhpJOxYsO9O15KbPHzaFRZ67xZeJ%2Fg6ul8czKu0B5YIRO0P%2FA9lXg0PcY3CSowK%2FDp6GmoIaCvwinZnIuDXQC%2BeqZUIiOw%2FGFi&X-Amz-Signature=2186904fbc42015e3fa15902a9f1c93ec3056fab879a89b3071cd8c073f8e661&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDUCZ7IP%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T211253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCh7RRI28nvQmMOkF8Fa4pdHbXji%2BPxBRAGivYVPdmawAIgRR0wOufkpopenEL4Z2ZTxfuRzLLxh9Wnw11o%2FV5oRCYq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDCaQ%2Fz64PwS%2FfPsBfSrcA4C7lVIctO2oYbUEwSzoedrQ7ySn7V4WA8cspxgHfucZYr396jpbXxnddeOW8Gxe%2FPDRLPpvqZAmdntsWI3PP6jXdO%2FW3wOYZehq7BVbWOUhFfPpRsl6FvPLzWu8bQ6Yhk6KHW3%2B8p85Xgk0Pgp%2FHFQmxsVzUY4vVGHS1Q%2FWRb8sQi7MQACmbuTYAmOk%2Ba95wAoKLI8Od08vWUZP3OEL0z0MJ3wPBG15NivoQ32LWz0k9ejWdMPjuOvXkevVo1sRsq3ZX3bmW%2FQOFGlekngbrah%2FSmdlCMb%2FlZiAUrpH42CVINxyheeWilzpmPNo5NPMEPX117xer7z4SSeVKI8FhDUP84maikW6gPbn1PYDCqiesjUjyOMbMkve6UCgzPb%2FrIPQKMSPsxGg1ht5qMVY5s4Z4hbszu0pHcb9SuKTkChtbdLVqcg9JyHFGEwodjflCUJiWo4Ievhd98o0tNV7i5vmAdxysX%2FkWc2kGFdNOsTEfVYKXU94hS7Sg9qErPX7EA0dWFLOsCRLbByDgZcNk9i4zP0ALxlqYBm7va0Y4%2BVA00avKAlKY2cL9O2%2FCwR3boTQwmYr39BykHgUH7MlfkJ6bjJIk0oOPYqJ%2FLV4N18SL1Jvm%2FU5Ms9msxdJMNbs%2B80GOqUBPXPuu%2BhEWrc0zrqPbR%2BHWD8hW8xfABvnIj%2Fe1wAMyiGQNiCJ4RmT6HMCr%2F16G%2FLKG%2Bw11QGEWWSAPle%2B%2BtBTffvItchmhUTzRl%2F93uOT4bsQkYvjVWXh32MMLmoqQWd6USPuL3XfyQzSn7M8Ljq9rlUNViPkSe1061ZzmEexKlBg%2BN0sXiMQaA%2FiBgbSX7WzgZBpYRkvCCWTy15ZkHLXeCRSnB2f&X-Amz-Signature=5123a623b3b8273535770cf3ed03a59569ac6e0fee02cb2d9e19c7e9bac1d1c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4XBV2MF%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T211253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCbuVQS8YQw8BCCN2P9suF3U8EjJyiGXrNmWw7kGAriBAIhAITi1ysWKkKgSCTpuQLF710G2b3LLirdqqff5ZrAXq%2FuKv8DCFUQABoMNjM3NDIzMTgzODA1IgxnG29bmDeRXb3bnskq3APRlY18mRlmsf0QhxhLqHlcYREeu%2BZpwnv%2BmOisqEuaTeF9lYXHrU5cItKjpTSaudb%2Btlu9VWYMHij3NuaQtI%2BHBwxkTFacVm0Mn138MK%2FC86oLRZIwUuifJpLZfSGETwTM%2BXoSmJDJVJT9SwY14NY00SN%2F48vSJE%2FPzm12dX4LH8ZsgB%2FrFeVcAq0Ur3jYUClTsnvaMAStUvac%2F7xS1tdb%2FP6KfG53hjxIQHQCn%2FIZkukzkz7qBMBTYKxotuEbTwkddXli9YIEiwStel4kK5SYMWbXWtdjDkLGXU0GJtwDEGQ19NNJN7SS8wYm25dFbTXR3NhgVIwfrxja5z3PkXtvSC4s4LnkD%2FHcJ9wc1Kj9g9N%2B9UNixxF02tEiwyHJ1jXvDP4JOpQfd%2FGa1AjizGgm0N9Ztb7evfoDEO4%2BnUm3ZmnCPa0edDpexaBbPDgw5vz%2BOfvOrLfOFkXlQ5Ldsf2wMynLj1SflXwFkBJL9NTcH8HPDJrPB1qGvkp1N24ytKfSgJUpImtamF3brore7Vdu7Mu2OPfv4Cp79jGpLod7om%2BMKxoCfMKPDLhGbNTZlxMeTdCkp4iTsfB%2FVTcplqblsPPHRoAzel97MlfbqXhtnZlWHgk48hq22ZUtGjCh7fvNBjqkAS596nYnvdN5UV1Y9LPsLOTd0Ki36PHc7SsrWs3n3PSHToO0%2BkYSMG0YMFA0bb1j7lpgTpGPoHOfKerG9R0iECz1LYn0IvW8qndHby5g6A74XuhNul%2BHL6SR%2Fd4hRV32gizisx%2BQxYUw9Nye3ZjGxBM3JD%2BHd53WulRR5WNI1jlZK3nDDi2gnIvdXufpjKlkPd9yuSUFaP55v7mlNohMY8OOL47t&X-Amz-Signature=dab28231f56263d9b4fb0d0c5c22d381b8ed2e679d0943e4189564e2075d492e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666H5BPJX4%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T211254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGkI8WDI3y6s2rPikAPY4wX6m1z06L%2FeNyQqdLdw%2Bu31AiEA45s5myM%2FIU4X9s9AIDH7g4xI16uD2Kyzxin7uQEePccq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDBkHgrLaOBB%2BqXoJMircA4MipzY33MkGSk3AihKSjeOLjPYJvB2VbmtD5kWZjNdOYqIeI%2FPA8LAZs%2Fi1p7XudixSLdIuJpTFe6TlYoXYEXDbIdCvdEAjGw3yJOK%2FTkd%2BXrDGEIufr0ZkxxlepBjYSqz12UJok3vDpB20%2BbyhfrK39zTp1nH0q1LAF4TuW9Eae9XSBQS3jlSE%2FkGzc6S8SdI%2Fuih53lSlaz51I5yxHEvjFSstv9PFWQwvVM1ShOQXNSoBcolDtVN%2Fhg%2FEy6koQVXgdCqQQpFA8MWQgEnYxmirKRYwYrIw73Vai1htaF%2FhX9Zgs%2BINQ6Zr8qDmB6gAntzSPa9bdBbkVbzUMWLlYfWPMK%2BnQyA5qP1t4i0tCTEeIg5195GnF%2FL%2BDjwh7aPFNL5Eyecf9luNeMXbnv0K2fBdd1AjcxGXYbOvmt9R%2BBN6qHkLIA3LVhENjiJ0h0%2BK1yffmUg8CXZL%2FyO8w8ZRmn4x0gPdDlNIcZ1%2BGcYQfKtTrwPTcF1Jmf4h1ti9161ufAHPEqXQYuebFw2A4S80P6MrHpQysKKTVmmzJnqEoVYKBMbDn2aRAsAl9ItGnRXNaMhaZuYb33p6pNKvDtdC6kny9eXRW7o0t1596xnxpMaMgvfQbmeyQ6sYYpi0MN3s%2B80GOqUB8kYLTYTrupd%2BGAAM%2Bhud%2BfrkhnxvOKn28nLf%2FzF9kEgKaoJq%2BaWmum3%2BdOuOoW1KH08XnWMuUuFHMu4ggtpun0WgaaFzGkhrf2Yh6qk7d3DySrPjWts4e4TvVtQnDA%2FfuZEbQ%2F5YmXxhgjgh7gGkK%2FtiUy3SpM%2Bsb3VavvmdcFzJocmC43tTRaZpClLfDsMhVqLu5h1ZyJNCYP6d%2BzYWAWT49yLK&X-Amz-Signature=8aa2d2287b28382e8421bfea588dc661071315917114922e2359a4df88e1db91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S32XOZIG%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T211256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDIuco8hWv%2FPzjrh0DfUq3QyPhEk4e3J4jUn509AW3M9AIgKcJEbZcnQrDnOJ7tZ1U5tTUMJDkF0%2FY4rKMJPDztbqUq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDPVNOoApo5ULoMXBiSrcAzD4QC0Wacn0C3SsvQP87FQ%2FyzRVSAD9MRyMZX5qpKN%2B3rpD0%2BnsTRgN74Kr1cZiY90nGByztXVmxN079z5iEXeBkSUOyWBe8Oh7h1yeb4GFyduHzP0bDs4hnHu61ArAV%2BlNK4KGfzc7HG1jTts5Cs4zhgM5Zuovua15EiPTOEyHJDW8PXp327lPOx%2F6xxuOOC40zPuXgmcWckKfUhhOw0v64ZNoHSRHF8njXw9eBULRnI5cjPmwu3vU8sBzzo3wEbASFgilgmG0Z0loXvBtnsUpHwcOkQ2aNJxxJPb1%2By06y%2F%2FXCdZb0OgtVwa%2BtXVAoaOXxFEiufgq%2FN9VIFMAoyq%2FpkE7AMqx84lmVvAGKt06TpQ08%2BA1B5j0lSxEcPJfFaECvXCHwD3J64oct%2BhhFv1vzFCTYN9H1dvvG1ZdvdKat%2BH8j%2F3D6jfEv0HU%2BsC9qavhlc9cA6QYzFYM3Tl%2FXhG9AR6XJHMIJ%2BANjq%2F6U999pmVaoBEWAFdZ7%2By9A%2B%2Bbp7PXaI9L%2F8QG6W7X26e%2BBy0nOUPzJH6cHZbmKCy58d8taH3ZyRPueT%2Br%2FzgjmGcCEA2w5RIi3zvIZiIb1D281jieB3FI%2F2ZGQaub5BXUPMphMhzr022OxYxXGR5hMIHt%2B80GOqUBFdlN7oPOrMd1NFhiuy0wxffcY6SJGm0fPqV202n8DZU1kmzKlbgnv67Vw0afYDx5kagfgM2STuKDr4CEYDq167eA4ZfzI24wF7N9BRtBMgmMIcxbBASBKOOAN5aRjs7Q5PSJS6HcZqDOD8fRBDWvIo%2BqT9oVYTk38GskdGYPlnGQCl9ejXXGW%2BycuzrROCCNjXIrBkFrxr%2FlWYQf%2BgI89%2FTzJJK%2F&X-Amz-Signature=4401d3e13ab741e0e8688ea21a285550d41a69adf24d91527d133ec5fa1ded0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S32XOZIG%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T211256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDIuco8hWv%2FPzjrh0DfUq3QyPhEk4e3J4jUn509AW3M9AIgKcJEbZcnQrDnOJ7tZ1U5tTUMJDkF0%2FY4rKMJPDztbqUq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDPVNOoApo5ULoMXBiSrcAzD4QC0Wacn0C3SsvQP87FQ%2FyzRVSAD9MRyMZX5qpKN%2B3rpD0%2BnsTRgN74Kr1cZiY90nGByztXVmxN079z5iEXeBkSUOyWBe8Oh7h1yeb4GFyduHzP0bDs4hnHu61ArAV%2BlNK4KGfzc7HG1jTts5Cs4zhgM5Zuovua15EiPTOEyHJDW8PXp327lPOx%2F6xxuOOC40zPuXgmcWckKfUhhOw0v64ZNoHSRHF8njXw9eBULRnI5cjPmwu3vU8sBzzo3wEbASFgilgmG0Z0loXvBtnsUpHwcOkQ2aNJxxJPb1%2By06y%2F%2FXCdZb0OgtVwa%2BtXVAoaOXxFEiufgq%2FN9VIFMAoyq%2FpkE7AMqx84lmVvAGKt06TpQ08%2BA1B5j0lSxEcPJfFaECvXCHwD3J64oct%2BhhFv1vzFCTYN9H1dvvG1ZdvdKat%2BH8j%2F3D6jfEv0HU%2BsC9qavhlc9cA6QYzFYM3Tl%2FXhG9AR6XJHMIJ%2BANjq%2F6U999pmVaoBEWAFdZ7%2By9A%2B%2Bbp7PXaI9L%2F8QG6W7X26e%2BBy0nOUPzJH6cHZbmKCy58d8taH3ZyRPueT%2Br%2FzgjmGcCEA2w5RIi3zvIZiIb1D281jieB3FI%2F2ZGQaub5BXUPMphMhzr022OxYxXGR5hMIHt%2B80GOqUBFdlN7oPOrMd1NFhiuy0wxffcY6SJGm0fPqV202n8DZU1kmzKlbgnv67Vw0afYDx5kagfgM2STuKDr4CEYDq167eA4ZfzI24wF7N9BRtBMgmMIcxbBASBKOOAN5aRjs7Q5PSJS6HcZqDOD8fRBDWvIo%2BqT9oVYTk38GskdGYPlnGQCl9ejXXGW%2BycuzrROCCNjXIrBkFrxr%2FlWYQf%2BgI89%2FTzJJK%2F&X-Amz-Signature=473b9ebf8273545ddaa163f77cf820f2ba11a3bf596adb90083a36f441927f82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZW6DKZFU%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T211249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEnmy3ro7KD469gM0DyiJMG1hom59Tbj1TlVCCz1JnW9AiAFQOZml%2FaDq6naR%2B7FacApMQvUdt2lDPdvHoCbWMCRoCr%2FAwhVEAAaDDYzNzQyMzE4MzgwNSIM91Jnq11lW%2BftiCdmKtwDNtXjPRIL64ryE4SEZT7KT62rwZnOoM%2FplwQ6MVxd1odzwB1Gf1OZMD1E0PRa%2FFGVJnOtmY46skMtkLz6p99zl4fhx2yiCnWpgBQvkEh1OYyk8wemDtID9Eu3eq7%2BVmZanAeNp4VGNyUU%2BAlhwfeEQWwgV%2F1o4uDrrgLTcsTljx6LRoPu1Ihultg1MpTRxEok1qYfGhrcEBQA0ml6geSasvS0QhTKTYNYEzrelmyUG%2Fete7QKoRQN4Fa%2BTHVnjrb0ubeeZhxvloeM2YowJ00TsjAaokp5JYft146QvL383bOmZq%2F1VSYP3Cl4YrD3ckX4Cql%2BfPEbx0yCuhLvGbK24Cw%2BrTuRZZAvRIHJ7WCjlK0UZxW3wAST2AnUDUqHRxaWIbbza1r9WB6NBMX5H67%2F3xdU5ME7t8222yrUxLRBsO0GWv4CyUgqOnFbA2FBhAV%2BcgFjSLbykGX80hJX7BKsrU8Jr5XvgaZZnDw6iGk5soJ2QsQngAg8tX22Fs1j%2FXt9fnM8rZ9FnEKzk8sVNahB0A%2FmbG4cgBafy4vibPUuE2DU%2FVpRkt6GylJ7XzV%2FazqgEmoAPjmdXK9JRBqXmcN4dtv9ODnwN68zmefoid%2Bu0y6h0L5Rou5vCAbXedQwsu37zQY6pgH4dmmag%2FQvHsSryxFOtb12nQn7zQQbTJuD3Jz0MgXDp93Y8xI6Mi2h0wdatyIObDZ3%2FtRb8DWXq6YzXquEEBip9gy5WXDHyfBJxJPodt1ltAg8NcOsDYkP%2FjpYbeIau4G6u%2BSFVGUZc0LDEcvqJ3teC7G5h4iD%2BRYxBpkN%2FVSv8nI69XhxRM3OtmKIkY0dMjlg95OaEK3jtIQtLeLR9JKwnMyjQ4SH&X-Amz-Signature=aa1d165af3f46b794fd6730dc14aff5eabdb79145c1d46c950c49959cf975528&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCAI624G%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T211304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC0aNJwqdHFwi4%2Fqb%2B3WbTXAr1sDtktBJH3eOKUUH6a6gIhAJbSD5B%2B7Kc9LbfSsj2g4rta0zb%2BQ2b8sx5Nc%2F1dqP0iKv8DCFUQABoMNjM3NDIzMTgzODA1Igw%2FT17zoyvsk9Xb1P0q3AP8%2FiM7kL4nIwXT%2FoIC6yPaak6fktM6vgvDJSqmmmAO7co%2BJz%2FfQ60BI5BjtG7nIHdNwl%2BPbKyTXYNlVD5smIezHe9SXcKwb6aq%2FjucHXt1vDBFML%2F1pF3BWm3jkZDMOXKhZImAzTs6hjhzS1zSlVuTX%2BwRNaweQw8IjhH%2BNwu7V5cIb0UMceGHm5xtwD6QvJIlXAWcaS3vwnqdAmIe3t%2FJXNkn7HNFsotGct3KEgvGDKmUPho33am2hQa25HRpalLwIXsRKUJXHZ%2BzsHLanCl4hY2YpifHljeEhoyW3i3Sl9iqxwHl8EGYVdODUL%2F5auhf9e6%2B4TLU%2FjG0%2Fso%2Fu%2Bzo7IRl7F4kgzVrw0NjC6cTGTQiAab1Lfj7cOnKTv8XEZWQNdtCh6Igq0VqF3Atm0iPPsiN8rf0%2FavPaQRpwQ1LBrQriTJQEFS2IqyhG7hCaKgTXezOJtAL4N53azqRTeMLt%2BWLhMUcX%2BiF%2FfzPJ3HpLkG6wvKJkpyMPt5K%2B49C3fnFWIJzxdb7VWO4ewMJUO19qp5mssNh804z2%2BptrnBAPux6TVwCZnWsFUbcBS3tXLB1c1DgHZuiBVRxxq8Yz43v5h1ndZkNwGfJAW%2BT9LBeTM5P5vE%2FZDPbGU3OQDCW7fvNBjqkAaSR8aJuXXBfj6Td4BwAbf7%2FRlgxrro95dfACIb4mCjYs%2BZuZD5VN7usIg27qnL7rZqeF2vxMuuONytFHZCipv5MLEA%2FCa1fU%2FzJfqhT%2BH6sl9KO86wkYE6UNursrZ%2FhjWw7PM5jokxuVTTO3uFc933KhkPUpUf6SM6Vwqnhd70Okv1Um7%2FFSyr7o%2F6qBo%2FBDfzFnt4%2F1E2lcaB755wB8swsMFYU&X-Amz-Signature=b4a86f2269045986e523a8de4540946481a4e5c469e9254eab0d5acd0f7c63f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCAI624G%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T211304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC0aNJwqdHFwi4%2Fqb%2B3WbTXAr1sDtktBJH3eOKUUH6a6gIhAJbSD5B%2B7Kc9LbfSsj2g4rta0zb%2BQ2b8sx5Nc%2F1dqP0iKv8DCFUQABoMNjM3NDIzMTgzODA1Igw%2FT17zoyvsk9Xb1P0q3AP8%2FiM7kL4nIwXT%2FoIC6yPaak6fktM6vgvDJSqmmmAO7co%2BJz%2FfQ60BI5BjtG7nIHdNwl%2BPbKyTXYNlVD5smIezHe9SXcKwb6aq%2FjucHXt1vDBFML%2F1pF3BWm3jkZDMOXKhZImAzTs6hjhzS1zSlVuTX%2BwRNaweQw8IjhH%2BNwu7V5cIb0UMceGHm5xtwD6QvJIlXAWcaS3vwnqdAmIe3t%2FJXNkn7HNFsotGct3KEgvGDKmUPho33am2hQa25HRpalLwIXsRKUJXHZ%2BzsHLanCl4hY2YpifHljeEhoyW3i3Sl9iqxwHl8EGYVdODUL%2F5auhf9e6%2B4TLU%2FjG0%2Fso%2Fu%2Bzo7IRl7F4kgzVrw0NjC6cTGTQiAab1Lfj7cOnKTv8XEZWQNdtCh6Igq0VqF3Atm0iPPsiN8rf0%2FavPaQRpwQ1LBrQriTJQEFS2IqyhG7hCaKgTXezOJtAL4N53azqRTeMLt%2BWLhMUcX%2BiF%2FfzPJ3HpLkG6wvKJkpyMPt5K%2B49C3fnFWIJzxdb7VWO4ewMJUO19qp5mssNh804z2%2BptrnBAPux6TVwCZnWsFUbcBS3tXLB1c1DgHZuiBVRxxq8Yz43v5h1ndZkNwGfJAW%2BT9LBeTM5P5vE%2FZDPbGU3OQDCW7fvNBjqkAaSR8aJuXXBfj6Td4BwAbf7%2FRlgxrro95dfACIb4mCjYs%2BZuZD5VN7usIg27qnL7rZqeF2vxMuuONytFHZCipv5MLEA%2FCa1fU%2FzJfqhT%2BH6sl9KO86wkYE6UNursrZ%2FhjWw7PM5jokxuVTTO3uFc933KhkPUpUf6SM6Vwqnhd70Okv1Um7%2FFSyr7o%2F6qBo%2FBDfzFnt4%2F1E2lcaB755wB8swsMFYU&X-Amz-Signature=b4a86f2269045986e523a8de4540946481a4e5c469e9254eab0d5acd0f7c63f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDUBRLDD%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T211305Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDP6LaR6q%2FdYnzSc6aEPsCMNignrIRPaeCctB23UbSmqgIhAP6A25nKJcodMH6RXYhtyg6utINbUPk0jeq0fRen5BjrKv8DCFUQABoMNjM3NDIzMTgzODA1IgyKdN9F%2FSLjOJyyHvAq3ANSzhHDZIZ8out0%2BNd6HiB3S4bdW9IcJs%2F411tDH6Xbakw7uHBfFxGK%2BiOzNbB7w9lKa8LZoil1Ucg%2B871PScqoXcWfpn6A5R2ybfDSMXVln%2F4LwmqoANoWc37Tzbc6JvoeXpCJ0dEY6zf4ORnRxljFUFX3Er52fbXEi25m%2BcIE4YF%2BF619Ix%2Byn4nB%2FbkZjxC5bm5bKJV4yeEqb%2BXXC%2Fcfj%2BeC6BydutlD9dwNyGLJ9jXC2thEF7YRQl3Wopo%2BL1igwnbFxvW5MPjDxxbKQE2MQjPy2e8mCIMYXYNO6cuhWfWA9hRsi2yIZgtXk9p18U3tp2MdTZUHkP9yOx%2Bg7qWb2%2FqWxc21M90l1p5tibtenMuoPvrzBiTPnZoj5g7Fj4EcG1aO0xtPUJD5Y4t%2Fq8vDAOoFIVPlCg3CGcMDkBqsAmjHviJWX2qkBAs5DHx8XUcoGUAuJ3E2yVFP0NxC%2BDR5KG%2FgrdCb78AsJaXqCb7ab%2FeNv94iD1Zq%2FQti%2Bsew1rjwiN%2BVgUSjrSiR3bfMINQmtH0G3if2AW6cz5y5af1u2zr18JJSJ20x5OwRL0BpooOBNoaiok%2FkgTEZmInJrqUWYcR8QPoALsJRfaMjquYwczUXCdPiCrtLVPuF2DCL7fvNBjqkAcQ%2F7KjvYBPgt381VdZD44drwfrkah9vo2elmI%2FLCHPKYfgwGBjaYibNrOfqzCtYQlrzedfQxk8qq9ADvhgKPeuOQ%2FIPuz1ZXpqgy58WOg3C2Ubp4Pnij5BqR6KEuH5baQnG5WmTbAFwJpNUdXvz4o9hfT9OK5auIR8lEuuJGU5r19cr%2BHxsQaoMOiFjbRGMmQRUZIcRs0KOSLhvgZJkX6mGwkGT&X-Amz-Signature=c96ee40d2bd3989e24ac3739905b7e9bcf886875b91f4bde71fe15bba983ef0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

