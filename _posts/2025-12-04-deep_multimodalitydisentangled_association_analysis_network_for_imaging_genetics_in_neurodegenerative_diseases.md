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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UL3HZBH%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T232152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIATtYwgakemrcQ8puBIz6ejN%2FNoED3urcnyW9E0xbWROAiBexgHc05SpITSYu%2Fij3%2BqVHLfzlrk%2F6GXzcGRLHVtv9Sr%2FAwhnEAAaDDYzNzQyMzE4MzgwNSIMdZffrLU7v2JIc5IoKtwDjVQjcyX4haH2Ce7Wkg4rh6cNbDitfXx0A0DxL4tJWeq%2FMT90RtRN%2FG61KhXnUhS2cY%2BtFIsWBF0V2riMBDj%2BXjDZzb3lYsMhqoKECWaBYWA2EgiBVFxQITbFYtaCCT%2Bm0qQRctkOAGmooJXnX9bkPhRMjGZkfBt2XwBcbMrh8GgkOl7jKqQrNKHQOTJpGO2Rn27ZRjJslWkbQs3yWp6ndPzQoO3RSMyXOwRfRTU9JKLa9jv4P2uyT1WQit2wNjrfIRpgd5cO1CsCiA7ZanGjGKHN%2FtJpWTN1AINpI8VNep72IgVJ5hM6NSw4p7K1%2FKLN3UGwlCk%2F0EApKdSJadMiKQY8Oq0CQ9CCCGEs3quNTfnE9k%2Bs3AFTjGWZqvow%2BtVpTDLfemUeeKpVzp46u19Kalgj7FlR14QHNTCAG11nWpTUUjT2x%2BjvanJCQk9oHbr8lGqCc%2Fdx9h6FApHZJi923Ud26bfC%2BY9OktURGbqyFRVgVJF8qzzBWMwpfTbE%2BaxrnMEqYWJGfalvP2aBZVaVg9qhFpWtpM0AlmB9v%2BOXHIX0aIjRVkbqpolaoI8gaZaLtq9UsWLVNocWuKpgdQbkDcpV%2FlUaqxLZ1R3N1iF%2B2uSLbIM2lb0vTTp0Oikw0pvwzgY6pgHhIrr02CCw264dxdPuEfkmWxNKUWdgsbRAsCmZmt2D0NMkofjypsvN7oZftT4G12T%2BAz8skl3775IDzKDJikpmcfdP3y3LpZ5zlWk%2FrYzgXTQ1fDQSXUKGculxFjjsE4zhckyibkCa0FKcWlh18W2MQ5olp9Jdjx4dtsG7XbYthybS6rowsbw6%2BeekwmbbgxzlUGY%2B4vLKL4NZoWCI6Jq8otVrK9tF&X-Amz-Signature=89196c840780f485a7921933aa06f07114ebe07767002a4860a5ea702712e364&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UL3HZBH%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T232152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIATtYwgakemrcQ8puBIz6ejN%2FNoED3urcnyW9E0xbWROAiBexgHc05SpITSYu%2Fij3%2BqVHLfzlrk%2F6GXzcGRLHVtv9Sr%2FAwhnEAAaDDYzNzQyMzE4MzgwNSIMdZffrLU7v2JIc5IoKtwDjVQjcyX4haH2Ce7Wkg4rh6cNbDitfXx0A0DxL4tJWeq%2FMT90RtRN%2FG61KhXnUhS2cY%2BtFIsWBF0V2riMBDj%2BXjDZzb3lYsMhqoKECWaBYWA2EgiBVFxQITbFYtaCCT%2Bm0qQRctkOAGmooJXnX9bkPhRMjGZkfBt2XwBcbMrh8GgkOl7jKqQrNKHQOTJpGO2Rn27ZRjJslWkbQs3yWp6ndPzQoO3RSMyXOwRfRTU9JKLa9jv4P2uyT1WQit2wNjrfIRpgd5cO1CsCiA7ZanGjGKHN%2FtJpWTN1AINpI8VNep72IgVJ5hM6NSw4p7K1%2FKLN3UGwlCk%2F0EApKdSJadMiKQY8Oq0CQ9CCCGEs3quNTfnE9k%2Bs3AFTjGWZqvow%2BtVpTDLfemUeeKpVzp46u19Kalgj7FlR14QHNTCAG11nWpTUUjT2x%2BjvanJCQk9oHbr8lGqCc%2Fdx9h6FApHZJi923Ud26bfC%2BY9OktURGbqyFRVgVJF8qzzBWMwpfTbE%2BaxrnMEqYWJGfalvP2aBZVaVg9qhFpWtpM0AlmB9v%2BOXHIX0aIjRVkbqpolaoI8gaZaLtq9UsWLVNocWuKpgdQbkDcpV%2FlUaqxLZ1R3N1iF%2B2uSLbIM2lb0vTTp0Oikw0pvwzgY6pgHhIrr02CCw264dxdPuEfkmWxNKUWdgsbRAsCmZmt2D0NMkofjypsvN7oZftT4G12T%2BAz8skl3775IDzKDJikpmcfdP3y3LpZ5zlWk%2FrYzgXTQ1fDQSXUKGculxFjjsE4zhckyibkCa0FKcWlh18W2MQ5olp9Jdjx4dtsG7XbYthybS6rowsbw6%2BeekwmbbgxzlUGY%2B4vLKL4NZoWCI6Jq8otVrK9tF&X-Amz-Signature=89196c840780f485a7921933aa06f07114ebe07767002a4860a5ea702712e364&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SMFOD7N%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T232154Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCsDiEhOFF3Jz1Yc48Y1K1vOqUqkncyRyBFf1VKT%2BuekQIhAPTBUuWEZliaQH4PKRTbrvHR0EI3B2%2BKdhGKakTgPIucKv8DCGYQABoMNjM3NDIzMTgzODA1Igx5kMHwSRhRBniFjxAq3APxVRQmdVLI1K8Ms8BDJWyk84FZE%2Fybf0uESIP5cxOkovECXpeRd6Saw1gy3%2BjDbGTZzU0ahSWsK9odjpwft%2FlrO%2FOFslRddhdCGZ3hwHtBIEGMvvBiqCjPRJNjlvsG1hlE5FaWSDwTJnTqqIYoepcP4q%2FGKex9UmLRkTzaVKx%2Bhg3gKnBB5l3t9Ee2s5xBeGX3t73lf%2FxPr5VFGVaxYAAwHbbc2fMU5BwA8VYLOEMJYLUmSpRlEg1cpzIRdLkGgUjQwgFGzWZw1HYzfSJ1%2BRUGxx7lPRQEs%2FX6AjNtXKdFknagE8HXIyKVvnAXS5dcTsnbGN5g4h5EPbXyMVX84cSY9Wi2btvO9OX5ed3jRq6rtu9PGw6HGyt9i8c2LMOlrScGKqgVqO9EUnUOOudIeT1Rg8nfabg5O%2B43u1LUCFMmBg7mSEJsLxEgqRj9BCZVlLJ0FFK6%2Fpiz0IgN52vsjGquGy3mQGmEvC%2BbM1bAeokObZVqq1YPFfEPMlbOslxsL7ooGrUZxPiBrziHdAgH0M1zD9ufyRKH%2FiXNgfFpKvZZHjq2IgWbPmcZrdOLu6e9wsb3MxSsCKtf0OGGS0PgMT80C7kmiA15uhWuG87G%2FDPLZTxUqyT4J9L6QsCpyTDQmfDOBjqkAc1mfVy2ngzYkGgyyNTZR3nJ04SD0OoaGHcGLI%2BMDLcUbnxg52mdQMFYO4OhslStEOtT0FEt5do3G%2BU%2ByPogLuCiFhxj3Om7oRxUbw6S0tr%2BSfVm%2Fug42YgDGUHMXgF9lC5PIPclbkOILXNvVAmgJ3QnL9uJMOK7J8F8o2VXTKgT4ppDbdLV41ICxeV%2FRCSe0%2BDRHtqOkvtRR%2FHrn1k%2BAukmshXJ&X-Amz-Signature=5273e162b4e343d42ed28a025d31a6f14be82cff8949ee7df3457ee3bd08764a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664M7K2S5V%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T232157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCGuvH77uCq4iJyov%2BjpoMupyEUB%2FbacNkQSpPL3%2BKwBwIgcfOEmxrvo5Stg4LmtS2fdJALeTLY3RQn%2FVKzQ5f8B9Iq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDPs6F2NqPTadna0MryrcA7i4pFcAYdc9%2BylW04EH8lEHA1Vp6NUH4DV4OXGHo56iBO1pIEiSEUnheP4%2Fg8ou2fs8avbZq0COpesGbWpb7Y8m8v%2BCci6reGEU6mbbmvnlR2de7MwfIwq7JRLS9LdkMJ%2FCFpN5qRQyWNMVoS2QUQ6ZGeJvkEo2Mil2edPyes0p2excY27i3TNHl%2FvCSoNUIHMjdEaUIz0%2FxU2oEo6xfTdFMjhT6cGXIIrGHvHANxdBogPsuRxQIZxoT7iGYTBiaa7UK87mj3lUopV7%2FX9liPoAoz8KgjNBsCMiRhrYDkesPqi%2BptRy0O6goa1Tp9xlfbZm0uAYFfLjZfenBTUOIjHR8YIL1G0aEPAar8Yxa%2FcsGk%2BT%2BOzGyPU9z5hUTqZs%2BL44kBlgEJ1slyyTRktvISdYuU9oGxjGOUjlx51c3IR%2FSe42p7GaSj3k4OpgFQzHdzIuGeR%2BznFnfIGc8mrZInXjdg5zjPHIwqIx6G4RW7teY2VOx4FLa7hL3L8pMpJWy6c6M7H1IPk1jqFIBbuaEHG0%2FkTzRWAFVSaOPO4I9k7juHoxfi1OveLbh%2FmJdfWl3DuBiCdjFALWgq2OcCJT5ie8YsMTE%2FVBcJ18idBXjcQav6jVFVTNQa9IhnOtMLqZ8M4GOqUBUNPJAdbrCRvcU76UmQ0Hj6aERsY%2BmxJ4fuWInmYXe4osDYmKHIh2kUZLHdaS2JHv4kuzWevv8wzAg284NQ25WSsqMYJ0yGkzo8C5lpp2hENx%2BRDDTXiOAf4Hjy4P9U%2B5wpPCKyEQ0SIXO0GQ9igx09VBjA2bCHCjA2b9v9MGaY%2B2gxJNhVRncYd46iYPnW9K6YXIekztxZqhls6lIJzMH2v58XWY&X-Amz-Signature=ec22982d2ec8d2e3a0586bd6e8e54a6eeb752c956ea41bdd029a9bb167d6daf6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664M7K2S5V%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T232157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCGuvH77uCq4iJyov%2BjpoMupyEUB%2FbacNkQSpPL3%2BKwBwIgcfOEmxrvo5Stg4LmtS2fdJALeTLY3RQn%2FVKzQ5f8B9Iq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDPs6F2NqPTadna0MryrcA7i4pFcAYdc9%2BylW04EH8lEHA1Vp6NUH4DV4OXGHo56iBO1pIEiSEUnheP4%2Fg8ou2fs8avbZq0COpesGbWpb7Y8m8v%2BCci6reGEU6mbbmvnlR2de7MwfIwq7JRLS9LdkMJ%2FCFpN5qRQyWNMVoS2QUQ6ZGeJvkEo2Mil2edPyes0p2excY27i3TNHl%2FvCSoNUIHMjdEaUIz0%2FxU2oEo6xfTdFMjhT6cGXIIrGHvHANxdBogPsuRxQIZxoT7iGYTBiaa7UK87mj3lUopV7%2FX9liPoAoz8KgjNBsCMiRhrYDkesPqi%2BptRy0O6goa1Tp9xlfbZm0uAYFfLjZfenBTUOIjHR8YIL1G0aEPAar8Yxa%2FcsGk%2BT%2BOzGyPU9z5hUTqZs%2BL44kBlgEJ1slyyTRktvISdYuU9oGxjGOUjlx51c3IR%2FSe42p7GaSj3k4OpgFQzHdzIuGeR%2BznFnfIGc8mrZInXjdg5zjPHIwqIx6G4RW7teY2VOx4FLa7hL3L8pMpJWy6c6M7H1IPk1jqFIBbuaEHG0%2FkTzRWAFVSaOPO4I9k7juHoxfi1OveLbh%2FmJdfWl3DuBiCdjFALWgq2OcCJT5ie8YsMTE%2FVBcJ18idBXjcQav6jVFVTNQa9IhnOtMLqZ8M4GOqUBUNPJAdbrCRvcU76UmQ0Hj6aERsY%2BmxJ4fuWInmYXe4osDYmKHIh2kUZLHdaS2JHv4kuzWevv8wzAg284NQ25WSsqMYJ0yGkzo8C5lpp2hENx%2BRDDTXiOAf4Hjy4P9U%2B5wpPCKyEQ0SIXO0GQ9igx09VBjA2bCHCjA2b9v9MGaY%2B2gxJNhVRncYd46iYPnW9K6YXIekztxZqhls6lIJzMH2v58XWY&X-Amz-Signature=0fc6126f0032cfc26d5dc43a25920cb103773f37690095c14a8b955681b1fd2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UW2VJXX3%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T232157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA0QbFJoT2W%2FtbWjWzuHExFTMO3ceA7LsKzYwiGZJlc%2BAiBjCOtHvPMLy%2FARkTQT84%2F1t8Phe%2BqstqMldb%2FD5YnoXyr%2FAwhmEAAaDDYzNzQyMzE4MzgwNSIM3iPnklqZUZZnQ6hvKtwDSLsUNdzq2wOE1%2BXBIyuA9iwFax%2B6tTbgyGssZ%2FedyZ4AufUiCJdZK9jUlAkKSy9wv8rMggA35eVXe2bvwNP7uyREdhRO0E23zYYCMJM1Gmn%2F6TwftfdPRfS60zI3h%2FC2D7QyltYIPjycAPghdTWnLJIcuD7kxuh%2FWivl9nyAdePXRj%2F%2Fjikca5iDJZ5UcR4F5jsy522tv8k%2BW0qsS1%2FDd4EOK8h6g4o%2F0mscdjPPPcU99ClcMxmz9ClIwHVYFiPqXeaqfQtLpKHpQ8%2FfUOSGQAM85CZMwqq3%2Fgz9ABITindhWH8AOoHdkFbGLSDtBCjRcOmlrWj2xQ%2FB2mFd%2BFrM9l%2F9oenmL8RzerZ4Berl5LMWuZqngZJKM3EudV%2Fg69Sf8gTGNUnY9e9xMxTc%2B7DaQD0Y7Wz02ft8IwT1Zwf64tB6u72axptTyh3Ydhqi0mr7gJlhKXtfBAsj%2FYokdavV%2FofwmLCjXilLYtQ0e3itCPlBndGVlDFqgWN0%2BC6pkZ339ucvbmJqzEvVBnGaCkKI1urLC8ierFJ4pEKZaAlYZIuPS6YcEG00UcJVzcLiH%2BqOYs70hzPdsRDDdGfDyMD920xsGCzbKDv3KFs8ahgiXaJXxv7J8vQafbE2kuAw8JrwzgY6pgHAFICbb%2Bubkkap6zXNWSo9oB9bpuFZuWDuLNSsBAhZ5UICY64Iy4V9PYYHGu7FQMXKV124GwCu8IYCicVTR%2Bap0h7kdrFE4N9XLRbaAHoStagTrJhQUbS%2BSL3gadLjSa1DTOZOy%2FXyXqFdaY6ZH1WTAfCREARiLN%2B0KXobPLh2jPctU6ozhtL9WQNBBXu4noGOXs4bybf0N1KvtsRjvwDrxbbrNshl&X-Amz-Signature=020cc72691879fc2a388d05471ca5940ab021c5e1bde5beeb640dcb042216d8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665G62ESNY%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T232157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFP3%2B09BUtsyX7l1eivHJbxU2Iu3V%2BJ%2BppuDpUjGwXfsAiEApBRMQzomuS4WspQj%2BVettYBLjQU95L49HhZbEhF1Hx0q%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDPblbDFTCrFCt5KYgCrcA2FrMUtNIMk8lwAKXAXEWN6AW5gUP2glMB7GGohYcemdbQgm%2BL2KVeyYA2hiJBrQTh6RWvy0Uy8Wega8dYxPG0CKgoMbzE%2F8Rkbct3HCWrGPGviJYqDjAAENRuWl0ix362sUr6sEqWUULEDloBy%2FvrBEI4WEUcR%2FTSOvigQHqamuXMO850MEaQqJD0RQoOEOZcz6Pn%2BTYtJCe1QdTrWqkTVC3KxaQXdAQubUMrj%2Bt0jBh2pIJER%2BLb6n5Vywqdud25v5cTBC2LgI6o5f6oTOmsRhvZEdn0wSmtWBRcdb1tdgjprM00SJgr9ofvuS2ZLvjgc7fAJDIRgDncgT2dYZ9T3kkrNT%2FuhFQ86QQs3u%2FvNWMQODLfahRYoiYo94adr%2Fwy%2FkZTTUYbcA2nPGI5d8d97QO23gCaBHt8byqmSs%2FImsL78sz9DF1TXVem8AT2uxWFTgCt4zJDtei7%2BAO5f2Ims%2FqAdbXAOZPOMtTB5MYC%2FTfog0FKGaXTk%2B5XTuh1iTRvxIugj2YzmR0ZSYbrXEs2zQFbRzgUxBkihqEg1AgRRNO56xVhWsO8qp8NZgjQEHWoKkJuExI%2FcMtCzPvl6PbRJTNTbEsm3HIDm57ASxbfSh4nHOmuheK6Jc3dy2MN6Z8M4GOqUBM0LYHxAkAwhw4h2GMiMvBJXHbFTvhMjgy0RXHUKLmytV5uaFpDTfy7Ktpej08gkveKi9%2BHqR%2FjGdgBAH6UpJb6zdFLQZzInuLZMXgxgQTyHtZrqT0Z2WaZ7%2Ffx6ZU%2FgBh8tF9IbXLSwsbMrPf1%2FmcYGfELp6rXRvdZXZ%2BqM9B3Xo7%2B%2BpVke0RRXYWrz1hDQdUwH3%2Bafh9dFyOvNPBa2yrTIlhnxe&X-Amz-Signature=51bea78454f8502afb3a9fd107a8d0eb7b780bc5d1d1432a26020d0330b397e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRFH3J53%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T232158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH23DUjGuA1gf3hvP%2FZxjdS2BmyOXHPb7HYPOGH0aPpBAiEA3p7JYJiQesvXlymNk%2B9QW67F2OuN3HLsU9XKybzAxUEq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDCPfF35NNkSwpkstSSrcA0fMjP7PUO6uEvQ1WyvgCdbC9bCe2jSgf9J%2FZyCjchHRe5ijx0dsILpueqOUXWfVrC8aEgQW81nHMEAhTWMC8nbtxCr3TlovUrODuZaRK51mrlbeuC079efRGv2dbpRdHj07jL%2BhSoUPCY86Y2bfeCSlYElEdsqHrrE%2F2s1NctIHHyt%2FGZJwcajcDyoanFeTS9%2BwBe2UhqXR%2BtJBKgkeqoCTChrJ3pyR%2F4SSlSla5QbAoc5uIVQa%2BNfFB7vDc3xU5dG8taGn3gQm3cwpF0hps%2BENybZRMs5RsZCBieniDqSMYHCgEx6aUzm0awAeeEk%2BykKTLX8wPzQNnurhz%2FogeaqxRSYksqSz2D7qHkJM%2BNc0x%2Bc5dcSTodWgy8NakwedofdxtWV4rVXmo5Ey81OUAYGvlyks%2FYsgnms8xEtsUhgDQ9S1sdJScKuVudY0eWoxmFIYbKMbo6W0UAgZjEntyQFTj3XM5b8E%2BstJ27evFb0cvndxPHLHRO79cUF95rNqhVTALdakIgSH2AqTCFz0PLSL0zaMFg6efR8t6Tn1Xpt9XJ02txAMKdZy2PtF24z6FKNXWwzAz4EzGEi51TiwubjM9Y3ENbBnjKgWZyu3dcQeiLN4%2B9CIKz3TWm7JMMSa8M4GOqUBchWDBAkjRWIBakypzCBaphjIBUt8oYndVuBZi1zIARwNap0WwL3ZuBV7fT13O8vLzaASMxZbC5A6zGffDekXfXnaq12fGxAuQNHACfCEYvkIq%2F9nmkiIocqQ9xTF4FIbo2EIuO%2BXTMcTkW06TetQel8pa47Y%2B2JKINNBoAS%2FbitNVyAd9dzyYtL273TXB8KeamQ3oLR6xwOvl958Xt4WcB52ycTw&X-Amz-Signature=18f0e12af5638317c88979285eefa79325b0dee40787d054c41a2e7568ddc0d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WA3YACXA%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T232159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGtcETMpvpjtnZegTDnFJ0WZjw6kO7jfwj0wUGqytrHvAiEAjbZBZtmLU02Ks79kRZooSey%2BRZbXmFIyPpaxvZ8BAQAq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDL2OtrkqXco71bMXXircAzkOPYeWJA26dmjqNpGakGdgY8bkYkUxSX3kseT1bc6VLdtWq0BFN2PR08rbzk4nfSDeIEiU8FQGOYpGkIGtxdxyvbQ5peBD2DnBQ1hcaglujxx0T9VVHuw7qy1DiD%2BRERdEebt8vrhydtPp4SkiO5Eymtna755eNHW5cY12EwQfCeuXy6cHLSLAolDi69x0Z9P3fjhLAjQsOCTk64Lh5GzvGhrWwryaAGHbg23aotzV782Ahw81jKOFLbMmV8Ga%2FPAEqWy7xvVkfU759k7WUepTyz9bqreoq4BRiLd0j%2BSkKT%2FVJDwE8d7j1tEtMenN1CnXHnkCmoCbHgHciha%2F3VQ4CGMybORbe0Q5%2F%2FnEfbF6JTcAbYOBNrzusuVkhqMX7kLFcM6D9PC6u1h2A%2Bd0vGldMYPrfGHW20tT0UVAZL%2FGLDUMzoCKCJQaM0%2BhIoEHejz50WXsmNy%2BvkvzqhZVzvFVg3t7cPpbM64nID3z9k4HkXKsuT6QqWFqOXBS1JjvDGVeGpljTwZ%2BYDjB7fovYhyN0NWkfECrJ%2BzmK6js6X%2B3O5ICrBE0147%2F2lcbIg8A5KyY0Xhpt%2BViwamb6io6X7yAsScpJIxbUjL2zKT0OpQWP04poNZ9n%2FVyy1%2FIMJua8M4GOqUBhYksFb0LQOROzFtpbdo%2BJAnHm6VXw%2F%2BdmFuVxWDBsZ543OJXXSma2wDmvPI1EpRYsHK3nu29Bzq6O1T%2BhW%2Fk03TGo%2B7ei9%2FyNkS4w5bnaIIkNFCWAH7svRA8JDVILLCPFhMtGEN7cULwH2b0%2FVzla%2F%2FBElg%2Fm8Xc1mNeoRaymoU%2FYGUZ44oUJlVk0s9mfR9GFcLJlo8oYVTjYIwXQbIRKKSf944M&X-Amz-Signature=e35005250f9ff4695d11bb217b7eb6b10861194de0f0b95a8addab1335d4668e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WA3YACXA%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T232159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGtcETMpvpjtnZegTDnFJ0WZjw6kO7jfwj0wUGqytrHvAiEAjbZBZtmLU02Ks79kRZooSey%2BRZbXmFIyPpaxvZ8BAQAq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDL2OtrkqXco71bMXXircAzkOPYeWJA26dmjqNpGakGdgY8bkYkUxSX3kseT1bc6VLdtWq0BFN2PR08rbzk4nfSDeIEiU8FQGOYpGkIGtxdxyvbQ5peBD2DnBQ1hcaglujxx0T9VVHuw7qy1DiD%2BRERdEebt8vrhydtPp4SkiO5Eymtna755eNHW5cY12EwQfCeuXy6cHLSLAolDi69x0Z9P3fjhLAjQsOCTk64Lh5GzvGhrWwryaAGHbg23aotzV782Ahw81jKOFLbMmV8Ga%2FPAEqWy7xvVkfU759k7WUepTyz9bqreoq4BRiLd0j%2BSkKT%2FVJDwE8d7j1tEtMenN1CnXHnkCmoCbHgHciha%2F3VQ4CGMybORbe0Q5%2F%2FnEfbF6JTcAbYOBNrzusuVkhqMX7kLFcM6D9PC6u1h2A%2Bd0vGldMYPrfGHW20tT0UVAZL%2FGLDUMzoCKCJQaM0%2BhIoEHejz50WXsmNy%2BvkvzqhZVzvFVg3t7cPpbM64nID3z9k4HkXKsuT6QqWFqOXBS1JjvDGVeGpljTwZ%2BYDjB7fovYhyN0NWkfECrJ%2BzmK6js6X%2B3O5ICrBE0147%2F2lcbIg8A5KyY0Xhpt%2BViwamb6io6X7yAsScpJIxbUjL2zKT0OpQWP04poNZ9n%2FVyy1%2FIMJua8M4GOqUBhYksFb0LQOROzFtpbdo%2BJAnHm6VXw%2F%2BdmFuVxWDBsZ543OJXXSma2wDmvPI1EpRYsHK3nu29Bzq6O1T%2BhW%2Fk03TGo%2B7ei9%2FyNkS4w5bnaIIkNFCWAH7svRA8JDVILLCPFhMtGEN7cULwH2b0%2FVzla%2F%2FBElg%2Fm8Xc1mNeoRaymoU%2FYGUZ44oUJlVk0s9mfR9GFcLJlo8oYVTjYIwXQbIRKKSf944M&X-Amz-Signature=baa360feb55d621eb2516f6e9aef4b2cfe8372391b78e8040c90c2af74ae0ecc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UOEGKOE%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T232148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICo5d5xKmu6AyVRqFbLR8GwRaFgf5wtv45P6y3myITKTAiEA3Qn2npOe5XJYNHrfwj1tOdeOAG0vVe5NiTlBoRmNdvUq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDP1NAXbsUAe%2BD1nSlCrcAycQRFq8fOZoLN8zBTzH9oJdnIA8miKL6oHoFgGV8MxgWGfWdPc3x%2BrSEF6kR1jQ50DkAzY7P3ro425BynQCeqxEDvesm3IGWJ9gE%2BOs8r%2B688Q4grYL71q0pltnDxcnEJyj2FrBurlN3wbNd0kxY7hGNF3oWw%2FT8El2gjInhE7PW7n2s5EijP75T9cHhYJoBhHG6aX9QFjCdrYLVoOmZkJY4FTURwn1BOFq3ZeeMK%2BRf3UGG2kTD3dG61266jpBn8Au1ikhXiPN%2FZXQ0SdjOe%2B8hzs73AARG1dRtGyWGKIt6ZeWdWErkd9WvEj%2Fw8sQgzgMPrUAeqBjj34e8J0xTVAeOp1fWU17%2Bcw8VkDs1vab23pXMHTJm%2BO0T%2B3PceyAIvfCyNPEV1kusQlGVA5qFk0Ia80I7Vky3oQDXHDK6ScAJ9EiT5Wi8yRLkcthNzzkGLIqxKsWvzLxQqCkMes08mIcq97AsffkbzsgJD2FHwtjtAxMjRdmOQUh3Ovgy5uMA0aqHXW6M5UPLP2Asxq9vOlTOpVVeA5Xmwz9WY%2F8L9iR7QqfI3qSXZtbsu%2B1jSrZn1xnpxSqUtDBgq4%2BZ3YGnAn%2FoRxkfv8bBxup9D52%2BZ%2B%2FsdOp9fo7fy5jX5OEMMyZ8M4GOqUBqrufLYxpIEvF7IH4QpCpxPomEL9bX1peCUTlLEYoXxwdRS2stOcH0FVANRNzLG13eDj%2BW9olLMOJwivpPhN8FyceS6rd73qQyyBgiapyE8sVLUa1FNvUvGL%2BtEElz4LfW0yC%2BbO%2Bz7OdQ09YVe5imz%2Fk1wtRr5uhaVB%2BMbUcl8PZWKSJcem5R981SJM9rKOt0fo5QN%2B0MP%2FMFsELWe5QLzoagNFX&X-Amz-Signature=1b931597cb318426038bf463935b61c1ccf880535c3fc608e7fe8905efa6563b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664GWG3KEM%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T232202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDoD1U7isrdcRvY60Dd8FxVv%2B01beWiJvbkrJGpskBwawIgfXt5ZBCyJ4SQWolKW8Vdhb7Hlot3vzPxQgflJSBBaqcq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDO2v3wJuvlrJbeDo%2FSrcA60rYK8JW08ooQpWauB1PaDdSA7xMULxz8xbZ6zp%2FK4H39%2FYzqPCBGFJbHi4GR8f16pgzp6OlcBasmrepOuKedyXTLypQmDyrJ%2BUjEfzg5PSNStHVXyGhJ3wycOpHcu7n6Dc9Le4FLTB%2FzPPnuY%2BcNHDh84NuhRlaFhhdc7gR4vQnGBDm7hP4UBDjj2%2F2fAo%2F15zDzq5r8gzrtX1ulHKSZt1mT4FVmgf49z9Y2vWObG3QrVwXNI1KOXNnXaAVljOAfccMj19iDYGXMxHZTHw%2BzxR7epXDbGaC9HnHaGFgdHuuyWRpwG6lxoZOY4qw%2FCH%2B46fBsnv6c%2FdQ6I6j9EsZTeB0zIV9uwxBBYRWM1r4YlxPI2N%2BzRkaSTE6ycVIK4J1Upaz0PlrOXSIREVB%2BGBta46FnhZietCbjZY793F9uMYG7K1ycko9Vi6xpHH2YhhDIh%2BC5HQ9KXrgYkHD2ls2UOKac45Mp3qwSxw%2F03xceUfZC2lGVAlk8coKTim5sZ0fwbuRKe8BEKVyxStEA%2B218r31mSnRuK%2FN0GU2bFiD69znq0A5xH5ZqeUecb1HQpXGNleEHE9nxK6706AwkNssIH0ZPaIZcWKalhFlBz%2FmClldkNP8kNmgmNOwaEZMPKZ8M4GOqUBC%2B6NEsDsUK3Jk6jJUtL2gcHw43E6AcuDcD4taKTfLPAWM8W61lltDC2VwAbe%2BEvvnXMeDOxZnDLtVRPogyjxO9UpZrWhBASvC7gjG2YGhFYLjC5chE6mk3G6NoRaLeRYirNN%2BEsqIjg9%2B0KRl0bbf7xiwoeQ2NPw%2FEgEJoklB1dTME9RUFm5taacY1yhW1ZgEBG4vCWqKaTx5hvJl7jkRxBNalrx&X-Amz-Signature=ee2ec9ef384e295604eef3996abc602aa94900db71b3f3df8e626dcb2ecc971d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664GWG3KEM%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T232202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDoD1U7isrdcRvY60Dd8FxVv%2B01beWiJvbkrJGpskBwawIgfXt5ZBCyJ4SQWolKW8Vdhb7Hlot3vzPxQgflJSBBaqcq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDO2v3wJuvlrJbeDo%2FSrcA60rYK8JW08ooQpWauB1PaDdSA7xMULxz8xbZ6zp%2FK4H39%2FYzqPCBGFJbHi4GR8f16pgzp6OlcBasmrepOuKedyXTLypQmDyrJ%2BUjEfzg5PSNStHVXyGhJ3wycOpHcu7n6Dc9Le4FLTB%2FzPPnuY%2BcNHDh84NuhRlaFhhdc7gR4vQnGBDm7hP4UBDjj2%2F2fAo%2F15zDzq5r8gzrtX1ulHKSZt1mT4FVmgf49z9Y2vWObG3QrVwXNI1KOXNnXaAVljOAfccMj19iDYGXMxHZTHw%2BzxR7epXDbGaC9HnHaGFgdHuuyWRpwG6lxoZOY4qw%2FCH%2B46fBsnv6c%2FdQ6I6j9EsZTeB0zIV9uwxBBYRWM1r4YlxPI2N%2BzRkaSTE6ycVIK4J1Upaz0PlrOXSIREVB%2BGBta46FnhZietCbjZY793F9uMYG7K1ycko9Vi6xpHH2YhhDIh%2BC5HQ9KXrgYkHD2ls2UOKac45Mp3qwSxw%2F03xceUfZC2lGVAlk8coKTim5sZ0fwbuRKe8BEKVyxStEA%2B218r31mSnRuK%2FN0GU2bFiD69znq0A5xH5ZqeUecb1HQpXGNleEHE9nxK6706AwkNssIH0ZPaIZcWKalhFlBz%2FmClldkNP8kNmgmNOwaEZMPKZ8M4GOqUBC%2B6NEsDsUK3Jk6jJUtL2gcHw43E6AcuDcD4taKTfLPAWM8W61lltDC2VwAbe%2BEvvnXMeDOxZnDLtVRPogyjxO9UpZrWhBASvC7gjG2YGhFYLjC5chE6mk3G6NoRaLeRYirNN%2BEsqIjg9%2B0KRl0bbf7xiwoeQ2NPw%2FEgEJoklB1dTME9RUFm5taacY1yhW1ZgEBG4vCWqKaTx5hvJl7jkRxBNalrx&X-Amz-Signature=ee2ec9ef384e295604eef3996abc602aa94900db71b3f3df8e626dcb2ecc971d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHEZF452%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T232202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCUd621WUT9aFxeAlE1zu2svARhqQVRtzkZoLWRgAv6%2FgIhANBYQI3NZJ1G39Q9KLU56ZBej0%2FAP1k%2FEikcH88fF24xKv8DCGYQABoMNjM3NDIzMTgzODA1Igzf1Vvz3Dskd8mk1hwq3AN7TDIKiljE87CRSCqW3Y4dRyvd%2Bwd0%2BHunSP1odO%2ByeQw9%2FNkDFkSqZQO8ix%2BbmRlASxL0TsNPNSUtm%2BisYrmuTNonxSBFU3dhn4k6yS1khaWIEYy3gHl6tq1JDLebfX8LuUy2AJnhZKZM0CfoepAYT6n48iTai71Zgat%2FY%2FtyKgE646y4om%2Fdf9l6zRc1LAg3O6eLiMW9QPaJfOA8xc4J3KN%2Fcp1qFTiZ9JgWmex9ZNlD9xLb%2FdpYl1fLIVidobu1kxFbH9JYuqf7nz6%2F%2FOSJTY2jMBHPD6NlOaz06kfeCt99vqkCGEAzvjSt%2B2%2BasC0060rm4S3%2F8kttUJlXuN1MVOx3iEaSetKMwISw8MbSe0CrL23gZ%2BQncANy6Tmj7b61firulTI0a9QOy4fce7a%2Fj9LNQ4pu0bxA17HGkRv3S3K9O1JZROMVGkNOV9w1CBU10LX7rwKSreJ0IcgpbZmC6AFXzq3EnqMJgY%2BCUL%2Fx1Z24LG5TR956j4N5M36RzqFfcytUxCoYENYmC%2BKLfcAQ5GihACbObRL5U9O1HvpMPEbBfnOXj3wCKN5Ui6N2ekyurI3imCCF2pM4jBzWHgBqmnLu4qeNgYT5%2B%2BBG4ZGoutNSFLa1%2FrZJf2zLGjC7m%2FDOBjqkAXQLwHlgmoYn8sVv3A4FXn5RQ3nnADjFg7vpmDYtQ3wN0azy%2FM6VtYBPODnD61weQMy%2B17evFk6F8uFsYmSTskABnkHt5R9LuiiA87s7VaghxB7x1YqM1tArzijwabJHFCWVgUITHCXODkXaemFGIQhIlQDiFNw3zj3IeFtFVDppvSGj6VHi1RuL%2FiLS1hwO5JmJvBK%2FMyAHJbWEN3YSMgiX3XK%2F&X-Amz-Signature=6a41a7ade915521ee3ceec089e85b5a119d5796a8111594ed492e634cd5cd80c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

