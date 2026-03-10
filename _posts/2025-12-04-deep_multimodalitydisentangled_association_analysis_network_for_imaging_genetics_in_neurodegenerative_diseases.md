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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RHVRI5RD%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T063140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQCnB1dDJtKBb%2FzSbCq5uG2Azry5a%2BWvrued6Gcj65tSXQIhAIEi3b%2FlYS43QxQULNQtL%2BHX2z7ZDYHwq5YnipklYv6nKv8DCD8QABoMNjM3NDIzMTgzODA1IgyDiFy2TwArT96okdwq3AN6VnksWCJZKNKh2J0c%2FSsjg7V6vaYXfL4Vd9xlLYe9BFYz3xM44p0OB10aC50c%2FCNGME3mlZfOsxd1SU9teWkFtO9pYXtf30OeLUVVm9GseMj4OkmdOs1124Mk3F46YRYd805kdXUHKkVPHXsFJ%2ByAvr0YzM2EM1oazwigK%2B8PC3ewkTtrOoK9rEQhOhnzmWnKTvrxAuYqe09GAXFqR4IDiZrCDKkrpIPGNbfe%2FiRvIdRbEUKH4%2F%2B%2BNoZnURlIraRgllx5W9YGrET3qUX2PADhAP3elrolUY5a2xUzuAwzbWVgEgzi5RNhEY73ERn%2BgpLNkaQDXJ%2BWaWIaZ2dEY49xofWissGj%2FubmuJruTAQ05nzAXcTkCw1BunXpMfvXcUsHcx8s8eFziRp8FQ%2Btxt1LQbSJvxXIyVUhg3miRgQ1CY7WXhB5g4DLxA1nIYbZwUI3qjqLA1fIPtQA3gjd7TIpLCJhEUVtrJrk3TUAY6YpYQPNx5xLA67cd5xMmRKcDNlYkXwsMgYPOQblnlWN6DEPAaDhTNucpOyQUE7rJTqhRndP4KRMvEHDltUyM0WJjJrKEsgp8XZb8zg1EOt%2FW0pFoPHH2EYuJkZnpixbj4GK3HpR7ZFZWNRdOuqD1DCh8b7NBjqkAbJUK908Xhm0%2Bwq1XLdXOUxr7He32Sb%2BSWuZPswzxI3PAAZ7nyjCJB817EMVa07r8BpvbHdiJssdZxDFp6Ogo8HdS%2FmwfhK38z4gE2ELbAzwvEFrCYa18xPJf26f2ZP%2FU7dFgH7a1EtmI7fRlvWrMOkYEPLWE5h2Cv2xd0Wx%2BXBSqjfyfuWe7Jyk%2BtOgye2jgI4gOW1%2BLagIrwwghEjeGwijSq0f&X-Amz-Signature=adbf461b144203526ef571047db319d5c069d30b4886a926649264b32958577a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RHVRI5RD%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T063140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQCnB1dDJtKBb%2FzSbCq5uG2Azry5a%2BWvrued6Gcj65tSXQIhAIEi3b%2FlYS43QxQULNQtL%2BHX2z7ZDYHwq5YnipklYv6nKv8DCD8QABoMNjM3NDIzMTgzODA1IgyDiFy2TwArT96okdwq3AN6VnksWCJZKNKh2J0c%2FSsjg7V6vaYXfL4Vd9xlLYe9BFYz3xM44p0OB10aC50c%2FCNGME3mlZfOsxd1SU9teWkFtO9pYXtf30OeLUVVm9GseMj4OkmdOs1124Mk3F46YRYd805kdXUHKkVPHXsFJ%2ByAvr0YzM2EM1oazwigK%2B8PC3ewkTtrOoK9rEQhOhnzmWnKTvrxAuYqe09GAXFqR4IDiZrCDKkrpIPGNbfe%2FiRvIdRbEUKH4%2F%2B%2BNoZnURlIraRgllx5W9YGrET3qUX2PADhAP3elrolUY5a2xUzuAwzbWVgEgzi5RNhEY73ERn%2BgpLNkaQDXJ%2BWaWIaZ2dEY49xofWissGj%2FubmuJruTAQ05nzAXcTkCw1BunXpMfvXcUsHcx8s8eFziRp8FQ%2Btxt1LQbSJvxXIyVUhg3miRgQ1CY7WXhB5g4DLxA1nIYbZwUI3qjqLA1fIPtQA3gjd7TIpLCJhEUVtrJrk3TUAY6YpYQPNx5xLA67cd5xMmRKcDNlYkXwsMgYPOQblnlWN6DEPAaDhTNucpOyQUE7rJTqhRndP4KRMvEHDltUyM0WJjJrKEsgp8XZb8zg1EOt%2FW0pFoPHH2EYuJkZnpixbj4GK3HpR7ZFZWNRdOuqD1DCh8b7NBjqkAbJUK908Xhm0%2Bwq1XLdXOUxr7He32Sb%2BSWuZPswzxI3PAAZ7nyjCJB817EMVa07r8BpvbHdiJssdZxDFp6Ogo8HdS%2FmwfhK38z4gE2ELbAzwvEFrCYa18xPJf26f2ZP%2FU7dFgH7a1EtmI7fRlvWrMOkYEPLWE5h2Cv2xd0Wx%2BXBSqjfyfuWe7Jyk%2BtOgye2jgI4gOW1%2BLagIrwwghEjeGwijSq0f&X-Amz-Signature=adbf461b144203526ef571047db319d5c069d30b4886a926649264b32958577a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLOOQCHV%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T063140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIE8LkS0LyvUzekJq44f83%2F4i%2Fk3b%2BsxjkdY9JWkNVa73AiEAsAf%2FvWdh%2FfeYh6UdUsWm6BojfOsezI7JElQoQnuBzc0q%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDKGlVbxbrZUTyaB46yrcA8f8lHdEG%2FhXvZsnBsxElNJU%2BiEvojj45awwVBxYX8IoX3NZs%2BZLWlpEz7CHjrip%2Bgj6ItRadY9sxzvlAE%2Fg%2Bb%2FROwGWfFK1K91ohu3J9u0LcAGt0U5OFiA5nA%2FZNaKE8V3r5rCzopr1%2BaOITJ51dVkGx2IZ42lmFyw7LzX1U54Dea3s0wZlWLyvTpzywL1CTVyf%2FAnuttf30Qi%2BTbTuOeyMCp1zaehJK3sJV2df5ptQbdzRyhlML0s5zqw9rKRFwErMHVeKX6X7CVWTvJMUGSeun0bCwIgJ%2FQO7DR6FpIT6kDVaziRNr6D0J8KpLW8AnbpjCA53%2F7ErqyVtefsvB%2BZvgng4oDib7lp4ArUedu01rn%2BpssPZFUJD%2F4uyoZ%2B19NtoPE6y4fQjyO%2F%2BXx4vgQEw6AP1mLn%2FPxm%2FH5yGLDKkxGF3iRPH27VVtkrO8QDAHs0EUhkk%2Bor60bmdxXviIEbYkQoab3M%2BUonTdZMuSKIW8eS6%2BhvRpPfWwjYkcVYWHfJmTghCLlv1bOmRh3cqNLHdDWJo0WUSYVHww4rpsDW6eqD77I0vARq6A3h4dF0taXG0PYrDO103ANLjn0WsinerY3a0Z1ZIaq3lufSXqB9nCROm3k8JpSM1t%2BxaMLLwvs0GOqUBtbTOXccvyFc%2BunNo7FsV3ZSj0uYHltaiWQmvbFsRIZs5%2BNy6Jr2N%2Fk%2BgiKHE%2B4iykHkfBOA5sEd6tvf2AEr%2B3LClnKDQrbJWGoz%2FkndS6EE6iH%2B3E5XPP4Ke2uzSf%2F4oPQdbTg4DS3adzYEXS9oG8eAcfXdH1TiNUdBxuDG0Vlt9OSKzRarRW6o%2FMx2fEAvmWSy5pjesuvXuwnR7EG4E%2Bcl8UUei&X-Amz-Signature=9e4bd356bf1be60ff92183a7685f6b995c770956de10ccae20333e27beb8fe58&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Y3BP6FW%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T063143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQCw1VAWosNdQ0Uij4ptmQmtY%2Ffb%2BCKfNmyOfDyly1LzEgIgUaagp%2BMOHOm%2FCx8nVSR0n64bA8lHZLRkXtyAz5oFCtMq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDB6GEwWIIQ6aP6Iz3yrcAw%2FBQFMc6M2lCjXxggH%2BuCB7CycoUPuuLuNuSMlSGIUUZ53k%2B66cpIjxOYf7sNz39FCSLqZHEmPNE4BdO2HiWKq7ZVF7ipPKSwrw2URo40CRFulmVDP9WBmtchrMx0mDD%2BCrY9UH6SK7L7DaSL1nR4CWlAqXRFd2UvVUA1DxP1lkJJ3HAoEJBNTslV10KJ%2B5hLVwskt1xsufAMfSIY1koag8AeIlFl%2Bizl%2Byfv28HKwQNYtKb%2BmgBqCeGTfD1YqMlDTF8wCw9GVuiCufzVgx3YujxSWG5DaDxenbz%2Fw8YMdX2vGL42S4nFZVe0vBSWKxoie7lHXp859wQPpZFOz8Ptcn76VEaI3DC0sHbXTC414wrl7OPgpWph6QLbKA4u%2BUHqXub48sVfavbozwPjBnu00EuopY7FkqrO3RD5mFKCiBpYM6T9rs%2Bpk39Qjbxbrrx%2FXJYaFCSn00tsl4lQqjfRgHbIsF%2BUDMp1wNfGzhQwSlSnkDbvblzIiqU9BAo3535nDjIoKEpEUCaY4gwgOWHH%2FIzLPuIKOZvy3hDGy9Dyqxtph9dxUzqwroXcHBw2uCxjyNyKA%2BRLAyks4LhUXTytmwIjvWJ4X8z7kTD1qj6NLO9%2FqIO2ZQDqLdgxcWMMfwvs0GOqUBoVpb3ZjtEnstk1cPAmMKorByGmg2oNCJ%2FqYKimK4AVt%2FiV%2FYXjuOby31TlulZMG0%2BmdRpPqdcK%2Bd1SzGTLJFqmvCUgK37xeuN25G32fJjJUYTtcIhi%2F%2B7ld0PdQG7FKlxiQesUd3mplkwA88zLToJ4e%2BwlojVHin9yxf%2B2XmCfVJgECZAsRsCRPgqemkcVvtGeRIDO3q6Z5crAWHIVxLjmarm8wl&X-Amz-Signature=0ae783d6a0754f0fe71c00b26d73c074d61a3e4252603e860939465d61b82615&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Y3BP6FW%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T063143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQCw1VAWosNdQ0Uij4ptmQmtY%2Ffb%2BCKfNmyOfDyly1LzEgIgUaagp%2BMOHOm%2FCx8nVSR0n64bA8lHZLRkXtyAz5oFCtMq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDB6GEwWIIQ6aP6Iz3yrcAw%2FBQFMc6M2lCjXxggH%2BuCB7CycoUPuuLuNuSMlSGIUUZ53k%2B66cpIjxOYf7sNz39FCSLqZHEmPNE4BdO2HiWKq7ZVF7ipPKSwrw2URo40CRFulmVDP9WBmtchrMx0mDD%2BCrY9UH6SK7L7DaSL1nR4CWlAqXRFd2UvVUA1DxP1lkJJ3HAoEJBNTslV10KJ%2B5hLVwskt1xsufAMfSIY1koag8AeIlFl%2Bizl%2Byfv28HKwQNYtKb%2BmgBqCeGTfD1YqMlDTF8wCw9GVuiCufzVgx3YujxSWG5DaDxenbz%2Fw8YMdX2vGL42S4nFZVe0vBSWKxoie7lHXp859wQPpZFOz8Ptcn76VEaI3DC0sHbXTC414wrl7OPgpWph6QLbKA4u%2BUHqXub48sVfavbozwPjBnu00EuopY7FkqrO3RD5mFKCiBpYM6T9rs%2Bpk39Qjbxbrrx%2FXJYaFCSn00tsl4lQqjfRgHbIsF%2BUDMp1wNfGzhQwSlSnkDbvblzIiqU9BAo3535nDjIoKEpEUCaY4gwgOWHH%2FIzLPuIKOZvy3hDGy9Dyqxtph9dxUzqwroXcHBw2uCxjyNyKA%2BRLAyks4LhUXTytmwIjvWJ4X8z7kTD1qj6NLO9%2FqIO2ZQDqLdgxcWMMfwvs0GOqUBoVpb3ZjtEnstk1cPAmMKorByGmg2oNCJ%2FqYKimK4AVt%2FiV%2FYXjuOby31TlulZMG0%2BmdRpPqdcK%2Bd1SzGTLJFqmvCUgK37xeuN25G32fJjJUYTtcIhi%2F%2B7ld0PdQG7FKlxiQesUd3mplkwA88zLToJ4e%2BwlojVHin9yxf%2B2XmCfVJgECZAsRsCRPgqemkcVvtGeRIDO3q6Z5crAWHIVxLjmarm8wl&X-Amz-Signature=a2becd9c2fce40732f3ff9dec80ee8c86fa1625e501c823178479b0fb6e4fe53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U5YCXIW5%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T063143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQCrYJGnziska6YWNG8v99AEtTNpP8uw3QqeEQQTiFhhkgIgflrAc5KY1kSGvdAi0l9pT8Whs04iRb3YEtZSFA3HySYq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDAu0xt0SMegJpVmTRCrcA7SId4ZnWnF%2FJwRpIpujwPzbETQxidYbHlTuVZxojqkLMF74hab0xZqZvQEccYBnUwbmr48hqaIDzt0dFHGTLjm9QbYEE9QrMlxO3vomo8QWy%2BK54LBnLCqJlz73XJNjDMfzqqz8k6iSoMJ0yIT8Qn38LRQ3YAPi2DSMxQ25uanri%2FD5YpLxVIZUPIWQsZYI%2BsXAPHZ2LNSOM2biSMeCRW5EL5DhGso6wlbd4km39DZ9iRvcVrbZYnKOcCwg6jRp4lzewMdfX2%2FFjU8gemaObe9I0WGziOYmesWbwhPfdp3dAj7LWBmT%2F2b6zsOFDUDLGDjhqZFOdv1pZDYa%2Fj2vr0Tks2gZ8QBE8fBB5%2FoeV0MYs3gkC%2BkCARhyWLGY0voPyuxYXh69DFQ%2B62nuq3UY6fiL3a3ctg3FOP3WAV79KT4Vu5eL4Vr0osAGVqD7O0ECHyqTIFHJ9dJDiaD0W6MtesahOogZpyPITpW7mgblseNixVVTt2PRsqQgiDN5cUe55gbp7J1LYY0zN4%2BqelOlsT1U5ykwjS49HK5rAi7ZiHSTCjA3I%2Bxr%2BX5YZwI%2F8g7j0KOU%2BJZt4C%2BleNf%2FiaQudW7Oqg7ubsY8GmyK01mwM9LWZxYBRj5HPeE3Rty3MOHxvs0GOqUBllRCg%2FZzuKAqf19y5%2FhwKZQ%2FHZ74D0YsJnN%2Bfi1QIipPZ1qKWhYgfUXrOhgEjwxAdlct3hJ0ZPLtfUc%2FbkhrQakcgqZd347rIVohCkGS8rIG%2BkZqSTPY2P6CVFMxWCiM3%2BUkVNynI885DLgdfULMAHQDqisRV7vunHXeF0ZlC2kSiXHCcQTGjZC4mQNaBMJDe6EfDmg6pX8d1E4vo1S6xApQL6rj&X-Amz-Signature=c8fd61c29095266c5a3f3271358b813813143d4a6eed46be58b56a36038e98f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y34CDNLK%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T063143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQCiFd0Ggu1WFiySBJkD%2Fa2mvszfjKxHJwglWNavR7zwaQIhAJp3dJTxCLCZ2NbN6vpnfDxRRzqpPCfu4bvGMTAn9E3FKv8DCD8QABoMNjM3NDIzMTgzODA1IgyUiKHhJZhAljhr654q3AMkFJFRqPuZGZmHx7iFar%2BY%2FWlJ2836CbkZQU7Sga5pE5R96pua7frDmJyOXwaXGmxZ2NbCNhlHklkNd4lPxqA1Nx8iLMYlJWf48kfKxUfRrCox03Ehaq97Cw2sm8S7ngwQt%2B9cCOnOkS%2B1TErRtIOYBUOHc8X6dx94G8BYaYJkCwVlpuqrmzAUghFk6T0iGgpAtVIQsglpU0ITQNa4bKlHv5D3YLaaj4ECJcun9%2Bs2rnXTgdp9zQzX%2B8OZO0Cx0Z3aFif8ArRDx2vSU%2B3NkzfZVizsul9qFcOdKr85vpdI%2B3A%2BFxsR1W6x5pso96urVTl3xQjGUSN9I%2FjZ2qtBaEFwszDJoRAGIG0boixCaOabtdKjw0LctRs0rrylOF0tSZC2t2%2FGaLFIPdRVXnAEO3ZbK%2BKFBVyv9c9g7t7SIxlyKS%2BsKqjneldm8GREQ4Qq4QjZYT7E35T9sJ8PWJ6KZ8nR7%2BrICB52aCtB2scDiDu0XEh8LArdvBiaJKN4XowpEgAqlicbaepYfZpolTni5SESsmcQw0Q5uVqR1qhgM3X7UiFgKaZ4yl9tjgyflcuqTix6PrE6HPnqfz2GifBEDCoH3MwZ2ZF06vv7qHpBxc9RCEhbQyltMdKr%2Bff9WDDn8b7NBjqkAX%2Bil%2FL6U1ivqlRHbrCYyt6hhg57B5JfIeXjUh4xM9J9lbu%2FIJ2VaLBlfwmbk%2FXgbNboMETSudQWg4AClQInzfd332tBdsoO7eyJiHLLPzxZGaHRRxZJ16wh9nRQhipI7r9Qc9lmFrjtzLZlg5nkuWBlFdBBkEe46AiTZZW7y2kzvp9XfyHb16FYQbaEQJXY8saS%2BsjralSIubHRqYc3ixR3ARUf&X-Amz-Signature=06235625c52b11958188489c95e7af15e61b3fd10d7c782f2b741ef18e2cc519&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673ZENP53%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T063144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQD7csbbiQlmKRxeOP6I2%2BvGZYVKlEAMnRoAsp55lz9WggIhANAIxvEEcAyemIf3BR%2FyTp%2BrAoek8zWIQxscao4J457yKv8DCD8QABoMNjM3NDIzMTgzODA1IgxUFCQiyYV7yQfZSzoq3APGWOnPUbBVHeEK6f4geyxMnYOofRvjKzs6v91iz8zTfCmgzdtQJBWtu0ARqsckY9OrW4uL5HxvasU88uYbzb%2BjupinviK26pORbcMs%2FZxBX%2FGnsqHlX1dALdCgIqUFy8j09XZ6eb3E%2Fd9O%2BfNocz%2BeovpJmLqz02J1GyMF9VZxNeQT8wtNpRE9YaWmctcSgnh%2Bs7JN%2FUF9oZjVRbDdrwfMco1A5KPsKUlhLuCZG87Z5EnNP6Sd45aWZuO7BrEHr5jXFYoZNkkB2gEeAVCcAdDAeWo14hRJ2Na6gzQdqiPK2q0M%2FBsG5bbBL3Od5MadJdPg25AOfKJgRFA27Dm5x68iN6aA7kicZ3Fu41YENaLnjsBytMDVFnQrduMtBtoNJTst73Bvb5ZHjnjxuvivyEtH%2BlkeI5Xi70KMDR1xkY9c%2FVWQoP%2FfeZXCF0j2%2BhhN8POcJmV3JoQmoffiAtY657i2vgwy0y3%2BbEzxJwtjPJGkM9EW2yg1yliEE2YlQYOvWPvsO2lsQbJqZB9JcwSJ7%2BUwJmKCqRUrTKKScPM2rbRBzFh6uQ2iqP8R5vTpFY37pM%2FwhnvJeVZVSuma7cyL4VNh4HIsT1vVmMTWe%2Fi2t78XVJ4D%2BCNpqidv3pb%2FqzC%2B8L7NBjqkAQiES1mAc%2Bg6NOyMppN5WsO42pAqBrpvZVfcK6KyhIfCCqyKxozouknflixTQr%2FnmWMUUgFjKpSzX%2FuxNbMjvSvJJTw1tl997YR9ptc%2BeEvjyWKCZF38GSRB4QWcqiAqDPU0FFrVifTPUTy7DcD%2FD%2FepaYagx6kzaXbIjHPffEkVqHViVZAt78jZwpK%2Fb3GQCCWSHLQc7yfIxeklOCG8sqZOr%2F7a&X-Amz-Signature=7ea2615c1cbe7312f575562ccae7d50bcdd76608c190765d03135cfe24786612&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWAUM44D%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T063145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQDHKhvhhcVbQQPAe609yK2PX%2FrmvU0iWf0%2BFniE1O2ragIgS4rKERQhFwPBKr1L%2FZbdZQiG4ojMHq%2BhcsEMOcbLhuYq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDC1HfZ35rQGBPXJ3%2FyrcA0%2FtMThnEeYdS6tH%2FeWpbzUlmyMdhAdNnsawSrwi0ZdF%2FjatTGAY6s6i8J%2BUUjn1uFuq9fOAAAH2gOgstQw1JQEWOE%2B6nPdppGBSJrP8Fb86cHXLYbezgJuuYMXgwbi7%2BHkWKAH0Ypaef8MERZkmz1RqcSrJorxUO5Mm0yc1O3SXKa0yz%2Bl%2F0uR1B%2BwULLNVVWF1a9AtJdZJjn3B50yfpmUizHgvccvmgkGaxkJIWMW8kkA2Dkt4tIHYK%2F6jXztjIMxJwZZ3N2%2B4TdowqM%2BBpNSMiN4GMYhgeL7iWNJb8VHhxHCIrM2mhJdgnIDVtjDHbKQ024D9GUGL7CmroU47HY1%2BlREoeHpj3IOq4znVVJKvCsaYqbFEixZEaC9HaEZ1zQzMj0G4%2F0coMmrULXrZumqQRWhaVEtRIyx0eurv0v2Eu4Hbs%2BZZ2JHeIOXdIpUCgiiDSuhsm4xMELE36bYNjvtktw4rpja20zifwYhZbor2eIRyY7HOS%2BRBx5ntvHsqDhb3pUcmRdzSl5puqKtlYVg4qqApnC2hheJVcDXqQmoUwjLSJjP4ePaN0azmahED79%2BbcRmutOPXovqK3iKGgLv022v%2FSPntNBYXK9SU%2BwlTnJMGZj4LcReqOy9CMMfwvs0GOqUBQfneNDGb8R8Ds9yEoDUiN8vvT7H38qeV0Bf1W5OHpekdpakXdNZGa6iYML%2FSO0RqQcRD2JKGeAHKEk5VCnKUi5ZAkji1ceMS9lA3pFMy661%2BndblY%2BN6NhJVt6KvBM7AEcSaaDH5KdALVLnVIO1g2Ay7IzoVoHDwt%2Bb0%2BO1aHlFzvNqsGfpkCR56LFKQR2x6aDufC4N%2FonK6%2BlEX%2BXkDRTe1osfR&X-Amz-Signature=047289b84c9f264901dc1dc00855e6b6d45542c479f3dccdb4d788806e223dc0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWAUM44D%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T063145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQDHKhvhhcVbQQPAe609yK2PX%2FrmvU0iWf0%2BFniE1O2ragIgS4rKERQhFwPBKr1L%2FZbdZQiG4ojMHq%2BhcsEMOcbLhuYq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDC1HfZ35rQGBPXJ3%2FyrcA0%2FtMThnEeYdS6tH%2FeWpbzUlmyMdhAdNnsawSrwi0ZdF%2FjatTGAY6s6i8J%2BUUjn1uFuq9fOAAAH2gOgstQw1JQEWOE%2B6nPdppGBSJrP8Fb86cHXLYbezgJuuYMXgwbi7%2BHkWKAH0Ypaef8MERZkmz1RqcSrJorxUO5Mm0yc1O3SXKa0yz%2Bl%2F0uR1B%2BwULLNVVWF1a9AtJdZJjn3B50yfpmUizHgvccvmgkGaxkJIWMW8kkA2Dkt4tIHYK%2F6jXztjIMxJwZZ3N2%2B4TdowqM%2BBpNSMiN4GMYhgeL7iWNJb8VHhxHCIrM2mhJdgnIDVtjDHbKQ024D9GUGL7CmroU47HY1%2BlREoeHpj3IOq4znVVJKvCsaYqbFEixZEaC9HaEZ1zQzMj0G4%2F0coMmrULXrZumqQRWhaVEtRIyx0eurv0v2Eu4Hbs%2BZZ2JHeIOXdIpUCgiiDSuhsm4xMELE36bYNjvtktw4rpja20zifwYhZbor2eIRyY7HOS%2BRBx5ntvHsqDhb3pUcmRdzSl5puqKtlYVg4qqApnC2hheJVcDXqQmoUwjLSJjP4ePaN0azmahED79%2BbcRmutOPXovqK3iKGgLv022v%2FSPntNBYXK9SU%2BwlTnJMGZj4LcReqOy9CMMfwvs0GOqUBQfneNDGb8R8Ds9yEoDUiN8vvT7H38qeV0Bf1W5OHpekdpakXdNZGa6iYML%2FSO0RqQcRD2JKGeAHKEk5VCnKUi5ZAkji1ceMS9lA3pFMy661%2BndblY%2BN6NhJVt6KvBM7AEcSaaDH5KdALVLnVIO1g2Ay7IzoVoHDwt%2Bb0%2BO1aHlFzvNqsGfpkCR56LFKQR2x6aDufC4N%2FonK6%2BlEX%2BXkDRTe1osfR&X-Amz-Signature=8ff0334042ea6d434ba4aa95f6331ea8deea9dfc9cc5aa3129a1d9cf7ed09bd5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUHNPZWE%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T063137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQCLbXx1imxaTnKzTWmb535B5qg%2Ba2acXRaKjlSbohyT2QIhAJT17W6IUf1lKTLigbX%2BCDx8Gihu7Jc23cDgcQL6jMcGKv8DCEAQABoMNjM3NDIzMTgzODA1IgzM1i%2F7hjjN%2F6hY1Ugq3AOGy8gObXNlbmNs58jnF6jOiVlHrGSfl%2Fl3TcauW0hmr93NOTCJAoqRmQH1ydlNagc5ASibNiqnea%2Fsrp%2Fiy0InbcnMkHzBpfcyxlS1lAcgAkjEtcUyAawz%2FikfZo5NkZhBLO32xzse0JW%2B1m8tEFv%2FqP%2FORkAkQvQohoQDznLmNiGw%2FkqdvbjeYZlCdTydxKCwHujlrtKoqGHODI8CSw9v2mliCvBCIQA7czsZizab0ZHqPLI43MLnOLPWvuktzQZdi3%2BfaeMc6lIP%2FqST9n19A0Dm2E8sTNKom4yra%2Be0FacW2gPMexds0LtVt3QGM5KK1K5G1CQufScjuDJLUZumf0j5RT2QPct17FqBIZmnqtLn4DGkYqs03YKy0l4Z2sypyr%2F1Sm9JptKsdytn8NgOCATWg1mjibukpZkRMRxBAPbM6W7m4ARFV0tAxMx3gSGXsVE7gH538Ij035uHHuBJxZmhDyte1xK00DhYMTGM4VAqUqi1Yht7efutEUxZw8G44joCuCcFq5KmRAKsKPUlFncELmLQkWv5eSppiZHG0HiP2KyysXCcJXo1U9OQDHoauhLnorkt%2B%2FuSU%2FWf5qWKrWrsjC%2FjzVp%2FEr44t%2FaTaE%2F5kFeORiHqwmWyFTCg8b7NBjqkAdsI2laQGgiPdPTgi%2FFKjg1IA3Bm9HSP56u2yr3yd2%2BEmFV2pjCptiYqPNWOL7vvdgiv0P7dvHSozHfu%2F16x%2BYqWiqcAIMNaGT1PdAajqrEs9cBZF7i76bvUeoaizaTYR4Rdqsl5ScoqiaottyPuQE%2BKXV1wcylNLWuyYakEQancYT8nP%2BikhcePLwoHanCdBkTRMW5PVQRHAnXo241e2HJRTYzu&X-Amz-Signature=8322d6ac11a074107a74804a76c55fa4738548afc6046b31d4eb23b826d10275&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DERBB72%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T063147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQDsVVdw%2B3R3sfCCQXIwjB3mResKXYbrQI0oiaCFN8dO%2FAIgfLcPAvQskWI4a1VeM9WI%2FwpMAthW1EbpolBJCAhK7eEq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDDPQ7o%2BtLFhdF4nAlSrcA5cMlAHOgo21HNkKpFxdRfuLKSSdgJ4l2Ot%2BKpvnbKAU8lBZ3Vl3otcgoHjijl%2BWN35ykQXeTAOaC0dWtMaHGqvZzDP2JIjY3XTgMy0kuRqAwpLVnB76uT8xyaG81ytgz79%2FGQ8aIZQSuDjRF1pB5hpA5i4XxUuJqNZBB30tGmWDTUIKk9i0EleGvvG%2BmXC8YhpXAJNsCJTUHcGnaj2z1T8inHkMejvUUsepTL9ucK%2FuS27andxl7XywIlW9giviVfQmKZ%2F4szff5DM7O2t3bgZ9XgFELd65cyXQnHH4JMwNxjyH%2BplhF614fMo%2FraD9gbR%2FBeF1QFjmax1oUPrfG1b9cCqzw9RLL4%2FHuyoMOSZkSqFLlViBmMJFvqRJq%2F7mqVISTAtk%2Fwi%2BPnXPsEx14tDSBh4NUgXGURY5Rs%2Bl4JVOhU0qEMYtwaj37GZlVZC%2BmAlqgS6HRaPkplTU4ACEp5TOxsQdQXhgLyv%2B%2Fa6lbCmV%2BK7baus4XJMy9Nq%2BhE%2ByuSHdoe5yqcku5jm2rhsTOVut3eJLnZAps3WYCUKzchFAF9Ws%2F3PAapB5MCl8zIQowdwet0N8qrDt9mS1l8E%2BwoMynEYW2YxvwyFq%2F%2FpA9z6x%2F7XCgiu2k0GTVoDIMLLwvs0GOqUBXLcR4RZDBmGAJdCzqlgcngVrDM7UsJQeu%2B3eXs%2FFq%2FAJt6mN%2BGYirSZ2tAVZefaPbi9KJlJmkuMMZsuXhEiBl5p%2FvKKFxEZL4XETA7DljRfae4E4GgiQl1lYrz0RTAq1ExOn5WtOE%2FK59vo3bbz9f2uKyA2dyvlVoZ93OotZ45js1atIxg9BOWIoYl1d9nOkyAPltKoPcrWtgxXb0NOTvhiT9OWm&X-Amz-Signature=734689128e5d02c98fe36199f773862a13ac960ea80d15ae6403b9e5b10fd0f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DERBB72%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T063147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQDsVVdw%2B3R3sfCCQXIwjB3mResKXYbrQI0oiaCFN8dO%2FAIgfLcPAvQskWI4a1VeM9WI%2FwpMAthW1EbpolBJCAhK7eEq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDDPQ7o%2BtLFhdF4nAlSrcA5cMlAHOgo21HNkKpFxdRfuLKSSdgJ4l2Ot%2BKpvnbKAU8lBZ3Vl3otcgoHjijl%2BWN35ykQXeTAOaC0dWtMaHGqvZzDP2JIjY3XTgMy0kuRqAwpLVnB76uT8xyaG81ytgz79%2FGQ8aIZQSuDjRF1pB5hpA5i4XxUuJqNZBB30tGmWDTUIKk9i0EleGvvG%2BmXC8YhpXAJNsCJTUHcGnaj2z1T8inHkMejvUUsepTL9ucK%2FuS27andxl7XywIlW9giviVfQmKZ%2F4szff5DM7O2t3bgZ9XgFELd65cyXQnHH4JMwNxjyH%2BplhF614fMo%2FraD9gbR%2FBeF1QFjmax1oUPrfG1b9cCqzw9RLL4%2FHuyoMOSZkSqFLlViBmMJFvqRJq%2F7mqVISTAtk%2Fwi%2BPnXPsEx14tDSBh4NUgXGURY5Rs%2Bl4JVOhU0qEMYtwaj37GZlVZC%2BmAlqgS6HRaPkplTU4ACEp5TOxsQdQXhgLyv%2B%2Fa6lbCmV%2BK7baus4XJMy9Nq%2BhE%2ByuSHdoe5yqcku5jm2rhsTOVut3eJLnZAps3WYCUKzchFAF9Ws%2F3PAapB5MCl8zIQowdwet0N8qrDt9mS1l8E%2BwoMynEYW2YxvwyFq%2F%2FpA9z6x%2F7XCgiu2k0GTVoDIMLLwvs0GOqUBXLcR4RZDBmGAJdCzqlgcngVrDM7UsJQeu%2B3eXs%2FFq%2FAJt6mN%2BGYirSZ2tAVZefaPbi9KJlJmkuMMZsuXhEiBl5p%2FvKKFxEZL4XETA7DljRfae4E4GgiQl1lYrz0RTAq1ExOn5WtOE%2FK59vo3bbz9f2uKyA2dyvlVoZ93OotZ45js1atIxg9BOWIoYl1d9nOkyAPltKoPcrWtgxXb0NOTvhiT9OWm&X-Amz-Signature=734689128e5d02c98fe36199f773862a13ac960ea80d15ae6403b9e5b10fd0f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCFYO4SF%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T063147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCICDtRTuwviqxVh%2B6H4CIIRp0JeZ6kC0SSd4HSC9HFf2FAiEA6moquQWa3KrLXY2cvHjEftQyGD4Ggb2KA07JOxfAfToq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDGEeLZxWLZiDn6froCrcAxiHSOxDaRQ%2F6fomsxpc7yL1DEd%2FwU9fAc%2FCpQo5EkyHsvIMVbcXjvago0Lm3%2F9jUnerSTvmJGk6nRru7CvUt7aho7hAdQSVrkmAwr75jUwXSEqS66uQiOvnke6w5pp9JuVi1AQa52XIuYc8nV3OSiZeAba20IBtr0qr8bF0RAlRMKBbSkST9RZl0743shHDMf0o%2Bz5AbEcD89CiCGuB8gMPIpZQwzRkmuQNix9tJOLyDrNMCYbbLMPYjwJJdAYM1QlP3U7u48%2FqzfWy7tNYFgYUsWYwml05wG63E%2BG3oTOpcwafrbiWJv8KC1qKyPiN5kJege%2FL8FRuW%2BGqSeafb3%2BKIQ2eDGU3JHwcPRv3isQr3ur%2Fa0brcdyNtF7Wz5VrKEY4%2FOLMbhFVLmDH%2Bd2WEDF7aT443fmoI7LhqCJSg5tH9XH76hhugLsMsw5Tax5P3arn6%2FH1LMkEjptaBKfp1iB0d%2F1FOlhj7bJvuL8tf3pM0H1yw7OVFHRpR6WcfRWS0Z6HvJ6%2FnauG6hVpIyBBWscouMuh1ecNfwrnSUEiNAU8FTFrdXQ%2B3vTDBjBaA0X2KUWozQzfKYVgT5v3x%2FHo78YQEw8jMV5HJlw3neAbmRk87vnUAEliYvE3M0jaML7wvs0GOqUBkIaSC2YiTLLtu09qrFnxmngs2%2BJaiaMASsoEMeyAGzEDKJdryLSinkXJ16iCjYhs7K9TEok64scLwmkq5NK4coqvPH5cHMRLVWqJIQ2AZw2LjPxKNGntfrFN2PyaqGgrCdCDkltAn5kW6EPMmfadbcVcAi8gVObDPaVopjnhnhMJw04KluyR%2Bh84%2BOQ8XWxtMmB59%2FIuHpITG5zcPLB0yT1Wpe%2Fi&X-Amz-Signature=bd3d2820f6d9ae699726282286dce9a6bd2d8c57d5032530bc9c9055eb89786b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

