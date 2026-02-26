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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FUSRI2W%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T154011Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQC57TOzvTjs4CBcygQrMec1AUAKZoEjm2i929DoDwMwVgIhAOVsDRMdOfQZWN4kslkfKgloadIIDZ8aNAAr66xp6cu5Kv8DCCQQABoMNjM3NDIzMTgzODA1IgwXESHTolnx4OS%2BDroq3ANxILjBuDdznBkHb2GkuSnq4IwrmBSbHMaH7n1O8KKtGugm4866yGdLCoZwUbnQuRL4ZZHWlhaywHxyUX8EgJNHBZ6aE7TkURUn%2Bo6LnJAXjUzO5rilNwCWkC3rpGmS%2Bwv8gDd1%2B1ckK6JCb95w8Q4KVkjjjZEBrAfvkMeCAIcgotdun6%2FER6j36ZBPlaXyUHyLq5Qn9yBOCb9U1rqEXzITWcO9eWW6Ta3S4JVvohVsqZ%2Bm14XhhOjf5bfG1SDCgA043WsFXPlgkeOjgZBFPt5Mgd8sWZWrM42%2FqdVTvZKERNL04dbyK6L0yE2jN%2FdF%2Bmjqqs%2FYsQJduiOIzWNmD8UOv4uHyybjIVZdIO8GLwsTzb7%2BCcnbGv06%2BBAEMeiD2apy7epUnnxBR01RbCPKJRQKFTyL4t%2BhojuKVOU5%2BvbS5upCS64m%2Fsu%2BI%2F2PvKXm6fZyGltlExTmPWUXD25m5cNSRGr2%2BtP3EG4hNQYDAyUFAhKQNk1Lt4L0SORFwNB73xokZKTI23fryiEQH8ywaguoEzp3VdAEg6fK%2FPZyHCgaKxxdUrtZ0LE1hDCo7Un4fo9rJZ5p6l7iNwLFJk%2FEaV%2Fq2Zs%2FC7AoXn%2FgjnsII0GBUqDNwxDYuN9RgbmlhDDG2YDNBjqkAep2Ftefeh2M3f4txUQKKYyGQIywoz0vx4RZw7dM5L2EhA5LN66WlVOOjF9lFPxz6BzgQ%2FT%2F3ffFAhOp6yApQYRCs%2BaMGqoAT8LssWTMGHVCN9NORXq2VEi0f2JqsHpTUajKecmMdPyj6VZzhcQwMrrFkfnUqPc39xtDl12vjxapUb%2BQ39Bkhw6FlcbDZM3oMsT%2BEgQQ89wjjLk7aupHOqbsfmnd&X-Amz-Signature=44de9036484942a33c2471b16221985ded820b38ea2db4b65304b30e8d6ac32a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FUSRI2W%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T154011Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQC57TOzvTjs4CBcygQrMec1AUAKZoEjm2i929DoDwMwVgIhAOVsDRMdOfQZWN4kslkfKgloadIIDZ8aNAAr66xp6cu5Kv8DCCQQABoMNjM3NDIzMTgzODA1IgwXESHTolnx4OS%2BDroq3ANxILjBuDdznBkHb2GkuSnq4IwrmBSbHMaH7n1O8KKtGugm4866yGdLCoZwUbnQuRL4ZZHWlhaywHxyUX8EgJNHBZ6aE7TkURUn%2Bo6LnJAXjUzO5rilNwCWkC3rpGmS%2Bwv8gDd1%2B1ckK6JCb95w8Q4KVkjjjZEBrAfvkMeCAIcgotdun6%2FER6j36ZBPlaXyUHyLq5Qn9yBOCb9U1rqEXzITWcO9eWW6Ta3S4JVvohVsqZ%2Bm14XhhOjf5bfG1SDCgA043WsFXPlgkeOjgZBFPt5Mgd8sWZWrM42%2FqdVTvZKERNL04dbyK6L0yE2jN%2FdF%2Bmjqqs%2FYsQJduiOIzWNmD8UOv4uHyybjIVZdIO8GLwsTzb7%2BCcnbGv06%2BBAEMeiD2apy7epUnnxBR01RbCPKJRQKFTyL4t%2BhojuKVOU5%2BvbS5upCS64m%2Fsu%2BI%2F2PvKXm6fZyGltlExTmPWUXD25m5cNSRGr2%2BtP3EG4hNQYDAyUFAhKQNk1Lt4L0SORFwNB73xokZKTI23fryiEQH8ywaguoEzp3VdAEg6fK%2FPZyHCgaKxxdUrtZ0LE1hDCo7Un4fo9rJZ5p6l7iNwLFJk%2FEaV%2Fq2Zs%2FC7AoXn%2FgjnsII0GBUqDNwxDYuN9RgbmlhDDG2YDNBjqkAep2Ftefeh2M3f4txUQKKYyGQIywoz0vx4RZw7dM5L2EhA5LN66WlVOOjF9lFPxz6BzgQ%2FT%2F3ffFAhOp6yApQYRCs%2BaMGqoAT8LssWTMGHVCN9NORXq2VEi0f2JqsHpTUajKecmMdPyj6VZzhcQwMrrFkfnUqPc39xtDl12vjxapUb%2BQ39Bkhw6FlcbDZM3oMsT%2BEgQQ89wjjLk7aupHOqbsfmnd&X-Amz-Signature=44de9036484942a33c2471b16221985ded820b38ea2db4b65304b30e8d6ac32a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AIMKONY%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T154012Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQDaU5%2BXLVHYsZ1jTbaUz0axcpufUwnoXMGx9vZq6gJrOwIhAKLDKnk73WNWQOLAVWBCzV1whHcDi08oVvTOVMaPrOf9Kv8DCCQQABoMNjM3NDIzMTgzODA1Igy6%2BResKM6inOBguIAq3APgx%2BjeB9CiYevvhvM8KDNiABczR%2BKamLw%2FkOILCQXgQ4ol6Q0aoJYeXZ0n2S5166%2BBkfA3OGVi86e9A7%2BJDNBfpQdKYvwKB4kycX3d67C5LLMNyyUkG%2By8lW91RcFKln3qNQV2xnUZN6o5y0N1BK7c8AJXIQNBTwoR5OWEeD1trn07oSbcywT61o1JbAFyvv9ohZHWB4SDZhGZfGvHbzrzrMyd%2F17O1o2qMNoBOOM70XwhD4zMpe01DVLeh5X7S7oKCzV1p0Tfy9rR%2BluAN2l30YwPgSdXBa1SLxo2C2ZNJBlGiqxZYwCLqgFfx7eFl74nEgwRlb8v1i0LkU24fbkpmSYuz4S2%2B%2BLnBE%2F%2BQ0hFwcUnHHc7%2BdS8hcEgEjul6t7xtIzwntDpehdl6i3O4fF1WwOw91MhAyhVMICtUdiQ07UMW6HKKtkvOHGqooFv4r3jpp36wqv4dmBfrYsuqwZZxgD%2ByB5j7AeoBFiaQvMvHxx%2Fg1LJzoz28Vyt3plJ5H2d%2F2wQ6M0RvC1kkX3U9oT8sPO%2FtCjWX8uP5OtJaR%2B1uQO2RsNOzMQ5vW8apzYrY9oXxQZhN%2B5lVIB5qWFRvqy4Udy08EGpMDZJ63S36QRYvCSaKGCd4g%2FqXtbLKzDN2IDNBjqkAbvZRRe9ZblaquI%2Bd%2F%2F7J4NeZ9TBPE86%2Fxzh93Y%2BZMukEpmFgLQVly7vOsnUFiWlMtmyT6uTEOMGSrgl7H%2Fw6WSzr4EAS%2BejqkO7FuGXwYJ186XGIGRAxVwB3vVMs989cRupYrtEIBUl2xf9aSp81DmRdTpA%2FhaQMJosU%2BJF3yftMASc5%2F%2FmaJl2HMVZbV9nHHnHcP1umMJohh3TJg6aaLQlJlWg&X-Amz-Signature=6ae2e6578c0fbcfc5f1fb6037dd18e03b5ec8dbfeb00a66cd9852f2e31b691a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNR6OMOZ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T154018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQDTUMOig7JQVFFAVvg0ezhYA7G494lmhk0X2RloJk6jqAIhAMjT5%2FqhspHh9UjFKYlBwBJRxvKbf%2BBNMB%2FQKAZUbxO%2FKv8DCCQQABoMNjM3NDIzMTgzODA1Igx4Qjroc2iS52e4I5gq3ANdTgQ28LrHEkrKnrVA8w5ig27LTMQkHehwdAmkFCMxMli4urZF81w95kbNE9STd%2F8O2aG5uW8oO%2BqT4jb4789LktaTIvcKk8NpvgQg8%2Bd2WbI1L5DiQP4FWN0i7IhXrfYKW%2FosQfcJzCaWdMb%2BPFdkx1q3TgarEWRYp4RwD7I%2FSuuWpcUle9IFTWNo4F1YTyMSMYzChp3El8x8HolQJotw%2BkCuSCGlChipjvsWeHZwvQDMOSKN5RUJXLLIiNP9WY7H8WfP8H6%2FjamY8sjWNIMiJZr5eXgejJ87QPa%2F%2BqwNRniTKlZU2cB0rt1udOmp6RlHyIugXp3gJCRm47fzzfcAqO0TY11%2B7ujVMHjRByUVdSGQsYcxy%2BUoD%2FpE3RbgEv2P2b3YUqKNjiY6O2P%2BcI4FyMuxlrOBnTzBEKZlN%2BbS7RI4cflkJ5vWz2N89kx33HhFjVuN9ZXlbAD0Cb1uaIRpMGT7ncnGd%2BxvA5Hp5AMuvk9NX6%2F1wwWfUzR5IWnargrMOPPSPKlaiAQStbDxjsha46XNKNpIBc6PhXRjvVHlbG2BmiPuy4l%2FW46J4aIoqbDGGLe7HT9%2BKMmunTv7X0%2BuQAAsSAyVMhP1%2F8xFJ%2FS2SwT1Tiqg2uXZRbbzUTD92IDNBjqkASG15BCkrP9Ek7ym25ul6dva8%2FKdexkJT97XWDYk86Sks9dva2ZrTV2iBLuGFx29ivloiEw%2BxO%2F%2FgrTj2TmPTtd%2BWqTjf3iDrB9crX8jes0v2dAZfTSkC1MHAn5Gd%2BK7jSgP3LOUnz2EnydP8%2FWiiCBD6xMLtW4wVPhd9WCVLqwAhMn4QZcpIf3iNCnIerlqIXMSPBpOuhc%2FvArvT2fHXRdfVt1b&X-Amz-Signature=f4f0b1335de0b8d236534feee5a992c0123bb0e5214a3b5928bc9fb644a2aaed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNR6OMOZ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T154018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQDTUMOig7JQVFFAVvg0ezhYA7G494lmhk0X2RloJk6jqAIhAMjT5%2FqhspHh9UjFKYlBwBJRxvKbf%2BBNMB%2FQKAZUbxO%2FKv8DCCQQABoMNjM3NDIzMTgzODA1Igx4Qjroc2iS52e4I5gq3ANdTgQ28LrHEkrKnrVA8w5ig27LTMQkHehwdAmkFCMxMli4urZF81w95kbNE9STd%2F8O2aG5uW8oO%2BqT4jb4789LktaTIvcKk8NpvgQg8%2Bd2WbI1L5DiQP4FWN0i7IhXrfYKW%2FosQfcJzCaWdMb%2BPFdkx1q3TgarEWRYp4RwD7I%2FSuuWpcUle9IFTWNo4F1YTyMSMYzChp3El8x8HolQJotw%2BkCuSCGlChipjvsWeHZwvQDMOSKN5RUJXLLIiNP9WY7H8WfP8H6%2FjamY8sjWNIMiJZr5eXgejJ87QPa%2F%2BqwNRniTKlZU2cB0rt1udOmp6RlHyIugXp3gJCRm47fzzfcAqO0TY11%2B7ujVMHjRByUVdSGQsYcxy%2BUoD%2FpE3RbgEv2P2b3YUqKNjiY6O2P%2BcI4FyMuxlrOBnTzBEKZlN%2BbS7RI4cflkJ5vWz2N89kx33HhFjVuN9ZXlbAD0Cb1uaIRpMGT7ncnGd%2BxvA5Hp5AMuvk9NX6%2F1wwWfUzR5IWnargrMOPPSPKlaiAQStbDxjsha46XNKNpIBc6PhXRjvVHlbG2BmiPuy4l%2FW46J4aIoqbDGGLe7HT9%2BKMmunTv7X0%2BuQAAsSAyVMhP1%2F8xFJ%2FS2SwT1Tiqg2uXZRbbzUTD92IDNBjqkASG15BCkrP9Ek7ym25ul6dva8%2FKdexkJT97XWDYk86Sks9dva2ZrTV2iBLuGFx29ivloiEw%2BxO%2F%2FgrTj2TmPTtd%2BWqTjf3iDrB9crX8jes0v2dAZfTSkC1MHAn5Gd%2BK7jSgP3LOUnz2EnydP8%2FWiiCBD6xMLtW4wVPhd9WCVLqwAhMn4QZcpIf3iNCnIerlqIXMSPBpOuhc%2FvArvT2fHXRdfVt1b&X-Amz-Signature=0b1acf5cd63f50c614ac6ed98a0a611778b4260f4fabd0a9dffca889f5f012fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626BNQOQF%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T154018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQDxNwlonzFYCm%2BvlcWEugq6kxJC7s8aKozNvpJVFp40FQIhAMg%2BmxYQZNfoOQ%2F3PCm5FH%2BagSY8mcPXkQAREEumOcvQKv8DCCQQABoMNjM3NDIzMTgzODA1IgzdrdpQLA%2BXR2zrnvUq3ANdQpvcSxEGtjioZt%2BDJ3iqrtv4OJivFmnnzpKbOyUyKdZP7bobT0X6l%2FbvZMGiTzvIw6ZNr%2BiaRyKjWp8qCALke95HyYg3hSMffn3Doy%2Ban4tW2cLrm7xsmlM%2Fp%2FGcpGhgYw8GhmtGubPoSgcq19sijDtYiBc%2BfVYsdLAQxlbWtGNEzv8EURjUXCc4d5n2O%2Bx22qmrX1CyDUCYyCguidihL18qIu0yblH5HyR1EqzZ88YLp%2Bo0hnQovSQonPGpok7Tt3EM6%2FfEKoy%2Fs4BHwXUd8Uw%2FlAM2W2kbkqXzl2Ok8mh%2BUXRUDmrBoxiZuPjd%2FagD0wOJcwzJMvVrPY3nEwOEWTJkSaaAPIsEgHP2OMbMaDcuwlf8ByCmK9F3%2FaFmhWiTCSXybquj2AE6rNSOYqAxw1frbHeMr1Dy1pthN%2BWmbri5wOZPeOz4mwyUgPI0nOZ%2FKEgL5cnaYt%2BBfEkTUaQosQ%2FqQJ9ZspAJXKF0Y9uXU7c49qH%2FMPOhDR4ZNJzt2AOacacHVgjSCcKJ3xpzsrfzXEuAG3aGo%2B8vU4Hcm%2BPEoYePFpwyMjbWkkkER4IdxbJzCgFmyVO49Idrnaa8cqEgFKN8xUetxyS486n0L2fgReGL%2BDO6lI%2BFy6a0GDD02IDNBjqkAQpVUnWnYtuvEB%2BumPKIwpnmKLKyN%2FYghGTf9DLI9GeObsuNDecxK4jV9NcVIxfsJ%2F139KEuz0py8Hl%2BxZHtaL%2Ffw8pEdjzYZRshNL8cscB4%2BOFmrFoVbiC%2Fy6kbp5cumT4B4LHcRbw3ocixFrlYAq%2Boy6irMATFte01SEvLS%2BeWtiMP4Ave4MR6wScZZ1HZsCGs8TwPbPZ%2FeDLdElNhk0alWwiY&X-Amz-Signature=502cb4246b34bc0236b8a2986f881226e6f0ee1f334807c7e3dc26febf72e987&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4WQX6QC%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T154018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQD%2F%2FIpMlNvJbSjYsuDuK7IMLaqx6i1aIYeE7uJu7bWPxAIgfpMRzKGNWw0pGPMH3SDVVuW18OLR%2FbrROhvY2rk%2BqIkq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDM0yPyOcKWg6aOzQrCrcA75sz6wEiNGlu7Ww9y5uMzWUAqCs3jqKbeK1d%2FfGTM7FyhJvIc9EkW10l2jlQ3URtCroQ0y0Wg4V07MxeM%2BDxTLdJpf2PUxdwl7%2FSyrqexKnP8TXAqgixaKASkVgASl%2FyH9uSw8%2FDVWsWsniFyDp2Yfh1wqB6DIYMSNloGtYC8f%2FvuB%2FRv7XMEaJfZ%2BC1vE%2FeNQ%2BcOa9FfmzhOgMvQ7aRPpM1ZbEbBSJG2k2GKctQ9M8zMQH7OSGeTI5G6SZahGnFzUdicYzSXZQi5ztKm2qLZtOaB3AzXBmeHIOJeBfKnRF%2FGZRFGrJfShdV8Cf%2FOH%2BKKJhBwbfjVQ%2BlKpSpxoYLbvsVro5pbNcazQKVp3bG4Ld6ApBlTKuAdLyCECrfmJhTYxKAdllxbFQlQBaIYAUSGnvPLUn31TdrhUzvtlu4Rsc6osIhpyc%2Bg024iIV7TbxRx1A8blreAU47rYhVbI%2Fi4naRzBK0abv47cl2R24KfIhjNF5CJZhCjJf1sbFOcySo2E2PjK%2F9P4JnamCbBwy%2BOGpp7rxTvYZs7%2B8HYyZPx49cSFF20yOpqiYG8REgbBCddEDiKgc39eAPmSWxJaYrzjDwapL5fj23bTGBt9%2FHnB0P1ccSPIxfdAsk3QuMMbZgM0GOqUBlQSIvPqotpv39T9OMCcjGKL%2F0AGXThRHi5pZpjp90eeEPyKAorzF5lahpv26aCqA5a8BlpF2atEMXjiOyee8d%2BpZXh%2BZi3f9UplfS2sN59k0cq%2Bp6u0233DBWdYcK6V%2BCY%2BdLe%2B5xx%2FmMmuTmkUkLq9T5x2X9NdcRchJhC5i37Z2E3UXeYY5XzN%2BGhOpT0mrmWIhknfwtKALGxbCfIQeAicxPBqm&X-Amz-Signature=65ff04325d36822ee7e2fa8545764c38ffe01ed198bfbcddab5041eda44da5df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Q6VB6EB%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T154021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQCuc8R8qNC9zQx9vb3OaP0%2F5UJ4PehYkSMmYbrKOhyYlwIhAJEys1wPlJFVFHTGjLabalGtWtD2Y6vSAOimjwcR%2FpZfKv8DCCQQABoMNjM3NDIzMTgzODA1IgwKKZKzqicYu2sOzcIq3APacye3T4foX%2Fbr4Lo0VaOWMGX5%2BmPslZqfEOE5Auf3h%2BLYwd8zlu5PVChBQgzSeXACtcN6ZHwCvgF%2FNNVuLFzTO9NK77McInDoESfFEiwpe6FEfZg1pbL%2BvEeBP8%2F0gEH7aB8WR1upK3XNDHb8GVrsYzoDY6RO5FJiD3njtTblOD4a18jztZGq13vVxmbQZN5n2cfYvtwl7WFcemGsb0niKA%2Ftctb07NSSTBNwYcNGNeKkoHPbM4VR6l2kmu2myi5Bn1vmJY2kO1Mw01S0iFbUDT45fhk4F4imGuv4HtkuZgOf01SI9TTPEnGmHIjMiuxizw5TvbXcZcPdZxLTksheqozniiRQQgSwBUnbZsdNGg2KaSyGIx9M4lKbxzktRG50uzPFgFlKGFbMXpkGdZSM7aNVR6Rc83KSLjk36SK96WPolBJeiBCymH2h6cK3wc87F3qdD2xnocEDWjPUAmBr4JGvTaK6HpFwCxVupxTYYFl%2FXrv3QMcj1lR%2BKU7ZQPltKfGAoTeYZgZ8c0QdKAxoEOvwXOQ4r6fOu7zEdki4mZg7QZfFxDEH%2Bn11%2BFFtHTsdmmTaLR3jbfoVADRFYpjGzQMflWfCa6fOzBx2nOx4HSP6CnxCRCmYDMgUjjCt2IDNBjqkAZb1tB7W9dIvc6qf4BSw3ohV0Dv9EosdW4DOdqHCO2huSqHD79XQ0bGhUW7a359%2FTTmNk6JfLA%2FFsC%2FYvQrHcO4qUmkJeNprKqRg4r12VcBalpaVX4pemXntiK2zZLWZAKb0J5dqcvQdg4rQHycD%2F7NuQONLSw%2FOw5xshao%2F0HfJ6t3MYKSz7xkDm7p4nmqfkX%2F01mHQbbif1BY7sZV0knMpBqmP&X-Amz-Signature=3bca3c6df6dfa146a7b92b75b2c9fa97526c9a7b6595014000f67e2489a1083b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBJPW2HW%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T154023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQCU3NfNwltasg1C05587OQfen954h5Pa1rt4vXrG6tQ0gIhALV8zA8b1WiA%2BVVBnd%2BtUu%2B27sKS%2BXAM%2Bp7e2YQPCOBpKv8DCCQQABoMNjM3NDIzMTgzODA1Igya1M%2FIyc87GDHARZMq3APoGeaE%2FTyc0oUwDbqeJVfDNsDY1AEdBURFgKtoWt8oIv99kM2re0pE5rEUx0qnGZc%2BWpaXmYETDg35jA2fYUJAFtq2wKNpuYbzjHnzKbl0hz%2Bg%2Bk18f%2FttiLMkq6So3soGJihpXvIbXkqatngq6DuHo3XHRxtGyII6hPMPv02SndhkMi9UpOi3%2FWNtWKT8Do47Xw7ibLcgoMOPJCukc3nkyo7JFonZa%2BlHMW1MT%2B5Nw4Q4c2TloJtJZBWcmBYkwXOv%2BVBOX4q6N721AtW7UYzJmLQMm8sWPhHb%2BjrYZun97sfbuvj%2Fnqa%2FnunuJgrwjwohIPW%2BaE9h8MwNO3AtoNCetboKdBhuujnrz8%2F4dqUvvSfPZVr7c1v2aM44Es%2FBkQVDO9fClwxHkjTUBOe9Y53L%2BsCqkfbWiG9gvRRTkk%2B0YtVCeuAZYoayNBQLco9IJs9UdIipDS5tdD2LbU0dLd10WuSuVqnDo61EzCzXNcDG2Z0EJl3oYPRXcHehNArnDLx9bU0b7zvKqHciDs079hlZZKY4LRz1mjZqjxV6PFcuAUJoDddk5OQvxqeRXCPX%2F6pj%2BImRc4CC5Q8e5rQoOYqRc6oH%2BxiQi0F4hTWJsiJKeWCXnlTxlLIJvb%2FbCTDL2IDNBjqkAZ8AskQCQXEWUKMJZFR5WFJV%2F6S9VOiNE%2FRF6Lz9whIaxO4L9QzgDM4pf%2FBCd%2BZqTCl8bajuDU5YIzEqxAFWkLs77P9PfSW08%2Fa3qoVT%2Bad30qph6dtOFm5RnokUpDKzyz9tY4rYBMZvHTG0J6XkkVZ9y0hwA5JI5FTr5%2B1BDFEac8Nw4olPPPL%2FPopeSRu9%2F9%2FlzSw7EPvZj%2F5kbs%2B4gW9HnhmR&X-Amz-Signature=f29f180540a85622c75117619fe4aed8249eae8616fb3e2035e3645128729ac1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBJPW2HW%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T154023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQCU3NfNwltasg1C05587OQfen954h5Pa1rt4vXrG6tQ0gIhALV8zA8b1WiA%2BVVBnd%2BtUu%2B27sKS%2BXAM%2Bp7e2YQPCOBpKv8DCCQQABoMNjM3NDIzMTgzODA1Igya1M%2FIyc87GDHARZMq3APoGeaE%2FTyc0oUwDbqeJVfDNsDY1AEdBURFgKtoWt8oIv99kM2re0pE5rEUx0qnGZc%2BWpaXmYETDg35jA2fYUJAFtq2wKNpuYbzjHnzKbl0hz%2Bg%2Bk18f%2FttiLMkq6So3soGJihpXvIbXkqatngq6DuHo3XHRxtGyII6hPMPv02SndhkMi9UpOi3%2FWNtWKT8Do47Xw7ibLcgoMOPJCukc3nkyo7JFonZa%2BlHMW1MT%2B5Nw4Q4c2TloJtJZBWcmBYkwXOv%2BVBOX4q6N721AtW7UYzJmLQMm8sWPhHb%2BjrYZun97sfbuvj%2Fnqa%2FnunuJgrwjwohIPW%2BaE9h8MwNO3AtoNCetboKdBhuujnrz8%2F4dqUvvSfPZVr7c1v2aM44Es%2FBkQVDO9fClwxHkjTUBOe9Y53L%2BsCqkfbWiG9gvRRTkk%2B0YtVCeuAZYoayNBQLco9IJs9UdIipDS5tdD2LbU0dLd10WuSuVqnDo61EzCzXNcDG2Z0EJl3oYPRXcHehNArnDLx9bU0b7zvKqHciDs079hlZZKY4LRz1mjZqjxV6PFcuAUJoDddk5OQvxqeRXCPX%2F6pj%2BImRc4CC5Q8e5rQoOYqRc6oH%2BxiQi0F4hTWJsiJKeWCXnlTxlLIJvb%2FbCTDL2IDNBjqkAZ8AskQCQXEWUKMJZFR5WFJV%2F6S9VOiNE%2FRF6Lz9whIaxO4L9QzgDM4pf%2FBCd%2BZqTCl8bajuDU5YIzEqxAFWkLs77P9PfSW08%2Fa3qoVT%2Bad30qph6dtOFm5RnokUpDKzyz9tY4rYBMZvHTG0J6XkkVZ9y0hwA5JI5FTr5%2B1BDFEac8Nw4olPPPL%2FPopeSRu9%2F9%2FlzSw7EPvZj%2F5kbs%2B4gW9HnhmR&X-Amz-Signature=7c66109b61b6727b7e8032625502910795d822309c5f88bc3e69d2ed0087402e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYAIVOEU%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T154008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQDfMKUWgqGvAiLM6pJYLQNXEQxyPowjUThYu6HeGxnbQAIhANZAstcUNZXSsKce7FDfOO9bzAOx%2FB9zsij3ukWXgoAZKv8DCCQQABoMNjM3NDIzMTgzODA1Igxpqa4vZY5ubunCGdQq3APUrcl18dRDeDO8D2BKspeqqIZ1G4q2fnNP7hw7va1nxeXPHKfQQ3PEZ2TUSCak8fzHZQuwxdGChpJTm1uOFxx2863%2B3iHs3G8Bi%2F7Kpmcv0lgM8t8Ld1lPszDPPc2eZj0kpsVy8av9V467nBr3gkKNFGr7NhUrCSooGhKErDJ4l1mNha5vJ1ew1GDhxW92jc8n2jbaxRgKAvZVOqWwB5K6o8w4OffoYt02Chr8kIax13%2BaETvSKkYEn8f8xf6dg4TOetLk%2BtmigIG55u%2FJzsXedUZesq%2B%2FfWkcVeDr4JsDiG2DdD60C%2FYd5Yp2%2BUFBEbsLY4GUnl1DY5bgG3lj75SZ%2FQ6uhoUZzGvM3%2FN9OqfyotlN3VKNZqAHGTSrIwa45fTa7y8sYUSwwzRnY2lIv2vb5gICUoiP4Zdqvuu7DHC%2FoAJTScumo0RF5mebDVfbuPH4p%2FLgYwsK0Hq2B93MCaKhoLUKZOFwOlE7TLRSwVlKWSm3fpj0NwfRwes0e1MZZWuI6RPOOVLcIgsMsmGXqu%2FuuFNKZJ1qvEPeE0h33ZNlhO6UaYG9Km%2BFpjloG3M1RwA9BxgaaGhH1BXsZG%2BAl0PF4Ke8l83%2BOdBNqquOkljONnvPgQ3gfpH0mQL4ZjCC2YDNBjqkAY1XVxpQiGO1GSQ8H3Oycijp5muHoEMdhajmDmVC%2FrEynQL%2B0uHLOl%2BrpSTyf1RANdtz%2FjnydETRFT1u1swbc3y4QFK60VsKMtqJxiaSzYGq42l%2BBTmXJuNKxOIpb%2BQvdtKE2u43j5lAQzP4VMA%2F7Xru47p%2BNjH1i6L6txDlknussmeZeJbalMpihpZByl6gkL1YRHV6ungm9ArZRK4nD5pvlWwa&X-Amz-Signature=c5fa9b4fcc7530e03c653f45461bccc035128589e7543600d83ec0270342b0e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XG7377PW%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T154026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQDJObZwLJGsxDEDCO94D0YsNfYLZPEBjxg3ZOAiVDz%2FOwIhAJ6O5ecRUDuuaorvbMMJFnjPdfQShYu11IxgcVEtolHUKv8DCCQQABoMNjM3NDIzMTgzODA1IgzfjFJSG7hh88XFJUkq3AO8hFcW4cUJLZSavxxH1oDzmT4xjJcnZIHfXj%2FI5nGlFYongr2%2Fzd%2BJOMTsU3mBVobmHlxJZ6S7KJwv%2FMMcl0q1QVSapKPBtkEWpTXf0myNLvWKMTjxqjbr2KZqzWIu7%2BGxUTL%2FMDxwWBVKUOyp5cNDbGCvK78t9Au4s4M6qtcK3F0QGTH8rZESly4dl8hts4JiseNOs3o58AURbEc0iHXpSc35KoydSblQw5Xc2fmh97ldsmLAySyVcaef3wafHFx2TKNMHLjN%2FWnTJWu8wldmLENwl4RCi3YucRyrDHZB0lL%2BFtGxmRnvq4u%2BoArwKJy2ipqRTS85T%2B%2Fr%2BwDw2iwtT%2BOlvGXrcQyIiAZMHEt%2FcZDRKaUUmL2Djn4zHRhvJMLnwbw9yAqdtp1eow3t3y%2FQAtzKypcBkh5LmaWIe3DfP%2Fl2hppvWtra1Uc7Oxx5E7lNFitJj3lJNsVEL3C%2BSBKs4OvDSAVluLvU2aVd4FDcZrMU%2Fea35SMjVHG8q06pOHSK6vcTBNkgcUkZWIJRhHGciBWHtvDy0Q3cbMJ%2BsB7r6Hedl0M747CkfbZsArN9CEE0eqKCNIxMevaQOxtNfw%2Bk9RSdXA3rEVPXEBQAwbM5iosBbWGuQUAxJDDa1jCp2YDNBjqkATYLvjNz8sQRo2J2WqPiPox194KCn58X%2FXIvp%2BzsQbeGnksiPKENyMic5vTWFJWN%2F1%2Bsqz1Y050qrcK9SdI8xc%2BhNXxPR1iFs5rIlrB7oxkYqLADcYNaLYWXaBM0KuCCK4xThj8Gvhi4URHOxsLVcHKGmpvxezI1GXiIdufn2jxVDUnsdRJD6BJkoSTjQjxhhOvXr%2FjejqClRZRkye6a2irGDnaS&X-Amz-Signature=5e29dda5b677f266299bf874e6150494d551473d6ace7e55cb8ea299a9535990&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XG7377PW%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T154026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQDJObZwLJGsxDEDCO94D0YsNfYLZPEBjxg3ZOAiVDz%2FOwIhAJ6O5ecRUDuuaorvbMMJFnjPdfQShYu11IxgcVEtolHUKv8DCCQQABoMNjM3NDIzMTgzODA1IgzfjFJSG7hh88XFJUkq3AO8hFcW4cUJLZSavxxH1oDzmT4xjJcnZIHfXj%2FI5nGlFYongr2%2Fzd%2BJOMTsU3mBVobmHlxJZ6S7KJwv%2FMMcl0q1QVSapKPBtkEWpTXf0myNLvWKMTjxqjbr2KZqzWIu7%2BGxUTL%2FMDxwWBVKUOyp5cNDbGCvK78t9Au4s4M6qtcK3F0QGTH8rZESly4dl8hts4JiseNOs3o58AURbEc0iHXpSc35KoydSblQw5Xc2fmh97ldsmLAySyVcaef3wafHFx2TKNMHLjN%2FWnTJWu8wldmLENwl4RCi3YucRyrDHZB0lL%2BFtGxmRnvq4u%2BoArwKJy2ipqRTS85T%2B%2Fr%2BwDw2iwtT%2BOlvGXrcQyIiAZMHEt%2FcZDRKaUUmL2Djn4zHRhvJMLnwbw9yAqdtp1eow3t3y%2FQAtzKypcBkh5LmaWIe3DfP%2Fl2hppvWtra1Uc7Oxx5E7lNFitJj3lJNsVEL3C%2BSBKs4OvDSAVluLvU2aVd4FDcZrMU%2Fea35SMjVHG8q06pOHSK6vcTBNkgcUkZWIJRhHGciBWHtvDy0Q3cbMJ%2BsB7r6Hedl0M747CkfbZsArN9CEE0eqKCNIxMevaQOxtNfw%2Bk9RSdXA3rEVPXEBQAwbM5iosBbWGuQUAxJDDa1jCp2YDNBjqkATYLvjNz8sQRo2J2WqPiPox194KCn58X%2FXIvp%2BzsQbeGnksiPKENyMic5vTWFJWN%2F1%2Bsqz1Y050qrcK9SdI8xc%2BhNXxPR1iFs5rIlrB7oxkYqLADcYNaLYWXaBM0KuCCK4xThj8Gvhi4URHOxsLVcHKGmpvxezI1GXiIdufn2jxVDUnsdRJD6BJkoSTjQjxhhOvXr%2FjejqClRZRkye6a2irGDnaS&X-Amz-Signature=5e29dda5b677f266299bf874e6150494d551473d6ace7e55cb8ea299a9535990&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCYCDMUM%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T154026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQCefK1yX9P%2FyBW%2FvX3ktP6SwLEusComwIKsaCkUhbNKagIhAJw2590nUkUsJOPou01rsF%2FlB0NVfExwSWFKhQWr8mUxKv8DCCQQABoMNjM3NDIzMTgzODA1IgzOdAFSLJW2sMARpdYq3APbm9V%2Bo9drnO13xY2DjNwGoTTRizXIcUL9x7nRuQvtlKxkPqR6%2B0RCFnzyB3b7wI0J9M5sw%2F3tVbbwe5za6CDX9fwVNse49MDEQuV2l2KXHX0bZ%2FMaDH4IATdt4qsT0nIovpzzusOJvldBVhz2mMeZKnMKNZY7ZSA6SZ%2FhEWU9fu%2FrjgJUxloCC%2BathyoelSe1fN7K1IiiNsBFun0cFFfvPkGxKM88GkCCbC8hL5nsO9jbfIodQhV%2FTU06lIcIDy3xqBHbXln7UWhbNzM3eAmES9v%2FKVf7blg0h8feW4kY%2Bq%2Fmx2MT51JbowrB%2B8wuNP1BrN%2Fpg02ZbPFWn1s5vtnTEdXzBr18f8Xiu5Gfo26fdg6y%2FazNrNw1dG5XMF1DCYS%2FIgQLBBry1n1WyqhKAy%2Bbu%2FKL%2FUqGJdPce1aXlRo8%2FleshaqJkA12bHvI25hqku9FesVTLG%2Bt6OB4ilkpd%2FS6knCi4aF1lWxxuF%2BmIQpHgOVxDPDGhFFQ3p6Dg5gRYAGSL48jA%2Bla8lBf1PtP5rSGYKo0AmZD7qbum5dHEtbMePMICQamj%2BNTckBNkGtLTS56TvYdZj%2FubeXIUey9TjNYNArYrAN6kj9kkUlTKmQjNPbrPcH6n3V9qcQSQzDb2YDNBjqkAeBWamAcawbcKcyCFSr9Uw6sDrmCMvJT8b1StKEOE0lO2cfk9X%2FhqDvyC0zMJdyisz3aSIJ3v47jFuWwEvvGmfpms5gt5EnSfrYERZSrNCFjweXY4o2wGLaiJGpAzcOpSTMU7St7zB1w5E57yNpUY03RBeXXfHpPFlan1tabyi%2Fk5pbE484RaiAsGz9yiDTz3yWUagUw%2F5R1lrT83eQxXTJdH9hZ&X-Amz-Signature=07148b6c75db5e98c34936255ecf5766fa3c60c6004308879f1ab5ffb9be293c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

