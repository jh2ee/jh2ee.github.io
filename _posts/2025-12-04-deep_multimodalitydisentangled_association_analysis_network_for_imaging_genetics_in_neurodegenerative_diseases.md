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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643C3YWPQ%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T175448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIDl%2FEkyahezhSx%2BXQKJOwlw6A1KuCf73GhdU1JDI9VWfAiEAiaJIIGd8isbCWw0Qt9ClYtQly7E9x3i4hOYoNN%2F4cxEq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDD4BX2pz46pQqFGm4CrcA02zn19MR8GtlMPQ2noL3HP9QYRlTWkkgvIJe20OZIfbVAgVq8qISYth5qDlxndsj9vRF7ZiEQ5BXYZ1z4z2%2BTQWqEOCph1VbHReTp5won29YuoYDyF8y4XbOhoEjsMYj%2BeyORWUtClP%2FY0jeTnhi%2B9CvsNErd5wCa%2BbSiE2tVtTUK7oXLjjldFvLBtgUmco99LG%2FiS%2BZ2G14RCQV9p%2FLKx91BnQUENck6SyFtNG4vzDt7ffEKXUrH9ZQ2s5RXOZm3XXoXJPDWkpbjI42kHzad8h94%2F9uuv8GvA27M2%2FTjksM0C59vL%2Fd6%2B%2F3k%2Bav%2FwbK9pNxgpiT8%2BYPDazBvCx8f0AURgNPhKILg5xdU59T4k1bKnd4tybfiEJenJmj8yGAVR%2FqVTG1Vjsmu7iIah7Mvwb8rM9ruDl%2BiXSkzoKvaNSU%2FIklA3W8SEcqhdJeAh5Q6g8tPVYZGq9Vx6W492mMhSJye2Y%2Fmb7NZ%2FDce6QFODbujXao9X9AJJeaFmxdsu1w0Ng4qMO9XpxMVD7RqE0bwAM6j%2BHM4I75iAXTkpr8sFpJXbcSuha7b3Jr%2FDFXNgkbD9lZE6GTqgPOUsG8qL3VD2aV5kr7igluSLKbNnMw8OL2Wu77wYZ1mDEI693MOLt2c4GOqUBOSo4zhJDul65qV%2BkG1FzOcPLCcoK6oj8fHdMATdtRvco09d%2FWChsdw8wZ%2Bx7jpVb4b5dR2gBx480PzVm4QmEtF7XlQLGzKBpCOmocwg8YUbpbN2o9kFsE0j7m7vgTgzuQ7%2FTyanYaX1n9g2RLm7cqWQNW0qh247ohWRlQw0bFAf%2BGIGyXku0CTx185Dkv%2FwmKCc8ASsl4ywLHAhmweGhSSOfsI4a&X-Amz-Signature=420f18408e33bf01964e1cbabe2d6a6d075976ca3f6b50bd5cb40be087b71832&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643C3YWPQ%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T175448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIDl%2FEkyahezhSx%2BXQKJOwlw6A1KuCf73GhdU1JDI9VWfAiEAiaJIIGd8isbCWw0Qt9ClYtQly7E9x3i4hOYoNN%2F4cxEq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDD4BX2pz46pQqFGm4CrcA02zn19MR8GtlMPQ2noL3HP9QYRlTWkkgvIJe20OZIfbVAgVq8qISYth5qDlxndsj9vRF7ZiEQ5BXYZ1z4z2%2BTQWqEOCph1VbHReTp5won29YuoYDyF8y4XbOhoEjsMYj%2BeyORWUtClP%2FY0jeTnhi%2B9CvsNErd5wCa%2BbSiE2tVtTUK7oXLjjldFvLBtgUmco99LG%2FiS%2BZ2G14RCQV9p%2FLKx91BnQUENck6SyFtNG4vzDt7ffEKXUrH9ZQ2s5RXOZm3XXoXJPDWkpbjI42kHzad8h94%2F9uuv8GvA27M2%2FTjksM0C59vL%2Fd6%2B%2F3k%2Bav%2FwbK9pNxgpiT8%2BYPDazBvCx8f0AURgNPhKILg5xdU59T4k1bKnd4tybfiEJenJmj8yGAVR%2FqVTG1Vjsmu7iIah7Mvwb8rM9ruDl%2BiXSkzoKvaNSU%2FIklA3W8SEcqhdJeAh5Q6g8tPVYZGq9Vx6W492mMhSJye2Y%2Fmb7NZ%2FDce6QFODbujXao9X9AJJeaFmxdsu1w0Ng4qMO9XpxMVD7RqE0bwAM6j%2BHM4I75iAXTkpr8sFpJXbcSuha7b3Jr%2FDFXNgkbD9lZE6GTqgPOUsG8qL3VD2aV5kr7igluSLKbNnMw8OL2Wu77wYZ1mDEI693MOLt2c4GOqUBOSo4zhJDul65qV%2BkG1FzOcPLCcoK6oj8fHdMATdtRvco09d%2FWChsdw8wZ%2Bx7jpVb4b5dR2gBx480PzVm4QmEtF7XlQLGzKBpCOmocwg8YUbpbN2o9kFsE0j7m7vgTgzuQ7%2FTyanYaX1n9g2RLm7cqWQNW0qh247ohWRlQw0bFAf%2BGIGyXku0CTx185Dkv%2FwmKCc8ASsl4ywLHAhmweGhSSOfsI4a&X-Amz-Signature=420f18408e33bf01964e1cbabe2d6a6d075976ca3f6b50bd5cb40be087b71832&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DQVWMX2%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T175448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJIMEYCIQDUgpFJqYVpZpk8gb%2BC7ewCkEf8OjIrs5N0bI%2Bl%2FRvlbgIhALO1Q7k9HRNsubLmlkDyfPmTvhgobJ17jHv%2BQDrXs2gsKv8DCAMQABoMNjM3NDIzMTgzODA1IgwfWRVsOPVeaAlw%2BnMq3AMcVEd0LB%2FDkiyJsyoLgnWLVN995iJmlFrb54O4cpo6ezYIqhzbgLzGa2DsZZQ1SncTkrVv%2BL%2FzAMdPEr%2FnpzAaDSOqN9emrXRO%2B%2FRs9sUlQvEWYswXxYzcW7Vs0HSyHS%2FLB4tR5%2Bw66bV406LHOQ%2Fliee56SOYnYD8qhMdmQW1zLx7ShNQA0gbspCaJoJ1iHlEq%2BJOwkVcguue1Z0gk5q8tN3YpYGVr9YNLTPd4PCRCp3PakBTNTJheabwy%2FarwyGn6kbkq7szxxJWToM9ZzLAGjm8oEM0Zfav7JForWhV9JNHM4A%2B0Ptq4LbhOOv4z0owg7gXO6w1JpCGG0L9N4jwbPkMegcUdf1CHwRANhHbtgvY%2Fsk23aOpuNzzpFVH3HoQv8r0B73PN2YhVbOKGt1uI2BYlpSGx%2FvlRnzQawRllOmw0oTkgCTlcAKy3ZhzOWaQ0YxAORMk8OmUAPdfBEvqgSYFbFWnjqQBuQ4bKMrCnnEvv4uKc98%2B9OUpPX8E%2F5gQng2XeLYjck6RTf%2BxThMfAJCvmxoIv4gFm0BVD8JLepv9BcXVQho4FhGanSWoLXWX9zSs2zaTf2OjxDIMLENeWxFk7Mm1KyJYP6IJH2Ng598EThAwkEUNSWRxmTDmq9rOBjqkAbBOKX4T9lpO9RWE8A4AHP7JCAnRTxjliiTtcPets0wAgg1v8Lwww3m4cWNmyaxX1%2BLeghJHbpkYVBBRIQ2iLCeOnCp3g9Iphaj4tCwrDDZCeL93A2ebZYEENAyyjUX0NhhbGIuuJg3z6TpTXiXHNOGsYu7s00al1cI3ZL9Ol6UBAY4feho0WRWXiVSKoh2gCfiYn7wIG%2FEGLqqB%2Fn6l8uTO10AW&X-Amz-Signature=8469ca51baede93c45a3dad4db5908048a8972e0ef313f41e4aaa3424412c7f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UP6PBV5%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T175452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJHMEUCID%2F1u6%2BBkH0zBs%2BT4h2umzqD4DIQPyVNMfJv1AeF%2Fa%2FJAiEA4cnU3oiJu1dYfe4FfakX69aALbmKhDza4OanX14DSqcq%2FwMIAxAAGgw2Mzc0MjMxODM4MDUiDCayKVAd7dSr5MnWcircA9VUhKD9CVprNyjtfHzPLMEM%2B6wbAFuQAN6k5HvqM7ePesQwmEEZUFFBj4VsaanVyRNx8DTeG0uxGg2yiykxzNxKD10mQHlH8XrWAZljmVm382aKS6rv7%2FtZvi8ymYS2txolA6oDnutsOk2H8rOKBdGkrne%2BHica8mtJd34S3yKMl5Iu9VTb8ZUGux8pPrOrlPOqpI8MF%2FUhzubOEfHkf0f89nb7mrkQqga%2BgrftxQvqUtUMzKDKN8Fn3PcTUmnx5xjjUex56r9oaBo3RxbxeK%2FCS5gzBM0yL2QFCP65nmHpOd0TswALtyYab1zbae24rQPceqSRSb%2F82BdMOF1TenYZAghYlY4ENL0JdbLm3Ldf8Y3tdE3JTlRE9o2kOVOoSxr05gwzwIVHKxrDTCgf%2FYfNSwKMKUTLNQ1vNLsjEDnCiLJumcod1hNtH9lQLoypiYK5fTMSky%2BdnLRyHerSCLmydYA9Thy0v1BbErY2L1zlMsUkV4hxD6DTND9p9zPyjsTsgossIOHHAbGwnlmV94i%2F88nm1CN4BeLaaX79uZm%2B2BwkBYbC%2B0v6dJcuJxC0req%2Bo1563GdlDaGWzT%2FOFlLlUegp9jB6Di5QjD8p6Bq0lbDKcjehESXBkAfNMKas2s4GOqUBd1vvUOafhu7ix0RyzwrO7%2B29xVXz57JxZzoroSzghlnvC9zTYIonaVEo6gwCyfb9pb3Bvh0VsPUwsGXVt3G5RnChz1z8edc%2BZy8p53GFQ7m1PXVA0ZqkRYqloo36PZo2n49lS0jF6wjXZBWCnSlG23GH7A3hFyy2A44GGs1HDfa%2FJz3Hn8PqYe7RPyvbjPt9VovQlrDF6l6NBqd%2B9L5Q58ligBHJ&X-Amz-Signature=a2566bc7b2d4169463eab4205069d715f3a821a63f43573fff9a168bcc97d046&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UP6PBV5%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T175452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJHMEUCID%2F1u6%2BBkH0zBs%2BT4h2umzqD4DIQPyVNMfJv1AeF%2Fa%2FJAiEA4cnU3oiJu1dYfe4FfakX69aALbmKhDza4OanX14DSqcq%2FwMIAxAAGgw2Mzc0MjMxODM4MDUiDCayKVAd7dSr5MnWcircA9VUhKD9CVprNyjtfHzPLMEM%2B6wbAFuQAN6k5HvqM7ePesQwmEEZUFFBj4VsaanVyRNx8DTeG0uxGg2yiykxzNxKD10mQHlH8XrWAZljmVm382aKS6rv7%2FtZvi8ymYS2txolA6oDnutsOk2H8rOKBdGkrne%2BHica8mtJd34S3yKMl5Iu9VTb8ZUGux8pPrOrlPOqpI8MF%2FUhzubOEfHkf0f89nb7mrkQqga%2BgrftxQvqUtUMzKDKN8Fn3PcTUmnx5xjjUex56r9oaBo3RxbxeK%2FCS5gzBM0yL2QFCP65nmHpOd0TswALtyYab1zbae24rQPceqSRSb%2F82BdMOF1TenYZAghYlY4ENL0JdbLm3Ldf8Y3tdE3JTlRE9o2kOVOoSxr05gwzwIVHKxrDTCgf%2FYfNSwKMKUTLNQ1vNLsjEDnCiLJumcod1hNtH9lQLoypiYK5fTMSky%2BdnLRyHerSCLmydYA9Thy0v1BbErY2L1zlMsUkV4hxD6DTND9p9zPyjsTsgossIOHHAbGwnlmV94i%2F88nm1CN4BeLaaX79uZm%2B2BwkBYbC%2B0v6dJcuJxC0req%2Bo1563GdlDaGWzT%2FOFlLlUegp9jB6Di5QjD8p6Bq0lbDKcjehESXBkAfNMKas2s4GOqUBd1vvUOafhu7ix0RyzwrO7%2B29xVXz57JxZzoroSzghlnvC9zTYIonaVEo6gwCyfb9pb3Bvh0VsPUwsGXVt3G5RnChz1z8edc%2BZy8p53GFQ7m1PXVA0ZqkRYqloo36PZo2n49lS0jF6wjXZBWCnSlG23GH7A3hFyy2A44GGs1HDfa%2FJz3Hn8PqYe7RPyvbjPt9VovQlrDF6l6NBqd%2B9L5Q58ligBHJ&X-Amz-Signature=a6131e3eef64dc020c92ab92e197a73e8f4fe41cdbfa15c9fc3dbadde41bf8f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SOY2QAAG%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T175453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCICYgq15Buk%2BQqI4GrZCeQ74ni%2BMnNSg4LtewTvZdUWKyAiBXQkRrDVJxyXgeuDcGxgUQCICnZeWZvTIcgvNvBCpb7Sr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMxYxlhcSCvKnDCZa4KtwDy%2FA6LCqfFByb1paCoV7K0zitqSvEabcaEpnCUUUmaLTDJLvsHGRRInnPf5bzmrvEBgjMDSVhfRc6CNBFPBP%2FmUl4uOePHLqhYwS7kM0R3XWyHWnM%2F3Pknx9Ue5aK7a%2BVOiuP3ByF2MjNdbed3QywfkbqbopNYey7vjhDQqn82rymbXYmGlMp8yghk2yGgZ8rparXsaVeA7T85MfwhR1VuPF8JeHxymRh%2Bo5TmZExaSSjLBl6TcTRdi4H6RDiz9V4tieeONZbkvkVUj449IjZFNcOgRMQjUDntK2y7MNJVzWxHG%2BvYBqOLeUJk3OtNOIlXW4lU9r2vSPABhnhJMh7uavc6vneYaU%2FRECVg0I0GE0RqfhQ4btoUDNkLO1gwm7LdJ4KpwLIzkls3U1kGwUPwT%2BOy%2B2ijyKSiKy2j10q1sHA%2BjHkGmeJec6%2BPe7K4%2Bp6rdYcxOVE7NkyozTEaBszB36C5YSPaD8io0fssDNUJL7bs5Z4HyBW2GubBEaT%2F0GoFq2gyVO7pMVovjNxe28Opz8Q9IkWe5TLPXrUE4eV6kdwHuYlMrsYiU7Li5KNYYpd3WRdsHWD373z73NddronDgSzeWaOP7lwNgQqN1oqJr9XGgy20DTlcXVANwcwhO3ZzgY6pgGMsMh5Wt668uJsq2KYG72pcOKItRULKGMSYNSu%2BnjCMwIbDWfY%2BPydZORfvqHzW0gbmwpI8l6Q3MYeRD8tzls4TDJ41t%2BECSEpiGvMmruHBWiSN6sTfAJQhQAcAv9Ils6CYwV7ePVJufWCzCEdGsuQsaDTvfPt5nbp5hN26SKPUGPV4tJbKY9eL8yMpFrH6Nz2qCyQO0xOnJOuFS%2F7z356Yz8muuFM&X-Amz-Signature=88da21dd44c5784722c165d0f5a34c339fcd18c9409001223b361f68db8321fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5AUKAAL%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T175453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIDYe%2B2fUBSwoPOqbmVQxTG%2BxUv6Dy4sSeM0RRJHVt%2FATAiBIQ3ggAL4BbdfvmT7zQ%2BjK6CcEIXXkhiy0tgTr2CsmNyr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMZXcncV1R%2FYX6CCbdKtwDQowIGeGFnsZWJ1W42eYimnLJ7QHaMudjwmCCwoMbz5B7FamvTzifxHgtHLZzhYaCDyJ3y05%2BhumlQd%2Bqt1%2BWVG0UfNl2n2dLnnyzOJy6DF4z00ecsbOvTDxL58FzsZ%2BAOv%2BqlDwuwbFD4PWR6KbTNuz10Ql%2FpNnQ1iBzKCGB85MeA6%2FMGoxA99anVJfiClEMx3u6uvkka3koHSrsJRNOtrI%2FbNBk1Z8XP7vgWWtPcmRsXcypWMRQ%2BUpcZe3obKLkZcmPnLEsHgNDjX61k5tFnP7jzLWPEtyUbgAEwM5OglzfeXqunVqUYisOVYmgz8tGSKq6Wwd9p1YV%2BNe%2FtGTtTnd7SQZTNmpm2e0fxqZKd6t4AFXlHv6uU5rYEPEvf6uW6FNJkiQ%2BkL2p9vA%2FYm0qt0hvcvz8Uix%2BrDFYlyBbOcx%2FLVNDZomR52%2FP18nddyCg5Nqbh0cztTjYDqOtaHsMUduWoC8sl1gCX7wOIOj%2FoAkaVAEBTxUF7itVZrVNUYjesOA%2FzPlYXA10Qg%2F8c0FZI9IUemdKzcr5X%2B4rhj4SHkGB%2BSz4D9O6jfYqF0d2tKnTBGG%2FTAoSM9tDkSwJW%2FUHt9SV%2F4qMwL%2BWrpUbvcunwijC8mF2PVGiBtWH4v4wye7ZzgY6pgG6VC%2F%2Fu%2Bwel%2FpVmxyM4itW3a8FHMdGCvM%2B35rAA5TJrUiPWWZ9wlZUET0lNhqhzLFkQRKMnyjIWveGMXUvsPZ1J0r01NBmBeRL6wNdT4hz031EbVMbxocO33mma2CcMXnHoFzGy8PBlWRoX5ivH%2FGE7Siiqya4fwFNd7jEJ%2BjC36Cr5%2B3keaPG%2Fa0SygPI2Uj4tONgF4ttaRVvXxZemp9GFQy9zMHq&X-Amz-Signature=ce191e641dc068a598f9a12eb21df79f8e55a8faeef8a9b1f6aee9a5cd6d3a74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLFAL4EK%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T175454Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQDc8goPsJlk4AWs3RC8PYZ6HEimPLLGfgexJIkl0kiqHwIgN1v0eRjgF3LSQZz%2F3A5K%2FibbUcWyrf%2FxMK%2FJAf8ftnoq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDH9tAHkDl2%2F8wKYlbCrcAxC7AB8ssWM2V7rRkX5wCPlqHLC53%2Fq%2FSrhzEr3HIXUuf1WMdmpuenGjW6Rk%2Bds5HJgTVfYYmzAUGKjTwNwL0vKZvnQV6zMMs6EW%2B7GfrMVrZERv7BAxee7n4TN8Yk7KN%2Bul918eHIiTMl0H%2BhVHBHOQ60bfJe4QH2h96BxxsGw1B2IxzhC1USJFyDErH56k71zBcW2exck3g8dXolNmbwqF%2BlXPTQWjsmnHKQni2VzSEPYdbcJjN5N4pv1gC%2Bumrv1j2WePj1phuTbCXzv4Gp8yRde5SCNwyERwvP92twVGy3lvp%2FUlLo4leYT%2BZrxYhyngdDr08ijIlCtApyAw0%2BDQ9A9EjMnq8Gstiq0pgt4ZY3quyxr9LHH04DIAwe2BFdXPm%2BlPzupjqBI55dOTV3EwuU7V%2FI9QIUFH46DnlKnkI%2BMf%2BlfVgu9kNcHXNjwylKU2NDwXdnPX2nSi8W8PHnbV3hl7lcv%2BzEBzZN4at2vjEF3jTSMFMuX9v9g99ejUSbhwRUvBCGlYA2vChVNM9alvqo3H6w%2Bd2stKc1GenAHCIj%2FrAlfuirF6LZ%2Fyz1LWkyqrNgDbuGcyuIunPysrXPjDyraWS2nirLXQZp%2FSH1xgxqppWXhtIO1hRM0wMI6G2s4GOqUBPJwWtYSPxhxUDqkckmhGDaWmCLd%2FDtiNkRmxS7FxGbXAuukw81kZY0mU%2BGbAFNsAykdIZSrCpXOktgOmh5Uq0J9Hvjvq3xBJnXzE2wo7BDUav7UaKYxPdgiObnn9qGULmviQUHC7L0aPidLTXeYfvl6iYoxxaZUVb0003C4zLk3rwm5ATuJ6zxfzDCkM7W7lbEw5kqQsuKsxQGyRP0dbuAoTBeYS&X-Amz-Signature=b8a3c67aaed878009e64a696d091b79586999fa9b5f694cb763d320ea2b1ad84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXE2G2CR%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T175455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQDzDx7y48JpYACVCb1DDqQ6d6wy5uhj2cfdybAr9ozBwwIgfkJkl8CH%2BgyKNqiyR37AVvFEHInViGLRx6Qjhwmyp38q%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDE6hXXQ%2FrC6ITB4n3ircA0tKP3dItPoqr%2BY3WXT8Z18bxrjWYLG%2BizCydWw9OKk8qBXFvIcX8loan0qu7vTvex3TsdNmmqUYuu5Oq8QkMSSDhJo%2BTe2M%2FM4NhjHl84YGsgM6dB8%2FknQgL%2BLzJge5vK8khV1V%2Bz0c%2BtGOxk%2B4ZacuVnG2Lsv53z0%2BVF3jP8dWAs3LTstfU3qwQYgTYkoahuGI1V3%2Fg65pMOa6YRPKEJUh6stVrrRNXVGlxYxeQxwAb2WtT%2B%2B1hez6xOd4fGoCOmFKLTxQNrK0K4%2B68sOGSebkIBUY9e%2BB5QU17DscixPejMtjEz6tuTIfOk%2F3jfXBjlcm826TGpKtFa7WD3pMPYaNThidJiFbs18zNr7FK36YqwiVYYqgsGS0lqempjclvlUVwWw0BuDQqMiNDdguveXA3%2BPg9ru8msbvWybHl%2F9j88d6XGwKlH%2FmvnwOqguqFMmL6sthOOxVLe0TW9PzJH6538rGCKnAnDS7BXfwcUqUCFDRIKjHIf0sUTIfdUOXYw2q0T4JX2RFcII2mBi9yjIovzHsfggxlFOyg2TP8SwsH3OaykUlzxp4BMLB5qbX0TSWEG85MCNn3jXo1Lzjdg8RGjY8KKjoGXYYeDOPPyCdljjJthd5fWuVgXt2MPT62c4GOqUBWvT4ivzFPfKgI8rn1O9CrYk0GaWAhePEDKAv%2F90NvU8CdQ1zsFVeY4YzKTDIBfXHUQdg5siDyK0c1qgWPYRTNPFfypygv4CRn5nInRfLL1eFrxZfRyP%2FsQDCR7px4O7xIMcvnhmZkzhhXEP2bo6WrdpAogeYdY07mWD6YhMSTaGQYHokz4uN8QkWl5ZddJ343WeWslheqX8wwYwu%2F8tfN1RZhHQx&X-Amz-Signature=090969e8181d1138f4bbed262a06474528c4ff47bd960da1e2ffec9b05631c72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXE2G2CR%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T175455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQDzDx7y48JpYACVCb1DDqQ6d6wy5uhj2cfdybAr9ozBwwIgfkJkl8CH%2BgyKNqiyR37AVvFEHInViGLRx6Qjhwmyp38q%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDE6hXXQ%2FrC6ITB4n3ircA0tKP3dItPoqr%2BY3WXT8Z18bxrjWYLG%2BizCydWw9OKk8qBXFvIcX8loan0qu7vTvex3TsdNmmqUYuu5Oq8QkMSSDhJo%2BTe2M%2FM4NhjHl84YGsgM6dB8%2FknQgL%2BLzJge5vK8khV1V%2Bz0c%2BtGOxk%2B4ZacuVnG2Lsv53z0%2BVF3jP8dWAs3LTstfU3qwQYgTYkoahuGI1V3%2Fg65pMOa6YRPKEJUh6stVrrRNXVGlxYxeQxwAb2WtT%2B%2B1hez6xOd4fGoCOmFKLTxQNrK0K4%2B68sOGSebkIBUY9e%2BB5QU17DscixPejMtjEz6tuTIfOk%2F3jfXBjlcm826TGpKtFa7WD3pMPYaNThidJiFbs18zNr7FK36YqwiVYYqgsGS0lqempjclvlUVwWw0BuDQqMiNDdguveXA3%2BPg9ru8msbvWybHl%2F9j88d6XGwKlH%2FmvnwOqguqFMmL6sthOOxVLe0TW9PzJH6538rGCKnAnDS7BXfwcUqUCFDRIKjHIf0sUTIfdUOXYw2q0T4JX2RFcII2mBi9yjIovzHsfggxlFOyg2TP8SwsH3OaykUlzxp4BMLB5qbX0TSWEG85MCNn3jXo1Lzjdg8RGjY8KKjoGXYYeDOPPyCdljjJthd5fWuVgXt2MPT62c4GOqUBWvT4ivzFPfKgI8rn1O9CrYk0GaWAhePEDKAv%2F90NvU8CdQ1zsFVeY4YzKTDIBfXHUQdg5siDyK0c1qgWPYRTNPFfypygv4CRn5nInRfLL1eFrxZfRyP%2FsQDCR7px4O7xIMcvnhmZkzhhXEP2bo6WrdpAogeYdY07mWD6YhMSTaGQYHokz4uN8QkWl5ZddJ343WeWslheqX8wwYwu%2F8tfN1RZhHQx&X-Amz-Signature=9eff8987506b3528511b20a058b13406cf0b130232840cac98c7cd5500d1d29d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJNDYQMY%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T175446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQC3%2FCLp6iSgUBqrDYJvRyPN%2BfK7Uclegkbc0gI7FLQiJAIhAK01vBVZeBWHNS%2FYTNFHJNBnkpiSOtEkjNmKNXn5BiGgKv8DCAEQABoMNjM3NDIzMTgzODA1Igzn%2FH1hdYo%2FoPYUWJ8q3APLM0i6IjagZuF7bg%2FYy2%2BnJigwsK40w%2BIszt6lWEtISHqKmd%2FVy7XV%2BeyOQ8MLlKw2Ov4NvZi8oJddK0mR0%2F6GEJLA1k%2B%2B27dK18Xsofwrn0YJHElFugdudQFDyiaeA%2FkyP8cpRcMRciOCkmg3%2B7wMc1taDwOIuWNcUhdb7gx97OinsmYJWFu7y2GVh1o1b1US1%2BwuvxPOgdkfBeWPkYeB5n37u09gPH8Vsz3LN3o1j6sJrWqMUW3uNSjiX%2BimBIriDYBLMmIWVonLLEl5LLja2xxdeh4347wMQkhGv2mqWNIF1tFbjJwq8lt9PdVqbNgvC1WSetxoMpmw6D0fHtDzuTWHQSkkZ3%2BTeZPvSVU5zdpyPhU1pEZTvkYHkAThR2KrjNrRObG7ifjNHfL90Sl2ug6497kUiO5hOdZcZm3PPPBAVlfnCZocOhQ%2Fwpkut8ovy2oKlFDAPOZxbBBmOX1osb0NSKN5QZDfV3g1dKk9umic8AxQpT9Tz9LcYtHfqqTHfUbrMBh2aGC9kbf5hximKKt9I3etZxcsnUcGpD0MG8PrFKA7CLKn9W85PSE%2Bd7QnXDsnu8toFImESPUBk1AVm2u2WQb%2BdaftrrVPAI4XYyxpBhrrUarGtyjF%2FDCx7dnOBjqkARN0iDFTo2eBCkwaLb0cGYgGvuxb8ot04ZCMCMTJUDujS%2BpmKJLzHsSl0HINkWFJydraHIciK4qCC6nxadTt3ijtd7bC72z8kEVysxY9NHn0Znx4aeCxSA0i1Ayp06UejX38qgpC3CfyoBOe84T6NELwtD4PXBhYLcdwggU0FQ6z5WPDfWuS7o6nqjdp3MfMsiPumHNf49T26fig2yKCtG20pt6u&X-Amz-Signature=fb582279e0807807c7b01cd83c78a93bbe1c76b11ff01991758fdd5883a8632e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BHHDL2O%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T175459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCICmIN8eJBZHsMcKNKmzYdJ6Tc25Ee1%2BBZ83qb974hUeXAiEA3r8nv2LTpzZSW8LfAa1TgUPzCig2NDRv%2BOT33qmxVFkq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDAE4WUdyEmPlixT9GyrcA9Zz8zAK2NmSXQc4LnkgvcRuC9VrDOW%2B0xD708hCm3Xr3Cfbz8xFf%2BC4g%2BEeqSk5IG0hLpjUBANJpiguhaBzDx3njJSkmVJw537Tp6hlF8KuHO1VvmDszzO9usDToYMpLdF8cNuqKEQF7MBIPRT86wjMFjF8MI2sYlwu1SwKg27PL6OMKBYvCvSp0PnwVPtZ8bqQmp2dIZObH2Akp5XZZWzP8usoBxCOuTelmyL6RqyLOgvvBMSH32Ilc8Dx%2Fp4yviHfaYbHBW%2FXBJKhU612lA6MmWF%2FiiztTSIEUGgbVttrwB%2BhHfd44LKz24I4OzVmJhaBf0lWOrlkBsBmEdAFx0thXmkf%2BeVIoR0j0%2BVBe%2Bd%2BMS0LNk8eVreTE8420W2SNQVUxhUVtpHWsbhRpSVn4TYpqB%2FN5WqLEwLS8QwXJngzwONUBkF37dA8tINDPB25%2FCj5JhLOE6n2vnLl79zzgYTupuCXzVWMAAZlWNedIDEobBOXOAjlM82I52BN1%2BTn7YAGjnBpDbgY2nR5Qy%2BRmlCxWh0OlOl2oJiYVkfWrnafbwRRLN7MZ2UTQxdeztSqnp4m%2FlIXRTGlMhjbDqxzZES5QmI1TXVdmE51uqsRWSMpAdfaPkNA52fjEEnpMJXu2c4GOqUB91ZRrxfIKlHDGhgaB0qOlxVYOO%2FtTH%2BkAUlpy3aIkRCuVy%2FfN2tPOksvUnkzM7mdOOvpIoZeDougOtuS7%2FW8sWKFEx2WRz04uQDbRtn5mRNE4pn4ZitbQy5mQOM89JLsNTN%2F3gJMoDk%2B7U7T7oou9aU3tYY0HJLYZRhjQDATFgU%2BME4m6122pa1AnsfrvQYFd%2FRA9tFp9eqXOHboTCPa2zkinBS%2B&X-Amz-Signature=14ec79a0c2480e5bee990122cd53aa423907f619878e9a38b7eb3ddeba72e1c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BHHDL2O%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T175459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCICmIN8eJBZHsMcKNKmzYdJ6Tc25Ee1%2BBZ83qb974hUeXAiEA3r8nv2LTpzZSW8LfAa1TgUPzCig2NDRv%2BOT33qmxVFkq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDAE4WUdyEmPlixT9GyrcA9Zz8zAK2NmSXQc4LnkgvcRuC9VrDOW%2B0xD708hCm3Xr3Cfbz8xFf%2BC4g%2BEeqSk5IG0hLpjUBANJpiguhaBzDx3njJSkmVJw537Tp6hlF8KuHO1VvmDszzO9usDToYMpLdF8cNuqKEQF7MBIPRT86wjMFjF8MI2sYlwu1SwKg27PL6OMKBYvCvSp0PnwVPtZ8bqQmp2dIZObH2Akp5XZZWzP8usoBxCOuTelmyL6RqyLOgvvBMSH32Ilc8Dx%2Fp4yviHfaYbHBW%2FXBJKhU612lA6MmWF%2FiiztTSIEUGgbVttrwB%2BhHfd44LKz24I4OzVmJhaBf0lWOrlkBsBmEdAFx0thXmkf%2BeVIoR0j0%2BVBe%2Bd%2BMS0LNk8eVreTE8420W2SNQVUxhUVtpHWsbhRpSVn4TYpqB%2FN5WqLEwLS8QwXJngzwONUBkF37dA8tINDPB25%2FCj5JhLOE6n2vnLl79zzgYTupuCXzVWMAAZlWNedIDEobBOXOAjlM82I52BN1%2BTn7YAGjnBpDbgY2nR5Qy%2BRmlCxWh0OlOl2oJiYVkfWrnafbwRRLN7MZ2UTQxdeztSqnp4m%2FlIXRTGlMhjbDqxzZES5QmI1TXVdmE51uqsRWSMpAdfaPkNA52fjEEnpMJXu2c4GOqUB91ZRrxfIKlHDGhgaB0qOlxVYOO%2FtTH%2BkAUlpy3aIkRCuVy%2FfN2tPOksvUnkzM7mdOOvpIoZeDougOtuS7%2FW8sWKFEx2WRz04uQDbRtn5mRNE4pn4ZitbQy5mQOM89JLsNTN%2F3gJMoDk%2B7U7T7oou9aU3tYY0HJLYZRhjQDATFgU%2BME4m6122pa1AnsfrvQYFd%2FRA9tFp9eqXOHboTCPa2zkinBS%2B&X-Amz-Signature=14ec79a0c2480e5bee990122cd53aa423907f619878e9a38b7eb3ddeba72e1c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UK3QQSN7%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T175459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJIMEYCIQDsHAvFHtROvxUJVLEjW%2B7FgqQGAGwf%2FVT%2BECrCrbCPRQIhAPEQWIV4QrIkXXJ2hB36UIzLemowJdjHZOHkd0bgozjKKv8DCAMQABoMNjM3NDIzMTgzODA1Igw4YJ4bXb%2BKsbhqTYMq3AOh%2F11Lq5wNhMYr669Qt8cJztIMSsL2YP5RmtsPTBgfOa6Ewnnnm4Yiv7N1fva1Qnr94FsLWC5X67HZivgsbfZdAzX624xZxP0ONYzPtfK%2FwglbPbe78nTOl11wuDzp9dhROrtEkGVvC0PbA3CGZ4JFZiPtVJ0M5Vh6QwCuE9VV2N729F715qWGGE2MCbmVmORby6dZ3Ze9JdXcouJUy7UWXNqH7%2F5EUj7q4qjjlbRq4GBdPf9hMbpW5Pri7tomVINEcwLI6h3v3auloHFG1FhQsJj3zblL8jXYoHxdqK6wN6SXu5bGOEb77HoVGnWbIEhkquVpPevalYpDo7HyJm%2F9MLNFLoQuz%2FH4mVDQOp9zcbROMTenxXLy%2BFmvKJgvvdwIZ0TzXDQl5cPONMKYzAJWTTsjxcfllaAa8dHwbhfcs3iFnIUlGI5R0b9w5nfqYWTrK4AfhW41p9erEgLoduyvAETBz7Ceze6JljbvHmJMXp7xV5yPbXFVH1hlpF2HapThgVtu6ktdwUuKvDflJMVGMGGNdQl4AJo3JrnZmxAiZ6qbWoe5koBmNZ0YlJ60hy3SNOXwY96%2Fn%2B0xqey8%2FlLs9Is7Zx%2FhKnJbg%2FhoOVZtl7tEUf3Ev5JSw%2FOqTTCirNrOBjqkAdAjDNXgVsq937KGOxsA%2Fscz%2B5SyU9Lgsqc00Y1AC7R5uaNFu36v5g6Z4UpWZYYvdBVZP%2BX413YXHnKJEccb0Xp3GXKtPdAEHUUyqa0Ah1WXoDUuGpLY35AfZYeW1T%2B7ZodfuTatObttdBwcPplr1ZERR45IkLC%2FBKqP2xhK2sU0XxDkjSl4SOUWwVR0wQBdC1o%2F7U7DPi6%2FYUjml%2BzhUbXprYYx&X-Amz-Signature=28d6b8fb15cf33a58a4f1804dc49bba250ba4b379c2c2319b8578d5e842393ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

