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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZVSSH42V%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T152535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJGMEQCIGyWUKVNj8BKXiDiN3tct8AGvhJERdwisiLedtLMs3tHAiB1P2m7%2BMeSPjsypKE9paTaiqm5GVtCkqxqYBxx%2BRa%2F5CqIBAjw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMG%2BeVx5TRWZNGjM1OKtwD37Cy5HnX0AAEF0JoN%2FIBtE8nnxXSGgCHdxEmpzi9P1bQE5Vc7ounZ4ecrgRyuTSYospqf%2BAqTjdv3DZm5R51tcq8MAvDXnzw1L4eGNzc8qqHUxMXRJxIzrbCpZR6GdtvJ6H3WldPrg8MEYPLukf3w68ZXZI2vFQZvlcQ8UZ9rSVYjYIrNZSurcJwzeDb3XPPpQo1pFpsfO83RrKJ6p5GqWt%2B%2FXNJk8UCBkLDh1Ya20DAJV2anfuEaXb%2BMLolVFpDwEXqfZcOxusxytQtHygZLUVar4yZw25rkhlVc1aTb4vmfI7cIAh%2BwUElChRMns5yMh2UZocDhFhS7quruX4dY4juiNrTyPKZxw7%2BcIVaZFr1SPnRm3Mh15metokWjBpiNjWKBAeogTQ61So2jPkcxLZ4P6ysEC27QzUe9xsSQyxGFdYpp6m2ZYE57IjnNGsFGm12zGLl%2B0zXxnxJ5nqEgObUAn6%2B7mDvxqPC%2BIwDNzb05so2aw4GtwAXsTH38f8%2FYIVbB%2BnKvTvL0pvrf868bEgc92VurxzlekcLVldTwJc3MJ2bLsirh480ZBCfkelqcDKjOvX4Ul2e6qK2n4tFzIMNKe3pm5QL1ZfAgd7ML1ebI85d2XbdmuOBbX4wxK2OzwY6pgEkY%2B7n5p1rM9J0XTRGHe4hySLH1JQ0EgKGrsPFR8afbV8KP7mFkb3DE4jJwMwsHSb7EIs9weuNZ4LlrgaoS8JyZCQfhuhWikwBOQuqY5dBqLBUYMdoIntGcBxGUECQWR7s7LnHceaozfDU3qDuTBEe8zRgEyCUyvIkgxcrfFLryMaxbXBF8GWLi%2B%2BvGYEvDud0Kj%2FKfHVjJCrVTlrugEiwEd%2BuTU5v&X-Amz-Signature=c8b1b7059ab2d396daa8b845b501cdf56d505141bb461b21ebf2ffe64b9c4f2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZVSSH42V%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T152535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJGMEQCIGyWUKVNj8BKXiDiN3tct8AGvhJERdwisiLedtLMs3tHAiB1P2m7%2BMeSPjsypKE9paTaiqm5GVtCkqxqYBxx%2BRa%2F5CqIBAjw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMG%2BeVx5TRWZNGjM1OKtwD37Cy5HnX0AAEF0JoN%2FIBtE8nnxXSGgCHdxEmpzi9P1bQE5Vc7ounZ4ecrgRyuTSYospqf%2BAqTjdv3DZm5R51tcq8MAvDXnzw1L4eGNzc8qqHUxMXRJxIzrbCpZR6GdtvJ6H3WldPrg8MEYPLukf3w68ZXZI2vFQZvlcQ8UZ9rSVYjYIrNZSurcJwzeDb3XPPpQo1pFpsfO83RrKJ6p5GqWt%2B%2FXNJk8UCBkLDh1Ya20DAJV2anfuEaXb%2BMLolVFpDwEXqfZcOxusxytQtHygZLUVar4yZw25rkhlVc1aTb4vmfI7cIAh%2BwUElChRMns5yMh2UZocDhFhS7quruX4dY4juiNrTyPKZxw7%2BcIVaZFr1SPnRm3Mh15metokWjBpiNjWKBAeogTQ61So2jPkcxLZ4P6ysEC27QzUe9xsSQyxGFdYpp6m2ZYE57IjnNGsFGm12zGLl%2B0zXxnxJ5nqEgObUAn6%2B7mDvxqPC%2BIwDNzb05so2aw4GtwAXsTH38f8%2FYIVbB%2BnKvTvL0pvrf868bEgc92VurxzlekcLVldTwJc3MJ2bLsirh480ZBCfkelqcDKjOvX4Ul2e6qK2n4tFzIMNKe3pm5QL1ZfAgd7ML1ebI85d2XbdmuOBbX4wxK2OzwY6pgEkY%2B7n5p1rM9J0XTRGHe4hySLH1JQ0EgKGrsPFR8afbV8KP7mFkb3DE4jJwMwsHSb7EIs9weuNZ4LlrgaoS8JyZCQfhuhWikwBOQuqY5dBqLBUYMdoIntGcBxGUECQWR7s7LnHceaozfDU3qDuTBEe8zRgEyCUyvIkgxcrfFLryMaxbXBF8GWLi%2B%2BvGYEvDud0Kj%2FKfHVjJCrVTlrugEiwEd%2BuTU5v&X-Amz-Signature=c8b1b7059ab2d396daa8b845b501cdf56d505141bb461b21ebf2ffe64b9c4f2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXWVQIO4%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T152535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJGMEQCIBkfvIYH6L81Khbr8jVBzvcx%2BumjEliAFOtfbyCcsUebAiATIYd0EWLUyR%2B8MiNoKufZ3C1VTFTe4bOc7mZn3w%2B8yCqIBAjw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMdetGtfwKbcTcbDq%2FKtwD1QwzHdpVQioZv8etNfx4AJFHzc2lkmQaMkhe5C7FlGCrkFv29ZhmzPzU8JLOtz4PmZ8Iixe0%2BvthrFyvm09gJoeuMInWcAmqDwUT%2BmW4faqdMz09nrbK5PaAxvOL0oYOR7Hg4Qv34%2Fznr2fWKl7%2F3jb1X4%2Feiogx7CAIFKSHOOkkS4jgE1QJY6jVROc6kG7au2UEqgGM59fv%2BEwf940%2B6KZxHI5yxkFlOC2%2FEL%2F61v6DevtZzITyvLJvMbyd4pR2JMHnTew7vTTEII2s5eXn7iKuA5WrfefTzoMxImOWL032rmAAvJLmYe3wxnWEtae8Fw6%2FDodtk0HA%2B7dtiai0jEWLjPhU6HR9N%2B1YR46rHl0fBUHqeAYuSFg4qWp0lcHA%2FBp4Cef97ir3u9kUczWMYpLF41oZgO6FyT1%2BatOdC4TuDaEu69Fz2T6bC3xYF6tQqg7L%2BnF%2FNjg8TKBg5HHZkkaW7nyBo75%2F7hfOaqDt5P%2B1kllplj43816duZdeW7mhcB0yiu7mMlZOmHbMKSl%2BTRDmMXpuRCV4whG1SArlrN6zoTByCVLrtkcjzjs4GUoFi85fd1wr2FYf0NAIrixvkP0Yt92Kc16jnhoewwyIIQ%2BZsuL%2BZMvMwVUBPpowhq%2BOzwY6pgFS7Rw5ZsJGdZjEqf9V%2Fwh9DiiSjYlQlQjeCVoGpHAtbhRJve2zAJY6j1RjbEqst5EBgmTh%2FxLG0oMrAJOAB53Jy9xynXD3bD%2FGimkL2%2FnFuw6YwBs4VwxVNRKANR6soGwCgBnn7wmSWQHGg788yDlN%2BHvPHpKfNL5FFzlmpUF5ZDlqw%2BzRzE7Ozf5%2F8k%2FntjBKFxluYUDeb9lZ2VtwQo6wSSWfAYLZ&X-Amz-Signature=264f50cb8c761a2d8a709ad14a2a75c8a75713a18b9c842f5a1346d3f849d1bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2RENOI7%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T152536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIGO1R28IakQltiqhgTESDsd2YlRnJcQtN3cImSnOj8ENAiEAkXcoY%2BaapbxPnnP4pjOEX6hSmJwKVUB0pVxT%2BOnw5hAqiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKeqxfcLdIYaY8z3HSrcA3NYRc%2FbFB%2FylBzXxI9ZHer0%2FOwkTbLn0bjVpOkMeI19hFDD9GcunkrvqbGTqA5WL1VA%2Fg0EsiiWUmgQ2vUNO4QSBoYIXvudksmO9q9ZiNrUn2t1ym4zpoILtn2LoBGB8pIYF83MbfWw21t4%2BVXe%2FgpLRq%2Fld4mdDhlzVhr492rdkalgTOpUCJC5Y1VAJJX0U8fRcR9tTvF%2B8rwmDRaQb1s2YBff4gC2Fl%2FFXEt6X9hANekXz6ihAf5G8lLkyB6ksKokT6QbG6egAbjIOWvz3LtB438ecdnoV%2B65V%2FU8yBYKoq5EmoXZtbD3fHmt7LRlEsHPPEEsnladyQKqMRT6xae%2Boxlh%2F44YAfmgGagOBcFnJzIsD8mDMFqsji%2BsvH1TxElSf9RJGNPFoQeQB%2B4mRAapHGizhXbhBw4T3q0x1fGk97rw2%2F7ejwB0hXbv0JYyfViWCUTtHsbKTidsdZEH7SY2l8xBB%2FkpM9D6oub6yRvvkO5UYhQVV6jVFNqFpeso8oR2S%2BhmZNYM%2BwSkodEvQP1ZhcQhNz9R3S7w6l%2FbMWW%2BMDS4IGsrZyxL%2BTfIA7QQe%2BHmqOneF5F%2BhWjb483p9n1nBNCXvN4pWCFp71ySQILLrAhC76KErXJkvs0PMIKtjs8GOqUB7Bx5ASaw%2BnyhGqMhbU4JQ1k2HakYrHBMm30u0N0oW%2Bz7s52actFOWJx9XHKwpqasNNCJyIrMxKTLTbEeVTXBDzVUgLsWlT9Up8vq4FwAYsnSq6eGSettIIsFE%2BT5dZwsBs6ZgVJ9pwcKKUgpfQDxLYIbFzitgjOJjlgj7aomdNdE7DQ3mHsh%2BigSGygBHG0CXJB2Z653F7sNdIm92E4uxeSbifh9&X-Amz-Signature=650c6dd651a2d5240b215763704a2247a18ba04dc412f8c1c8460de8afabea08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2RENOI7%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T152536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIGO1R28IakQltiqhgTESDsd2YlRnJcQtN3cImSnOj8ENAiEAkXcoY%2BaapbxPnnP4pjOEX6hSmJwKVUB0pVxT%2BOnw5hAqiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKeqxfcLdIYaY8z3HSrcA3NYRc%2FbFB%2FylBzXxI9ZHer0%2FOwkTbLn0bjVpOkMeI19hFDD9GcunkrvqbGTqA5WL1VA%2Fg0EsiiWUmgQ2vUNO4QSBoYIXvudksmO9q9ZiNrUn2t1ym4zpoILtn2LoBGB8pIYF83MbfWw21t4%2BVXe%2FgpLRq%2Fld4mdDhlzVhr492rdkalgTOpUCJC5Y1VAJJX0U8fRcR9tTvF%2B8rwmDRaQb1s2YBff4gC2Fl%2FFXEt6X9hANekXz6ihAf5G8lLkyB6ksKokT6QbG6egAbjIOWvz3LtB438ecdnoV%2B65V%2FU8yBYKoq5EmoXZtbD3fHmt7LRlEsHPPEEsnladyQKqMRT6xae%2Boxlh%2F44YAfmgGagOBcFnJzIsD8mDMFqsji%2BsvH1TxElSf9RJGNPFoQeQB%2B4mRAapHGizhXbhBw4T3q0x1fGk97rw2%2F7ejwB0hXbv0JYyfViWCUTtHsbKTidsdZEH7SY2l8xBB%2FkpM9D6oub6yRvvkO5UYhQVV6jVFNqFpeso8oR2S%2BhmZNYM%2BwSkodEvQP1ZhcQhNz9R3S7w6l%2FbMWW%2BMDS4IGsrZyxL%2BTfIA7QQe%2BHmqOneF5F%2BhWjb483p9n1nBNCXvN4pWCFp71ySQILLrAhC76KErXJkvs0PMIKtjs8GOqUB7Bx5ASaw%2BnyhGqMhbU4JQ1k2HakYrHBMm30u0N0oW%2Bz7s52actFOWJx9XHKwpqasNNCJyIrMxKTLTbEeVTXBDzVUgLsWlT9Up8vq4FwAYsnSq6eGSettIIsFE%2BT5dZwsBs6ZgVJ9pwcKKUgpfQDxLYIbFzitgjOJjlgj7aomdNdE7DQ3mHsh%2BigSGygBHG0CXJB2Z653F7sNdIm92E4uxeSbifh9&X-Amz-Signature=89e65140c5e8380388255718eb63e9b26307bec2afaf225482cc680e37b6d53c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2D5LJVM%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T152536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIQC49yu7tC6%2FRfWO%2BeYG76KmoMt5%2BlUVpcYkpmA5w38XkwIgUJDeo6dTqWfxpbLGwSK23pyrXJf4g1%2BcxzKfP7TfLbwqiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOTppr%2FkKhyw6otxyircA%2BmMkL%2FDVHVqoEc7prPd4lGIKLIZ7YtQ%2BuWeqfgAI5JlAVECSK9VL3tFPUFH6j4EIFURGGWqkuHBB4mcU1wM22zGlfl3XhWa6k0hjZWiYR8djn5noWGVVuBh%2BTKuzKR%2Bg1GXWHmtejbOi59g9y6UZUdwpnvWZmvBkvuoYRBoeMlb7jlbyhZmC0QNquvAbJCObbTooERMzT0MnWh2tY7vu4ah%2FtQ9fRlxsJZrSkj0KALpN2a4wHVQo1ZlV%2FSBnhRkraniOqOn4PthWMQwHE6sGQrv5t2On7YHRQs%2F%2Bc11LiGDmzfeVlE0GBoMOynFeOKk14uD6LC%2FCaTQ5Sfp4bhkSA9GG9MpEgcVFjbF5m%2F%2BALiheR3vNYX1ykqFs5lilDCCebhGJ2UAQ7svUGPOn84AOwtKdhW2aa2YJxEfwWdpoE7j%2Fhp%2B58DGIJ8SE5gTikU%2BS9o4yvKyXT0rsqfiZmTg%2BE4C%2FNeSMgXrXDRodNBZ1l7igIpYH3aCO1jDQmBs5z2aFnCnjlNwAyhQgq%2BEutRhEPNDQ2rYAFuOnpG81gclRWVbDHEF7HYV80LTrOIFryNwQPNqhgceWjogEVbauPq3ZirNris5%2FKaacehtxrITF5XYcXdQRmT866SozK%2F1MIavjs8GOqUBqmvruf2NRRR1PQveIWgXW96tyaj82XjiWA4MrTHecnOV47DVjr0OMgD4dHGBtgEOB506ixg8j3uCUn%2F%2BXF6w7AZo6c1AW4JIHCvZ2Ek4TnPv8Z2u5BdAhyxKHdXhzi3qTvNHWWDSrNv4zIov%2F56iyW1DBz82Y3%2FBVMMDk0J8q3QdLhXnNIm1NuY369tNPYrSKBEZmAvdsVPRS%2BJyGWECJUk2lvbA&X-Amz-Signature=6d7c73da0dcd575c89cc139dfe49d178f4abecacdc783ee522051b8d62b6a9b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOLGMHUB%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T152536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJIMEYCIQCBBKquWWQuoU7%2BNkc%2B4J25zcdvzRXDmaCQEIM5ygkBKQIhAPtycrsMtTd9%2FnDhFfCO72mwEKiahAhRwt4SBAVQavDkKogECPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw5FBbp8bn%2FPTy58Ysq3APTdOAeQnTJshT0xZPPpycHp9BoiLtcaMAkjqJbcNJuwiV53FNkksLJqok5Wg5LhstXvSjMC2vagxEhwWOuYkk2385eIdzllSO7oVx9vp3C8SV7JRa0GyVIorI%2FneQZM%2B%2BNtt%2BsVkyoAqlkISNpv9QN302Byrz2DRU8lOhhlrFepDFiBhMBktlgIJkoeBXlpNChaytEMvt8dQZ5rH0I0ozSpYYlnd%2BngZQ8IJmzf%2BbmzVnUCvJ91R%2BXdYwgsYxdBARlwaKukhaUiUcx%2F2x81jeXziQK1iyiIFyhHXhgrsQoEWz7nV7OrEFRVaTBU8xXLhIZfVxmMt%2Fb6p5ZwYI78crR4QftaMyBiJMNoUqHERkv5CFW6WCSnkMUAMw9aCGxW9k9Z4pzZDR4SyNFnwLz5aYyiiNATwwkuy%2FGXzPd3jUl2cso0%2B2nNJW6PQ8Yb9Jccz6ykIO6InmanAmBIoj8ppU63LhCjflKYWwF%2BKmO0636KC6ibHlbM9m%2Fg8y4y7BFlnDvgPxrQlqTJbvolfeyzYHH6WA9GK95tDzpW%2FHOTPn1eac3TKiw6whqB0%2FBF58%2FL77yAWvdZgxOiBKMD6D1O0pnOA0j4jNVrHdpM9dj8GBi%2FBeMCqwrwt%2F6BTy6vjCVrY7PBjqkASO2kbfGdeAB9xDj1hUSO0wXAacjvfHU4KAHKwUlccTDNLiNdRjzbUA%2Ba%2BEyGP0UH5Xv4dQVUDkquYACfwemQ0sLXjC7wnUPMOau3V%2BU4p23A3VpCDpNr53lTNc3lRdgqzAysI4hCy64GlQObxkZjQhrMWn0vFNJiXR0VSrFqCI1sFV%2FxCs%2B1caM7apO7pbhuSnBLnQL%2BZIEzW5kQQhn42G6emBK&X-Amz-Signature=0d242b4c3b05065a8ab674ee1e1a8447160d75f0d14d28b7395f2e0db42ba620&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIC6VLY7%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T152537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJIMEYCIQCSG9fA1P%2BW%2FvLkUu3WPWEVqUe%2FQK%2BKggiXV%2BPR7SgLrAIhAOuzJJx0%2B5iGmCqFJx1evZGzfcYi6BZ%2FM5UKfU2hVpDPKogECPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyPPhE83Hdotn0p%2Bmwq3AOsEkkWtLSB1soFSG3XG8ovvz1fgD4Rurc67bMAZ1JFpcFG0Hb1g4nmpdlhwsnUq6sp5XZDyU%2BSRi0kqjnRxDijkHsgPo%2FD9hWCzr7KuMdK%2Fwlt%2FuXvSNfRX2ScuLnwTfWLk5CpPgJz%2FvdVsG9bHqi2I%2B51gXlErh1VbOuESv8K0LpR9NkukBR3hSoLZ7xaHF4bD1PFANlObSjTSdpRuQPQH%2Bi5ZskI0uf7a8ThHr73PJFpV2BqVua7Mqv8ifAilgyosTIQDClmDbNt%2BRzKOJsP0QQScosfYFzW5LCaFooptU0xy7UMPjVji0%2BG0xuarw0x8sd6uAlrG4HQoES7xU%2BEbB3lweu%2B976rgNHhp0Tyrpn7w%2Bs%2FXGvx%2FGZ7NWI048nhvClbk5iklWopsoorRIpRis3uXHC18CbI0JJnj2BC8PwB%2FT79YQbEzzmD2IcnQOuaZxTpCRmxgTomWDjaxQb2T3V2rCayGImk1qb%2F2yvPKF%2BNAV6kA7EZ%2BoRlQIZy04jJuBHT9lvT0pK8pS4BfUKQFL4zHDbHCwI1zJmjDnIFEIl2KplutAEgwNBNx7ZmbaI3cL4XrKrONBZCe6LM%2F6vnHiswOxxRnIspHhI7VX0fq8cQ6TtEV1Jh7PQqmTCwrY7PBjqkAULKV5PyRjX44%2F62fzGc7yKrgltYRKQOiEePr77tJ0sBQ3EkumFsP1yiFjlWCdFWi0qZoDf%2B7fcxquPGStl0y2tu7uOwrd3N8wjM%2BKLzVKknzcp3rWqE6vE12J8DM8z%2F1SUqqYkozIoWHMfpzx%2BKb0N1p0BPEdO%2F0dmd%2Fiwa35KukuIZw42UyDYGgW02DF2M1nXxMl6NJWVtiNvjRtsZ96CqmAr8&X-Amz-Signature=bc115034151d2a22941574dad4743f8296367f02e1df120b9421b5d77e14d779&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FRNXLNI%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T152538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIQDH947NcXDHRgLsMKj7JCGLUN%2BLAMIuLThi2LE%2BO5ZMjgIgfr2yrYWzybgW9%2FgIjEI5Jub9f2gIZ8hIYjcL360berkqiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEh36ewIFxHO5JfUqCrcA2LGsxVZ4DPEmFxEzH9SPshexu6%2F81BHV%2B7iqcxDhQHeih%2FksZMW3Lv0aLuQHzjHDIYzWnraEzQ3IIQ1SFAr%2BII5h4wk0bs%2F1qwyk7jP%2Bd8mH5Sk1rn5WVdq2S7sY%2B1oAIy9aKwkxSA9iU3PPMs4SC1w1iIX0aLQuJPdhLglUXcCCe38zhKxn7lZ77o93zDJgWhUQo1rJ2j%2Fq2SowptVIhemsQ4jVjaLZZ3mofStINCybC9gIMidP8y7sRkwm8Ro6YZMpTzMkCSPlx5tuGzS3pRL8tmMPhJJsdsr35KlLNN%2FRCnsrIrrQbqbBqtzRwosJMFAMuFK7FV%2FBQfGw2geeeAql2qU%2BvmcazHgTfdIUW%2BV7IBxkmT6ZR5Qr7nkHn%2Bu%2FwC48fMQZEw9sR5Ah5Njx7k1z3Xnyr8G0EKlL7PFuiuvaYmWCwXTFXgTHFlCfwBHB0v77mhl1XQdyU18K8K%2FX9YMr8tEKHghDyc70QMCg0myP1ntFBD9XfqBUclPN6L6zCMyHBxQlVxOR8Vj7PkWmBJU9TEOuSQFBcYVezpkGcQkWuXhPteiE6ZRLts8jSxF5%2BahU5VkBl5VUeWhK4TxtKoQJSunjutDAgop3Nd7zqPp1Etlk%2FiTovqKLPmpMIytjs8GOqUBeXXAAAPVGlbzVxehbDd%2F%2FGiuDR%2F%2FgTImNjmt1vDWVk5q9TULyPvuTxJoxQLMr8cSof6KHIt8w6ZxHGcXFaDMaVTdejckVcPyYkSwkms%2BcHAnhvYZyIlLY76ZwolpVEuR4ECdENNTNV5r3IpwzRXVPyvQll46hJQp3v74cGVZL7nfL9h8FqIXn6zbPU1SJ6SHi%2FU2UkHee1t1jcEiM%2B1pe4mRTU54&X-Amz-Signature=0a4c1d8f47c22a93457f9de77db7566e3575ae74a1a7a67dda1a066afed21135&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FRNXLNI%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T152538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIQDH947NcXDHRgLsMKj7JCGLUN%2BLAMIuLThi2LE%2BO5ZMjgIgfr2yrYWzybgW9%2FgIjEI5Jub9f2gIZ8hIYjcL360berkqiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEh36ewIFxHO5JfUqCrcA2LGsxVZ4DPEmFxEzH9SPshexu6%2F81BHV%2B7iqcxDhQHeih%2FksZMW3Lv0aLuQHzjHDIYzWnraEzQ3IIQ1SFAr%2BII5h4wk0bs%2F1qwyk7jP%2Bd8mH5Sk1rn5WVdq2S7sY%2B1oAIy9aKwkxSA9iU3PPMs4SC1w1iIX0aLQuJPdhLglUXcCCe38zhKxn7lZ77o93zDJgWhUQo1rJ2j%2Fq2SowptVIhemsQ4jVjaLZZ3mofStINCybC9gIMidP8y7sRkwm8Ro6YZMpTzMkCSPlx5tuGzS3pRL8tmMPhJJsdsr35KlLNN%2FRCnsrIrrQbqbBqtzRwosJMFAMuFK7FV%2FBQfGw2geeeAql2qU%2BvmcazHgTfdIUW%2BV7IBxkmT6ZR5Qr7nkHn%2Bu%2FwC48fMQZEw9sR5Ah5Njx7k1z3Xnyr8G0EKlL7PFuiuvaYmWCwXTFXgTHFlCfwBHB0v77mhl1XQdyU18K8K%2FX9YMr8tEKHghDyc70QMCg0myP1ntFBD9XfqBUclPN6L6zCMyHBxQlVxOR8Vj7PkWmBJU9TEOuSQFBcYVezpkGcQkWuXhPteiE6ZRLts8jSxF5%2BahU5VkBl5VUeWhK4TxtKoQJSunjutDAgop3Nd7zqPp1Etlk%2FiTovqKLPmpMIytjs8GOqUBeXXAAAPVGlbzVxehbDd%2F%2FGiuDR%2F%2FgTImNjmt1vDWVk5q9TULyPvuTxJoxQLMr8cSof6KHIt8w6ZxHGcXFaDMaVTdejckVcPyYkSwkms%2BcHAnhvYZyIlLY76ZwolpVEuR4ECdENNTNV5r3IpwzRXVPyvQll46hJQp3v74cGVZL7nfL9h8FqIXn6zbPU1SJ6SHi%2FU2UkHee1t1jcEiM%2B1pe4mRTU54&X-Amz-Signature=b32703e1660d7187f5a927647abf8247f79d1309421f752a84855c8e2006caf6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FXHYRHQ%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T152534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJGMEQCID%2FayCVwp8Cd%2FRMAJYdnoD9I9CsoryEZo4k%2Bzp26Z05vAiAq7I95FPmgg4PddvcUfDpejGwEp1ADxPekj1nLsYyMHyqIBAjw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLrlAeY6tvx%2Forc3fKtwDWMgToPkXdh6YWWhRNOJQRVBxN1Ten%2FNIKfRNSie%2FlaX7mnOck8t0yqMcyxk2MJsS%2BGkHcUNwlV%2Bc1DmmW0l%2FGxhj62Ao44uf6b0RfNunm6IapEvR8x29gK0Amfhf7XjNpMBlskOgEtICQWlZEFSeot9EcyZgv4J2i10L8CUJ9DNm%2FgroHjVFzlguTqXbN61pVfMagkSm%2BjLR%2F3WhMUbOzpnmlLvriyjS7ESKnB%2BHhER%2B6%2FLER7oFPZxpDiETGbQWtza66iECKy4f%2F%2F%2FCCP%2BDHSwg%2FadQahHJhvQXr7K%2F8fvkzCZVWr8Q5hTapyRHQIml1fDJyy3onD0Q2%2B09ezyyVQrv4aNmfE74f6t63ohomRSo9EDXt1C04kmFZ8h7A7DXyyTJg5ZlUrNXWgPQz%2B1MZtg83NntsjuU4BUgVgaScDXglB6Ih16sqP0IAx%2FfUEH7p6Qp8mKDqPQ0%2Fbz68U1xGw%2B%2FcyDYGXFihZ6MFe9mxGwpVh5jEEMa9SLAboiRc02jn8W2a9VE45qzqhv%2F8GofVRAkfZolcxvOXGtWV6SYQy0o62rgxn5uLeEeJ5x4Db4LRsbiLXs1prpP3TzuXbEhThgRSw1AdRTGjJB9kag14uPZk3khTY6axkl6haow4ayOzwY6pgGG1KPcrV%2FxWkoY%2B01kdA2nWrfGKP3dY3C%2BXQYunpjI%2FbnvRDP6qUx3z9RVeb9QrOa9VKnkeIHq%2BdXTeeYumvDQhnHKDXR4cnAYxDDG%2BiQJf%2FwZpljOf4kn9X93%2BLgUYdfgZOoO81nkOlZNkCjJghgn%2BITq4L3AN36WnC446p2zj%2FrKbtANUOeFJAAIuZqUg726lmyluA6BxfGUuC%2FZMh9gM1Fnl9R8&X-Amz-Signature=8781fd5f817f0ae3e957191b1fc3e61603a0b4ca3b84b63790207c508da3f10b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCGQXWYQ%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T152539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJGMEQCIGU6NmuObUXwim8TdkNDEjaq3dHoTex4eJPoxtjBmPA9AiByca%2B39sCHmbMiVg%2F6VJcwYV9SMBis1wtejcutwZ4fbSqIBAjw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMohhlvyCZHrPKoFYHKtwD9FHwgQ3291p2mvS%2F%2Ff7TcDwV%2FnMAIK2xytogulEn%2FiGhIfivYKTkAoj168N5fBcyaxUaicpU4iieizMbtMgx9AK0qALVk9wBzZoTlS7ixbGdigfaZNmxMN%2FuENpV5uxxYYX%2BBQLtQjN4cIex69EnQT13HkFrxfk%2BX3lvbhbB8yHsJk8N8Atx39qZ7ioEsjEEEostW7LwrZ7DPdn1ZMAcCWFOUkU58wIGSEVKEhGG3p7sklrk0rqlm%2BIvsjn1DbK3SI3dXMEwt95wkmvl6w9L%2FEX333FW0qhfZWyZnUF0uDZPMVQfmy1lhhElbnFSW8t03xnUx%2BoNHquduMDILulasrBW4KozWY6GYPMeOw93iwl16a2ean6yWF5JKSMJG5%2F2Z4AawiObbNPrlDNxnLb3xR26O0nkjw%2FZBNi7liTRYBiQqvumJ2TkqioAqt9rv%2FMRGfPmdxz6DRWEfp3lo%2BmjQFf3wX7hh3eoxxy6LXaAC2hmFgdWsVCXM1Ukz%2Bwn7Prq4vbD8OSmravNc7aFtiL9AlTC9BOaEQK7XI40lU7uNJThxm64ysdYPeC2fKQXB4kG1S1y1xdqnKIBStbEgJ%2BHbTN42oNfRVnDtYs1Q%2BA3OfOkf2i3c6VpgdyS5bcwz6%2BOzwY6pgFnMjbZ7%2B0eCz6AUIUsqprhvPpXMGpyBJVJOhlH7BosdhTvSkED5ha9A6bsEbBKMD%2F6sSzLhQ11ucSGXRvLqDI0qkHg%2FwQ0E1UmOykRcbX3F8H5N4DQh%2BkDnO4PGd%2FrLjGsQCHKMbmnhz3OH9yvLEgQBaXggcR%2BeOzn8ythcz3cBoH5AR8x4h2uYo4mYKd%2F58x1p6Mj%2Bam83tCjPsWo4X0FL1E%2F9cb1&X-Amz-Signature=6713f4a7539c45576432bacc613a84533cc14ab343d3af0b47638c06bdc18327&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCGQXWYQ%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T152539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJGMEQCIGU6NmuObUXwim8TdkNDEjaq3dHoTex4eJPoxtjBmPA9AiByca%2B39sCHmbMiVg%2F6VJcwYV9SMBis1wtejcutwZ4fbSqIBAjw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMohhlvyCZHrPKoFYHKtwD9FHwgQ3291p2mvS%2F%2Ff7TcDwV%2FnMAIK2xytogulEn%2FiGhIfivYKTkAoj168N5fBcyaxUaicpU4iieizMbtMgx9AK0qALVk9wBzZoTlS7ixbGdigfaZNmxMN%2FuENpV5uxxYYX%2BBQLtQjN4cIex69EnQT13HkFrxfk%2BX3lvbhbB8yHsJk8N8Atx39qZ7ioEsjEEEostW7LwrZ7DPdn1ZMAcCWFOUkU58wIGSEVKEhGG3p7sklrk0rqlm%2BIvsjn1DbK3SI3dXMEwt95wkmvl6w9L%2FEX333FW0qhfZWyZnUF0uDZPMVQfmy1lhhElbnFSW8t03xnUx%2BoNHquduMDILulasrBW4KozWY6GYPMeOw93iwl16a2ean6yWF5JKSMJG5%2F2Z4AawiObbNPrlDNxnLb3xR26O0nkjw%2FZBNi7liTRYBiQqvumJ2TkqioAqt9rv%2FMRGfPmdxz6DRWEfp3lo%2BmjQFf3wX7hh3eoxxy6LXaAC2hmFgdWsVCXM1Ukz%2Bwn7Prq4vbD8OSmravNc7aFtiL9AlTC9BOaEQK7XI40lU7uNJThxm64ysdYPeC2fKQXB4kG1S1y1xdqnKIBStbEgJ%2BHbTN42oNfRVnDtYs1Q%2BA3OfOkf2i3c6VpgdyS5bcwz6%2BOzwY6pgFnMjbZ7%2B0eCz6AUIUsqprhvPpXMGpyBJVJOhlH7BosdhTvSkED5ha9A6bsEbBKMD%2F6sSzLhQ11ucSGXRvLqDI0qkHg%2FwQ0E1UmOykRcbX3F8H5N4DQh%2BkDnO4PGd%2FrLjGsQCHKMbmnhz3OH9yvLEgQBaXggcR%2BeOzn8ythcz3cBoH5AR8x4h2uYo4mYKd%2F58x1p6Mj%2Bam83tCjPsWo4X0FL1E%2F9cb1&X-Amz-Signature=6713f4a7539c45576432bacc613a84533cc14ab343d3af0b47638c06bdc18327&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQT5GATO%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T152539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCID%2FisMquWvZsS6bucr9WAJHHHB8j0RifweWNzTo8VVhYAiEA6GjYG0rmg9JV0bX3b79C0QfLlpHige9ffio5mR2KgtgqiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGFJ6qcUAKv4LLruTircA5Ut4Fwz2RpwcO%2FZeymJseoi58F6VdkBu8tWXDUUJCoyFeusuEVXmsuVB9YlXHLH0ZSkghumfqlCOLbtPdtWBy%2Fz%2FW2Sq9YUXgrr26qUcSsE%2FmTmzUSHZ7uOFJqnfZwKcPZO3qs%2FhVW5SXbXvQDkPlLj6U%2BoopUc1xKdr0WcIc2bj2Zr0YMRG05kcdD41fgqZXAz4y9TISt1FR8GXPlbLRYcIvU7Rr4xcXbjYyl2GgF%2FLkJ%2FRlxFJ%2FV09Qz1tnTFMFpXWU5qaIRu8GhTYfPQ5cgIcjwPEXTi33%2BC%2Bw3YcBbwvmBRgZ8YHS6GUIqXSeMY%2F7uJKj%2F%2BZ%2FjPYRc12VcF7ARMi4vPtJ7cjUDf6ZgKNJ9NnSdclUeNLEa%2FK%2FKkX36TGiBgq9UxeuJ5D2MxnlWVU4VGibSk%2BhooHlif%2F8gDEw0rB61WgZQSDBbuLOwxqjE1X3DrGrFVN20y5CXbL%2FQsZdYvO70VHgMOKdFx%2FuALs%2BlCuNe94mhoa%2FXMR1v0yBagZW2%2B1%2FseX%2BNn4YpJLF6TfyDth9aXmG6cnN4D%2BO5y1o7xyC%2BnsLb3G6gRlAA6zhhwuWXFCWUOlIGinWiTS8HGjLSnC22DOJIVjSrNfWdmDEeuQFxihOUuVsrkkg1WMLStjs8GOqUBFyq7dXrLbujRbR1mLJVUSsgtHNgEPCw%2FOz2R4zAt%2F7%2Bo2AWFQ9lZ7aOQoDgMHPlpkp3OZeBc1%2Br07LszVXoxBMQcAbor2JfIOqf51xVNl4annQqtTcyOEPI3ZpfFEF%2FQ1npmxqqVpdpuVOENIHX6QfsOMpnhx0dHxmJtajJ7TxLFQLXOoqXRjLl3AcKQ3Fcn%2FTxFfWGfzUBNIEipieiVReIPtSXy&X-Amz-Signature=2ecacf7138a1bcf9aac95231158880441d27c49ba5717ba2adfd7f75c7e9bf29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

