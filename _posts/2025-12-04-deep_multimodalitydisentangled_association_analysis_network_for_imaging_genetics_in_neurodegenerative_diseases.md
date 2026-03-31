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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666WRAYQKK%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T232110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCICi3k3ffQrSQaUXF%2FgMyM89EWmNnERlq3WD3Wzb%2BPIrCAiEA8iMMjkwtKpcHuzNE0H0Rj2rW9ik9cb3LLUrmfL7Vffcq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDKZUwTWXm5IWAkkGeyrcA8zpHr2S5ffuGnwaScr0%2B0P7YZgAMsaPi3kg5PCqoP0tyHLyBr1zb1GuthOOPRNpDm2s%2FskGlIxvXUkfm%2Buv0yeJ30LwKXqWrt971XiKqVTn%2BTp%2FMUJaEYknNF8DBCkSMkyC5Daexdu5xjoPNLSw1j56uH428bKFUv%2BBMnQSJyJR7eNqqM3nFo1%2Fvs50G%2F88e01dRBxIEWC8haNAWbvEiNfr7WhzU5bKXYgETSXc80F7MtvsRR5c889OntOA9m0hmoYmN2XhEqK8T%2B8dDNAfskAZnayssUb%2F0kfwACVwqR8G5aoH2jXnaP%2BujIT%2Fc0CQndENzbmSWkgJGR9D4PivhLhuZkii8Dln0wHAOe5cFUn%2FK4c%2BMuhvd65latPzjjSytCTBOPcUwI3tJ7BbXeh7qLi%2Bs28bO1IiqQk4ycoZxLtopp6UjY4rimsDBgB6Jkh%2BNL%2Bu8a6qKBADPewVq2lQs6k7JCu7HSvU1ZcholsnU7qVBoplDxPKfWmDm9FUeec9kFC%2F61%2FtmMPOG%2FzgzK5dsu43bnllb%2FARhXG3ftXPbc3cLXMQ71areo1%2FCsAtgraA3ygWhDrNpJ%2Bqa%2Bzf5fKDym9l8IQ9fTpDmNGUK7vrd9wJf9Qtvgu04ULXakceMO6esc4GOqUBBAmbdVI2e7yOhfBWTkAM65mMdL6gP3E%2B9FHCydlkGVlDn1YuXW4aafkiSm%2BKJo59IyETsTqk6VaSMzY%2BDzEu3KERRcMfV1IGIan46LEJZjljfdo0qI4xWG6Zg1pD5W5vdrqwljoC2yre1h9gIOcswWfwSAIgeS9Hux0SPsPRKGcuexDrPQRwvQwHoNqUAejW5%2BvyqgPan%2BCkHHSKJlhkrg7bOOvv&X-Amz-Signature=fa4d039f95b3a263994dd65ce0f342dc899f9ec28daa912bd7b16fa6bba1c2d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666WRAYQKK%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T232110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCICi3k3ffQrSQaUXF%2FgMyM89EWmNnERlq3WD3Wzb%2BPIrCAiEA8iMMjkwtKpcHuzNE0H0Rj2rW9ik9cb3LLUrmfL7Vffcq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDKZUwTWXm5IWAkkGeyrcA8zpHr2S5ffuGnwaScr0%2B0P7YZgAMsaPi3kg5PCqoP0tyHLyBr1zb1GuthOOPRNpDm2s%2FskGlIxvXUkfm%2Buv0yeJ30LwKXqWrt971XiKqVTn%2BTp%2FMUJaEYknNF8DBCkSMkyC5Daexdu5xjoPNLSw1j56uH428bKFUv%2BBMnQSJyJR7eNqqM3nFo1%2Fvs50G%2F88e01dRBxIEWC8haNAWbvEiNfr7WhzU5bKXYgETSXc80F7MtvsRR5c889OntOA9m0hmoYmN2XhEqK8T%2B8dDNAfskAZnayssUb%2F0kfwACVwqR8G5aoH2jXnaP%2BujIT%2Fc0CQndENzbmSWkgJGR9D4PivhLhuZkii8Dln0wHAOe5cFUn%2FK4c%2BMuhvd65latPzjjSytCTBOPcUwI3tJ7BbXeh7qLi%2Bs28bO1IiqQk4ycoZxLtopp6UjY4rimsDBgB6Jkh%2BNL%2Bu8a6qKBADPewVq2lQs6k7JCu7HSvU1ZcholsnU7qVBoplDxPKfWmDm9FUeec9kFC%2F61%2FtmMPOG%2FzgzK5dsu43bnllb%2FARhXG3ftXPbc3cLXMQ71areo1%2FCsAtgraA3ygWhDrNpJ%2Bqa%2Bzf5fKDym9l8IQ9fTpDmNGUK7vrd9wJf9Qtvgu04ULXakceMO6esc4GOqUBBAmbdVI2e7yOhfBWTkAM65mMdL6gP3E%2B9FHCydlkGVlDn1YuXW4aafkiSm%2BKJo59IyETsTqk6VaSMzY%2BDzEu3KERRcMfV1IGIan46LEJZjljfdo0qI4xWG6Zg1pD5W5vdrqwljoC2yre1h9gIOcswWfwSAIgeS9Hux0SPsPRKGcuexDrPQRwvQwHoNqUAejW5%2BvyqgPan%2BCkHHSKJlhkrg7bOOvv&X-Amz-Signature=fa4d039f95b3a263994dd65ce0f342dc899f9ec28daa912bd7b16fa6bba1c2d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPYGOW4U%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T232110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQC%2FEYZpTod%2B%2BmU4HtF5TIKn6PzKv6Q%2FRJf%2B3dE6kyzk6QIgbce8HNh2qfCwhR4HpU6kNAXfk5%2Bm0K%2BAyeWkujASgi4q%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDPzSrLqLc5%2Fpaw8QWSrcAynvfj7FRsNvZ81RSDjddNaIF0Or4EiThlqRsOyUh2%2BG6vgdo6e6Qoh5zNIwgWduAC6XsMg6gWFumcs7YTN07xBKhExMUgjbHcIs2PIU09GHeVnBTE0iTu6RE9XfL%2BppkAweH%2BTs9tlHQwycyRmLhy6Bn9bwCVEpCeenKmYbDCHEoGyND%2Byuq%2FTMPyh72YVHVY50I0yT6On0JHJYKNaL0i0FEIHgJ%2FDufHGZ%2BhRK9fFzMxiOTS4Qx5RGqTePeEaQnXcAxWhcJuHvo0ppJ8msLWrdC83EdPH4h35%2Fnc7usVhaJawWBDAoQ6%2BXAsr6dYnm1jWXLYoxJBmzyQ2%2FSiW%2BVKCJQAIX5MI9XjAKQ0biEKee8hT%2BKvxojF%2BRunXc0fUxRETKvfrYdIMtcXsWrc0Zr4YSUnBN8gIbmzX7ExiNAONwaNiS%2BMUkioiqinDrxPGYz4QCUscd335srCke1Ws4%2Bx%2FIt6FmPopH9gGYsObGlAMFLSwSSxNl66rXWwP4zm6%2Fktge3OWOl1rQUfvSpFPVMPEyIkNEdP2E1ViNPexFuJA0uzguIFxTHaNQ1SQ8z9pBZuocjNumcHdB9Q5XWYsbUjkWvj51LeqvsteWEvQB1hcPDqH0l%2FVRoxF16fi1MI2esc4GOqUB2incMsS6xjEm8h1w4ttwunLaRcfa6fsE8vyS%2FBzYTKaDqnzsl6ejzBzJdTvM0wdMr5ipPvYO7DxZs%2FUxBuEKnDp4MZ46Mm5O4vKwyFrGq5ZMxWzmrbOM%2F%2FON6jU1Pni%2BhJvn0diROk4Zv4p%2FFc0gtKL8B69YVcd6I0kGeup%2F%2FdcbVI3xxCZX7MGSSdVm55OjDHj31Ti3I46U1WflkV90j3Aa40w0&X-Amz-Signature=3c8bf84adcfc01b49b85dd2664940efb1fa1f1fac0e773f44662785239bf8044&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WPBNY2UF%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T232112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIH4kipXb5zG%2BGUnnoUAyH4MQc8VxtUffUyoAMBy4jMVdAiEA2sB8ANhWU68Zmo7G%2FQ1qKbnKQ3vgMB%2BjgFZtlGyMxSwq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDHlTDp2JGrrqtruz0ircA2NmhKtprPmIIm46eZWh2WPQHsilLRgSNmE8kbH6a36Ic8G0QaDpva6R%2BBcLjIZV5lD41X7eLBwQxwdyEEUX%2FZwFy%2BUWEIC0o3wsyg%2Fh%2FFnplXXFXLUPHY1trK07NSxHGlMoBlGNM3IHlPSMoKSxTxt3aUKRYWnpdeyERKPcc3IQrj1mPBk7BkOeO%2Fh5%2BaI1Z%2FoFDj%2F2TLFeSbu0pnLQ%2FHa535E0JGpksSxKgGSZjdPDJSmEc58B%2FZfmOfoxnh2Mh7KI2EvVSJMAIHIub0BaE7r5YOt63hs%2BR2BK%2BcuwwoEsGmIVoHxclLizRMSzjDJFx7vPjxzE1JVhNiTnv43m3z%2Ftcx5nvq2DhuszUghG1iKhe3ZmZVc8Hz8TKWOP4LOBV7svwlki3qsicYdNkjltotfCFKCSv5FnEhRW4vT7OlWTTs9DvRPeT9Sua1qujxcjgFOTc7ZHkb02vnzVZNi%2BvFUo%2BA1J1PAxzDBobwx9BclJ9l0xYosrTmIjWauRqwTVq6BPazGGMQ%2BJREjF8jughndZU8EulwVzixdrTtlNgf0X7inBxUFZjOYhwlOsuOHUsjdbeDcyp%2FTMq3ibExmdAsg4QKwZATAC82AsYomwINiX7ao7FYlFiF0HG%2B%2FhMKGesc4GOqUBkvxiqnTOA%2FIvpCa%2BYxi0P5y8faN3GpOXGadUP2g6hz9XrRL0DR2sM%2F9luldmc97hCW%2FTY28aGXDtoJl6%2BMCSWSsK2D1k%2FnkNtr67GFe3oyh9cfpN4XMvVZxqmf3MRgDYDPH37Fe6BRO5sM351jHtzi%2FjdW4DVeMqJfktbhq5524BTbQePa0U3Dd30C3c6Wyd5jsIa3FA7EGKvX%2BM0QjJyTOFtpHp&X-Amz-Signature=301162817c7c78ad9ea33445d8710874f3c72d64ac6aac8a04318b33b1734eb7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WPBNY2UF%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T232112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIH4kipXb5zG%2BGUnnoUAyH4MQc8VxtUffUyoAMBy4jMVdAiEA2sB8ANhWU68Zmo7G%2FQ1qKbnKQ3vgMB%2BjgFZtlGyMxSwq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDHlTDp2JGrrqtruz0ircA2NmhKtprPmIIm46eZWh2WPQHsilLRgSNmE8kbH6a36Ic8G0QaDpva6R%2BBcLjIZV5lD41X7eLBwQxwdyEEUX%2FZwFy%2BUWEIC0o3wsyg%2Fh%2FFnplXXFXLUPHY1trK07NSxHGlMoBlGNM3IHlPSMoKSxTxt3aUKRYWnpdeyERKPcc3IQrj1mPBk7BkOeO%2Fh5%2BaI1Z%2FoFDj%2F2TLFeSbu0pnLQ%2FHa535E0JGpksSxKgGSZjdPDJSmEc58B%2FZfmOfoxnh2Mh7KI2EvVSJMAIHIub0BaE7r5YOt63hs%2BR2BK%2BcuwwoEsGmIVoHxclLizRMSzjDJFx7vPjxzE1JVhNiTnv43m3z%2Ftcx5nvq2DhuszUghG1iKhe3ZmZVc8Hz8TKWOP4LOBV7svwlki3qsicYdNkjltotfCFKCSv5FnEhRW4vT7OlWTTs9DvRPeT9Sua1qujxcjgFOTc7ZHkb02vnzVZNi%2BvFUo%2BA1J1PAxzDBobwx9BclJ9l0xYosrTmIjWauRqwTVq6BPazGGMQ%2BJREjF8jughndZU8EulwVzixdrTtlNgf0X7inBxUFZjOYhwlOsuOHUsjdbeDcyp%2FTMq3ibExmdAsg4QKwZATAC82AsYomwINiX7ao7FYlFiF0HG%2B%2FhMKGesc4GOqUBkvxiqnTOA%2FIvpCa%2BYxi0P5y8faN3GpOXGadUP2g6hz9XrRL0DR2sM%2F9luldmc97hCW%2FTY28aGXDtoJl6%2BMCSWSsK2D1k%2FnkNtr67GFe3oyh9cfpN4XMvVZxqmf3MRgDYDPH37Fe6BRO5sM351jHtzi%2FjdW4DVeMqJfktbhq5524BTbQePa0U3Dd30C3c6Wyd5jsIa3FA7EGKvX%2BM0QjJyTOFtpHp&X-Amz-Signature=c8ca0a59c335e51771a271f9f1aa0023bee6a3b6714bfadf4d6b169a08801331&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627YSQTDE%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T232114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIGFqL7f2VA9GzvEmk%2FUIv2gtfoJYM7mY8EHnr22Nbx3IAiBeZ%2Fw3l%2BercFdkH6zdjFy1BF1FdDY5yP%2BQmS5keJgP%2Fir%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIMYKYYki3owsUl25cCKtwDkslKuG632ha5l7Y1MmDmb0pDCvWxTE9IRM85GzIhpMNGtHiDjWA6YonUxP3Rnvmj1qAopG%2Bx94WFVXcsmmDsWMtv5nGSNL0iJvuYOjTus1KM8EMt5fb9pf3qMhCI%2BTCT3bfTGcnyEjzj1msqKkD4oDHTMKSOXFQQFmuXB3S%2B5ZIG7LJovyuMO3a5TehRNOHS%2B6MTyX7kbbqd4aUCJSXV2eXqslrK86mfAHOaSqNfoIEU%2FZUNNVTKMU%2FyDSmtEodewnb94UznRolp4dl7JA9bYYWZWJRhiivfAIXOO1Lex9lTb44UsP4wGEEBwWFIa6m%2BZMrgLEvAq2lBClLuMt%2FUKNYLu7E6fctauhV0thJczJczR%2Brim%2FEWCqDU34wiQnnpc9CYYN8%2FsOzQmPoz9FmPZt8EJ3iXqjhes1om%2Ba5z0f%2BoeXOy7Kpr2o1idp7YIfLzXi%2FP6IjTPK0o1W7jJ5D%2F%2B1eqr0ox%2BPTJQzieG4%2FUMLZ6Gng%2BjU2zPnqgNdwpmdYCLIZkD3jzWobaUaY8YF0lBEqxgNknF80ofW33UrbYFhmS%2FNnwYGwhGBblYsw3jAiJ8HX1N3P4WSgemmpTTsjBh9PPNBnL3mmk0p2fD90SESk0jl8%2Ft1nS1ieFKqcw5J6xzgY6pgHB%2FXGUr5F2wbWuZ0qhkldAlK%2F8zos07yq74oxwmvHMQ5L6Om3qFeO0KSbgdenpKZ8Uql%2BVtR30vUp0KsINKEhsPH8bUmllx2AiMq%2F2ZRLhhXS6ObDawW7bdRazmLmu2GebUu3znco6T7tD5w60MWks%2BSo1wwpTDyFftoIGODt1ZFgmrjJ5Ma61cuwgEL0JX%2FB55BfCe0tUn%2BIWzWlWyG7W26Xm%2FbFg&X-Amz-Signature=0f5b5372075a8395ab70752317353387b14a0134458786528b2ea5cd992c4df8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCKD2DVO%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T232115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQCZyDdZkgHIEWKBCYKT9aEQWJdmk%2BNnLqdRfbz%2FQjLMIAIgWJrOM3rEE6qVr6rGgusrTcuQ8zpg5klUh6vX4e%2FT0UMq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDK8msOMlE88MJTF0CCrcAxlSoaqOghiES%2Fj3NiPzqzAyHrNqWncp3wyL9ZIDlR155b206mUTx8iODsI5hLHkJ23FIv5YAFwpHxYWceYCW1rcKxQZKRNnlfw%2Beo01T5weWDFSfyeNO9BV5WFevqaj%2Fcr%2FH0qbUXj8A1H7B7mppbSr30eo5J4dsjKSTnijPwGCeasDcJM%2BP8PHuNjbD9Cdnevb9%2BQ1Yoyv90sMS2xr5hm6oKLhlMVvKEOj3bM3iIhLdJGwo2FnhtGs9gY3ze0ekw5t51Rz7CxOppTjFFgk8CGLKzALKp7mJCyB2Z%2F0wg5WQb8v9CQaFnn6XrRkCubjKNTxtg7vTFFEt%2FjPnRMsIc3mXfY%2BxdBE5kSTLl2QPu7L6NQUpqyrfHzQqDjFVOK7qvF0UNENpryJt%2FeyokEA4iNu86TiQ7nnCbAay3ICmvYQ1LnqmqXvxKsiSdAoQPpIObVPmx%2BADTdEAJDLZPRl1fasRkAdXidjvbMvHovEH5OqghbZW5yRuC%2FYC3GIbZ30igL235PBVtjm1uQKQR%2FLHDvzbJBUZA6J%2BjABeA9BQMv9HuGDcoEoiegci8uu85iqdY%2FPxenCpnfW5z9Ws6hjh7Rw3Ym0xCOBrEkkHk7CgSGKUYk6JnWI%2FmbNecIWMPifsc4GOqUB%2FCLia6LiMBJwOIyt3rv1aaxAk3tkEZ1Km0yh0dvxZPU4em28CgBBDlTJL4dCirWEBJ0MqR8o2q%2FLvNAxuiKLW8uJ6X80zABIT0s38vCcOD7aZNfH0LzDg%2FTnTBCgSRsgPIiTzxTWxUQ8nHRFx83x69mYlz60p%2F4qIOME8NYiX2VzOHO%2F3OZPFpajOX4o%2Bt2zozDxTBp8QrWAeMrZA4kyZuhx5KUT&X-Amz-Signature=0a641ab11cb8855fd9c4d93870ecf03b3f8983d1880c3289f27211640af701d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBI7DB7V%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T232116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIBwVgc8L%2FcTztlrgfvMr2NiDTnCOceA9%2F3Qbz8HV1LapAiEA9t%2FDcbrZFe7%2BP81MZnoxqhFuVb2noMDlUkwdAU1SuLUq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDNcFahOjbm0gxy5WDCrcAxso778wTjeQCPdw3RhwYBpgt%2F7QseoOwrgzS4qicMInpjSHiXTgpnl3nTTn0ZnMM4kBYnC1XiabGNAsQ1IFV%2F%2FbKkkyY1FqlHVjyJHdEOi%2FOP%2BVbxJJoqqzrPPCEuS3a9xDLY3kNZsDymxK6Azd8CdcwnKz8DnLGyZbMNv5qGcOnlhFCwCjiiHd3tsIAvCXD2svYHj5J3y%2F%2BZUGPa4Tq0Gy62cBfPwIZTwP95A10vhFsfGgE3kjFgkrocjuZxNIrj981%2FnqisZIqOeMW3vhcdopwcGULoL5U1k97QVxx6f8xhaU8ROCOGr0RYaHMMtjtzLWicGOPD1Yqg35jA7BD2y6C4bUBDvp6n2ybyMP1FFRbAvW3aPB88RCKUisxcRgpLOvPlNIe5eMBb8%2FLP8r%2Fc1GnK5RPH6A6Wc4EaPOkDVDd4hYCSW3uEUa%2Fd5tdny%2FWZis6j0MV2NT7%2Fy17UkyGmdFujvPDbbHGEWTFL7MNdXd9faIx5G0I5hOff7hVBpYd7XSjWyKdru1soolwvPBXuK7DtbTvafj6SLq6FFnENR8AqaFrWw2Npi1sNzQne2%2Fe6YtuVhUXtoaEZSBK1rbAdD1vBWfnDtYidbU6hWPGtHhTRgvEBmciAIjgPnrMOafsc4GOqUBY0uD%2BJeBQ7RxlPaKrR2qata%2BPtXzQUCIY7qSz7EfuxuAIbVJxyygNfK53pcNDqXlF%2FKxkwCRJPvhylp4%2BjQ5lxqG6PBH9VJeN5bGaTsqPlUtBv1%2BxkWTds0FA4Y389LdEqa8n5rS%2FCrikL2FCI0V1qkANDvRL2ufjQxMghdysLrxpBeONPdWyQlwWFyboaxk6SiEcq%2Fde8gifl4QVe2Os9aVHgK6&X-Amz-Signature=13e953e736e5e4670d1e422cba79e350eb716177096ac2e40986afce19e65e0a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRTDF5LH%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T232117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIGf1sn4UTIxtvYp5DZnQWkbaGBIQHaueo4cHOwaG9mcpAiBos8PRIJSVGcM2T8zwstWwNM19z%2FfnHmksqSdcpEDTICr%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIMKU2MmQCTCvXBYue8KtwDVU9NekdPhJUaBNt7NqhgXmBG%2Fh%2BMvbMixf7FU9njPoSvtd0gKKyr4C5K1lslAyYeZM%2BvtSnLsaHo0Upv5GrekR2VZvNvxo67dUjmw2vb51Ir1bVFxOCHrhXqZ5DA97XQJg8WPeJjdc%2BXOLZCMi3irESuKATFvCtAAyBQm6lzRB8uBDFIixcdmb%2BOJ4poq7NDprvIdsgF4%2FogwigpkZWNQiUBobAlDrNzewDBiR6ZT11JR6Gu%2Fgj%2F5buymwnm6I3ZLtKbAwMbvPYFCkM1t7swISaESSR2aj49seNjh2BROjfBvXMHU4cAaL6nC4tSNEvd%2BjF4i5FArcAhjn6iJftEr2L5MJaKDGkafgnCuSTOtZ5cY9cGe6PnCgidWVGmpl5dNlCTcP6PsUb1qxpxaAG%2BZTHt9cJ%2B0v9K45OIrFTrDAXV1vFgGT5EVgNhA7UK3Hi0C5KV0K2C3FmzuJ6ImvbGs64WZ1KLSNfm0kvNOoIBfbA9izv0psXbzFdSgSPSRbm0YIRvQivDSyTwsEkxdkukVkFqznwuQf3EK9FTpn4e03ntatvRxRYuw8YHflpjSv4jxwtNW%2FPa4opw2AnpLPxUo%2FfFDf%2BvNeh00DTcyMkETSh7D2pGvwabIXDbJYYwqJ6xzgY6pgGZiJGNIDezZCNvp6gUTS0eXzc5mLH31wliFx5Fclk701F8GqCawjdxTenU5spWgMGtmtcyiZKke6iITf1cmejKDCQt%2BSCfJa5MONO3hGTCew0LihOR0UbU0hfCgGZdD1bYLMK8Ca1hkw8bElOXdD2rqWorOrTou0kWTmGRzCO05A6Qc5Oqzn18tBUtJMG%2BHl5muFPPi1fh1y9A%2BCwFh0txmfuQ9vKX&X-Amz-Signature=aca4c55f98e36976ad3e8efa749457300abe4d098cb7aa132715e246f4b82e65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRTDF5LH%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T232117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIGf1sn4UTIxtvYp5DZnQWkbaGBIQHaueo4cHOwaG9mcpAiBos8PRIJSVGcM2T8zwstWwNM19z%2FfnHmksqSdcpEDTICr%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIMKU2MmQCTCvXBYue8KtwDVU9NekdPhJUaBNt7NqhgXmBG%2Fh%2BMvbMixf7FU9njPoSvtd0gKKyr4C5K1lslAyYeZM%2BvtSnLsaHo0Upv5GrekR2VZvNvxo67dUjmw2vb51Ir1bVFxOCHrhXqZ5DA97XQJg8WPeJjdc%2BXOLZCMi3irESuKATFvCtAAyBQm6lzRB8uBDFIixcdmb%2BOJ4poq7NDprvIdsgF4%2FogwigpkZWNQiUBobAlDrNzewDBiR6ZT11JR6Gu%2Fgj%2F5buymwnm6I3ZLtKbAwMbvPYFCkM1t7swISaESSR2aj49seNjh2BROjfBvXMHU4cAaL6nC4tSNEvd%2BjF4i5FArcAhjn6iJftEr2L5MJaKDGkafgnCuSTOtZ5cY9cGe6PnCgidWVGmpl5dNlCTcP6PsUb1qxpxaAG%2BZTHt9cJ%2B0v9K45OIrFTrDAXV1vFgGT5EVgNhA7UK3Hi0C5KV0K2C3FmzuJ6ImvbGs64WZ1KLSNfm0kvNOoIBfbA9izv0psXbzFdSgSPSRbm0YIRvQivDSyTwsEkxdkukVkFqznwuQf3EK9FTpn4e03ntatvRxRYuw8YHflpjSv4jxwtNW%2FPa4opw2AnpLPxUo%2FfFDf%2BvNeh00DTcyMkETSh7D2pGvwabIXDbJYYwqJ6xzgY6pgGZiJGNIDezZCNvp6gUTS0eXzc5mLH31wliFx5Fclk701F8GqCawjdxTenU5spWgMGtmtcyiZKke6iITf1cmejKDCQt%2BSCfJa5MONO3hGTCew0LihOR0UbU0hfCgGZdD1bYLMK8Ca1hkw8bElOXdD2rqWorOrTou0kWTmGRzCO05A6Qc5Oqzn18tBUtJMG%2BHl5muFPPi1fh1y9A%2BCwFh0txmfuQ9vKX&X-Amz-Signature=b9a459b683fe535c7a3c789cbe3a47d64f36f2dcd7b58247940a8c6e72f30f7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ULOJLJL%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T232107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIE%2F3bD5Chya%2B04fMH5EPWlowqfHIUcN3njiafpsnYcVyAiAWa9XSSD20HFd3jdYjGiOkaT9NTBntmskqA4QBKZw7UCr%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIMm%2F7os1Wtq4G9lcpKKtwDVqloB46TK3SXw6MItLwxkBXnmp59aw98jBgLkE2WV8nXpdYsAGQ2DemjgGrN9kW4Wj0oWZCfpprGTTIldxrytAsi%2FY7zCOUCwJNm2pMcB3ZeCL2%2FL3BebkW7ohjfzvrDK8%2FtN8QDfbL7lQ8%2BFyMhK9EJ2Fl3b%2BCGyxfAj2CNwyU9SRveNs9xTY7D5Kd7LqTpq9Vdy%2FDz%2B60oJLNy1%2BYTkqvN1A6pYMrwWUbbvhVOQTcVtSUUvrwPLmRyGnm6sMnwWwuO6PLDw4ROoBiNGR9aqm1MeRQ9MgqoK3m5q1KtFVpWc41y%2Bk0l8rikvkSCUDA%2FAr62bBe7bnFfOYg8YbqTllZF1KEFJsWfI8UmzxH0lIZse4UjxcWgkNmi7YOo%2BFPLzImdz3ah7SMyeBMLZbm%2B2J6s8DK7POx8qENdphK0uAIC1pRhZMBlZ8JZKr%2FPw4Efb98oKWySPAXkqOOhYK%2BpHQFM2r19ZN9tNytrPvtZE52iOJhc1QyMmK1FcKj4WnOUguLRj1bbLgG%2FRt5psNuGOXgtDe6ogNwCkR%2FgbwZr9GZ9t0yt5CDtyqk5o5AnFqs40B0ylTX50rA6bBdJ0NlJJp%2FjgyJsMz9G91nFMhqBk1gkIzVawzPqmF%2FBH40wkp6xzgY6pgHJskdR3uUUC13lgiEBCMEappe%2FOK0VABRuzcy4YtlQue4dQtAnaBbKl71kqJ0CHuEEQT%2BSAq51posUgjCFYphN1psy2D5Feu%2FHicKUkiY79g4LXTRUvGaKopF9hmq%2BpI81l0guAeMtzDdniPxihex7ZT0gVjkp6WjOFYImC0ZF3pYasS1OJJI9sNB%2B4cyHaVNT3dZAkS8Buojt8%2BK4%2FS3oeEWGuoWJ&X-Amz-Signature=0a63873b72a9ab81477c084d7010edc46485d19d677d084ca8445eca72ee2400&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ROVAX32%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T232122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQDDtcVt0uNHaqqDPqC1yDelXYHIw%2BiHPlyY51W00rdN8wIgfZMRUsNldCYMorjTLsENxfsD8V48N%2Bh%2FDhKT9Lig7Rsq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDKiifuQ6JNNYxMyuUircA0mYUUdF%2BqCTaNRZwYfXYuFJxmb%2BwWa31O9iIcCaq58Ix1QifevGhX158wcg7cknmP5oUyKTBDUN%2FqNa01RBLYSeL72EYzQDaMvpoD8Blj0OB%2B8%2FpkzYWtd3s%2FrYl4N9CF4ssOCZYWCT71iZTumIimXIVb2w3%2FeI8w7c2WORbh0TcZg2z8%2BUVXIb%2Fd9N%2F7Sgu%2F9cwfph2xFE%2F%2BJi3wakZ3ujcGpKpRI4koOcKr1dmEw3jAWkusqaUZRh1IlX0nMUtFGz85Ju56h4wnrite%2B3kDImmzt6DNUC6Fze0H1vjJihUcr%2Fh4r%2Bgv0Ul1ub3LWsdQjClCV5qnjSSNcHoPnyRenkLz%2FJr0Mxe%2FVIneSJitlOsrjVlOZVOZj%2FfIVls2y%2FlM7m6VThsWIAJlsdu%2BdoC92p6RMOMyh7K9XZBI4IEgfxSsSiExi1xTcaNlflgXbvZDpJc1GJo040PvcGa82vRH1%2Bzl2jxBI%2F9R7FFSiJeCHMvNvzEi5LvjVchNvy%2FHRjWpUkI7nVTSeSdvfN2uf660piNOjLZ7tNWmBptwRmqjvO09ODK887JF9fH6F2ouQPGTshCbFbP5e6RITAZAaNL6EnzsEc0MxDNcwhSjquC5ZSMT6FdvJ4UxEiQibJML2esc4GOqUBVfHuIoeSkRC66sH7ewR%2F82zwH9VIhHLXktNKrh4LFhqWwg1Jhu2xf9P29bTMvIihzNzldL6FfCZteO3OZAKrLlig1Hx0hvpVYZFDBQ7tqKK%2BBOuxcxQX9XFrFeXC%2FtaEkiZI4JcVij7KK%2F2YLIx9SD7FSQ1Y0ncLMv05zcwE8pslNnb6YrgFBQLoa8Nz57gCfdDHbtNXHVXusO1FV7VxnxU%2F%2FUgO&X-Amz-Signature=f2596262eaeb51f305986b739f8f1f593d053a5631685f74817fcef4e295cfd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ROVAX32%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T232122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQDDtcVt0uNHaqqDPqC1yDelXYHIw%2BiHPlyY51W00rdN8wIgfZMRUsNldCYMorjTLsENxfsD8V48N%2Bh%2FDhKT9Lig7Rsq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDKiifuQ6JNNYxMyuUircA0mYUUdF%2BqCTaNRZwYfXYuFJxmb%2BwWa31O9iIcCaq58Ix1QifevGhX158wcg7cknmP5oUyKTBDUN%2FqNa01RBLYSeL72EYzQDaMvpoD8Blj0OB%2B8%2FpkzYWtd3s%2FrYl4N9CF4ssOCZYWCT71iZTumIimXIVb2w3%2FeI8w7c2WORbh0TcZg2z8%2BUVXIb%2Fd9N%2F7Sgu%2F9cwfph2xFE%2F%2BJi3wakZ3ujcGpKpRI4koOcKr1dmEw3jAWkusqaUZRh1IlX0nMUtFGz85Ju56h4wnrite%2B3kDImmzt6DNUC6Fze0H1vjJihUcr%2Fh4r%2Bgv0Ul1ub3LWsdQjClCV5qnjSSNcHoPnyRenkLz%2FJr0Mxe%2FVIneSJitlOsrjVlOZVOZj%2FfIVls2y%2FlM7m6VThsWIAJlsdu%2BdoC92p6RMOMyh7K9XZBI4IEgfxSsSiExi1xTcaNlflgXbvZDpJc1GJo040PvcGa82vRH1%2Bzl2jxBI%2F9R7FFSiJeCHMvNvzEi5LvjVchNvy%2FHRjWpUkI7nVTSeSdvfN2uf660piNOjLZ7tNWmBptwRmqjvO09ODK887JF9fH6F2ouQPGTshCbFbP5e6RITAZAaNL6EnzsEc0MxDNcwhSjquC5ZSMT6FdvJ4UxEiQibJML2esc4GOqUBVfHuIoeSkRC66sH7ewR%2F82zwH9VIhHLXktNKrh4LFhqWwg1Jhu2xf9P29bTMvIihzNzldL6FfCZteO3OZAKrLlig1Hx0hvpVYZFDBQ7tqKK%2BBOuxcxQX9XFrFeXC%2FtaEkiZI4JcVij7KK%2F2YLIx9SD7FSQ1Y0ncLMv05zcwE8pslNnb6YrgFBQLoa8Nz57gCfdDHbtNXHVXusO1FV7VxnxU%2F%2FUgO&X-Amz-Signature=f2596262eaeb51f305986b739f8f1f593d053a5631685f74817fcef4e295cfd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NRHVYZM%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T232122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIGtLqfwAqEmgrZYo3%2FoPL779upqGMb%2F8pHli0f91KquwAiEA1VSQwaoVc8XzSU4YVGpqFQn%2BcPUJauiBH1e7dXn%2BCH0q%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDOANFOvuxS3SYQASKyrcA15jw%2BkZE9xjEWRpYlaTAvw7GlAvCnlmx%2B%2F1fe8D4s%2BbfrsmFdFWml8Fo31xMFZWh2DNIF520z4VVAAzMflPrTR2Sfc9aE8xxklHpwqi58HhZdrHy19%2FNQrsu2kRJOMSOGBp2Cj62A5i1f2MAgUTfsb7TVs9iDGqVRzgUYuY4d12th8yeGGscUbyzDTvUeY7rbD2QEDKP84Ny1OcuieA54xbQpWwLAhqNzTAP%2BQhMoPN0HHC42fCmFyVbvbAzLjGYPUHdwSB4pI7r9vTapApo09uNe0MQBdXNqY3s3N7hcBvVNMfi%2BN%2Bpl5DJlTF49EMm0iXt2CdVW4nGRz2gm5%2BX4npTPdQANCCgpL8kAXHyhwuyDiY2o81i15fcNwK%2Fh2Z4qbdEymN0b4dQA4DKswAEFUCVnftcQjLslorrqTS59RoypOZEskhStzPtO3KnW6B9DPxpwMiPEFmehWXwt%2BiQhG391wb3TTJ5mOxPSQNIj83CAOMFiql%2FM96juZqx%2FPlEpO0%2FxDAz5W7cuIaUYC%2FSL%2FJd%2FWuBgqTKB0PLYcJMtdR36nDLu8quj3oMzpCRG8vf6759DrjwIUE%2BXjH6lSXZ%2FUHSNmHC0Og3qmtuncsSVrZChMJ%2FpK4qETley2lMJqgsc4GOqUBR2QQyqnhSvMbFvfEZtvshTAASfOANsemnZs4NlaKPHVDjMAKsSS9khlFQRW9JEsNsC6sd0uguZZaOs0kBV1XbtXKBkiyEYACDoKps6jR%2FgthlwhBcwWBcYh7Kv0M2d7ihxcpPL7REEH4pFpj4z9FBF1%2FQ8e1IMda3We1W3FHHBlnGQnuQkVn2gpjzSE2Ro2B%2BhDrJL%2B9twBPNhTX2kf6ZDMpy%2FPx&X-Amz-Signature=cd30654323e91589af6853882a41fc06b8e25af022e8c3f476ccd15b0310f427&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

