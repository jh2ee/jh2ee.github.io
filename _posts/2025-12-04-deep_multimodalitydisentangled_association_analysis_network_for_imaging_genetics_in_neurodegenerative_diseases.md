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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIMNXTPQ%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T151134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFnanuK8UegAJyFQjdgiC4%2FOvtTEVVzBruJXcLwtozLdAiBo9eOkNQxL9SjnbMYewdxknfBrZ5kCuUjptaPSSNsxWir%2FAwhQEAAaDDYzNzQyMzE4MzgwNSIMLHnkrpuTYMdTvpMUKtwD%2Fqy6y5mqHG1M9E7hkSByACC1wFiS6qPXhrPaphmlyA4QIRHpgfQTuqglUWA3so4o3WWOj29agXwschDp20WFobdItuky6wj5wtTjbRxqqUY2vGNHbbt%2BcDObpWO8Y5uSzoP8j%2FMAHSIglEq9EOa6Prqj5ahV6LoiLk%2BIOfsqWaGpsfGxPQWc3dWpkm9ZOwmzPwYR5htPml4Ft6V871tZAs95%2F67IVfjtdp5wv3DMNDVsIaofJRH%2FIfQJKCYFRwecqdJAMsRzbjteOgoypYvrPgE%2BznXhJE4WL6WMLiFSQmqYAt0Dw2hAaZf02jU4IvaICRKD9hyh6fr2c9FdQK2DgjRT2gPUCpo50arKlZbpqhRahkRElXi6UQfOS4SwKTvUcc0EdlGOQvsV9U1VqzXAXn0YRwpA6XlynKatBYkXsnvOTcbknlA41Lqs%2B7GLBMBMG3fw201rysxMFF4t2ftuvhyAdp3hxsZyROu5OD1ytORkZma1%2BgB96MS3HjPXGg%2BabE6d9G6mGXrRDvxqUpqW5FyzAISvO2RCd3cCyldqHr62nEKLPnIFW6yNmiWwSPCPE%2FWTDL%2BqNI0V1v5QUnIyV43KrjrHFvxUv4UQTOXTkFz%2BCKOfUUjwBdFMblIwvZypywY6pgHeGLCNMOGDrpdnrnUII8lmfeeeah3T5FdFFQM6KQIDu91QWz%2BTddQXpQLAliA8dMy1H3z0rKb6%2FIfIXqrCA%2FJtNILJ3R%2BLt1mkqZoowM3R4wBHJULkUHVfC1L6B%2Fsf5SBeEkCYUqGCXqJjliFS%2BcOLwD%2BAIF59HOOL6yQLb4zbdINzhF0EZ%2FE87Q2KrMTKy3Zq9fJGBYukLZ8YYDHHljwzZ2BuHxSz&X-Amz-Signature=7586e1900d94f6015b7d0d798b77de7905d411ef70e8079aded7738ef06fcefd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIMNXTPQ%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T151134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFnanuK8UegAJyFQjdgiC4%2FOvtTEVVzBruJXcLwtozLdAiBo9eOkNQxL9SjnbMYewdxknfBrZ5kCuUjptaPSSNsxWir%2FAwhQEAAaDDYzNzQyMzE4MzgwNSIMLHnkrpuTYMdTvpMUKtwD%2Fqy6y5mqHG1M9E7hkSByACC1wFiS6qPXhrPaphmlyA4QIRHpgfQTuqglUWA3so4o3WWOj29agXwschDp20WFobdItuky6wj5wtTjbRxqqUY2vGNHbbt%2BcDObpWO8Y5uSzoP8j%2FMAHSIglEq9EOa6Prqj5ahV6LoiLk%2BIOfsqWaGpsfGxPQWc3dWpkm9ZOwmzPwYR5htPml4Ft6V871tZAs95%2F67IVfjtdp5wv3DMNDVsIaofJRH%2FIfQJKCYFRwecqdJAMsRzbjteOgoypYvrPgE%2BznXhJE4WL6WMLiFSQmqYAt0Dw2hAaZf02jU4IvaICRKD9hyh6fr2c9FdQK2DgjRT2gPUCpo50arKlZbpqhRahkRElXi6UQfOS4SwKTvUcc0EdlGOQvsV9U1VqzXAXn0YRwpA6XlynKatBYkXsnvOTcbknlA41Lqs%2B7GLBMBMG3fw201rysxMFF4t2ftuvhyAdp3hxsZyROu5OD1ytORkZma1%2BgB96MS3HjPXGg%2BabE6d9G6mGXrRDvxqUpqW5FyzAISvO2RCd3cCyldqHr62nEKLPnIFW6yNmiWwSPCPE%2FWTDL%2BqNI0V1v5QUnIyV43KrjrHFvxUv4UQTOXTkFz%2BCKOfUUjwBdFMblIwvZypywY6pgHeGLCNMOGDrpdnrnUII8lmfeeeah3T5FdFFQM6KQIDu91QWz%2BTddQXpQLAliA8dMy1H3z0rKb6%2FIfIXqrCA%2FJtNILJ3R%2BLt1mkqZoowM3R4wBHJULkUHVfC1L6B%2Fsf5SBeEkCYUqGCXqJjliFS%2BcOLwD%2BAIF59HOOL6yQLb4zbdINzhF0EZ%2FE87Q2KrMTKy3Zq9fJGBYukLZ8YYDHHljwzZ2BuHxSz&X-Amz-Signature=7586e1900d94f6015b7d0d798b77de7905d411ef70e8079aded7738ef06fcefd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QB4MV2P6%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T151134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDiiJfnaGEovbjR9xP88umvxGsfYP11QQnnl65sR2Jn6AiBMabKU8GyqIfyuNtU5yz7dWBK2iVRHIA9R%2F8lTCSwCRyr%2FAwhQEAAaDDYzNzQyMzE4MzgwNSIMk0fFY5Cbdw%2F1IzTFKtwDv98N%2FqRUkpnjb2XyOivCuMyP5c%2BlzrXXo51BiaVDwi1RUwxgT4qN8aMB4cUelFMzbHts6pk%2Fd8NZ0SY49bzbLcSw%2Fy%2BQ45n8JCyQBxkoM5ahmf4xNP43VU4PBnDYKH5OSZLDsFhO%2FnBz5tZlQQ3NkgBWWPCaM%2BhIrQhc36CT5UtGm5AOUEiLYHkAjyIEwMZMZtWmipsSOXO3jzqTEjG5%2FuiZKOlN9JDtBAz8Zixk9gRtI7%2FwcRqjdVuFrRC8ajnuEREymE%2FzzF6LEZeHe5m4h2vkScWhkAjQ%2BtaTzbOOlgsGvkBCw4xNSZLNVhC2gCpHVIn1NliTPiSmnVrWRPzy7IsYRg0L7L586LCR2CnHcvdOOS7CM3cg3c6UP%2FAAgJldxydSzJgaGjnAoZgDvHP9%2BDE685sR0Ikw6teeFEt7i%2BrakftXKYK5hyWujOT1%2BdFjE2Kxb92fhfMRcHAWoDQqowt%2B6%2FU9gtSF%2FnT9BdgMwYqsAQTautHqhBbxlguvgFkzsXS2tqFK%2BfUOhO%2Fep8f%2FigwLVoGksid5uhRv5kfmYSY9LuumDeBNjU6OtLYl5rW0JiqIFyMXlZS1r8NhC3jjKIaOKnCc6mknUgLLsoMNFi%2Fs5Pfp%2Bi%2BJC%2FspUvcwyJypywY6pgHYfZgLFyVZAcSCphVgWo8FPowkCwoxZhQx4B41PhEYHGCjVSKYTrXp%2BqBuJRrR5jnNVSXGU3kePF%2BE9uf2yCMvPZ0DHKDsYJU8J6ztBkY7%2BlnEguVGJ2XD%2FTSqPodochGIvshdG7LUiu8325U0O%2F53JP%2BxR%2BdZPsuNpMXmYyMrU0i46bj%2F4tZtKl%2BWCcEdFKzLddPSxkFs8DG6VAPQrhdLGsqrJLJQ&X-Amz-Signature=934bc2f6560eb6b303d709dce6960bb6b98be2d4814407978ee91f51cb729033&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZABVZXJ%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T151137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCTBWrbYpxvV%2BKHHzh0aIVVPFbYrY3cLgxxHcl874R8hAIgfUmVCtpY0%2BGkAS6HBz9WYKsV7agnczTXjMXXaOhNSqMq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDH2gWjxJvj8u4DXruCrcA0aZ59wG9xXUf3DPjqpn%2FO84n2Uah77tEYSWOIxJoQIFmGncVkqRcVtHTnG94HWbbSKcROY%2BV%2FsEwuESwYSo1lkOCQmN5RjilgufSn1rYtjpZgLnUrFvZwHpQhrynq7OnUhOc2QQjWUG8k09BxlPDUiTfZsbJiMVHYOJWu3QowS9gkYkwOt3GuepWDhcfMbIdDMMVajdAcfg1hKlXJMOAdSgqxbfzg4zk6C8tTZXFK%2BTw6kbWMz49vxWzUhHTxdbRPj5bZUGfbVpFpExBDcQmw04qzbQ%2FhrjKBaBhS0u1XMfaQfHRuPCnBYV4NOj%2FFHpOv8k2p%2F7xjDFWmmyjABsBMwAruHV2Eq%2BCiFDhM6YtfggclGL%2BTrwFHbfEIfjNITm3%2Fl4p%2FBS6TlFMfO3P%2BQEOT3Et2K7Iqg2uedUYE%2Byu96oc6feI5MD8xwAoFcWI75uz%2BnGziWiWFxxNhi986liWWvpqgPV78TolKIFPq2oNriCoq2yUWCAqv%2Fbqbzg1E8feBSRaKIR7QDW8K2oHnRb6jS2ug4i3niO8SW2gIr%2Ba1glGPCpeYISr0mfJ0LMiTx4oGCzIZzl%2Bcbr9OwZZnkP4ZjLPw%2FsTUZKRAw8zZjR6215IHncfceIM7iM8km3MLCbqcsGOqUBglYdqj4mgkjNvK2KdwYUsWNDqceZO%2BufCHDP6pThw7jQjwtFIjx0QZ8LcCcVUPVWc%2BD%2BAtwpJj9VdcSx1ZG1zV581MzH3aQ5SNC7z75ctcQ9vJvExLPFG5N%2FghBPn1BGyVrvTAINn265Qfv%2B1EMO1dilYdiISLK169fKYvu%2Fv9rNdtvuyF%2FVmXF13IDCj2%2BLOGbFOQzKvrorYg8ip924l58NmsE8&X-Amz-Signature=2ae5b92d5b97d54f22551d6fd1084b5a39be78f281c5b2e946a1abf230047649&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZABVZXJ%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T151137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCTBWrbYpxvV%2BKHHzh0aIVVPFbYrY3cLgxxHcl874R8hAIgfUmVCtpY0%2BGkAS6HBz9WYKsV7agnczTXjMXXaOhNSqMq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDH2gWjxJvj8u4DXruCrcA0aZ59wG9xXUf3DPjqpn%2FO84n2Uah77tEYSWOIxJoQIFmGncVkqRcVtHTnG94HWbbSKcROY%2BV%2FsEwuESwYSo1lkOCQmN5RjilgufSn1rYtjpZgLnUrFvZwHpQhrynq7OnUhOc2QQjWUG8k09BxlPDUiTfZsbJiMVHYOJWu3QowS9gkYkwOt3GuepWDhcfMbIdDMMVajdAcfg1hKlXJMOAdSgqxbfzg4zk6C8tTZXFK%2BTw6kbWMz49vxWzUhHTxdbRPj5bZUGfbVpFpExBDcQmw04qzbQ%2FhrjKBaBhS0u1XMfaQfHRuPCnBYV4NOj%2FFHpOv8k2p%2F7xjDFWmmyjABsBMwAruHV2Eq%2BCiFDhM6YtfggclGL%2BTrwFHbfEIfjNITm3%2Fl4p%2FBS6TlFMfO3P%2BQEOT3Et2K7Iqg2uedUYE%2Byu96oc6feI5MD8xwAoFcWI75uz%2BnGziWiWFxxNhi986liWWvpqgPV78TolKIFPq2oNriCoq2yUWCAqv%2Fbqbzg1E8feBSRaKIR7QDW8K2oHnRb6jS2ug4i3niO8SW2gIr%2Ba1glGPCpeYISr0mfJ0LMiTx4oGCzIZzl%2Bcbr9OwZZnkP4ZjLPw%2FsTUZKRAw8zZjR6215IHncfceIM7iM8km3MLCbqcsGOqUBglYdqj4mgkjNvK2KdwYUsWNDqceZO%2BufCHDP6pThw7jQjwtFIjx0QZ8LcCcVUPVWc%2BD%2BAtwpJj9VdcSx1ZG1zV581MzH3aQ5SNC7z75ctcQ9vJvExLPFG5N%2FghBPn1BGyVrvTAINn265Qfv%2B1EMO1dilYdiISLK169fKYvu%2Fv9rNdtvuyF%2FVmXF13IDCj2%2BLOGbFOQzKvrorYg8ip924l58NmsE8&X-Amz-Signature=f389a3e79b9596c94f74ed8f763d399f788119b7de607a2afce60b898c7e559c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FJK43NL%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T151137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDItqLZ%2F8%2FE5LeCh2xksofV7iw3AOnCIi5nLJOqdS6ihQIhAJ0F5H3u%2F%2FyqH51lelr3daGV63d0cP7yLCyV3RRUct00Kv8DCFAQABoMNjM3NDIzMTgzODA1IgxySlX5Fslpq8zOKhkq3APRFSMViJTkoN1rzTaf4MkevC3y0lIiAmTE7GYE4NGyqCHmVhtA6E5xN34Ml7sw6VZ2paMc0ssg94jmShpXHgfIhZn1XXfJfqZXDIwm6hLI28D45gdq48XQEYWk2T4YL%2B1LYaafnvw1CmfJxQObmlyKACZII3pT%2BnCpqZjVdU6t1vBtTl98hntMLLSoftwlDD8Sp5GK%2FiYOlD%2Fq%2FwqaGwG5AWaGnIB5Eutz2QA%2BKatIhapOswx1S3K52sWe3jaxkMaomPSGamjEop0bThukcmcukHrW67x2AK668hIJXrEM%2Fc4d8yilXzuUQdsW4XW20XvV5BLAG9RLuE2kFBkuqHQWPP5taUtlmlMfIn%2FI9avarU1PZ6JwxQoW%2BNPNPhxYbDjshGOeaAwNttez4D0V3ek5%2FwOp5kAI1fZltFvLp2tdqaFVE6hpbrysnO%2FjWaRoeW%2FcRDVDTGb4wkC%2FofUaiBVxvj0yP%2F8Ft0dmK1bEGABxPjCyVS%2Fx90%2FIKdB5cKP%2BnUKro9WeQq0vvsnYzcbpdm%2BqvL7SkshQfyg9vYHN0F3Ms4swMzpwjcLv88Oe4COGG5cMCGNkSTRfvwqaxjeyCvBOeD2Xws2EJU2eWd0kLzd6oxw8pBtortlPfviibjDfm6nLBjqkAVOCEwnNvBQYma7dv9YWmqp56HeUFp1t2GrO7cZtkDywyOZ0QSbGXadMf0EtjGrCcIsIBt%2FxQrklApsMPx2mZ9498W%2BFVHQZqusm7yDqp3WVZPxYH%2F1OPEq4aCRE5XsnhtH7N4iLG4H9zn5zc13Id229XaeRKaJgmq2LxdYNH1LuDcpwJNYZeONgnsJUnIhVUuYCQmz9JX1CrL1nLxnNpb3pIUns&X-Amz-Signature=6235c8f1a1b49b47603f8d0d2d83d1356667aa0d6e1225903ba4de0097f5b9db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7LO7OF4%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T151137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCTcAiueUayQpAtCzoZDlDIiE%2Fx5yLOzOLnEdbCzaMVlAIhAPPqRdeQbWYsgfaDS4EnFOxM1WiqyzpsMBhAUMsOu%2BTkKv8DCFAQABoMNjM3NDIzMTgzODA1IgzfwusrQ3Y53HCT3Bsq3AOeIr42ovFB%2F0FtqOX5OuYC6beTuEijADVFP%2BXPp%2BpaHkiQ1AefUkFM2zDYxzX0bOz0ygWLXsbu0Zc%2B9U%2F1MvelUpXaaVtKNli3a3KCHakT8ckYAgfShb2V%2BsXH3tQIFuh7Sy%2BS4HWmOqGvVKnb549cI7QY%2FLS33eVgjST52zCNfyeXAbhJdyXphlZdLotvacRKcgIm6sPEju837YjamjgCmwCmMOSz8PBCQ8AOlXTiFeWeLr9jYtbq4jkmRHEnv54W6mpe9eI69pNHhfARnflOdK%2FWvyxMD6YycjFMgse4JHaeOIGvOrI6RLs8QBWDGOoDKPazgv%2F1WXGr93R6SlL08EIBmXggJ%2FPd3E%2F16wbcn%2B4sctlKvpGKk55T9B%2F1RY0HESpPOFRHT8SsvWWcnR4xX7ja5gdlrOUYqQfUVGGj24JpSV%2FXn7UHT7PGYXBUh3N87kDwFGQ6yGwYSZpeNNg%2BIgA05TPmWFdYnNIzM1yxxkYsoI%2B3%2BtvFRflixR0VREBvoFRpRFGjAKCaJpLcIuZN49Bi2dyH4aKcDxqsUdfdo%2BQ6iOxKOmJD%2BIaGztXx56QoHcqUTHIvNaiplMGEWHFOKBbXnroGmUb1oVnVvdFnzWT%2Be5NBvFS5Z7iPvTCinKnLBjqkAR04XONiLTCgBQ0X5DWRHFNqfZbELdtaFnPU40Wnu%2F09Y87EyZO2PxTM20rVao%2BYNwrDIa9PVQdHIWYJDZqAOPCzA%2BIUtwBHLa8iy4tAR12qx2OLkV4q0GAn1NDTCgyHubcOB07k7VqG0IUwgHyJsHO%2BlXk4kn%2BdeoOjeC56hbnKeUZSfQ6ZDpn%2FL8i4ekB6r6bvbe9og5ONokuBHjqZNco3W7QG&X-Amz-Signature=73e519f22dc1baba039d403ffb284fe176839268105f55e5df82c4e0446dec90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SI23PVJ2%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T151138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEUp4na2XeLBZQ4QmLLgl%2BVTT16UJeZd69dGUqhqlJXsAiEAiwS7U1LKyiW1%2BLkLmj%2BDe2vM2vw82tK%2B%2Bd4T4I67VDwq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDIOtBjToEA%2FRSl%2FGvCrcA26%2FPnEkYIt3ZdLIjqKaldRWE7mGgDu2jpgetXuqDdHvkxuDYIhmQP5x2556c1uKMKyvKn5bsaKekdRA7Yt2JNkCXuWylCjQNQiYv4WQ8WPRSGwrq5jQLwGgNcs2S73GRhspOtUQD969cpNqc8dNW5SECpUQoYZg7C1wJiB12QEq0t0ngCYxZQ1F6Tk5QQGY0kyuX3NYbGP25PCqHI9lUuxosINGddwaDjjTqLWXqmyAyLUcGzXqXFb3isqKC2m3sR59Jf2flm8wTf1OxbN7y71wbdhEFw52F4n4P%2Fz%2F4fWOSj3tSb%2BrcWmsRugt6pcjGITvfIj7C2TZBjKE023RhkVQfthHMUiKyNGYGo5bRWs9Fh1TnLaDf6O8ufnKgE7DqM18netDfv%2Fsd3mmce10o%2FtDvNETB2Qvcdhb41XnRBxybOneAWO%2F%2FcPHHMszDJgwwsxSDOBq%2FKKgfgFK0qbTTwd5KqT97%2BnlsmBZHlDdu7GmRdE4pWji4XqCHDWJAnMlJh%2FqyZbuUDMHdkGHiRUQjEM6FJyjidCL7qO1mNmfkexxLjz06%2BeIP%2FSyGRhZPbkwF%2BxCgoIvw6stQLNMdl3yNomt8SlwJiGm0D3yoP0ER0P8qTjONX%2F2WK4%2B%2FvDYMOuaqcsGOqUB4AkkDt94hY74qUnAdREcNBeO%2BbMQ%2Bw7C1cJ9VsFa%2B%2BncMOW5we3RK9CTnlXh3Z2ZrVYixeqgWScPG6vhq99TDuslFIseCpTKrs3ypseLLfeyvyP9OaSy1jDUc4cmcPkC5TfwTueKSnUWtCCp9c9X%2FeVzBG7U6VvwUtDEqsCGaKl9Fp0NYRbHarPirZgL9%2FuOalQrGXDK7zkaPE6ikTUQIgGHUQ05&X-Amz-Signature=5de044c02f2eed839dd703dc806f00c957ef3eea71cd6c26c4259f8a0d0dcdc6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEPDF2RQ%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T151145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID4bymjIgN7DGLQARq%2BefIev0bN9pap4s6i%2FTQgT4tjlAiB8eRyjO0S%2F2oyKIoy6Bfb4rdWqqu2C4RN9XI%2BVOho4Cir%2FAwhQEAAaDDYzNzQyMzE4MzgwNSIMUSQ69H7fO%2BwjJ3vzKtwDkctEsaJj0WQz2fakADqjNKpsH1XR7oP6hFUbIyoT5wU91aIZSXG2GXHMMyZtsTXTgu9CRN0QsE849edrVzdp34xYcvTaHJ%2BO9CfMrEfVceD%2B5wQt4hZqy8hGK6hHp08z1p%2BL2IYg%2FHrTalKboz3XlTQvTWPzQ%2FX5tEnrFA5Vt6nrqQBpu3%2BPUnBXsxmi8hr7QlSbCkQXFqnmm7P09VbZYgIBrUmR3qUFOLcqInhzH0sNH8gEHiFrsE0VnFROtcvi5tEq4kMaiSO%2BsCBZN7eUteM%2BomkXt%2BWPrF%2BbhjbD26IMVpfag3RPo7WBZnad1y2mogTAxChQDkudUJLLFZBRUYeOmKrI8L6c2Sm8ecpmCNQ2Y2fx3QcIAisdE54PxcQ9dh30Aey9ewKrq6kYxIc81NZjUKBN9bMC73OSbcCjnfFboQFjonoWDk6SvNddaUokzJCtrI6eO95MQ4eEKbkVMTbJTVptjUtfIprCbVHACoYrqb4zN85Is38T4jM8NLwdrAaXjEY8yqRumAfAyFojZqgJN%2BhdQWn4tzoo1BwITDvpQUo3wLCiGfpmhPUcr6XuoZb4s28MJZlgH6FgaWo%2F0xtNMHjH2JmcCOicjqvGiJZ%2Fcdwyy4Kp842prY4w5JqpywY6pgHoPpWM%2Bg8mWr%2Fue6XjDZMKomU46%2BRZLtNkMIDeoWA9nw13bhUFGx6akwQO1s3BQ22IgP%2BjEYo3dVOPZOYnc1guflt4omgXfmwKV39sLeMvWhPZgOBYZOiFbDv%2Fi1W%2Bw7W8cYDS%2BVm0t1WQwmmfMiBYLxSp2KY%2Fsl5Gc6GwAPpBMeteObqmmBrmdlBBy3RJOUf7XUwo%2BO0YWYhRSEsW3pfeH10DsVyV&X-Amz-Signature=0650d04148589b3b7e069e28f026011b803932c0f8294fbb64480c8215ee2e16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEPDF2RQ%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T151145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID4bymjIgN7DGLQARq%2BefIev0bN9pap4s6i%2FTQgT4tjlAiB8eRyjO0S%2F2oyKIoy6Bfb4rdWqqu2C4RN9XI%2BVOho4Cir%2FAwhQEAAaDDYzNzQyMzE4MzgwNSIMUSQ69H7fO%2BwjJ3vzKtwDkctEsaJj0WQz2fakADqjNKpsH1XR7oP6hFUbIyoT5wU91aIZSXG2GXHMMyZtsTXTgu9CRN0QsE849edrVzdp34xYcvTaHJ%2BO9CfMrEfVceD%2B5wQt4hZqy8hGK6hHp08z1p%2BL2IYg%2FHrTalKboz3XlTQvTWPzQ%2FX5tEnrFA5Vt6nrqQBpu3%2BPUnBXsxmi8hr7QlSbCkQXFqnmm7P09VbZYgIBrUmR3qUFOLcqInhzH0sNH8gEHiFrsE0VnFROtcvi5tEq4kMaiSO%2BsCBZN7eUteM%2BomkXt%2BWPrF%2BbhjbD26IMVpfag3RPo7WBZnad1y2mogTAxChQDkudUJLLFZBRUYeOmKrI8L6c2Sm8ecpmCNQ2Y2fx3QcIAisdE54PxcQ9dh30Aey9ewKrq6kYxIc81NZjUKBN9bMC73OSbcCjnfFboQFjonoWDk6SvNddaUokzJCtrI6eO95MQ4eEKbkVMTbJTVptjUtfIprCbVHACoYrqb4zN85Is38T4jM8NLwdrAaXjEY8yqRumAfAyFojZqgJN%2BhdQWn4tzoo1BwITDvpQUo3wLCiGfpmhPUcr6XuoZb4s28MJZlgH6FgaWo%2F0xtNMHjH2JmcCOicjqvGiJZ%2Fcdwyy4Kp842prY4w5JqpywY6pgHoPpWM%2Bg8mWr%2Fue6XjDZMKomU46%2BRZLtNkMIDeoWA9nw13bhUFGx6akwQO1s3BQ22IgP%2BjEYo3dVOPZOYnc1guflt4omgXfmwKV39sLeMvWhPZgOBYZOiFbDv%2Fi1W%2Bw7W8cYDS%2BVm0t1WQwmmfMiBYLxSp2KY%2Fsl5Gc6GwAPpBMeteObqmmBrmdlBBy3RJOUf7XUwo%2BO0YWYhRSEsW3pfeH10DsVyV&X-Amz-Signature=0fc6da0b11b9268e4076a4f298bae6a32e15dc212565b5605f290d6f2d93553b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PZ5ZO3I%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T151130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAvbb%2FEio%2FYCL7%2FRjlnEcrWa1OvA7RyQ6vDWuzaZZp7bAiAokQYyBjuRsFD83pvD1y87Eie1EzvuF30qIj2fPrOjdir%2FAwhQEAAaDDYzNzQyMzE4MzgwNSIMJpqRbXmWn1idPgkrKtwDIvr024jGZYbCristhWCS713kjV%2FfqjTKkG4Gdl1tDpqGCvqWoOG0z87VhxMhlQdrqIXU%2Bb4Z4BBzQJHu4uY8IpXT%2B%2BLco16jZtY8TFUZBFXohhEwxwxt1opr1YNqP0BTcvyn7zwpRDoPPppB4GH729jIRxa0wDUyuJD2u5VMbF4pti%2FMyFVVzhvMhrun7SMqZ1OFA9gZuOjLmQT5Pl6xLACSRph%2B20FftJMmMLyvJsTlQVHxkh%2FGjStOM8ZslH5VbKJN25dIp3M9xcA7sFQ6tV5hCXibd6xJipZi7fW0RCsc%2BszoU39ms3TXK5BICdorigNhOR2TycQVY7rjTzs6LT2AIhNxetWWAozrJi9y3R34hgoWa4x8iLPAeCKj6b0TAeCbk9Gd41sp74B2Ft6zYZv4N3%2Bo6klj36YfvvsUJOwodo9uqf%2FKCXrJMUxA8JGYDKR9cGXEWsnIagaJ4vIA0kAo5nA9JFl56HRTOagHc%2Fuq4aMX%2FV5VJhj04t19RStBNOzLmoyV%2Fv5d9pPDdcmuYfx4eBRWC3K6vxEBxKcWitCmS0pSlsibP4hdcusWwqGeojqV8MBnYGvMB4jKVLlJwwmRf57NbH03E4VeciTfv5SJozRc1aomc9mnDKgw6KepywY6pgG%2FxdarlAh8gB7Wa3hh4ZHNFAujT%2FMdwzaOWqT4JvC39OqNvogH9NiyzSGN1NonWtAdU313sDd7yivTpoL0zeS6XUCaSy60nCKwbwTxiHsPITmiTqbBZlhFf4ScpeoZqav847hVRWHKuJZzEpY13hM2TpLbFprYNU0OlB106Zae%2BJJpPY6v3sj4BZv7se%2FCmtAgNk2r5VPIFykNqwr6XRH0Iv%2F2wLpF&X-Amz-Signature=660517fda10aed67199c2604e9adc688d9e3c70c9e2f252d82a3417e9257fa4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGECZGP7%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T151147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEprFHyNS7G8VGoSxLntpCcMu7S5nUkvRggGLFFLO1UbAiEAj6UmYkQ3shbrmsA9%2FhkYDHUOcZDh0cUH3mJVLJ%2FC4isq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDMl%2BgRl6z2ueKpal1CrcA8HP3TCTgqXZA6%2BI0jh8h0MTPqZdzmO5q8pkA3o3yKpPYAgQXmg5cA0yqkHRlgEeR3TfeFXLZmp78yE47bx5jJNQhMfDn%2FCLPztuse7a%2Bre%2FGcFK7bxcNvD9FwWpkQznHgfV%2FqyunLaqiKpFqQGJppn3lW%2BG6cFdPCC69ZmpZgUbpMm1budHNqAyFfjO1QtIvJZdNPFq6Ko%2F3Sq%2BU%2FkoI%2FwqVTSqWziNU1Jki2ifL5VT0Y4gRuuEx%2F5sGi5dOd7s3uAot185lO3WowgxZQWFpMRZTQNb7T904ziRorkeLCINEoZA4VwoRs03WdygmahF5okSIOtvR%2FP5%2BeVPSqpvcehctPmZX%2F5DxPIb03zBFAHAEEpREq79cA7gY8uIbbuVEotQ39Rz54JzKNSMpg4Rzyc6MUlCWMDVnTQnjF42UwHLYzNF7MqLWZhAHA%2ByD9Em0wPe%2FRyCAevVdibmqhdAJgKmrWIynrmXrOBiFCUu1o8dzU0FVh%2FDSkRfGk%2BbeWl5A%2BJCVsGQKN3JqVfMFQx%2F7l1wss9cvL4rkIZpLNlDOWsqnhn0RY04aNxfd06ajkgauvkTv4AQWMIXdF2OgkAu53vONo33Dj4tfhb4I0AWQ4il4cOuutLHDarKdc0AMKibqcsGOqUBQg6OQSaUMJmXhZGh5SQRiAv3RxPE5wEtNU3tjvrQHYBdI7Zi9LMaTnC7csUGZoUeHGSDx7w%2FiPmbAO3YCLIEYfUrI7ZqVaBYXDjfYl1mPpsOFGIfV7yPfUTGbUP79E7cZVOVM%2BsSmIY78ZX0OcSql7cvNmhSiQ5Zy7mQ5DK1DI%2FkT3VZeszmkvMA5qatKrRaLKRj4DLqFqyubwRy3CiesUBxdjCF&X-Amz-Signature=fbd9879b00dc5b0df33b4800843d6ee6df3d55642afb2a0a5a87973866df743c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGECZGP7%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T151147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEprFHyNS7G8VGoSxLntpCcMu7S5nUkvRggGLFFLO1UbAiEAj6UmYkQ3shbrmsA9%2FhkYDHUOcZDh0cUH3mJVLJ%2FC4isq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDMl%2BgRl6z2ueKpal1CrcA8HP3TCTgqXZA6%2BI0jh8h0MTPqZdzmO5q8pkA3o3yKpPYAgQXmg5cA0yqkHRlgEeR3TfeFXLZmp78yE47bx5jJNQhMfDn%2FCLPztuse7a%2Bre%2FGcFK7bxcNvD9FwWpkQznHgfV%2FqyunLaqiKpFqQGJppn3lW%2BG6cFdPCC69ZmpZgUbpMm1budHNqAyFfjO1QtIvJZdNPFq6Ko%2F3Sq%2BU%2FkoI%2FwqVTSqWziNU1Jki2ifL5VT0Y4gRuuEx%2F5sGi5dOd7s3uAot185lO3WowgxZQWFpMRZTQNb7T904ziRorkeLCINEoZA4VwoRs03WdygmahF5okSIOtvR%2FP5%2BeVPSqpvcehctPmZX%2F5DxPIb03zBFAHAEEpREq79cA7gY8uIbbuVEotQ39Rz54JzKNSMpg4Rzyc6MUlCWMDVnTQnjF42UwHLYzNF7MqLWZhAHA%2ByD9Em0wPe%2FRyCAevVdibmqhdAJgKmrWIynrmXrOBiFCUu1o8dzU0FVh%2FDSkRfGk%2BbeWl5A%2BJCVsGQKN3JqVfMFQx%2F7l1wss9cvL4rkIZpLNlDOWsqnhn0RY04aNxfd06ajkgauvkTv4AQWMIXdF2OgkAu53vONo33Dj4tfhb4I0AWQ4il4cOuutLHDarKdc0AMKibqcsGOqUBQg6OQSaUMJmXhZGh5SQRiAv3RxPE5wEtNU3tjvrQHYBdI7Zi9LMaTnC7csUGZoUeHGSDx7w%2FiPmbAO3YCLIEYfUrI7ZqVaBYXDjfYl1mPpsOFGIfV7yPfUTGbUP79E7cZVOVM%2BsSmIY78ZX0OcSql7cvNmhSiQ5Zy7mQ5DK1DI%2FkT3VZeszmkvMA5qatKrRaLKRj4DLqFqyubwRy3CiesUBxdjCF&X-Amz-Signature=fbd9879b00dc5b0df33b4800843d6ee6df3d55642afb2a0a5a87973866df743c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVXJ2R2X%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T151148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBjZPDlDJxzt2TndJ7%2BRk4nWtCLu27LR7NJEgSmPQ9POAiBLRa72PgFYzDHWdyxymCK9zzZBnPm2M%2FDw0CczQUEa3Cr%2FAwhQEAAaDDYzNzQyMzE4MzgwNSIMX0XacVOhTPvui6YXKtwDb%2BXRHuL0Ab%2F5c%2F4WbKhRN02dodTCCDX69nQPuqmqzOvnC5hTeuklcaj4tHrwRqEjaVgq0kwp6KUgW%2ByOL74hxKY94%2Fjlk81FBQTkt63qTQEQH9GlFYMGflA%2F75cKcoXRF%2FejlRSjGPEAnFvz8At7haVxo3KMTbKZ3%2FGxb5wSuG6XpwxO8EmEt9kBdn2bD0YTUpbR02HCga511oXqVMUpemOi5Y4l2IpLHWGjgVze7QyeP5W6E0Q0L3LeRZ1FEaAk6usU%2FOwE33deHPIgRbDLP6b1VHqYCLy6bYQ42hmPM3Vl9msFy2RCD%2BmnvWMYZj%2BOyaPjH%2FXe1QvlH8AT29g1Exd3L91sdMrlazBn5kU6ElqbP3cCeZ7pPWQcTObOmTmTcokk2QTrGoTcWwDmTcFb32SJumadUrt8JEnVzb9a2zOU%2BT33ez3kFJxJ1j%2F3KnXFlKyhZxqOeSVd4RehyqZrTeqNamoptAsbJdulgctHL%2BH%2FpiDI1W6riX9bZjlv0uuW1fGYGceWTgNqYgobZwjKdJs5J6dC2gryB2cJhU9%2FMLOJpAy8Dk8tD8VVZTL0G0PeWEG9cFsnCG0gqlKYdsR7l%2B6dtyqNu5vPMuRuABDMO33ZTZcMHu2d05x7v9ww4JupywY6pgFweE5A3FcEu4Gd6RzbxdJvPPSx8X2b4JtwFmLJwPKA2UTfSEkNT2MKqSwOs0GeSkxtBs4NHMdDqlAV6Eq0XYcuPDECdW9JjP32tt58x3MyC2ozYygdkhuY1RJd4F%2Bp0DUzRjzpYfiGqyt1ym5HXMh1GFK5LIczUcOhEH2zdE3DkR47zC%2FF%2BsY6%2FbaXXXrmKmBPly8FqcKiCPfsyCSeHs2%2FcwGzG3T7&X-Amz-Signature=2427adffd4433a0040ee648081e0695e20cd637a38d932ce4b666f0381092d70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

