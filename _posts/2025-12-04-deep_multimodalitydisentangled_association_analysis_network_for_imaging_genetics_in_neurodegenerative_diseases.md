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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJFUVSZN%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T204524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG804pU3vY1vWbgOpcCCO8JLJrCFani4rWk4DHkq%2BAafAiEAsGjVirTIZZpjlCaOOBbUVACejH79z%2FSE4v3yfvSKkh4q%2FwMIfBAAGgw2Mzc0MjMxODM4MDUiDHA4m6L1i4QepKhsUCrcA3HPVmaBkqxuIAhJkMhjcxrloj2roofq%2B7nVBH2ZCoUrv8JEAdbTr%2F24t3qCFEAMa0qp01jcs8F542xxFAIt%2B2fH8lHCdrUXiKmXarm1pea7rNifOSd5bEGXcjAMS2ZqsuvdDfkYsP4bAmT%2BtdNjM6T2yv70qRn6UTFSL4faIPmN0NmKitgLofPTf2FB8MCdtVHGHTfWXCUvpaP%2B1faryNXktfegtDA69dQhWbnqY8w6nTHCzGbJTWvzgwxB%2F6B52GE1beCKe1NAJmif14nwZM7l%2FR54gObdpWX2r%2B%2F2DbhcxopuW8aPy1o25%2BkK3HiPPgLNa0G4qztuD0UhzIPF8Riit15K%2Fqpo4YQ%2B%2BlZ0nJD4p%2FFjUilW%2BaW5Smit0JGEACk3gKAg5UNKiZXotIDpWN35rBzLCmunTRzU87Pls7nzkPQyd8yeZSjqP48WyNdQItQa0nAGFDVT3KKy4u8KNOSt%2B51owbq1VYYhhcBrSKgOWXgjuIvq0z5PKL6vGIRHiAKOIYLvuUfO%2F4LjlzEHfds4NXmBLD1xyE687hbHBUasxZDZDKioOGOObMsWwrhiWG8ScB8dWbgNR0Js3GzVSjvR90ASWV0RSzathbyAZueRkegBgOPBlb6bSjlLMPr69M4GOqUBLzw4265AvTbShDQU2evwC4ln1MqmtspiNl9%2F2U1zvnyUVNf9rEnFH%2B406TyAwQJRO4VsFlJxZbnvSvxRZsNpMw59DLqdYLhsPrp2O0PN%2BVg%2B7N541jwWj5z7Q4%2FkDdWxDtzqS4TDnbLgomL%2BJ77ipBu%2FzxPbimtP2RLxCU%2FHSi8Lqnw5dNSAfv7LKSwJbgOwe4HK5EuGaTYMQyUuuGtMbnEw3nM%2B&X-Amz-Signature=b7b29d0b07369892544d2b00ee0623f1a7a62736df582cc13f306e2ba24550f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJFUVSZN%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T204524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG804pU3vY1vWbgOpcCCO8JLJrCFani4rWk4DHkq%2BAafAiEAsGjVirTIZZpjlCaOOBbUVACejH79z%2FSE4v3yfvSKkh4q%2FwMIfBAAGgw2Mzc0MjMxODM4MDUiDHA4m6L1i4QepKhsUCrcA3HPVmaBkqxuIAhJkMhjcxrloj2roofq%2B7nVBH2ZCoUrv8JEAdbTr%2F24t3qCFEAMa0qp01jcs8F542xxFAIt%2B2fH8lHCdrUXiKmXarm1pea7rNifOSd5bEGXcjAMS2ZqsuvdDfkYsP4bAmT%2BtdNjM6T2yv70qRn6UTFSL4faIPmN0NmKitgLofPTf2FB8MCdtVHGHTfWXCUvpaP%2B1faryNXktfegtDA69dQhWbnqY8w6nTHCzGbJTWvzgwxB%2F6B52GE1beCKe1NAJmif14nwZM7l%2FR54gObdpWX2r%2B%2F2DbhcxopuW8aPy1o25%2BkK3HiPPgLNa0G4qztuD0UhzIPF8Riit15K%2Fqpo4YQ%2B%2BlZ0nJD4p%2FFjUilW%2BaW5Smit0JGEACk3gKAg5UNKiZXotIDpWN35rBzLCmunTRzU87Pls7nzkPQyd8yeZSjqP48WyNdQItQa0nAGFDVT3KKy4u8KNOSt%2B51owbq1VYYhhcBrSKgOWXgjuIvq0z5PKL6vGIRHiAKOIYLvuUfO%2F4LjlzEHfds4NXmBLD1xyE687hbHBUasxZDZDKioOGOObMsWwrhiWG8ScB8dWbgNR0Js3GzVSjvR90ASWV0RSzathbyAZueRkegBgOPBlb6bSjlLMPr69M4GOqUBLzw4265AvTbShDQU2evwC4ln1MqmtspiNl9%2F2U1zvnyUVNf9rEnFH%2B406TyAwQJRO4VsFlJxZbnvSvxRZsNpMw59DLqdYLhsPrp2O0PN%2BVg%2B7N541jwWj5z7Q4%2FkDdWxDtzqS4TDnbLgomL%2BJ77ipBu%2FzxPbimtP2RLxCU%2FHSi8Lqnw5dNSAfv7LKSwJbgOwe4HK5EuGaTYMQyUuuGtMbnEw3nM%2B&X-Amz-Signature=b7b29d0b07369892544d2b00ee0623f1a7a62736df582cc13f306e2ba24550f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BCNAUE3%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T204524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBwu3rnredWYP7KZWtsi0akq9yDfWLJuWahbFuGn33w7AiBl4LPTECDrLqL3Ai9X4fyxR8KHyJQxj%2BQttyGkibyyRCr%2FAwh8EAAaDDYzNzQyMzE4MzgwNSIMfg81xAIsOrPvYJghKtwDn1h%2F5UBwsv%2BsM1pYICHvtBEwrBSx%2FNJfLb5AJQxIad2i2laDeTay0s2%2Fyb7l%2BdBS32OXXrlq1oClZDPNXpQJPDKMD6oXwk91fOSlxQN4PyFuIRQHnqZkbMoQBoufkxtgtI%2B3PMesvt9g5WJ3mkHd%2F4RBFZG8Tx0PfIjVI0IhNn7sG96lxhJE85nz84yvrNvr%2Fi0pwM7C%2B3QIHfALnIKbg%2FBffDWgv7GxeHa8Y9HnFL93xU1ze3qQ1tBO%2BIMPu4Qd53BEnOPCTfNKvJf%2BpKxmFkp2sRBoxLpi4R1KhOhWs2Ydpw1KryudcIe7BEOcV%2B8pTrhHZVbvky9ZwVfbQMvQBm2IDsBcmxh1ZfdRUOGeVqNviwXOC69uVWOxX5uOIroGkn9JoHkh4o%2BDwHI3HmwNsMeSSnLG9jrKiQi4Z7Oc%2BCNGWAVJdHrxnhMjCkdNR1Z5A8HgVMt1Wk3TqwYCnJdiMsE88CVALavmzGtXqu4BcXOfnRf100Zk3JQ3ZqOO1vy8cwidmAlh%2Brl0k19ItctF%2BFNAL7Cf51GB5%2FyCoRJ2j0rFFNbSk3v7xMPXPP6YH7SjSxEbuIF7euggwv5R90KcMV64qkEWTkSvs2sL585AOUdt6MdRV8OwsYTlR0sw1Pr0zgY6pgHY0wNSmcW89K7miFLRfbMftthn3UR3RlMlUH4ejAgC%2FWlgudLUMTrpFRetWwg87%2FHWbFWb14z6yWqHEV8Wirad8eBTOVuVwW6p4yb1pOopvTjqztGUWL599G3HfCHtfDd62LzoBteqaZYY9%2BGcqBjbbyS43pUrj7YsLCXxGRqw5tzWkIx1fdWPxGMLrfF7vXaGxoqfWzRbXoCVSrrAScXjkjWijK2M&X-Amz-Signature=88806d2d710c6df90eed1fe1e02b2ca67237be2d0e6d62ebad1afb1215d66681&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V6OST3TH%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T204526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCsB3Nu2ZzoUCaU2Rq9jtQKsYqcaOj4WEF8Jfz12V7ILwIhAJroUy25P50me%2BD%2FXD4zwsymmbH1fSTHtL3xLC6%2B6P61Kv8DCHwQABoMNjM3NDIzMTgzODA1Igy946fkgPrwRNEsMlcq3AP0BaLRrJrz5OCSmK%2FQratg4wUUKbSGLep4d8obrZM6OkW%2FRqGpftmwe4zYsNsrLFvjt9zQVoa2cSJSamKbBI7ylp7%2FfYiqOuRxWMKEv1yJiKLen1u1kV8U%2Bj4KeG5IfP9J2r35H%2B4C%2FH%2FUHEx%2FmAVkbDNfqPKK2wjvogdqLd3y1CSeP66Njpy%2Fy0t9FIwF5WPUgq5ofjuLsthj1zwldNRTA5%2FRRbvtUNu0B3dF7cNPtPAwN35uSScNkY8YQANkF5ahk9IL35VOA4Gso5O7GFVxk2NmANssjfr2%2F1cO3h96hDC2p8s4E31We6swc1M2NURUGMM1sEbVJEYHsUvoK2zOxXP7XzWNyZz7qMoB%2BxTo3QSp8PD8OJfUtDgl9yqU9eS2SSy0pTJEWmBFPpBHNOfD9aUWCbEPluKbuOsfwakUgDwLqzaMs71ehtTmLEV2ZZEUDzuQusFfMhQ%2F0b6brZLhjKh7AaXMwkune9ABPBLTD6j6AVfY6tnQC7NCgNOpuCS9qBYaiycK71pfZ990SwadSo11Ts8k18jE%2FjKzcnpYVvz56L2soVM8J1NAv6W2oZywH%2Bl0Ck%2FGRs4yFStA8sg6VGp3asseT4lVSV95NzN%2BYSZzWULlwumP2FasUTCT%2BfTOBjqkAfgwvkvMGUKyD7lKYommJ6XpXqyXE%2B70UhCeHu8dC%2Frj%2B3%2BxOX1ONgwPFBds%2BGAbsBIcJCWzE%2FSDC7SZ9adXt4krAb%2F5QffVuTR6Wkvuk84IdjOBy%2BOzjuBr9MEcS5gihz3SAAD7tntRzFDbUekO0mIvA4BnnNYtkCPAjwYvE2hyynKnlRpg4E3AIGV8VMgdqr0q71QpT89EFbV2giIMKH7fq3oi&X-Amz-Signature=c8843a14e9f35195748395dfdbe220cc5491f50bd13d6b7dc3d1c7f610205e60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V6OST3TH%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T204526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCsB3Nu2ZzoUCaU2Rq9jtQKsYqcaOj4WEF8Jfz12V7ILwIhAJroUy25P50me%2BD%2FXD4zwsymmbH1fSTHtL3xLC6%2B6P61Kv8DCHwQABoMNjM3NDIzMTgzODA1Igy946fkgPrwRNEsMlcq3AP0BaLRrJrz5OCSmK%2FQratg4wUUKbSGLep4d8obrZM6OkW%2FRqGpftmwe4zYsNsrLFvjt9zQVoa2cSJSamKbBI7ylp7%2FfYiqOuRxWMKEv1yJiKLen1u1kV8U%2Bj4KeG5IfP9J2r35H%2B4C%2FH%2FUHEx%2FmAVkbDNfqPKK2wjvogdqLd3y1CSeP66Njpy%2Fy0t9FIwF5WPUgq5ofjuLsthj1zwldNRTA5%2FRRbvtUNu0B3dF7cNPtPAwN35uSScNkY8YQANkF5ahk9IL35VOA4Gso5O7GFVxk2NmANssjfr2%2F1cO3h96hDC2p8s4E31We6swc1M2NURUGMM1sEbVJEYHsUvoK2zOxXP7XzWNyZz7qMoB%2BxTo3QSp8PD8OJfUtDgl9yqU9eS2SSy0pTJEWmBFPpBHNOfD9aUWCbEPluKbuOsfwakUgDwLqzaMs71ehtTmLEV2ZZEUDzuQusFfMhQ%2F0b6brZLhjKh7AaXMwkune9ABPBLTD6j6AVfY6tnQC7NCgNOpuCS9qBYaiycK71pfZ990SwadSo11Ts8k18jE%2FjKzcnpYVvz56L2soVM8J1NAv6W2oZywH%2Bl0Ck%2FGRs4yFStA8sg6VGp3asseT4lVSV95NzN%2BYSZzWULlwumP2FasUTCT%2BfTOBjqkAfgwvkvMGUKyD7lKYommJ6XpXqyXE%2B70UhCeHu8dC%2Frj%2B3%2BxOX1ONgwPFBds%2BGAbsBIcJCWzE%2FSDC7SZ9adXt4krAb%2F5QffVuTR6Wkvuk84IdjOBy%2BOzjuBr9MEcS5gihz3SAAD7tntRzFDbUekO0mIvA4BnnNYtkCPAjwYvE2hyynKnlRpg4E3AIGV8VMgdqr0q71QpT89EFbV2giIMKH7fq3oi&X-Amz-Signature=dc798a20ae724a26c925e4f0bd45974235a323874b1a1a7f89d240b09c4a4bf1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WB5OE7L6%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T204526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHsH%2BRVULZ3SoqOtWmigArHecm8zF3p2DLn2SfqOJaKxAiEA2i%2BDd3ldQWLvyqYtcQaVERNh79Jy2ZHLegsIR0RUibkq%2FwMIfBAAGgw2Mzc0MjMxODM4MDUiDCKdqS3FxMRYcijqsCrcA%2FWVNcXLbCyqB0QOT7XNiM9m7VXlEE1HDEIfFNcjI8jeb%2FOzuuci59g7jpZuxd9VBAO3IGNg28SaI2idf%2Bg%2BrD4ulKiVj1NgZ90LPTvutE7fKRV%2FUtKIBiFgHfHX6exYYpMYNCP7Np5%2BPN%2F%2FLpyW2oT7QlfCOhrttkVi%2F2GpIvLD9bywi3pfnNel5lS2SVhzs8bmojxjcpvU%2Freg1gsqiUEk3OEADKny73W%2BiXvTtz1URqBv4iVy9RRKwLA9MBIYol7BohKEdIOszPrffvJe9tXEIS8VLSWLLU%2FoMCHghedMATx7C1cUfdUhO3YvMnOKCeijvZ7wdQ2iiIr8rcGn28fvJAVmIwZir%2BFVsmsLnt8LoT95EjX66YOv8xqucOttJcEBNEH1E01FNr0ZloKTHuhQRdg92lvFw7YjMxJWnbxdrNNco5cXiJL9d%2B6hnFMZLoLhSdecpg3u4amCws1srRm39N5lICB3oXDOh8HQjlZCTWUreGdfqU2mSjU0e%2FSX0oW7DbsqBSI7q1G%2Bnbb14e6PHGRogsaWNLiLFR71ngPq5USN6VNIXUnTiDGOlYGb%2BjBW8s7WtgdQscpQdefXNxWH8iwsYYthCoFr7sew0U4oduki7L9mK8Ubo5mPMN369M4GOqUBKcvtJTj7lk6sGZEbe1k2IMMiLdE0jpptgNnPPfsLNSpQNYQZKyL49Rk2KLZVu%2FT9jbCfoU8VcTlVse1wyL382JXkOa6F0L3dOcuHDD9oBzptFPaiaV6ZWknQr17Q5ivzutoHGNdlgc3YywhS6Vrti0ls5h2mH6cdWyLfRfWMlR7tfsZEP0dVoPfoKOpdX6SfJl3cI4Xq4OQQdnpYkNjQQmwpX9hq&X-Amz-Signature=dafe74fd31f6b4200f1a7c1c855344e9f4610506d50fd6c5ee9b9c5c2f7d45b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VYWIICA%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T204527Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDYV%2FpwxyBF0gs23XOg1Un3uwWVl5%2BGsBEKuUXHeOG4nAiBWgarm17cKFObB%2F6IQDiGQPf9k3xmRftprVb9A7AaBhSr%2FAwh8EAAaDDYzNzQyMzE4MzgwNSIMMzXzxCcRvOC6%2BD38KtwDfPJipKieu7byMRlKzEl6mZjdymI7F3MHnRl2y8NgjNo1AfkNJpTO74s1HSJL2H6qn%2Fbx7%2BttBEuAuP%2F4i3BO0lNB5gx2m8vQ9JhHIVHnWGDrKjcf9UwqOdmt%2Bkpxziwqzp6ZVNoncF%2BrrRvrt%2Bt%2BF%2Bli2YiJ4vhHlP6CiwSMBQpoocU9od9ep19j5yeS43bF4OQkYW15%2BE55HQjNpTpyxIZ4%2Fzug2RkHohRV0MySXkA1btg75DPviy8aGEK57dWbSUDRTnjxy6nTKmuMwwRoVpvMVAtr%2Bln7ODDIbX7MYBQRnFURv5LuAZifGvUmAE%2FQ3dwjpSOK5Psq3d%2FuB4ZNPWl%2FosfTWWVlxKUIohzRtgm43Qglcgf5hbUi8CAdHQdLKjLsTPjqtZU2mz18ypc%2FvfPDInflzgcb24lfX8FRffpY35fs3%2FMH6EMv%2FSrCruu%2BmFrn0UxS4sl%2BwCKqTpSUT2MzUxZRvf3o6XxL3K9UGaQy%2FxoL%2FPQnXrNMLRLkFSfIWpUI3eCrQHfuza%2BxKPjwCrOb8MemdHrNwlrt2%2BjzADOmS0JDW1%2FuZG5xyUlwvfXMAm%2FxKT3tzE%2F5r4WxNmq37MJ2ZZvcdGF1YuovCX9LKZaz6RN%2BX0YHGXPHX7Iwi%2Fz0zgY6pgEYByte1VIlt%2FmCH84JWQBEK%2FGn0NB97Z0fvdxbacO%2FbQ0y1GS7pGQxSuR7K8BfMV%2BlUiO9Jr7xemrpZv%2FaxDgV%2B4LuAOdlUIyBAXeXCWhfTjvK485tUhuAYYsD674ZRx1nTjzgnOl35W8MknqdiwiXArSrmhuLupj55na5XfdQloIyLWttKEFXSAmZxuB%2FMTl%2BXV%2BvtXUjqBhEiERPKnI%2Fxk%2FHOMta&X-Amz-Signature=2b19867a9114c9b575a725929c6fa322333b1708dac238033e1ed175e40d52e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NW3F5PR%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T204531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEmIIz2cnO0WqB6U8jxFfe%2FLuxeabgUC7SC3PuQK824pAiA65luaN%2BXT89R8JS%2F3WRymG7S5vB15cJeZx5YJCzkK8yr%2FAwh8EAAaDDYzNzQyMzE4MzgwNSIMOTFs9plg%2Fz283N%2BcKtwDxanXLLO7ZoKaz5K9gPhTLCk%2BCiLo2eG%2FELRsXNkca%2F%2FK%2BiaFXEVLxZUJmINnrHz7yknsYvNE0q026NB1Ys9e5ctzCqCR3jIWKX%2BHjbGoM1yicoI016MzRCHgS%2BolpI7m58XyLVW8%2FvT8v2lYii1bJyyI1fSiHNmmpRRXNJxijsgZOLZs7wnWWZ3ljf9nn1N99ZwOOsTCCQX8B%2BZGYln2VtyoB8yFtTgY%2BcvvTR6HX9UbDmgdyG2bJkfuC0Pp66jPUNZbl9hBjh2xU2xYV6f84fUDG9V7Q6V%2BzFsq44maLwSr2A0tM7x9hzzZhByYOsiR4NBFsR54zqcJ3pza93oUGbU%2FEO3GmNbdGsmz9NdccMcLknZWMU2NUxsOFiwMd9OmeOF%2BtJdvzvSlFQfkd45ytT9ezDoEGE%2Fl9HzLUtpsmbpNL%2BbiIWKklO3SWbso24eyjpLQWjxnjNs%2FZSkGPQNEtF0R%2Fjt2PuBzTRSMwea5%2BoZ5UoRZtN%2BrO1%2Fo98EF2mj4sC63YLF%2FH4CFHtSwhWleCJidS4Bx4hNrokRr4qs4uK%2BOJquT1PfBqNhdQ%2FkAl7EF4eeestmgbUJY00K1VKwMEPc7FlX5SXNcgrFr5vPeT0LztZ3cvu2BkD1i3EowwPv0zgY6pgH3ricOAHplQDkDfdZm0r2oOwCQlxxhcVBYfaOVMw9Q4kZWO7UkYvSVFCJ65HftQrjmOn%2BfO%2FsmLF2VgcVCAW%2FWnkgE44ji5DAp2UndJuxyRr9etPldLFPA47fdK9l0pLkNorlbdxfzt%2F6KKV%2FiJc7g9FleujIIbHL8V7zJVLya6uwI6sN%2F6w6i1mLyFAy3oUM15s4KBiUdtckkQI48UCMoL0k1e17U&X-Amz-Signature=7cf076db575fd99d663b999324eafb9c1374d67438c66af88f4b97d6c0a30387&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TQEGMQ7%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T204533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCK%2F0Tud1LP7%2F6WPTNXGGJgSAuU%2BigT%2FzuUqugoR31%2FsAIhAOkq1A%2BwLqPcgklx89ROyIMwES6WLovRCpC%2BLv6gr5nEKv8DCHwQABoMNjM3NDIzMTgzODA1IgyR6xn%2FcwfEbn%2F%2FGI4q3AP7neFyyyfhuDTobHMXDnZfslEqyCcaxJTMbSeqkw8S2F48X10Oj91TxUCeFkjqNx5Vz9V0nrfb3j3y4jxiMZ5oTp0nflcyWzdu9mSwj9%2FDndj3AIx4Hf74J6kjLdx3pIeWZBhIH0Hdr8ykb2Q0hMaEu6XXW6BqNpPgYyd9CQZkHkyBAZvM4toDBB6DWy0Xcmv4Fbe4k0l3a6fuwy%2BHaWTB9V%2BmLZGF%2B4vRN0CVSn0zAJQKZK8oi80usAGICmCYj6OGSH%2B9p2vMHF9bnBFjRZJ9%2B7s2N7bAhpIQkqZsKqYaa9Ib8gM3YgRr%2B1dnIcbZ6kanzn4WbBG0BeEIW%2Fpv9Go0SASaypjfhJB6ABWKGpBgxW0udj69ZHcUyA3JUHpS1cxPo38TbAn1RVtMzLN3tcQZMztzPc4yCMICJWOqH12rFWpxkf4bErxpBRjU5fW73spsnsEL3CdoW9P2riK%2FepcLha1C%2FLUPuTLMSaWl%2FDn1dx3JF93K7N1LBdfCZSRC0AfPVZHS2HwEycoLrXeY4lJsDUiFqLcg3YNHxHVWu%2Fdb14mQctO51MRkXBXzCCceHwV7ozWmbhBLgBRAIE518aJHy%2FU67udbDabOcGATyZnEHzTWw4Xvoqajg%2FfxKDCr%2BfTOBjqkAQaNrHpPxzyqW%2BfekSTI1x0z6VUkWvTZiw4wckXPqDgm0kh0GbEqwrKlZOPtq2wa5CUJ3RGHxK85ls%2FlaciHGuCp9%2BKphtp1HFpFzQ1kvEvSjzAn7SyI2MoAm1Cuc5oOs%2BnfLc6wHC3f7tck2ZgBMeCn5e4G5dehrW%2FZflC0O3KqS15F6r3GDvldxCoh4me%2Fy%2BYralffiEaImp2%2FR6gwbBAhKGR%2B&X-Amz-Signature=20e9265ad8ab42f5377c0ffeb7028d14e817ff77ec54be359eb4bdbc772801dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TQEGMQ7%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T204533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCK%2F0Tud1LP7%2F6WPTNXGGJgSAuU%2BigT%2FzuUqugoR31%2FsAIhAOkq1A%2BwLqPcgklx89ROyIMwES6WLovRCpC%2BLv6gr5nEKv8DCHwQABoMNjM3NDIzMTgzODA1IgyR6xn%2FcwfEbn%2F%2FGI4q3AP7neFyyyfhuDTobHMXDnZfslEqyCcaxJTMbSeqkw8S2F48X10Oj91TxUCeFkjqNx5Vz9V0nrfb3j3y4jxiMZ5oTp0nflcyWzdu9mSwj9%2FDndj3AIx4Hf74J6kjLdx3pIeWZBhIH0Hdr8ykb2Q0hMaEu6XXW6BqNpPgYyd9CQZkHkyBAZvM4toDBB6DWy0Xcmv4Fbe4k0l3a6fuwy%2BHaWTB9V%2BmLZGF%2B4vRN0CVSn0zAJQKZK8oi80usAGICmCYj6OGSH%2B9p2vMHF9bnBFjRZJ9%2B7s2N7bAhpIQkqZsKqYaa9Ib8gM3YgRr%2B1dnIcbZ6kanzn4WbBG0BeEIW%2Fpv9Go0SASaypjfhJB6ABWKGpBgxW0udj69ZHcUyA3JUHpS1cxPo38TbAn1RVtMzLN3tcQZMztzPc4yCMICJWOqH12rFWpxkf4bErxpBRjU5fW73spsnsEL3CdoW9P2riK%2FepcLha1C%2FLUPuTLMSaWl%2FDn1dx3JF93K7N1LBdfCZSRC0AfPVZHS2HwEycoLrXeY4lJsDUiFqLcg3YNHxHVWu%2Fdb14mQctO51MRkXBXzCCceHwV7ozWmbhBLgBRAIE518aJHy%2FU67udbDabOcGATyZnEHzTWw4Xvoqajg%2FfxKDCr%2BfTOBjqkAQaNrHpPxzyqW%2BfekSTI1x0z6VUkWvTZiw4wckXPqDgm0kh0GbEqwrKlZOPtq2wa5CUJ3RGHxK85ls%2FlaciHGuCp9%2BKphtp1HFpFzQ1kvEvSjzAn7SyI2MoAm1Cuc5oOs%2BnfLc6wHC3f7tck2ZgBMeCn5e4G5dehrW%2FZflC0O3KqS15F6r3GDvldxCoh4me%2Fy%2BYralffiEaImp2%2FR6gwbBAhKGR%2B&X-Amz-Signature=168466c8f58c5c187c72de445de15d3526710a2f6094a0359ca93208fb2507ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U36VQSRI%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T204522Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDRh5iV1C%2F0k%2B28j2DL9lOrQhF9%2FT3sONNzn%2F%2FBUYj8aAiBMAVNMlerIlgheQGaEmDlJb15If3bKjHv7tk1rCPt7Iyr%2FAwh8EAAaDDYzNzQyMzE4MzgwNSIMpVC13mDCozTiWdQcKtwDGlIzwscT1FVhwh9PZniKmpn5jOMdyQ5uRf859He8pngXUeJH3HGFhLq9LnpxAl5Atc7%2FzbDDrYSYWKs8j4aLOGwTH416FP1Sh9FDzVcLv8Z%2Fv4iYRKEji3Rago85Wco5wRc5FvNrU8t0XtTc%2FSmeIyNNVuWe%2F9BYMEqXuH6XKfSTF7OfdpRkqT5oqUHbFQ5crRvaq%2BWtC7pMlkLzeQy1z8fX9KX2UHi7RvjeyrVJ%2B4zVnxdUKeJGxddhSsr%2Br6H%2BOk0UFx5ZsO20ZwCEip9k7Mo%2BR2v429BdgCIQ32kL8XNY1N6uU%2F4c97F3AL80q84MNDi9oDEgL2GKEg9dn%2BzICnH%2FOlyD7TSGuAuiiXL5Z0mKCgyz%2Fv9wLjw14lQqnmgoJgk6rXkcMlJS6i%2FndPdG0rhOJu5XYgbyr8jVQktpmPVt05yGTJInCTejon%2BQvBjjospkEzx7SZF8UnnPmwp5jN4dDuPqwDIEof7AQkE93fL3kRve0QCpuVxRXBYoHqFvTWQ5AHIRxhGHTFKqH9Sa7SutkZ55psaP6%2Ba6LA2lDIOpV%2F%2BpI6s0Dw1Cm9jitLDBzVzy0CFmTjuBVD1KWrXdB%2B%2FFmh9LZCKM4siFU1b%2BB7pMQd6rMVOR7vz6Xu4wiPz0zgY6pgEcBGP7u34PNG5akcxGaSIYaD0VRJFvqf7pb6mzq0UHZ46isfVJecDLM2qcpHbG5%2BiRONCcE0HICieq%2B3d%2FIC5%2FTgnXVSKeEgdc1siJLRP8pFeqZclevvdTox3%2BqtQfrVK3w1NlSwFx8x6si40Fn9dOpq%2BdhdtuxEsFL0qleIZk0lbHcv82jOLg3htEn%2BZmNew70Jb2UeM3I58ydLMCRSyjZ8w%2FS41m&X-Amz-Signature=987aa435adc511a4ec568fe84545e8d767e8ac3b725ba1874ea4bcb8ea4e630a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CABYTNX%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T204535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDHlrm3p2cXvYX%2B17HAuAnv27CJzSsLn670LNnqIAfj%2BwIgMXRco6aljj86zAjeK%2F9BCUcGwkWhChzbgmiAMrjolkEq%2FwMIfBAAGgw2Mzc0MjMxODM4MDUiDOgWdt1c9LabUrMVACrcA53XmEBi%2Bp4cbyIOM%2B29TVGO81hhAcJyirFkLzJ38pem%2B2MnaQrLmGxmuoeoVfUlWguscqRqnYJzhOAhsNeljLWgw0hpYafZJbwnxsiQ4Z1bP29dkwrXTYsk%2BliWN%2BZC2mkazhyLj%2BL35lsp9JXo6Aqed1j8b4w0txSKy13RfKg4blk9%2BQdZzkvKOb9AyC95XllYb308zZ07FEuwbHew5oY6s0gWI9%2B9eGreEZi%2FyRtuWjuIhEwbRZMar5EX93VAPFl9VLEt7KvIC9u5vJ0DUQ%2BXGnIDDpTB073uWDPPKsEIfb9jtHHPx%2Bv51NCUf7g6H50QH8PjXLQw538JBr1ObP8w%2BceVPsO66xkSOJe6M66prv7CQq%2FGNT9LUTbMuHbmlqADM7z8nOyUM4B77c5RW18%2FBgdjEqNSfOyC52bjx0NlVGYmGWV6ulP%2B1rBE87f3sV5qwkEQuqFTE5fdHeVC0lJ82RRtUNXrGPZ4S5hAt4kduFrKn7N6h0acbT%2Fi58XSFe4rfME9XH15cSmCJwn4xOKsbaGNiD2fxmTnRxihy4WpgWDIZmoKkvKir34FoVMDioDgOFRvhujQVYAEERsq7GIzrg%2FAlJ4gh8%2B0L4ClFxqb%2BWbfMnFT%2BCSWqQ%2FZML%2F59M4GOqUBiiBh1ynEU5w87RJj5SwS%2FCIuVAmVPqquftqkdeUUQ4d2rywqlP18KSNFHH9jGBcJ1xad8iJGbU32tUxoBIBNhM%2FSuQDjEXPASXNkKOPTBF4%2B3LneUpJCB54gyBvBKhU6BmJglHV%2F0VV1hKRX23g7IExxy9ta9NpqwsEVsrIL75%2BLmn63q1WJGEqFKBMRT%2BiK%2FIIWZmb0VCvfjsg14oOjrb%2Bfpqyq&X-Amz-Signature=aed844ea288e3e853aad98e7120fdc2325fb876b63d6437fa2ebcba2a43e9ba8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CABYTNX%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T204535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDHlrm3p2cXvYX%2B17HAuAnv27CJzSsLn670LNnqIAfj%2BwIgMXRco6aljj86zAjeK%2F9BCUcGwkWhChzbgmiAMrjolkEq%2FwMIfBAAGgw2Mzc0MjMxODM4MDUiDOgWdt1c9LabUrMVACrcA53XmEBi%2Bp4cbyIOM%2B29TVGO81hhAcJyirFkLzJ38pem%2B2MnaQrLmGxmuoeoVfUlWguscqRqnYJzhOAhsNeljLWgw0hpYafZJbwnxsiQ4Z1bP29dkwrXTYsk%2BliWN%2BZC2mkazhyLj%2BL35lsp9JXo6Aqed1j8b4w0txSKy13RfKg4blk9%2BQdZzkvKOb9AyC95XllYb308zZ07FEuwbHew5oY6s0gWI9%2B9eGreEZi%2FyRtuWjuIhEwbRZMar5EX93VAPFl9VLEt7KvIC9u5vJ0DUQ%2BXGnIDDpTB073uWDPPKsEIfb9jtHHPx%2Bv51NCUf7g6H50QH8PjXLQw538JBr1ObP8w%2BceVPsO66xkSOJe6M66prv7CQq%2FGNT9LUTbMuHbmlqADM7z8nOyUM4B77c5RW18%2FBgdjEqNSfOyC52bjx0NlVGYmGWV6ulP%2B1rBE87f3sV5qwkEQuqFTE5fdHeVC0lJ82RRtUNXrGPZ4S5hAt4kduFrKn7N6h0acbT%2Fi58XSFe4rfME9XH15cSmCJwn4xOKsbaGNiD2fxmTnRxihy4WpgWDIZmoKkvKir34FoVMDioDgOFRvhujQVYAEERsq7GIzrg%2FAlJ4gh8%2B0L4ClFxqb%2BWbfMnFT%2BCSWqQ%2FZML%2F59M4GOqUBiiBh1ynEU5w87RJj5SwS%2FCIuVAmVPqquftqkdeUUQ4d2rywqlP18KSNFHH9jGBcJ1xad8iJGbU32tUxoBIBNhM%2FSuQDjEXPASXNkKOPTBF4%2B3LneUpJCB54gyBvBKhU6BmJglHV%2F0VV1hKRX23g7IExxy9ta9NpqwsEVsrIL75%2BLmn63q1WJGEqFKBMRT%2BiK%2FIIWZmb0VCvfjsg14oOjrb%2Bfpqyq&X-Amz-Signature=aed844ea288e3e853aad98e7120fdc2325fb876b63d6437fa2ebcba2a43e9ba8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YKD6SD4%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T204535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDenEMBmzgC63ENNBP43aK7eNti%2BRN%2Bo%2FDXIaCZ9M%2F7bwIgCS03OaCan35hewP9hx0MH%2BnaDNkcJfmLP316kWdpV9Qq%2FwMIfBAAGgw2Mzc0MjMxODM4MDUiDEyVyj2RjcrH9MHRdyrcA2bjmnlMQ%2FwaHcv5ZsQIoO6TjJEy%2BUzQ328rM6%2BdfCu9wFSkZLtqH9RHyFggTOS5lyuJ5dtF%2F4bwxqrp9FX2I4Jdz7P%2BbKSNQIvVrbfnQOyz7ZSvWmL9FWkWGvOgdQ64s84rVspRjL%2F7%2FvtLkV1pUpJrsU1KlRINqLjSvzokBWMQbI%2B8271ZQqm6dxzhTdayqAeYZaD514kknkC5MrrqsG3dHA823nDB2Kg1ubRCGkOpbZnqvAMpb8bwjyKNFx7g0HcUEhoht3Z8InhF5BkwrqDd%2F4scjAmT0rVBSctx%2BsSmJpoZNnvohSjA0%2Bs%2BXQtlLOvL%2BNng0dMAtqhADCBtNrtQnQDhm%2BcFXoykRe9hTIEp%2BMs8gd9JsWw3YgmO52k1yF%2FX0X%2F4PI8j2nMo4HdUpCH%2Bqoku0LyCAtQhsVWXlx3%2B4LCXWM%2B0iIFUz8wwuB%2FiqAaX4X4RJlAxxg89dZcxz7MIRQqdde8ktCe5dRb8tmu5gUtnH2shjGbGqE3SAne8bQKT9PomBeJKC8Khg7HDBCH0F9nFUL43%2BrydtCOUyYacDztLbvYEltUV87lv5inJIHu1MqZMEQjsl8m%2BxyFzvUCKRiZnt5NnzyrOyaHM31fjaocSNEnXnzR7dPBZMKb79M4GOqUBKHXNJt5CLzDWI%2B0KF35B4DOZG1tPL1GvHJbHBuw5d7Wgct4RIVc4ukj%2BJxNal7HwJi6wHTd1Xh2t7S53ZOAqKPW%2F%2B9hcDzUJ%2FwE2WEd%2BqDac%2BCzeyTsg1NPZybCooA9coOO9I1EhC8inbHSroBf3MleEiVppGKnZmjSt2g62e%2Bf6hPuFVTX1cQY3khvrVGrfD4lVio4R2i1g%2FZ7P6yLZjhzUBN9v&X-Amz-Signature=9003653c23d7fb85b525001bb84d30a0db6394ef3ead1b1fb77dd1c527ac2908&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

