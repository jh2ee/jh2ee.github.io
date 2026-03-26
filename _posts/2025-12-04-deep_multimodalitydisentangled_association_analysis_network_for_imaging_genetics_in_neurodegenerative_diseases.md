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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMMCZT5F%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T221412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCIQDJvVK75MEfPNDUYViUqYL5iSyAHFlEI5xW4uwfudEl4gIgJA3tBMKTYfAB%2FXzGhwj5JD667zABlpsgrD6TCG0UquAqiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA4NQs9pKO2TXpr7MyrcA2x0ZP%2FZ5kOhcRaY2pNz%2BE5nOi5o8Z8%2FEW4UU5QZyrrYK6%2BFjtl%2FVXnXJ76MLYn%2F8X%2F6NHzZDIuQFR4vKhxkMcZhmMl%2FJU9fOkA5ynbdVTKwyuMs6%2BxJfXb%2BPLFT%2BS0b6vgLJGaGgvl2P27hgxu6xI9RvczTEhSJdJRBdDQPaDRcGJMDHZJCAy2lVibP59YISSR8MSgC6cLxWcN1xo5hTn4U%2FTocxs2hjnE95HoQbgApKRKBltCD7tDrz9twk21KvI8BrMoiQxc925E1CtLBYHs1N%2B0FnSWnTh9Ve4UyXiHczf3jpPL9zoct27f3BaLdQkjkW75XmOs8QZlN6ZMyA1hqteWGd9dF%2BvdaNJ0tmPjTHYww3v3bzOHKHA71eW4xkKcSA%2FEKkTdWVkg7xY2BGA%2FdL50TaREOWgng%2BwVZUwiw0v5fpvW3M1v3ckFBSFrBrHXMpu0Cx9h7NzV9lTQrzzQkGxrEU%2F6cSyMzmGkuXOYsYjoKTW1LKWJYf9DTD4vrsdZAMCUJ564dDYyW3t5tCspcjYIhA%2BNPXs%2FsrJ%2BXwiPbpc0PLOs%2Bl5j1RDg1tDwtAC4jUntVhkwwyR%2FHOOkT0Xh1t4VTwzBqU%2BHfgQhf19SNHI7qrh4BVtOtdFPDMJnTls4GOqUBq%2B%2BdotKw4UlL%2BPDmE9DSY74DhfUtRUyDewwJo2bmTdBM3%2FDbYzBNYuEOayoEDFl1MfDROBX3pg2MR3ziY7qHZpu3WaryJa2HJ%2FWjR27ilj5LbpePP%2BDU%2FyfQIlEnL06VtRAViTlOA6BYHJuEzi%2BFaLlGicsGsz2ZDloS07t5Zbr8jS%2BfjF9tfshhsOzCzllg%2Bh4ijOf0SiCbXElAXkxVkGV1PQFX&X-Amz-Signature=2a480264acf3f545968f0cc36817286deb5fe6d297d2044423aa407f3e7b4a5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMMCZT5F%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T221412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCIQDJvVK75MEfPNDUYViUqYL5iSyAHFlEI5xW4uwfudEl4gIgJA3tBMKTYfAB%2FXzGhwj5JD667zABlpsgrD6TCG0UquAqiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA4NQs9pKO2TXpr7MyrcA2x0ZP%2FZ5kOhcRaY2pNz%2BE5nOi5o8Z8%2FEW4UU5QZyrrYK6%2BFjtl%2FVXnXJ76MLYn%2F8X%2F6NHzZDIuQFR4vKhxkMcZhmMl%2FJU9fOkA5ynbdVTKwyuMs6%2BxJfXb%2BPLFT%2BS0b6vgLJGaGgvl2P27hgxu6xI9RvczTEhSJdJRBdDQPaDRcGJMDHZJCAy2lVibP59YISSR8MSgC6cLxWcN1xo5hTn4U%2FTocxs2hjnE95HoQbgApKRKBltCD7tDrz9twk21KvI8BrMoiQxc925E1CtLBYHs1N%2B0FnSWnTh9Ve4UyXiHczf3jpPL9zoct27f3BaLdQkjkW75XmOs8QZlN6ZMyA1hqteWGd9dF%2BvdaNJ0tmPjTHYww3v3bzOHKHA71eW4xkKcSA%2FEKkTdWVkg7xY2BGA%2FdL50TaREOWgng%2BwVZUwiw0v5fpvW3M1v3ckFBSFrBrHXMpu0Cx9h7NzV9lTQrzzQkGxrEU%2F6cSyMzmGkuXOYsYjoKTW1LKWJYf9DTD4vrsdZAMCUJ564dDYyW3t5tCspcjYIhA%2BNPXs%2FsrJ%2BXwiPbpc0PLOs%2Bl5j1RDg1tDwtAC4jUntVhkwwyR%2FHOOkT0Xh1t4VTwzBqU%2BHfgQhf19SNHI7qrh4BVtOtdFPDMJnTls4GOqUBq%2B%2BdotKw4UlL%2BPDmE9DSY74DhfUtRUyDewwJo2bmTdBM3%2FDbYzBNYuEOayoEDFl1MfDROBX3pg2MR3ziY7qHZpu3WaryJa2HJ%2FWjR27ilj5LbpePP%2BDU%2FyfQIlEnL06VtRAViTlOA6BYHJuEzi%2BFaLlGicsGsz2ZDloS07t5Zbr8jS%2BfjF9tfshhsOzCzllg%2Bh4ijOf0SiCbXElAXkxVkGV1PQFX&X-Amz-Signature=2a480264acf3f545968f0cc36817286deb5fe6d297d2044423aa407f3e7b4a5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BOO3RO6%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T221412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQDYS%2BLKz2jU7LJffmz5AtVWEifFTP%2BizTUuGkOOf3%2FNngIhAKDCuyIdXHkqIuLjC2V%2FvjwYV%2Fy6J2NW%2B54uJ3brR%2Fg1KogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzajdazfiJHcfKBkpkq3ANb8rsmufrM%2BTIkejzGF2DpD7i%2Bb6B7tEbGpXW1vadej5rI6EX9Md98NEUi2MHSkTlN5pr8ZtEDwI6Ou6lshHsBizrOnx7i0S4YyyImZodf2AUrsrwjQwU0yuMsw%2FK5byvSQdJ4v1EFgzdKyoTEi%2FMtdNVnlqc6ml15DMxgpWrAhYLz0RMTkVky4lNQprn3PcFX9B5ctLQ8GMd2K66EVDVypBqK%2Bp%2BUF2iqGecop%2BnKioipNbiCv34q1%2BMu1yDmdQUca32CwocR2cr9T3vuN37Yh6mEgOP00bqiH%2Fk8X0rRnrY3pSS6%2FA7t4wFon1ANNC01u3k4TxVGu9CaEwvsV%2FnZPebP6Rt19BUJXC%2BAw72mnNfeXRDzDsPscEXyA577QJFcMX1a43%2Ff2cyJCw3M%2FK14c9%2FUfmb%2FGl3l6hW9XdHK1hsONULnDG13s2nPtQA1%2B5%2Ftil5Nr4Zd55%2Fkq2lXTVFHJQ0rJmZOjTRDin7k7RKdsCuSZGWtDeeordOl1cdpi4sCUDjyMYIc6zaLvBqH7oaRN7AkSDrjP4jpk618OlyfpzFxYNzTJd2aStDYtgEkwvd9BlnH%2FtISgvU3ghk5F4%2BoNZ8OCj7mdv6GB1a29ITtrVTaB2NYKnb2klfjLDCa0pbOBjqkAdGq6aM9eSp32QmQenrnR%2FBdenGP3xOIh4oYFarKqxNkDZbdTyVZugoWQeOXGWsfzRHSbxTbITxPqF65F6UKKVl08A4a0kORcD2ENWpLN0VTp0P0I0G0ZOAi2QBQD%2BOk1XNGiBDDQgH%2F5Qe7ICFMSlc27V1tJu7JSYentWf5YvRMp4bsSBnf7iU7KqV2wI2WLuf71KvQx9Kc3DlJVw8bzJkqfcHY&X-Amz-Signature=990f916eb61df5ba484754b4e207de92aba8009be42ace7adc5080fe665e0fef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPRFVKNK%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T221414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQD9RcIo%2BxK5UK5SD2%2BEc8Z5yie5Glc9ZQ6oBoa%2B7R5O2QIhAPehcKLQ8HZotl%2FBDbMBStlfVoxLWvDW1O4k3V%2FWDLdDKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzYVidsJJ4%2F622POb8q3APkyImTLAsNXW5zNZekOIa2ZiWxorbYxMKR%2B8%2F1eie5x8hX873Azr1VFaH4oJmPNU8MA3yu578MprymvjNawCpagqn8vJaskpHey2%2BR8w6DRk%2Fr5%2FcWKCrKPFnsvpZ6t%2BfvS%2BlZLneTW2AbKo9k2BTnb9rspy8JmhpT0yFr2ZenIdhKX%2FkEx525FPoo33%2FNgW9Vp%2BhhDKVxSHB7H868Wo5utzEbUtlwja3IT06TkOjVwZD8p9WG9yWZBtVhCmYLdYcwhFczq%2BXrVHn%2B8NH8cOlsfjKCGpqfiUOp506dlsso6vJu1FBHn8z2d3yZZ6o3Xb37AZCoaJ%2BdKuAwBPwiAeL8XV4DjYmNbCjM7sV5hdn8GxCChgMb4jB60zARldhfqOA%2FQPEqKikKUKGugZGUV%2FxX3%2BiokEQyFzY7lg9ODolIqpPunAnHMOhVvvZ1lPjRABcwwRx04GMjyiKpr4haXy42q61gdqgn%2BLfsKPFeHqkXIuLbQVdoR2zvXjCj1b2XUmM1LvHfkeA8cJdrApcl%2B41twkUsFkKMV2sMtayYn%2BS0ZX803ufzhTpSs7q7Q7BQmHTkIJdIp5gmgVRfEdxPyU%2FkCpfdsVVWJmloTNOrMbe0mWTPddcg9wOzeC75LzDl0pbOBjqkAef107ea%2ByNPCsogtSApXo%2FLTRob%2Bg5IveKU9qUPG4UnzE6ctvZOb4568SKo%2BgrUSgc4XPwwlYvtdI4WZHNwOteCZugv6EW1T%2F8efOhMjXnzY6A%2FObQV2ssR3BrVoEI5cJoqKW9TxaE1CtwW7%2Bsc1mjq5lHqnVu0JzM9JeIqCTzK%2F2heCkHJs4VZsyjcnXPq%2Bhp7RRt8YnKsCKC3CmnT2EGzVDVp&X-Amz-Signature=f5305e8c20494bbf6affc9f5be847d4ac049da8f591d938bb666f96165afbf21&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPRFVKNK%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T221414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQD9RcIo%2BxK5UK5SD2%2BEc8Z5yie5Glc9ZQ6oBoa%2B7R5O2QIhAPehcKLQ8HZotl%2FBDbMBStlfVoxLWvDW1O4k3V%2FWDLdDKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzYVidsJJ4%2F622POb8q3APkyImTLAsNXW5zNZekOIa2ZiWxorbYxMKR%2B8%2F1eie5x8hX873Azr1VFaH4oJmPNU8MA3yu578MprymvjNawCpagqn8vJaskpHey2%2BR8w6DRk%2Fr5%2FcWKCrKPFnsvpZ6t%2BfvS%2BlZLneTW2AbKo9k2BTnb9rspy8JmhpT0yFr2ZenIdhKX%2FkEx525FPoo33%2FNgW9Vp%2BhhDKVxSHB7H868Wo5utzEbUtlwja3IT06TkOjVwZD8p9WG9yWZBtVhCmYLdYcwhFczq%2BXrVHn%2B8NH8cOlsfjKCGpqfiUOp506dlsso6vJu1FBHn8z2d3yZZ6o3Xb37AZCoaJ%2BdKuAwBPwiAeL8XV4DjYmNbCjM7sV5hdn8GxCChgMb4jB60zARldhfqOA%2FQPEqKikKUKGugZGUV%2FxX3%2BiokEQyFzY7lg9ODolIqpPunAnHMOhVvvZ1lPjRABcwwRx04GMjyiKpr4haXy42q61gdqgn%2BLfsKPFeHqkXIuLbQVdoR2zvXjCj1b2XUmM1LvHfkeA8cJdrApcl%2B41twkUsFkKMV2sMtayYn%2BS0ZX803ufzhTpSs7q7Q7BQmHTkIJdIp5gmgVRfEdxPyU%2FkCpfdsVVWJmloTNOrMbe0mWTPddcg9wOzeC75LzDl0pbOBjqkAef107ea%2ByNPCsogtSApXo%2FLTRob%2Bg5IveKU9qUPG4UnzE6ctvZOb4568SKo%2BgrUSgc4XPwwlYvtdI4WZHNwOteCZugv6EW1T%2F8efOhMjXnzY6A%2FObQV2ssR3BrVoEI5cJoqKW9TxaE1CtwW7%2Bsc1mjq5lHqnVu0JzM9JeIqCTzK%2F2heCkHJs4VZsyjcnXPq%2Bhp7RRt8YnKsCKC3CmnT2EGzVDVp&X-Amz-Signature=8ad95af6a2030d040104bc670174e2d84b1d3d0295ec66ad29c70dbd1afec457&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4WLR4SV%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T221414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQDYPtsbIgZN%2BGsgGSgL3tg8ayhvKRiNuRDswwECSSorPAIhAJ%2F%2FxtMZfu9gbCYK%2BQw6rr3TZhykQtBMCQFL0kWAngdFKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw7UDcPFo87keWxIpUq3AOLe%2FERj66lBztrAWraW%2Fh34NAsy8Q1ZyLEV%2BLD82axk7%2BChI41dotNJEQUw8N8WX16lhDQyRJQxm8a%2F33Epak%2BJKHwzW3WHfSmT3qGE%2Bvw84C3KsTmIJ0yb2yfJOOTU477xAqyTMcz%2FBQvL5QjAzTjxoAq53o8yiNPR6iNq0rxPZkb%2FHm%2F%2BHf5PZuKSdWJM9A9YGLMUwVxnXOeWvKWa6ITmEgBNxAmjQnwURInXpmVwDkzV0B2O2pe2SU1ftUQuHlkdb8AYAgVOAcX%2F%2FvIMQBfwhppby%2BoSzxrzSsZW7izKh7zaFsFa5CkwcV7GlI0XocbP1N7VDvUVnQv24dGCMPho4FILT8knm16%2F%2FW567f%2BS97Ykl6GuA8W3CyRmlmEO4niveKOzgXzsbZLucMxq7bk3OpGuMw7XcGx02iAUysoqWDIkAQLcsMyDhV%2BCZi9cnEOvaoKowyeo79Yd4mBlM%2Bh6TbjK1zUeBZ3hzmW6TlbOuC47yxpHB8bJZILYN2yeS5722CVbBBvmdL9SZkQtt81C7U6Of%2FRZOe0pitFIp3Yrl%2BdPbTZaadUGqtWUyXw3GCWVyiXsxnJwwm75rvacA5SMWK6LwU04l3olnwNMvasCUtmPKUAV7ikc6nFjjD705bOBjqkAciXI9PIs6s5PDmKeeInSOFnWIQsfPakHotTT01wZogOdbFnDaxlVT7k9i9KxICvVtxyVJNr4jMx7OXisOT5oB5aPMmVUst3l8XMFFcmhEX3U4cm2YGfCmK9YasMiDztmger1TS5SHVcwr6yLqWVX06ABLNFZeS2HndWGu2FtgXBOBPmtkZGtkweRTD26ujHI5FdeO%2FmtHUzIp6I8Lfe77c5xNJn&X-Amz-Signature=cd510caf9f48c03318389e773da24dd222df1cbbf14da8492336c83503a3cb26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AEX23DL%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T221415Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCICzUJKiHAcS1iFQfHSRcXYdMBem7PCFxFJHeW%2BYB0oM%2BAiEA4w64eqHaLsG%2B8X0FIovtBxyDIgOgogP2pmaFd%2BuHlW4qiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKHAERMI6w0mv5fiGSrcA7X3K%2BguYI9bIAx0kaAJf8PRxBLUQ9mZz611DURZ6Nr1HVQFRWNAU7j35DLNErxrIYVKAasQ3XSmLRhhv1VwOHVSqG0TkTfRsJLueUwmEZNfZ4q273TQ%2B7D4NjdPwFdp0xBvGszd5TlQ7r0WsKQX%2FMd7WfWBRNTFDeE6wj%2FJfpzJ2znMaAzLWgGsT09HA6yD1NqtdrKgqWhxyZ%2Fd9K0cJpLdCAZllyg9v6%2B9ahgsY0gMuH933i59PwGRscKKWrSftdL25ct79tPhGbEA0BUL5tNsrasRuYFWYRAqPeTXav844a%2FDpu9kpJi2ljHn09WvpRakZ3bYdsQ4U2KxHpa0LvGGzzxtpKmLM8ir8NnP%2FJKfzxqbOuSP1qMgmkL1K%2FCAShUJUKJy0w26ug3WUOTgjvyMYoeytOgAmYcDz2ZdelWrY35ZvYRTnrLS%2FfnCM%2FM9S3KmG4i9oSLeFpBN1odhWNGE0BDiyXVUCyPddrZ1VuKYc8Enmrhepi3vIkpytuv%2F7%2B1EtsGItNxW5F3GCXtYlNFSM1SCLsKtUduG8Jhq0S%2FMCkvoLD0dT%2FaQ18lhB3jgpsGFdLOCugdbFupR7ZDuzpsNeevXc8TQUEWjFPi7abi2gC5K0NTEVIdP62w6MMjSls4GOqUBOixEaAFnWxIRQsX8XbrqatbUK0c4uZ2bZ6mgSIV5a%2BXxRk%2FrDVBkQYw8lxEfRxEihJkL9XL8D3tpmE7RSJbNigHyQ4WlOickYoBu2KeAT2rC6vJJU9fukuCpADj7j16sBrrUByO6wqZPrdaaIAmuzBGJ8UnR7UoRHS8Hxuf6Ru6UAzRApz4o73j4RN6pAAO5uQu8mcvms%2F0gAS8CbiatGpcK4K3l&X-Amz-Signature=30e893085117c218a9e57f7a8df203ed1ce3926e2b394cc7207a69572d0b799c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSY74YZA%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T221417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCIQCc%2BcLmum1Vohgy7CjRtVXehOQ15fl%2FsJKFyQ6AxzijmAIgfeu6k7u2oBx3UqXZt7Rtaw5ya2xGdzrNDi6mSkBUtd4qiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIlvG87JU4g1vJZSKSrcA6%2B%2Fr3zobC0OBhDNEy%2B8fjwHi6Ej26MCXzn19idNnYw7HB4Ew84dF8pAz0ahK35qePE1G9xTvS3Sc4oWgNrVnDaV6WZCJW0pZlXl3tc5mj6FvCt%2B%2FN%2FOFxmIz9vLEdUOqYp%2FCfoMTGUS%2FsXU4y%2FSOp35Gaf1QwBrwTkeCTri6K7w4fF1ujD0vkgzNIyhTQqwhkUKiiFQ6EFbFqsAdFjJpTVk41v4tk9rPd6QL2hPXcc9IrbpLfOxskicYy8TvB4lq77S7YE3%2Fzsz1LJwMqM8XEWnJ0b3StGjlrA3fQTP3JoL25OotWdhY%2BclHLz4nMdDgXPo63ZaFk1kEwv7bzH0oYVG6bmiWv%2BppHBMsxQfHrwmxP%2BLD8wgq%2BUGrJ%2FSxmja20l13ixTqku%2BGaCQJ6a3ntAJOodKI%2BMXbvQk%2BAn%2Be5lvCvTfgtmfKnaKAyv5w9GqJ8YhoG1ICaEbEHYzq8Wmz9uHbfm29cVp1gOj2tI0CkSY%2Fft6D6E%2FFnz%2B9cvzuDUZ%2FsKFEzV60y6MhtBwHyvHsFNzvStC3c9lwqfOjjvPQTNV7MOKS8GhqpboqLsAxkQfnCkLU4DgHGqimbzlElHyURTttiAXBOfh07uH7dk6fFwFBg%2FOyZPYXw8nziXMMIrTls4GOqUBtdf5C2A2kkp8%2B0hNkVDyLkjY4USpFBDG6X8hgSh%2F%2BCmlxPxZGem8cZcnGsKuIXyAZQeKsrNTa9hmCRHQs7vPk7daaFbmSWkMyJho9nEGVciZ52FHPSdmE5V3n5iCJhvVgJ1MeQPZ73ZSMMzdPg2HmUQLU74LaQP%2BupbioczgxJYaccftpPxkjP7nETV7LGqmOAl6Vx06A42A%2Fz0B93wTHuugA5Kp&X-Amz-Signature=8c10931c0d046b396a60f76772efd68d4f4988e86a836cc454ac5e982c592fd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDIIUQGW%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T221418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQCkaD6QREjL657FAQc3vc7eTiXKkj6HzcVg%2FdYmTmwkRwIhAK3hmpLmvLP69NNcnfOKUc%2FUNk1TnIlHcrvGnVkNR4TrKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwswoktT5s2Dr4Xhf8q3AN%2FvqRMloeWZNugGQ%2BYc%2B96fXwiC0dHOESLPA18qnayavcZlToL7IFx0dc9y9X%2BsTeHoTT8SBVaJc%2FpWP8hCU2e5IAz9gU78NViV2msOeAtmJehTHWvP3GCy6%2FezKNoE1olBbttchD6%2BlEv94FIYNnqLQCJLP%2Fgtxl6mu8IYXMI9pe6JUNtCeBI2dWr0fuOEW2T6rxAHpmLiEv%2FB%2B3ZiVmv%2F6s2hAXmCFuwmhruZzE8IfUsmKmE310x0IXFLh799dRXUGCXNoVifci%2Frf0GRMQ6UBn7NS%2BS6bS3u2vh%2Bd96t%2BP7dCiQYKQ9AFz9Q9ybawXZw4M8%2Bn5jPVNKLiEvjm1j72WZ8A9uNscyz7xx36Fwrjkgdef3%2BertG0%2Ft%2BR%2FHBENt3FMpYdQ2hzKrt51nREwTXve8FJOKLg3aYfs0RuzkQYEExrcVetizB7Q%2B4q79vZ97QPFnNujr33jZTG%2FrHykNyxtcCzob5GmASwrPlzdtk5wB8qj%2BqiEFc%2BNXLaj5n0Nsbo845XYezhQzHodLE31sWr1%2FctSC%2FNV%2FNDkTckI1WR2XsE68H1Qw47ZnZvxvbGVpQmGHrK1mejUpJtqj%2BbD12y1t6GRRT%2FTwR5Y9sUbTAKtmT%2BJErJLVCoIlHzDp05bOBjqkAVGELr8Lim12nTMNHOuu6uZM6beQCf7qcycYPyNh7ueE%2BZ3tyC2%2BzGhTd%2BITxyyvhSDcT8xPsp9SBE5bD3Yo3%2FWkDc9h%2BC1pfpjL00roUbJL%2BqoeTA4ZuG820j6rflv9Vy6jDuLUikjc2yePRdEu3f7PMvz3J%2FyO5XkJapWvIBQcV8Pcl9PncckCSIp3q%2B%2FOgfzuZaFeukmC%2FS4gdOLQvPub1fBh&X-Amz-Signature=cf3e8cabbccbb5752b2a4021866884734ea8a1b31f92603b6ed433a76d5a87b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDIIUQGW%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T221418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQCkaD6QREjL657FAQc3vc7eTiXKkj6HzcVg%2FdYmTmwkRwIhAK3hmpLmvLP69NNcnfOKUc%2FUNk1TnIlHcrvGnVkNR4TrKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwswoktT5s2Dr4Xhf8q3AN%2FvqRMloeWZNugGQ%2BYc%2B96fXwiC0dHOESLPA18qnayavcZlToL7IFx0dc9y9X%2BsTeHoTT8SBVaJc%2FpWP8hCU2e5IAz9gU78NViV2msOeAtmJehTHWvP3GCy6%2FezKNoE1olBbttchD6%2BlEv94FIYNnqLQCJLP%2Fgtxl6mu8IYXMI9pe6JUNtCeBI2dWr0fuOEW2T6rxAHpmLiEv%2FB%2B3ZiVmv%2F6s2hAXmCFuwmhruZzE8IfUsmKmE310x0IXFLh799dRXUGCXNoVifci%2Frf0GRMQ6UBn7NS%2BS6bS3u2vh%2Bd96t%2BP7dCiQYKQ9AFz9Q9ybawXZw4M8%2Bn5jPVNKLiEvjm1j72WZ8A9uNscyz7xx36Fwrjkgdef3%2BertG0%2Ft%2BR%2FHBENt3FMpYdQ2hzKrt51nREwTXve8FJOKLg3aYfs0RuzkQYEExrcVetizB7Q%2B4q79vZ97QPFnNujr33jZTG%2FrHykNyxtcCzob5GmASwrPlzdtk5wB8qj%2BqiEFc%2BNXLaj5n0Nsbo845XYezhQzHodLE31sWr1%2FctSC%2FNV%2FNDkTckI1WR2XsE68H1Qw47ZnZvxvbGVpQmGHrK1mejUpJtqj%2BbD12y1t6GRRT%2FTwR5Y9sUbTAKtmT%2BJErJLVCoIlHzDp05bOBjqkAVGELr8Lim12nTMNHOuu6uZM6beQCf7qcycYPyNh7ueE%2BZ3tyC2%2BzGhTd%2BITxyyvhSDcT8xPsp9SBE5bD3Yo3%2FWkDc9h%2BC1pfpjL00roUbJL%2BqoeTA4ZuG820j6rflv9Vy6jDuLUikjc2yePRdEu3f7PMvz3J%2FyO5XkJapWvIBQcV8Pcl9PncckCSIp3q%2B%2FOgfzuZaFeukmC%2FS4gdOLQvPub1fBh&X-Amz-Signature=eda2847e58042fb12a63f6c6faf1e3f420b82874f209ac5c6f30d0a2a7de6ed4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645RXNKFE%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T221410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQC%2F22i6maOm3mrsL6aa62bOKNk8nRaFt%2BIRk82TaghztAIhAP70xp2jYx%2FnOtXjN4mFoBWAgKzsY1jRKEuWeGQ6cI6LKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz8SytPkd6AwXPTqkYq3AMS2BHm1Yv%2F5sIDJcn1A9oPwtdgJgatLloOFB0inBHDY45rH7889qHU1y7UQNziWvGmLd900p0l2Uhk3ofyI201HTDzyKZOJdmlx902EjPEdET8LTWnjELCZ8%2FF3EEelrLxwp5FWotsHxUSbAH6IHQ93gHaPZQA49KTkswKQfQ33xlBT4fzE%2FNoFqQCem1QRUEaaCKMWaQHCDP4X%2BSXco0xxpnJLEDEa1dEtnOJDbFxLIVIQiifqTWKs6Za1wzZj5CkUKrrbVzQi%2FWGQXjzcJElrMCPRypq44W7M9m6AJIFkz%2B%2BULYiHeAv7ZniCcG7eNtn24d%2B%2F8IqQOX3TwpEMS70iDgcB3vnfLOKb9RFS7Rm1GwPhDg4BcaiZHsquMIAQoT3sxEN6qyG8iXShvx4C%2FP154dn9VNJijCYIRV70DfY7ojp%2BH%2FczMQypBH8gYcfdtuyhqtUcT4K5ZLbZKI9wytSbJBbjK%2FddgWZxK3Nrs4QGHlgkCi4euW66D09JadWH3en3YCLnzknO7M0GSwWA3pb9SoidE0QAYGijP3ZcC5Gd3GWCeG3PXrqcNDmspDZarSPUE2u14j32yh5%2BVEkq%2FDT%2BdD0%2BPXfDB4luTcJ3YRxC3gTQePpZBJCOuCfnDC90pbOBjqkARFn%2Bsjvlpn7n7u%2F4i%2BOD6vqkKNzIlR2bfOEMfY8VqjTU4X%2BaWgVjXEhBFTPhNFEmqjgPZmTRaLViV3g5Ez5I7wFIBCNRpQHIbjf2f4EATW2PrAVJBaYMx5Mf%2FnHOw2IrT5xO7DZZCa6fsG%2FE4wJPdfg0T3loSbWEPQR%2FvGIubQujku65%2BswhlJAiAjSjjsAeQAy7BLDZ16Y3fTLn03%2BgDk5veIy&X-Amz-Signature=1fb92fb499aa492e3834b435b3a75f1cc2f6419d45752b6452c0159395481415&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHC5W2AJ%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T221419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCIQCpSx7io6vHXQ%2BgzlR1DlaKNwEyKWMlk5o8bmmYUaWtGAIgePMulU67NCvttrsPNa6pk1YJIoASdB7lgIQ4XKJLZFsqiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG1EIHxY4k3ZRY3%2BsCrcA7J9d8T%2FCoz3v5PM1UbXLsnEzd%2BZPqJFv%2FyUlKvoX5awObL%2FdfcO9m%2FyQuwV2RkibfaDaDWt0FX%2FHQ%2FY766zOB2gDVnh1KnGILsoOTdwe%2BB123UOBPnQSqOEtFEUF7a%2FUHVCocq4EF5%2BZBlC8E2Ljarl5N8wdTP%2F7L1ytcKhP8HJhI9%2BHWJWyE8ynYXrGMvj%2FYOpk5ncqutQS8hrUI6U1wZBizUmhQNkRzYcGYBahVwHqqdsl%2BOr9LlasvsscukiNrlt3U%2BvcVfEBdRzxEJSk6Yj6OzGeUeO%2BxyKD80KYduQUUoVghqJ3mKwCSs52i1NFznDPfcHcSSNuQpK4EtT0rFUq%2Bgs1CdT%2F3voNyweAOV5eOMdwfE2hOd8aT%2FBN6rezRsnJBLK8927YezHXAEGVp9LdqR9v5EzhXMVcxXL1yhu12V%2FK%2FynTgNxNjEkrKtjv497xNOb%2BfOqZ01ZgUymDqcntUoCbEM72BcYrKqX3fs%2FqxmLYiPSkP5vHMEOs85UTjqPywKmtw16JcKCdxQvJsjnEr%2FDiETbC0wl1S1igIF6Ac%2FkGPJBHo8fWk6BzhgGgOwS8AP83Ks9T0nZtd9C6Fkd6EI8qnnQe7Q%2FSMpTbK%2FQ%2BPe8noFNRKUg9aKeMInSls4GOqUBZ%2Br%2BMLHTrTTfacX2NjoiPt36UIVA4L8kCjZRhdDdmMoJpUFA3hH47fxCYq855CFq1BC1R%2FYQOOvaoAwuG%2BRChuwEVNpOV9aVEcPqI%2Bp06i8h8a%2BRGNN0XDizdZvlRtbm4j%2BjqckejpR2RmCpDZNroEH9zSy0S92v9YselW0zO%2FtfRqphpSv5VZfv1XcEJr%2F77aDi3nWHkAoZVWl9jh%2BfU8sA%2BN0b&X-Amz-Signature=c0bf492a229dc53e714dc54321b73750ef68c71bef3743b8ffa1ee31f8c2d65c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHC5W2AJ%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T221419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCIQCpSx7io6vHXQ%2BgzlR1DlaKNwEyKWMlk5o8bmmYUaWtGAIgePMulU67NCvttrsPNa6pk1YJIoASdB7lgIQ4XKJLZFsqiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG1EIHxY4k3ZRY3%2BsCrcA7J9d8T%2FCoz3v5PM1UbXLsnEzd%2BZPqJFv%2FyUlKvoX5awObL%2FdfcO9m%2FyQuwV2RkibfaDaDWt0FX%2FHQ%2FY766zOB2gDVnh1KnGILsoOTdwe%2BB123UOBPnQSqOEtFEUF7a%2FUHVCocq4EF5%2BZBlC8E2Ljarl5N8wdTP%2F7L1ytcKhP8HJhI9%2BHWJWyE8ynYXrGMvj%2FYOpk5ncqutQS8hrUI6U1wZBizUmhQNkRzYcGYBahVwHqqdsl%2BOr9LlasvsscukiNrlt3U%2BvcVfEBdRzxEJSk6Yj6OzGeUeO%2BxyKD80KYduQUUoVghqJ3mKwCSs52i1NFznDPfcHcSSNuQpK4EtT0rFUq%2Bgs1CdT%2F3voNyweAOV5eOMdwfE2hOd8aT%2FBN6rezRsnJBLK8927YezHXAEGVp9LdqR9v5EzhXMVcxXL1yhu12V%2FK%2FynTgNxNjEkrKtjv497xNOb%2BfOqZ01ZgUymDqcntUoCbEM72BcYrKqX3fs%2FqxmLYiPSkP5vHMEOs85UTjqPywKmtw16JcKCdxQvJsjnEr%2FDiETbC0wl1S1igIF6Ac%2FkGPJBHo8fWk6BzhgGgOwS8AP83Ks9T0nZtd9C6Fkd6EI8qnnQe7Q%2FSMpTbK%2FQ%2BPe8noFNRKUg9aKeMInSls4GOqUBZ%2Br%2BMLHTrTTfacX2NjoiPt36UIVA4L8kCjZRhdDdmMoJpUFA3hH47fxCYq855CFq1BC1R%2FYQOOvaoAwuG%2BRChuwEVNpOV9aVEcPqI%2Bp06i8h8a%2BRGNN0XDizdZvlRtbm4j%2BjqckejpR2RmCpDZNroEH9zSy0S92v9YselW0zO%2FtfRqphpSv5VZfv1XcEJr%2F77aDi3nWHkAoZVWl9jh%2BfU8sA%2BN0b&X-Amz-Signature=c0bf492a229dc53e714dc54321b73750ef68c71bef3743b8ffa1ee31f8c2d65c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662AWP637K%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T221420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCIQCBvp4Ieo0fvU6GXjmbbhadC3lKYMOMabqpfs0Ftky4tAIgOKHLi1Axgu3AsialVVo%2B1H1mWSmE4YedX1qsXNddH3AqiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCjJ5yc1RSiSbE%2BbmircA5neqam9LKlEGExKqRXBxCDKNdEhzFTfCvaBP0tPxVEVxWSherbHxVFTZRfn8r6i8dltQVAX%2BZ880gLS6%2Bb2frfO58bavyuDcig8drWkqI6yQtYDHLijfLebWp1qljZ0hpOC3wYJztCvfMaZWlqd0Xkm1f57u3FdGDyTxecuLmPihKgefFTLPCi1Yaduovr1vf%2F0TTO6pZOoOpbqkZrxJ3amQ816MXVQWTAL7zQvoPNxZVvikL15NwvW0d6v6UvLPkFqVIU4GXL94woqPFGGunEgIVrj2T6H8ieYtoNghTNIa3HbHDhM34oLn17omUK1YgohKkDhd1Rqn5ECgjHAY8rBrnDQCXHyAxhdKaacSYjB6zZhXLi4mU5YnylyHF%2B3PxzjL%2Fxff9ZlI9jFUMpAFNmyz%2BheOxKnKteNSGU78t47nKM30U%2FcFVeTQ3RnvbUKTEf8GGjBswKD5KTjP7B1k5ow8hdK0RCYJ%2BNvBNlVNIXXG%2B2I%2BIqjAuSvB3c20StLPWAjGUNhsbqdJn5STic5kAXrxacroHx%2Fta%2Bk%2FgRv7gLrPXRVkaQyax10GHbeDn9a3EqiT4vgIcRncVJfhSmAQr6MELjYK8sc0ihubFpIVA8O4PT8hRaGySElD8r%2BMKvSls4GOqUBfT4zJzaUd5JE%2FsW7v3M6sIZfPw0wZx6JwNXruW9eTW74efaz7hTEPbqjAtyXN%2FnjYt373eY9rBVVaMOUToXQbUeQgzSdq9N4BukAqLwh9qQLgmhf34oBFANWZRcljwj9Fng3olcGoXAZPasXIB2FgprXwvbe2DltvXgIcsB%2B1qRPL3AUb7HJ2asqVkvzqjSyP32hx7t5PnBWK4yNhoJ9PMLokZ8Q&X-Amz-Signature=374f0264b2d32d552cfeace9aea815dc938396b8c6ea2abe873a92e5f5090714&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

