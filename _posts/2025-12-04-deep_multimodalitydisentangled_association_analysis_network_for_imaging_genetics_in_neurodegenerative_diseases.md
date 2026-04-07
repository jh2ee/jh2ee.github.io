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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QUBQRUS%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T142248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQD6wNVfHyVTtP0%2FW%2FpiDpIbJl6Ne%2FMLY6VZtS9aHoFhbgIhAJf%2BxBCHY9IU4aZQ%2BrYJtRaspN8FjK%2B2CAGvtWWJZ1o0KogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzsct2sXLUcrbbHVMsq3AN1EnaXe8asLsxmhQFsED608cDjqSF7qCN816g0u%2B7oq1RKjE8QZnhj19K%2BykpoSxTUM13qBUfZNKlVpQtbG%2BpUtWG%2FIdtrcZopWajVeSJNP%2Fn%2FJyWpNIR5%2BP9ZILvuowvJwv8ht3TYqePWLCyyBeuAGztraqGcD3B%2Bz0%2Bk5YmTtIsIOkDxeWYh19BHWVvX89%2FCcoDpeFOf%2FKqYoJR0STlUQIRuxehUIHXJR3buMzQBD7oSFF%2F%2BQaHmg3lYBF3BP71nPYEWlOo%2FVAKW7LF3XeEmJz5H1QX44uTvNa6wKIvxu2jYs3TxCXGFUTB%2FtK8s8MudH%2FrOT5dwT63MF3qUKifUa9793LXJAcYQLsRQX3WQblSH4HJ403JYjhYVQviIMN2q08d1bPQJ1uqq%2Bg0e46fQUC%2BkDUM%2BTSK7uGw2fxu%2Fi3x2LNuOh0LzHqI16zvTPW2X%2Blp457sTdrBMxfnzDKkZJmCN1pJAbTyjYTryeiAQqZqhkVyu%2F5VBAjBNSenu7vSoQJ6UdC1BRzJpa1CKgt2129GpUQNlbH08DmnVQNf4see3MWTZyacFMDeyDfciJVzk%2Bqyf1czmV2DJAC1VoZCtgMPSR9eThVnppOOmsTNcaRUSYgI%2BwKqOn%2ByzQzCWjtTOBjqkAafG%2FV62YQHJEw8VGXrUxZ0Blpf7hvjlxelQQKy2xQJnb18BVy89fGIO77Ib8Acqs4%2FL10239deOqTp6ZVQW%2FoDERJ1Q5Lz3Ufwt6ypg7OoXcOMQURHE0l6GxWRMKbv2QoqKz7hm8sZjuCn48KVTIxQJsLryJzejoMqW%2BcK1Z3N9teiTQl91EE3%2F6YQVHWpyZcx8iwP1cXLsGUy1SgULsuMVMgn%2B&X-Amz-Signature=b8a33fea475dda7555c7ad97a496eeb96c24eacb2075ad8fb55cdd71e9bfbd28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QUBQRUS%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T142248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQD6wNVfHyVTtP0%2FW%2FpiDpIbJl6Ne%2FMLY6VZtS9aHoFhbgIhAJf%2BxBCHY9IU4aZQ%2BrYJtRaspN8FjK%2B2CAGvtWWJZ1o0KogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzsct2sXLUcrbbHVMsq3AN1EnaXe8asLsxmhQFsED608cDjqSF7qCN816g0u%2B7oq1RKjE8QZnhj19K%2BykpoSxTUM13qBUfZNKlVpQtbG%2BpUtWG%2FIdtrcZopWajVeSJNP%2Fn%2FJyWpNIR5%2BP9ZILvuowvJwv8ht3TYqePWLCyyBeuAGztraqGcD3B%2Bz0%2Bk5YmTtIsIOkDxeWYh19BHWVvX89%2FCcoDpeFOf%2FKqYoJR0STlUQIRuxehUIHXJR3buMzQBD7oSFF%2F%2BQaHmg3lYBF3BP71nPYEWlOo%2FVAKW7LF3XeEmJz5H1QX44uTvNa6wKIvxu2jYs3TxCXGFUTB%2FtK8s8MudH%2FrOT5dwT63MF3qUKifUa9793LXJAcYQLsRQX3WQblSH4HJ403JYjhYVQviIMN2q08d1bPQJ1uqq%2Bg0e46fQUC%2BkDUM%2BTSK7uGw2fxu%2Fi3x2LNuOh0LzHqI16zvTPW2X%2Blp457sTdrBMxfnzDKkZJmCN1pJAbTyjYTryeiAQqZqhkVyu%2F5VBAjBNSenu7vSoQJ6UdC1BRzJpa1CKgt2129GpUQNlbH08DmnVQNf4see3MWTZyacFMDeyDfciJVzk%2Bqyf1czmV2DJAC1VoZCtgMPSR9eThVnppOOmsTNcaRUSYgI%2BwKqOn%2ByzQzCWjtTOBjqkAafG%2FV62YQHJEw8VGXrUxZ0Blpf7hvjlxelQQKy2xQJnb18BVy89fGIO77Ib8Acqs4%2FL10239deOqTp6ZVQW%2FoDERJ1Q5Lz3Ufwt6ypg7OoXcOMQURHE0l6GxWRMKbv2QoqKz7hm8sZjuCn48KVTIxQJsLryJzejoMqW%2BcK1Z3N9teiTQl91EE3%2F6YQVHWpyZcx8iwP1cXLsGUy1SgULsuMVMgn%2B&X-Amz-Signature=b8a33fea475dda7555c7ad97a496eeb96c24eacb2075ad8fb55cdd71e9bfbd28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRH4EY5P%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T142248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQCLXCXBNpmbOy6Dj3LepOj6mVbTo27tmfrphFQysljf%2BQIgNHxbKNHdcUfhUTHQvCd6gK5ftQxJwY4y9UTMjuS6ik0qiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG5K4ZIRrBa53ZzvyircA6ICxY8vlV9MHZ7tMARkGyXw2zZ6iIGBNQf8gKWABmp8uDUNLurhV%2BM0lpMnVzoXP%2Bmj%2F89nHjTLHORj0681ijlx0qRwt8dSICFcMEFao84VmNZwdcM3oWSV%2BvUHSqZPFQbOcgHS2i2IYkCbU0vXZUHojvu%2Fb%2FBmrQogAJYJ5f1h8glTmB2tMuwZVZYq8B55iFLK3PaJwPVFlFp6gg66db%2Bg6DvF3ONSoC3RFyDOfbTDPL%2BFPsAQ7fs1wUKBr6dvEYCafc4aCnvu19YuotJ1olAwVIKZDcJc3xTlc2urBNkvl7sny0Jxov3MB9VGMxw1IptNdGk0WHH3A9d9tX0fshQFL%2Bw0aJet9vSYkH2nMfJx5I0RDbe%2BwtA4%2Be9msslg%2BnC3A2JIuRkppGGHHipt9rczKAQIE2Enwt7h%2BLbHZJdRnIdGLL35TuK0ZR5%2FDzXRDPd0vndQgL642ydG1YewHf1eUbTPvjDiP7K4ZO8EE6ltOv9ioIB45bo1SRDP97AUD1JxI426xAA3tfKHF%2F4vjJjOhgl7SQsL%2BtsmH1TJgkdHsN6aivoH0pGKoQ4Eep82MnduyKltiP0elrHcR%2Be9V7dCL7ZswEPV99qP8AgyXkv28TB7JcYjj5znf29OMOqM1M4GOqUBk48PJOAfL%2BQJkgV71KBL1QIH3Lv3RYFiAnqKD3dt%2B1Jf0G6onJEunZKv179NmD0s8dZKHaKKVLnQzdheT2rLIHHx0SPDHs41d1kn4%2BiV%2FRlJ120jcRnuKUKmS94ACtLJS0fsAmY2N9SNHMb3wu8g7wauQurIu2UnREdrvifI5FHaneOHmq1EZGbsVIY%2BEbpC%2B8kAWd6K%2BQiMRH4mTT2qJSIRA1Cd&X-Amz-Signature=f262a579b3f506dad879a86c341974ca1a6de042936ff51422553f6c6cb79137&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662LNTO5BG%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T142250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIGypvo9%2FfREju0A4xedUjocuYhRsUwl1rnV%2FtFnz9d38AiEAqlXoEaHZ2L6c%2BtwoTHPZlEXHP5i7A82CMYB98KNUuy4qiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIvu%2BorMvvqI%2FcXuiCrcAzUbeqra3mtps%2FEq6wQFHYNUHfLc3o259pxL2fyCDdXqrSVNegD6Ij47q5jno6eA9TMglAbo9jqhEg0qtnhPQTIqh1T6cP9rOp6umkx7qg4HdbBA3Hto8W63WopZsLYrNQDxyij0qWYT2WSme9e9cVzoaBJYtYLXw3yDyFusey%2F8UGWwPphIo3HySQgTZvWOd19ZaAK3u7FdGx%2Bv7n0xdQlifh%2Beowhtu5i88pCzsAPkzevEzBBS4eVly3GqjdUpZoGzb9QMMZOQaf%2B%2B0I3d4wuJSDlo6EYPttoY%2FbEsz811z%2Bly8wrGdBJG9OUFXo0HaG6gQWj66YdLmwEqfFJhORS5%2BBs2PATTeaN%2BSZb6RP2OcSMk1qNiV3B4fwOzJjNvQwNePJL%2FHTIs1P%2FEkxxiNSSHrZNLwe2tCxLeTGKOgU0wZq6xT3V834xjmbzxCfMcLlx6tie2RiP7c%2BlExF4L%2FHm47OOWkPV4mwGAyW0M0iY10y1dZXdyfPsu5zjbpx3gXHe6vUDZRdn4UT576W1Gkj7OiYjcHeaRPfMXjeG5280AbFPTqOmRbmyKV4WhrN6WcyUcyuYo1PsY7%2B%2Bl3CtB3smSgLV858ajJHCjWu7QBSndm7GQRO1qqDg4V7NHMLiO1M4GOqUB3WRv1ZFeuE0NxeTcLkIKGw3oKeHwLGgvFcyH0TdBST4kFFeEEUrqJoWD5PubgIF%2Fll6YDFB8n685niBArj679CVcQgbJRZ692vbgzwXx8eHjNTA%2Bp2BKbVLONi2XkYLKbnL8rZ155SMZpK%2Fzpmo8J8UXfufdr%2FAsmD5PfijgxyMnUcKHggWSR8E0ZopAcPQJpJtINglUKSuJV9P4mC%2BOoalPq%2BpX&X-Amz-Signature=f2f1b98aa6a0ed7a42846cc5249ad796ccbb2ceb1f9ffb39fc8a93db64388d76&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662LNTO5BG%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T142250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIGypvo9%2FfREju0A4xedUjocuYhRsUwl1rnV%2FtFnz9d38AiEAqlXoEaHZ2L6c%2BtwoTHPZlEXHP5i7A82CMYB98KNUuy4qiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIvu%2BorMvvqI%2FcXuiCrcAzUbeqra3mtps%2FEq6wQFHYNUHfLc3o259pxL2fyCDdXqrSVNegD6Ij47q5jno6eA9TMglAbo9jqhEg0qtnhPQTIqh1T6cP9rOp6umkx7qg4HdbBA3Hto8W63WopZsLYrNQDxyij0qWYT2WSme9e9cVzoaBJYtYLXw3yDyFusey%2F8UGWwPphIo3HySQgTZvWOd19ZaAK3u7FdGx%2Bv7n0xdQlifh%2Beowhtu5i88pCzsAPkzevEzBBS4eVly3GqjdUpZoGzb9QMMZOQaf%2B%2B0I3d4wuJSDlo6EYPttoY%2FbEsz811z%2Bly8wrGdBJG9OUFXo0HaG6gQWj66YdLmwEqfFJhORS5%2BBs2PATTeaN%2BSZb6RP2OcSMk1qNiV3B4fwOzJjNvQwNePJL%2FHTIs1P%2FEkxxiNSSHrZNLwe2tCxLeTGKOgU0wZq6xT3V834xjmbzxCfMcLlx6tie2RiP7c%2BlExF4L%2FHm47OOWkPV4mwGAyW0M0iY10y1dZXdyfPsu5zjbpx3gXHe6vUDZRdn4UT576W1Gkj7OiYjcHeaRPfMXjeG5280AbFPTqOmRbmyKV4WhrN6WcyUcyuYo1PsY7%2B%2Bl3CtB3smSgLV858ajJHCjWu7QBSndm7GQRO1qqDg4V7NHMLiO1M4GOqUB3WRv1ZFeuE0NxeTcLkIKGw3oKeHwLGgvFcyH0TdBST4kFFeEEUrqJoWD5PubgIF%2Fll6YDFB8n685niBArj679CVcQgbJRZ692vbgzwXx8eHjNTA%2Bp2BKbVLONi2XkYLKbnL8rZ155SMZpK%2Fzpmo8J8UXfufdr%2FAsmD5PfijgxyMnUcKHggWSR8E0ZopAcPQJpJtINglUKSuJV9P4mC%2BOoalPq%2BpX&X-Amz-Signature=0372c4ff9e90f5304ce1cf2a27440fe0e0a5fa8d280ccc431c6fc730c23009d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRAEN2HT%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T142250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIBssmTTiRKazXeLT8Urtnmqrt72NO5ixwCGGGfQ1usKCAiA6zDEU2rwJnxaojR1qBxaplXCs9axktFEjR6XYE7XAQiqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMw6X%2FM%2FlSbe0uoPKZKtwDpVnslhnPy76LBIYLOyFlp40QqS08jrhUZuI0BY3hqisASzB5Pkic86BbBLUN9VLH4ZhLWziHuMTx6sR%2FnGKN492vS58QAj9uIGVJGmq0ElB8t0VK8NzLQ7F0xkHNGcPcBSuDspuiXe8Xc8nZ3rso0KDmrwdmmH50oiVTpdxdtlQnymgj031KBWkPlB%2B19zKCbanLkPNwjEuHepSlTLPyihEyD1vepg3vpsdV7yqXKCBHxNHxo5ZXer4GjZ28pPaTGrjleqydKE5UcIkyPi8xqU9HsRBeM5TyjMuS4koFb1BPZI1Siq8L3QeAUKObA7pPST93ClBoMjX9FZ4gDec4gsIGclgCUcO%2BAu2evS75tHptVAwjDFfYggeTemVyGoBVyczQ8di0diPTIAVl4HfX%2FRs6utgJ3C0NWQC6a4kGjd2tVieLmLAEKTBSqvh7MWAK0m9M1eU0jdOyU9rT8eaLKvjfJOaABYzLNPbrz%2FzXK3zEaL7KrYcs2pZRJscYr5LabohZFbcDPepUqjhrN73UmQ%2Ba3dJZS%2FS0w3MRdyYGQejawHib9vX95A7JHKuNvH9c2OIuUUF4fPnK6vwDGCO6gvv0VHv96ctMJVQghxKkuf8ZfpM1kYwrwmC41VcwxIzUzgY6pgEZaj5cD9aKpUicjYVjIu8W7XxHxMPiFhvEMA%2BqAGV6XcEmmpuriGF3Pa29PVc02%2BXWjtgFNdg7BkwkwbpMiawyM3ISqGpk4op2hnAFNnWyKNz%2FGAecUF4kgJ39P7GfjuX4HJuviJXMVOJtwVbF4miZrC2Nqupk0IOsMhE60uv%2BMOelo%2Fzyj8prmT1VZBD9vhHvhC1aw0G7XFnzMVRKKbtG5hRtAdZN&X-Amz-Signature=6c1122a019b49c65ae3a4ae9a5af20eecd309d5664017645362508a398ccecee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4OCJMH3%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T142250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQCeP%2FiVQRY5igAatPz0aM8yGPiv4t0t7Pk%2BRrh%2B9XDz9gIhAM0CnicTa7kAX2w%2FdVjPbZqZMZS%2F8aqsK4K1A6JXAg9TKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxvSjRPWWcMhP%2BABNEq3AOxTMCMpDOQerp9xRr7X5yDc%2BAXcNox3nikqvHDItjw5Lh6lquwwvu3lkj6%2FnlsjZ%2FFPzZseOoUZo1e%2BYSiXt83A1UcyJhbafkbSG2ocqj%2FHJfFTLtAIIkr7zO36Hl6hsQDUHHjMJ2IwZDCEqbMae43K1ZTQKaT2R44IPo2fzRJkwwhIrjAiaxGIY4He8gKxvF6bzYDmKrP0LMlhXXa7MrSy9qBu1JdzmS3pqOnvEyf4ju33O2IEZPL5LdG4HLiwlOBVcgrCaKKkMlMb%2BGheYeeeEzU6Pzektx0irewJE3RLiXSfl13%2BzSyMeTaSRREfva%2B8dDZTqt0PcKNi9uf%2FExgdBk6hgX13%2BBHOTF2Y5Pfg3MjuJ50jDomZzpusJmnk9JUwfo%2FsnKtyUKRA%2FsCWUTABOqYfh6VetWHoELVmfc6llOarXYLRvDEOEPRw1d9ZZuCyCVH1jVYI2GtKFG9ipXrXNAFmZx4iQs0tZ%2F7sVYQB0Gr%2BLITCrokeYNtOj56Hp8lryKRkY4eM81H5%2BMfse5AdBDCkVyeYJT44YIlJDIMIQlZ4SX5t6Mmqnv%2FVjaO6XfWhzfHIWoFWw4D%2BQJuE628%2B%2Fe8M%2BriBNzjJNcKBTdjrF65qw%2Bg4xHOfPpRhTCtjdTOBjqkAbykNdX0MN%2BfOX1VgdKHh9wUrsUNF8HwE%2FFDuzQwVHqC1ucU%2By4ixig4WhSdM32gNUwq6BTbqf0M7noHSMze%2BlQTHiRpdacKLOfb8RIHIFFgRE3%2BPmbqSt09aKKTONW9H1echYFYaQYqy4ValINZizOb%2Ba2Dtcw9npT0A5DeLwPgUIUxApHtAvSPE18xuGQnFJlAdDIUJ8sm23FOzQvlmSvk1Ib9&X-Amz-Signature=c8b1fa29db258e579573b114987492ff45b258293d8ab7f0b0e57f1e0daea359&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2IYMVMK%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T142252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQCWsI%2FJVPJajk3cPKN5Fw3e6usan5bVf0MhiC0Ou%2FrrmQIgYDGaPSh9E8RIm6mi2g2YrqYxMMKWXO5fBV96ABEq8iUqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA0fLQJBerczrxRjyyrcA40wO2DIuVtzK92UWVMXiq4B4RHixBjDR%2BwyThnzoE%2Fajy4h6CJ%2F%2FUksbIIiMWp4Rn5fRwg7mOUmNdFThjQmeIJMFK8Mr90sjtvJ1WomgN1CGgIim2qVVcm2yXNImnOQvYMo6pQAnczH1dRvrNklbzOg0lZjcyq2FvtaZlhmgpl%2FSplfemyJ4dW%2FMmb06Ci4Z3e68B5HBR6%2BiOXHTRFsIOaW7djRRhultN6JE8VEZaxKnNhtII2KDRfNVkitwtuqqm%2BoVh2IxgarXoDkAkePgaQKCWAKXCGp9vi9mc03FDSYuM%2FCX0XNqE2k2yXJ18yNgO7ULnOTkIbBiKYRLf49FBJUk6lHGAyvDzC16hg9063OGYMSi1C%2BcsXNMTujt3pZuCUHZrOBndXEz32QR5YNRGNwXeWaHI0wfOnpO0DOrE9a86g82TBEqapA%2FCFa4h4EkgpUXXCQA7%2FjLTrlMvXOlaMS%2FRpfZa8g9RLtM2Di6oitjOR5azq%2BesG%2Bnlvbn5B%2B8UzGNwFsSYtic2%2BvsHqHJpaQzS6S1mxs%2F6UR35tXdQRobn%2ByGtv2vBn%2BV8jEQ6Gp2hAmSMKx%2F9KXKJmWRacHh8EMrAkenXd5vdztrjgjjW%2FTDt338MXNhEcscvFZMIaM1M4GOqUBZQAcgPTJ%2BOnNGvypN3lbSlAzLYoEEQK8Q4%2FWWDwtEv2Te0Z1qMPqkTVsUW6NnN9c5fCwSXc9zTRXUW7De1u0PL5ijmvDIPQLFn%2BSUcUxTCeltWmZBAOg02hQHxQfXH309CE1ttvEhaahamnXEelrfJJ%2FgiTawcCtt9H6JtOKndhy4%2FWe6Mdo%2BtSRH2PRuVVmmsxS%2FiNd2UzYpPHlivMIB9WQ69M7&X-Amz-Signature=c7802ae89e332a7b893694e89139dff0c6d983e9712803942f6e8f512c0d23cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZ7ISJQN%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T142253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIFrwbEW0J%2B5ajdRaHHiMo2gcuhNmLJ7Rphd%2BwZFJy%2BGnAiATjX3iNVfjQcVGU%2FocfHAQAK4Yf1ZoK22MLZEiJhnx0CqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMapYsbQNRxzIWW%2FBkKtwDpYuTTVE7A8KzBgEt0NPxsHhYveLpfz0a1XJ%2BlISBVUhPcJeJy%2Flbn3DfDJMQfMRElpBrM8EBZ1dDTdUfaP2tjUj6EtAVLEASpDUT08LHYTcK6ydnzWPtacCJFK6FC4X%2F9kukRlA9IPCjKbKECsgSqvjV9Dec2vsKYPrUQfBmd9ru63ODnAJE%2Bgc1Oz5gqW0zhXLKE2UHxVrg2lYu927kdRLR0bnqDKCqxp8yxy4Rq%2FLtB0FOUleyM2rIlI0BFzBK0xwtlH5aXyi1weRLPFFa9%2Ft9gchJDV8x807uZD3AlRPUHx0E15LSD6WiWLCiCkZQN10I5ab18AAzTC5ukWzcp2h25zkiauX65p7BUB1aMDtx6nCy%2BXZQxI%2FYGrCCMkJ7O0T2hq6CxaEs7QVrcM4YXycEjSPI3CrrwpE0XAjTFUDdk46n7%2FZCCxX9f%2BbjI737NOSylAaANen%2FYX60ei56MbXtU1vcnDJg7yzyHlNb2X3QOeFBvwG%2FaoH9nAJk1ow6C%2FcaCC4Aq6%2BrsutRy96%2BY6rIKzt8yAcqdFVWTHhgJ3sBuvWTRbVKU6J%2FmDhJI9oZvdr3syktZHkXj8ZoNrCQknp7egPwQ%2BI87loNDEygrfZ5Di3v3%2BEiPghRnmIwmo3UzgY6pgGNcqDuilSBXtWjXyLWAtNT4FCAuv9XueB7DYAajRGcOruaFIirZA5olbZ%2FL04jZTp4SJxI5bUBnb3VP97k4Hcq3lWnVTkOWWwnXrfXAQmnqxwmFDpAOKl3E2%2B0Zjrj9nnYk9G4bVewZpC6aUTh6CRc%2FFhealfcN1KGkzXNsIQJwqpOMJcwGk50HifIHbmP5XKcn0z3sGuBxrHISFcMC7otq08miI6P&X-Amz-Signature=b003d85cc67584e159824860d83463aaeb41b4d0f50dc64cad88dfc77e4daa0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZ7ISJQN%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T142253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIFrwbEW0J%2B5ajdRaHHiMo2gcuhNmLJ7Rphd%2BwZFJy%2BGnAiATjX3iNVfjQcVGU%2FocfHAQAK4Yf1ZoK22MLZEiJhnx0CqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMapYsbQNRxzIWW%2FBkKtwDpYuTTVE7A8KzBgEt0NPxsHhYveLpfz0a1XJ%2BlISBVUhPcJeJy%2Flbn3DfDJMQfMRElpBrM8EBZ1dDTdUfaP2tjUj6EtAVLEASpDUT08LHYTcK6ydnzWPtacCJFK6FC4X%2F9kukRlA9IPCjKbKECsgSqvjV9Dec2vsKYPrUQfBmd9ru63ODnAJE%2Bgc1Oz5gqW0zhXLKE2UHxVrg2lYu927kdRLR0bnqDKCqxp8yxy4Rq%2FLtB0FOUleyM2rIlI0BFzBK0xwtlH5aXyi1weRLPFFa9%2Ft9gchJDV8x807uZD3AlRPUHx0E15LSD6WiWLCiCkZQN10I5ab18AAzTC5ukWzcp2h25zkiauX65p7BUB1aMDtx6nCy%2BXZQxI%2FYGrCCMkJ7O0T2hq6CxaEs7QVrcM4YXycEjSPI3CrrwpE0XAjTFUDdk46n7%2FZCCxX9f%2BbjI737NOSylAaANen%2FYX60ei56MbXtU1vcnDJg7yzyHlNb2X3QOeFBvwG%2FaoH9nAJk1ow6C%2FcaCC4Aq6%2BrsutRy96%2BY6rIKzt8yAcqdFVWTHhgJ3sBuvWTRbVKU6J%2FmDhJI9oZvdr3syktZHkXj8ZoNrCQknp7egPwQ%2BI87loNDEygrfZ5Di3v3%2BEiPghRnmIwmo3UzgY6pgGNcqDuilSBXtWjXyLWAtNT4FCAuv9XueB7DYAajRGcOruaFIirZA5olbZ%2FL04jZTp4SJxI5bUBnb3VP97k4Hcq3lWnVTkOWWwnXrfXAQmnqxwmFDpAOKl3E2%2B0Zjrj9nnYk9G4bVewZpC6aUTh6CRc%2FFhealfcN1KGkzXNsIQJwqpOMJcwGk50HifIHbmP5XKcn0z3sGuBxrHISFcMC7otq08miI6P&X-Amz-Signature=981746672ea85d205753e183081bcb2b17bce6e206bba871351f9d92f2641db6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NWI237T%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T142246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCICY6uyo3a8uu4jInRHZ02eyuTZX47hzmrs81VxdSCYJ5AiBPyvdxHQHRrCompLapcuqYcmcvE3kas9VQj4lm03QxDiqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMWzsraWQyMLKNtlxAKtwDnXvjLQQ4kbRahZtxjXz0h9Gh%2BD%2ByZfzaTzU2QdT%2BTxnEuOqHMDFTCE0Om99QchhaP8R1fXUB1rKv81yD%2BK6VCjGA2V3Jzd4HqUxDA%2FbyWQEi3j6ip5ONFWp26RFsFF5jO3FZeyxtzkv8o1Rgebw8uEta5zropZ6obejhw%2B%2FCWCFsGc1yuNn4eX5qIZGyY%2F02pSAHTHgwWcNdpySczpFHGWrkRG3FKpcxh4gjPKfCtuC3%2FK8LHB8%2BkRHigIhd%2F%2FXgc7TD8xq7L%2Fybj6WoXwu40rapsPGYF%2BbohcaMX%2BE6IDdqv2Phk5bSWs%2B8aNELInZmhk2HlDMuaVD0FLwTlLnz842zydIfm7mBWf%2F3E8aKwQLC5M3doAxWMdfgfa7CTPlVm47b%2BxBaDhZa%2BuCGyOvCwNJF2kYoS%2F4I3xH6RL8XXN5KjAfjh3p6YNL1rFJKDgX7mmpD80ZLwtqlCtFVPX8RJYoit6VrjXDTW97HxGNngoSMETpEt1ukpGIrMnodZaWEuTdx0Cp57JKSaHtXRiPHySxDL0vfCpOwOnKnu%2FxlpLelXGWHxGe%2B0kNYQw34Wgjh%2B8qLc0tzXo3etu2pUx5RBij9OYovzBTnLJH3FsJOc2Km27gyMkl5f1HKSgswr4zUzgY6pgHOYA6epvNghDNddqXf6Ncq0CfM%2F16%2BheoIrMJYfUXruUdtSs7eqD3TReiqDSWVmZ0QYyQ4APKLvXJQnlspyq9hxG3nrml%2BkNUpJ2xARdWVYliVdZ8nWClOjLcfzfXtPS7QLrITY0B8MBf4IRhQdMTKHW6g0NPYHDPyu0ViOoZ%2FwIwgJg0pIEf5MWJnbLhCTKPjVP7OWiCoIO9JxAiR7gTbm6JXap9m&X-Amz-Signature=35605304e8dcf4bdbb4b287a71e19b60fd43e29baa9496b7d92bddd9609c0bdd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNX6HKVO%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T142259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIFq%2F2rVFl%2FVz041CJfTHrh8GLMObbreEJOBtspqsePzaAiBM6KTB7OmBNrjYnZt7pNlZ0uazAm15HgeVysZyzksIhyqIBAjm%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM2AMiqV5lJxzATDErKtwD1P0SlmX1yQHVqsibY8ct3zvFE%2B76Q3U%2B3tphTF8RJGB0kTlp%2BvehyO6XUWokWxid4Y2M00ym%2FIuVN3tFeUyVibJyqkmMeH27ExhP%2BVV6rzvty%2Baxtnjs7iILVo9%2BCR8H%2BBBuVcprz5JPTtPwdgr0ZmtVgYPD0hz4lNAq0HOCBUmUC1s8cw3QVvdD5KDDn6DuOQxKtBvg2yYngQTTy%2BVxuM7CVVJ9oWs%2F8laJ2VogZ9N28qfigz0IR48tPgOS3LDXhso57RqcZLWiJI2JaQWcKpypeqQYePVW6DHE9Dl1sMrEHtd2Z3Gj74q1rsJtF8kvMhLtIiCjZ0Sy6veXnfZTkwbi4ZGK5faXtZNTggg1tqbYZcXjqQcluSOsefVebtshS3hNNlucrwrgRE4kRcqKOhnVLSUo%2Fxi5TiL7%2F9658cXmhXvSEwy5Ijpsu8jczdq4VaJg0lMmyuqEUXnZVD%2BA71RpEJLbj2EF1I0WOzWsuczCB3H3b3Fs1YWGFKTgrPFhmeQQuPv%2BrgndtAt6YJeGBaohv8TCnDKAvlNbilOwMvdjJJzbhQuWTOGGxbt8aKMrnare22FpqpLau8gHPBOXkn4%2BP5ztIkCUkXgUCsgvGvLf69eK0JqBx%2BS%2Ba1Mw8I3UzgY6pgF%2BcDIINUwXlr8Mumzku0PhBXRo6BSA5kKLdQhxvVZBLU3r7WzkSRLmnZ0uzFV5rz5t14qRGcXIASmQnOpsBrlM4cdqsru1p4ois%2BAe5lFthfFE%2B8r8hYEJKXS03Tvo%2Bup3TXVwyQLIS8pIm48QdWNgdUvLYRMjAF%2FiJ5vEQz1c8SHRO63ljft6mF6MKMq4b%2FUMZA6ZOS9LKLQCUe95t84uftonTb%2Fs&X-Amz-Signature=05fcaf510d975d4b768138a9e58f4461d81a0a8b14eadac40c459ef5faafaa48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNX6HKVO%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T142259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIFq%2F2rVFl%2FVz041CJfTHrh8GLMObbreEJOBtspqsePzaAiBM6KTB7OmBNrjYnZt7pNlZ0uazAm15HgeVysZyzksIhyqIBAjm%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM2AMiqV5lJxzATDErKtwD1P0SlmX1yQHVqsibY8ct3zvFE%2B76Q3U%2B3tphTF8RJGB0kTlp%2BvehyO6XUWokWxid4Y2M00ym%2FIuVN3tFeUyVibJyqkmMeH27ExhP%2BVV6rzvty%2Baxtnjs7iILVo9%2BCR8H%2BBBuVcprz5JPTtPwdgr0ZmtVgYPD0hz4lNAq0HOCBUmUC1s8cw3QVvdD5KDDn6DuOQxKtBvg2yYngQTTy%2BVxuM7CVVJ9oWs%2F8laJ2VogZ9N28qfigz0IR48tPgOS3LDXhso57RqcZLWiJI2JaQWcKpypeqQYePVW6DHE9Dl1sMrEHtd2Z3Gj74q1rsJtF8kvMhLtIiCjZ0Sy6veXnfZTkwbi4ZGK5faXtZNTggg1tqbYZcXjqQcluSOsefVebtshS3hNNlucrwrgRE4kRcqKOhnVLSUo%2Fxi5TiL7%2F9658cXmhXvSEwy5Ijpsu8jczdq4VaJg0lMmyuqEUXnZVD%2BA71RpEJLbj2EF1I0WOzWsuczCB3H3b3Fs1YWGFKTgrPFhmeQQuPv%2BrgndtAt6YJeGBaohv8TCnDKAvlNbilOwMvdjJJzbhQuWTOGGxbt8aKMrnare22FpqpLau8gHPBOXkn4%2BP5ztIkCUkXgUCsgvGvLf69eK0JqBx%2BS%2Ba1Mw8I3UzgY6pgF%2BcDIINUwXlr8Mumzku0PhBXRo6BSA5kKLdQhxvVZBLU3r7WzkSRLmnZ0uzFV5rz5t14qRGcXIASmQnOpsBrlM4cdqsru1p4ois%2BAe5lFthfFE%2B8r8hYEJKXS03Tvo%2Bup3TXVwyQLIS8pIm48QdWNgdUvLYRMjAF%2FiJ5vEQz1c8SHRO63ljft6mF6MKMq4b%2FUMZA6ZOS9LKLQCUe95t84uftonTb%2Fs&X-Amz-Signature=05fcaf510d975d4b768138a9e58f4461d81a0a8b14eadac40c459ef5faafaa48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664J6UXZEA%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T142300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQCdHjNR%2BDf3ePDe2xLvca87m8cQhBi69eW5pSOw3L3cyAIhAO6vv%2BOTFyFU3zJVlQq5Ma2Z44wUjGoeQU0f5I6Rpfx%2FKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzZVORdXKybQPueSjcq3ANYhKTsWw1qTx%2BKIe0eHKXSVzWP5XoGOg834j10y9I9F9zRYS6vx1fmb8Fe98%2FPJRzRxW584NVhUs%2FFue88Et%2B4xSSqE86oCQnY83B2%2FanUDTOJDRarxoUiI1UgTHdYE5%2Fr9I6IddZRZU4M%2BlAw6WhSyBB8a5IuWfFD1rMgvnAMIn2K%2FrTpnSaDzmodsPmtJk2QFweMyPbYEAnTmv1Wisy88yqKaI5e0gAO8YL2W8NNbcXOrqMlyLN8KhYYDE%2Bjp2K1h0zntsf9lkdPmKDkwxS7S%2BZpucaIjay7tfRl606AhYNDfTUhHQxigZlXRJcW%2F9hYyfAcT4MGPPEooFnOp%2FE9DFhQPdne7WVkiA7kwyPPCWcbK8U2hzPNnp9V2vLCtI56M%2BHy9c%2B9kYCw3NIhCyPOnjM6U8pXuo3mAAgace265yRx9Qdx8QFqHnjPs26sMoMnqXYqdGqmIlG5mSWj787kUi9h1Iz9KEwaFkC2MYK%2BebHA45kxw0EhO%2FTIfGSciiYGp3nhSNkM73LxbI6ibLZHZjz66CdO7vNPaqKkdJBI%2F2PWCHlIF6Ru6ohMHMY28O1fdYpbGaIGec3dD5ZCXJgC%2FNQ6D8E3TAe%2FSG7pKDrrNPayOpvbXPD9TPM5iTCbjdTOBjqkATXihlY8Hdym8ftkrIHc3Jkt%2BgU2o6XCL4XPOSzbp4y4l7ozAxiJKo2ovxYXPiHpOlFfRa4QUhr3SMo038NSWYQvESNgSJLkS0Bkam6B7v251qJdWf8nmekrXnffXoEKr04OzxKCmJF2ESlZI4iFmm3t%2F94qBLBGBbCyw2SL2%2B3OpUGuRVcXA%2Fm01Trd%2FXD8bJmjfxGjs1%2FR18b4TqA48RVDs%2BnB&X-Amz-Signature=c92fa6fd278e29c779f2c0427eedd8d6a30038790d3ca2ea5fee81309a0a8981&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

