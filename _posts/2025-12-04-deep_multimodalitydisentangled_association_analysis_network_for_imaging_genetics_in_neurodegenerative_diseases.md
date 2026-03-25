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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YPIH7PPT%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T005903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDNwhilrEbFfZ531WQxLwetoLbImZZD9KpNxvSFKhcoswIhAIfvXOVXu9B1bKtO41UbZR3Ud2OO1znjeyRmv7RzYOeTKogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz3gaG3HAhxfzuPta4q3AN8V7NwRBemJ1gYidX9nQ0B53mnPxNmAWPp1hsr5cKiaKMROwlx4Kn5nIT%2FOt8Ywu0cBWeW55TuMjv6SRXfgpec9Kh6hz1VxiSe%2Bn14VpH4rmmVvd9%2Bl2WuGZ8FflHsLvEV4OodynW49VpOCpzAjTgrnXWsr%2FY5wCiw9ZADind%2FIG4TlrV6%2F29Haq4HySphRmrXJ6RPZLTbhd%2BjZrJMuovErSY7sxLk7nmraMHQmNe31R9L3U%2Bx8nP%2BHKptzvPVNT4DUtxsxfFT%2BS7cRnMYQVeWF1jZXTGkPtCRFZ0DMNqxQouuM3iry%2BxOSfCfm%2FKOO3NR0gBgb36KxDClTyjS2D6bX11MVHi3%2BmjxduiVFJ7wOgZPC7%2FnDBjetVger6qimwIsjzP5GItwMzTgjSKSGmE22Vtt3EpwCIpUZ%2FPquHm6GfpnEFoSknrluniu0T0RhRrphCfhFI68hlhd3wA0jWKMiWeZCtfWxzK4wRXpLYuBM38D8zD%2Bj0rKlV8OaW2X0Ka%2Bqp0FLUtqTAfrjkvM%2Bas%2BQcTDLu6UjZGwGw%2FIMH%2FpX1ANhJSAEGbOaby7mePRkpcfFzpz09AHmwMDwFC2E%2FXWoDD0CTsIUUeOiR5WGpb2LFxMk0JaoW6mzPWg6jDw2YzOBjqkARaNPNIbukt9cL2zomvA0HmAJwY35%2ByBHOtmLIqv8AHQsC1j9ybj3osqJZoql9CsPDKT%2F1dfAOZ5t5Tqt1GZvODWLI5mLJSG5BP5%2F0cIZe%2FEO5c7JNCPGIoPTIOX62fY2eUHNULyr7gA%2Bzduv9Hpp9IACglV9ilzDYvGQnOyv7lsuIshdE6hJy2H8w1dp%2Bq516MUlkXxlI2xScCYLzGzERa8dUGQ&X-Amz-Signature=fe77c7712240f9c022e3e54b315327bcd488cde1d718fbf1752c415cd8a66a00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YPIH7PPT%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T005903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDNwhilrEbFfZ531WQxLwetoLbImZZD9KpNxvSFKhcoswIhAIfvXOVXu9B1bKtO41UbZR3Ud2OO1znjeyRmv7RzYOeTKogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz3gaG3HAhxfzuPta4q3AN8V7NwRBemJ1gYidX9nQ0B53mnPxNmAWPp1hsr5cKiaKMROwlx4Kn5nIT%2FOt8Ywu0cBWeW55TuMjv6SRXfgpec9Kh6hz1VxiSe%2Bn14VpH4rmmVvd9%2Bl2WuGZ8FflHsLvEV4OodynW49VpOCpzAjTgrnXWsr%2FY5wCiw9ZADind%2FIG4TlrV6%2F29Haq4HySphRmrXJ6RPZLTbhd%2BjZrJMuovErSY7sxLk7nmraMHQmNe31R9L3U%2Bx8nP%2BHKptzvPVNT4DUtxsxfFT%2BS7cRnMYQVeWF1jZXTGkPtCRFZ0DMNqxQouuM3iry%2BxOSfCfm%2FKOO3NR0gBgb36KxDClTyjS2D6bX11MVHi3%2BmjxduiVFJ7wOgZPC7%2FnDBjetVger6qimwIsjzP5GItwMzTgjSKSGmE22Vtt3EpwCIpUZ%2FPquHm6GfpnEFoSknrluniu0T0RhRrphCfhFI68hlhd3wA0jWKMiWeZCtfWxzK4wRXpLYuBM38D8zD%2Bj0rKlV8OaW2X0Ka%2Bqp0FLUtqTAfrjkvM%2Bas%2BQcTDLu6UjZGwGw%2FIMH%2FpX1ANhJSAEGbOaby7mePRkpcfFzpz09AHmwMDwFC2E%2FXWoDD0CTsIUUeOiR5WGpb2LFxMk0JaoW6mzPWg6jDw2YzOBjqkARaNPNIbukt9cL2zomvA0HmAJwY35%2ByBHOtmLIqv8AHQsC1j9ybj3osqJZoql9CsPDKT%2F1dfAOZ5t5Tqt1GZvODWLI5mLJSG5BP5%2F0cIZe%2FEO5c7JNCPGIoPTIOX62fY2eUHNULyr7gA%2Bzduv9Hpp9IACglV9ilzDYvGQnOyv7lsuIshdE6hJy2H8w1dp%2Bq516MUlkXxlI2xScCYLzGzERa8dUGQ&X-Amz-Signature=fe77c7712240f9c022e3e54b315327bcd488cde1d718fbf1752c415cd8a66a00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPOS4QBQ%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T005906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDgzCda%2BH3t2tXY4LOPKwCbSGeGXhNWxiivJi2RCnqCKwIhAOKWTC%2FqtHWDu7%2B6P6f84vYobWT9FoZltPMz0%2FId1n4yKogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyDRBlZb2UcNc8zIhIq3APNpyxoGjrnFAPyqVw431mEeptx9mU9VQZnBJFKRmVglW7pAUKkhah672Pnpm44QXINmck0gGuYou4YUvULu1kPlxYag%2BgXppaQaTIX1WgFO567DYPYVusLImkfINaEMsJUR7P49uSiSWFQVDpUVw6YgR9b8UfOr6RLL46%2FRJnVpPCW0nNkGE0FXPRdiv68E684qj%2F6QM9rIr4YjnYEZUy7b5KmqsuKY3ORVqq7MKi9VkaaSHZsxAcB1OEuwUtxM9qbwHOtFV7CA403bOTIJnH7wBl3DWjk17pzFNxUF3Z5qM%2BVYgJGmMi%2BYmWwz4o9QMJC1WmOYSuN7ytibtD9a7hWKnd04Gf8pMTC2ogi04RJSmMVWpaAmtOVZ0qWB50whexo%2B%2F6q0nlLBhGnXTEufCuJxVlnV%2Bv86X%2BCS9MUFfS809V%2FHW%2FNQxf%2BxOmeGekVYXAhIIdUuSLBUO15fHiR32BEe4ANn3fl%2BFgVURN%2Fh8F0jBDBDuPd0OLHbEvyyS3xpES7%2Bi7UB852BWxMJf4jajKaTVzUuzNRUQe%2Bej2v1sum1LRZz0B6D%2FitonuXoRIQQA4cEM7gGOSwNLP7GV6T2c9nLGgLV3LGeGh9MYUyCeL%2F0hbCdHEh6OA5CPDtTjDb2YzOBjqkAcbwLHhRrwjeAv%2Fn0nAc%2B%2FoKwqTLUtMfjqf1oQg2olUJw2kRWwWMACt%2FhbtbuZtZlOtBp81x13I1LIv5IQRINQ%2B2EOSFslRbEoaR2AQ08VXvAkcBc0v4noSuZ97zMfU863c9NIb7p6NXI02SxKXCML39Hf9tqw7U0uoCD0eovzs2jJ6zc1AttAFHr7rM4E4x%2BVj4AWQghH6WNlG7hE449R1EqxUn&X-Amz-Signature=dc6f8992f1eccc797b81cbc8d52f3113fd13a9bb4f6320d2e6f9bbc51284185f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXQYKVR3%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T005909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDmPOEvy%2Fz%2FH%2FBrAb%2FL6kmhgy%2BYpVYv6Tm3UpcwiDYZtAIgZSRcNYnLvJvP1vpQ%2Blr752%2FcbUIc0cvcL%2BPsPp77f4IqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFnPeVPvlDI6TeGzsCrcA%2BdArhB46ep963EbaZ6FdTdyL6ZiUmSYjEF7xSvR1etvEequZ%2BgPuKz0OKJtGrE72CIaGE09AN3xkHDaDMmFfJYy7ctifcBLurwpO3hFwZtPRh042LoXPgkNLVv7sJpqUktQc3DwoKpBTG8Zf8NMWj06sQddkghfQEfeHE34E89NV4iujL2XHvjQd4n%2FNHEJjq5yOADTWy1DLY5EHkErb1TC%2FC3UTj8e7Hbsdh6KKphkb%2FrJV5NqkQKlREjLf6s2pL9Ssjg6Efc5dR9z7YFW9EF5EOW53NFMiJzqiyGKlgVvkmaVgIGSR%2Fk2buQuQ2QBFHW5iz1hjqJbI6dFB64lHMn%2FjIxXGLq%2Fsj2Zr1kQc%2BmIdI4KQ3pDfpnHe8yXuF3EXvd3VK7WQwOEEdS1kKVUksuNIgCpkaemX9CrYK4pR7LXbQrvi06li1PvQ9%2FUQQiIzOcf7zQ0MW1dBJgS5mNl5FkNLymuCE1wCYwx4yeeSmbUeZ5GH%2B9G2k%2BmNtwapFDgLQ%2BhqnbohbtjcTEjDfTUj1M0sdxHBaaH77QKhuLWemKN55l3YhaVoL7OQeRzHrOj9qDXsjFEJhHb22YNgByiUVTAGrA6WsFd4iBOsWV6lIj4M%2F%2FEqd2b1iN2Y6MTMIXZjM4GOqUBILcNVI%2Bdcu%2FnO7I%2B0%2FKICVdKVAGgFgOn0PKQq5YlMZpkXkQ%2FRb%2BgHo5hkluoC%2Bx1rs5yyDPhyQLaIMwTwOMjcC7ocAhYf8vcp7Qww5OKfhxP6yadm9F0RIg3aIy830EZMFODUGam9%2FKQdJtMu%2BoSD3yGjbfUIIKlfdUdlJXCNcDBPm4vaIYd2wH3yFnRQRvOvxPvT2t%2FU34xUmmFt8K5Zjp%2BqQlJ&X-Amz-Signature=1099be6fd505dc96cf01fff4b2afca91ce6b7e18f56e12d24aab4c95c16074cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXQYKVR3%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T005909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDmPOEvy%2Fz%2FH%2FBrAb%2FL6kmhgy%2BYpVYv6Tm3UpcwiDYZtAIgZSRcNYnLvJvP1vpQ%2Blr752%2FcbUIc0cvcL%2BPsPp77f4IqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFnPeVPvlDI6TeGzsCrcA%2BdArhB46ep963EbaZ6FdTdyL6ZiUmSYjEF7xSvR1etvEequZ%2BgPuKz0OKJtGrE72CIaGE09AN3xkHDaDMmFfJYy7ctifcBLurwpO3hFwZtPRh042LoXPgkNLVv7sJpqUktQc3DwoKpBTG8Zf8NMWj06sQddkghfQEfeHE34E89NV4iujL2XHvjQd4n%2FNHEJjq5yOADTWy1DLY5EHkErb1TC%2FC3UTj8e7Hbsdh6KKphkb%2FrJV5NqkQKlREjLf6s2pL9Ssjg6Efc5dR9z7YFW9EF5EOW53NFMiJzqiyGKlgVvkmaVgIGSR%2Fk2buQuQ2QBFHW5iz1hjqJbI6dFB64lHMn%2FjIxXGLq%2Fsj2Zr1kQc%2BmIdI4KQ3pDfpnHe8yXuF3EXvd3VK7WQwOEEdS1kKVUksuNIgCpkaemX9CrYK4pR7LXbQrvi06li1PvQ9%2FUQQiIzOcf7zQ0MW1dBJgS5mNl5FkNLymuCE1wCYwx4yeeSmbUeZ5GH%2B9G2k%2BmNtwapFDgLQ%2BhqnbohbtjcTEjDfTUj1M0sdxHBaaH77QKhuLWemKN55l3YhaVoL7OQeRzHrOj9qDXsjFEJhHb22YNgByiUVTAGrA6WsFd4iBOsWV6lIj4M%2F%2FEqd2b1iN2Y6MTMIXZjM4GOqUBILcNVI%2Bdcu%2FnO7I%2B0%2FKICVdKVAGgFgOn0PKQq5YlMZpkXkQ%2FRb%2BgHo5hkluoC%2Bx1rs5yyDPhyQLaIMwTwOMjcC7ocAhYf8vcp7Qww5OKfhxP6yadm9F0RIg3aIy830EZMFODUGam9%2FKQdJtMu%2BoSD3yGjbfUIIKlfdUdlJXCNcDBPm4vaIYd2wH3yFnRQRvOvxPvT2t%2FU34xUmmFt8K5Zjp%2BqQlJ&X-Amz-Signature=acc570b55635e4f3139733a6bafcbd1e150c4553f1f1b222328dbc0314e7d1c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653NDOSKI%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T005914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAy%2FM%2F2y42DXRG07PYYb7kJ4CzawjYIjadcAtns%2FWo6pAiAnrjZEXByA3zfr0FDExU1YaHaJ7gXsOPM8ZQCAi1225CqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMDuQhJqjLiwm6GRJbKtwDb7ZaP1gQIwXj9iTdNcSrCjHvnCeJN%2B7aSPPzZhZ1hP6%2F37utCE1VgRChXXZYsjvwNY841o%2BrYvkTHWHQ8LhbC0uObnnzHhh2CE0cR3PGAoCAV2arcDnami44ec6m%2BwQwnvtzsAQlu5BWlXv3YrFh8engUkifP%2FlJu3mTpSUCoarpEw2zM17jPWskvvtHF0YzG82P9Ff0jPKVf3XXDqIUWhP1PTzuorHLKcYhmEFSsHxWsM7aHAVISkM%2FoluMLp2PtIJeJkXH2tgK5FmpbYoP8J9xuAkRnhPyjPdRW09AvjsvQns0xhj7ZLVNfOKIDV9Gk5bSJtmPfQ%2BPIuVKQzHw9yCSbvOzgtqOIxjUqfeupDLAeJNEd9ZrBEfw5%2BgQea50dyJ4PSvkaN9asvx8YnpMvfl3a%2F6RTeD%2Bz5Rol2AbEBvzI9P2ViCqHWOgTTRcZMYJIFGfPDEMFxA0ja4Ur%2FmIeoAf4A7Uqb2LvdgzR8mMPVFas7LhhbbP4%2FXXqeJYjvjRv5pdtBRaQZWNmZT73QlA8s4F66UKNv%2FcIc7v4xvjYl28RrgdpYcVVrTdpyX0v9pkmv9RpzgEjfllryCRQGrd2cooLaz45VO0Xom19lQ0BXq9Txej7oMEqJOpqokwntiMzgY6pgGxvkxlKYax9e%2BwgXzP0QPnspP0Nf9gzOzvCFsx7x%2FMqy9Xv7XSAmWfNGSdYMf3oUFFBDE8W1KzKFHJv8gh82Pxw7nFudrrnOjvwaWeWvWgaKEsJ%2FGMbpUw%2FoFB%2Bj9JSCAO%2BSxx%2FMPExz44LASCjA0qZ4yDT%2F7EQ0LGMZAe%2B%2Fd%2BJI4wqchnjiF0au2%2F9EdYbS%2Faj7TLqG1oYm8dHH8O0peTVOurVpp1&X-Amz-Signature=bc7fc60e742671f206b9f945afa8182df00d2b1816d5c6a8b98a88d29911e6af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BNR3OIP%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T005914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC9Fa1F6m%2FgO%2BLok6u5N6MLiHxQEK46Mu%2BAV53oox9eyAIgEgvz2zwqHW8j6D8gpEPhWdiMWHPqrNNFeGQFOC%2Bd4LsqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCbhSKfVy1yQAfNhXSrcA4ozA4ecndipx9xBbADALJ0IkW10mrQrJOJJxC0XymbPhuPx%2B%2BKrV4FW2WI1SuMREn07ERIL4z1WzAU%2BsNPdts1%2Bl0XUh144C43%2FIo2%2BoRdulxwFY3Or6avDO2NM76h76K2gXFMiskRVtFaTsDdsAmiDiPfw2DoeafG0VPhe44ugFyC6aNfwXQFOPjVpMTDXoq5QKq6wWKGjJ86Q1CV%2FON6wGnYF4jBzeK64j5nS5t%2FLaLejpWbqiKbPHJo5ZYw7qLn4DRzo3eSQ0PuQeGMTSYY45twHMRMfdFurwtw5NRPSU6WG1FHGTWXyPqMq%2Fd9vpeKDb0W2B3ObQA8vAJCLqH05Sm4faKvASAkklzzojoUS9nB%2FXKGQGGWAOTvp0L582Pdu1wo5ktLJgDye%2BlzSkSnuBBs%2F1gyo2eK6XceUUikFUOM0cX4peQjZf9sbFnEHoWRVT%2BYG4OmX7lsAIkX5G1SGZCGhz9%2FQaDmTD6simeptDYVfIxuKLg2QGDj83Tx1oOmAu9QH232JPk8woSoEepzf3S9mmxWaCB2jSst1y1En13IFppZzmX4od9ieRlKcmvu7qiQlt3QJrdqlhWKOJkAF2xyof0ziP%2Bl9iNztawDauBCSp870tev%2F%2FlJsMLTYjM4GOqUBpOT4CXfa35cgWC5pd67ZEOlCMeYO479jPPbjGBq1rCjUhTgbhz1pVqWXa8eWaK9teacTyGViDLtDpv92ThBaLylmhLnjR18v9p7OJjh7DloDN4okYzWqTp2DWG9f2Mb27qsw6%2FGR6eb0wKdY6gb%2FPZxFqxJ9Vogfdhh9wCNrqOb4AKHsWSrsk35Q9wyzxVW0mA3mADWKDlIoIe3JYs5f9cJsbKOc&X-Amz-Signature=7bd63f9de0804809c1b0b627d9cda4572b4ad70333c751e31eafa071c9bec6ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625FNTDA5%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T005915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDxYjRDH43EXRHSJuLM2yJoMss0g95h5bXgdPxBQK9gjQIhALuhB5IsngJNWmvBPlpgPnpr9JY3zptosH1QThSdLpSjKogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyE0z9%2FLs84OeOSkzQq3ANNpGSQLS%2BGAAhLE0E4bD6ctG%2FQBdJmTcTKRnkX4%2B9ZZ1zE2ZOm2dmgncawx489AKIEGq%2B5FV68SU74nZJQLPNxCBmV9HMXhzEiewMyBGkzn4envNSRiX4%2BZzUnhHuSUijRoUs%2B77iihO64bZlEArTnvTMgDlLDFaupxb5x0ShLDGCoKeMH%2BdktcAZEgH3QW0myP4VaRcVrwX0nNlw9AidaWPMnq9d%2F4OpLByzDoX0k0nfQ%2F1NavXVoh%2BTTxFnSwxUVAj3UvBttdOfh0%2BFNRv62YoPkCBvqZfzn8CLKyAFFr0N2qgiSkyuyBKeAnBcs3kDw%2FVivBdiqUPgWcmyI8wxYOW39PMdo515Qf0FWG3j1liI23opCUaw8nqPnYAp4KYB9NhphdsJ2hJsK%2FDObPGNqKunE26egngHoTY5xkFIZd2gKyX96F9iCR9Lex7btkTpmAM%2BemXTBU093wRojPZ2dK%2BNYh7hmGU7uvIbLvRe9lvTmC9Oq0%2BcqycdJr%2BjlDcLf%2BSFaTP4Aq175E6UbamdyQRT4aG1kN2gd7MUrh05S%2B%2BVKovONgNYnKHkOlOqKC9OryesT8pqiXC1B%2FUoXf9IqMFdp2qxtA%2FP9qy59rWQGhUklD2pnHWRn1VIKEDC62IzOBjqkAXAsvzzr%2BKJalIMTxhKZkS4SAYq8cIDGLwP9LAUvUE6hZSuglyF%2BAFVDBe77krYbIGzHOn6wxZFSHEIxd%2FzAeaAUO9a07vnkYn62XXOTviCf6I8mqUOADgUnOMg1%2By10JvH6nfhYjGt3Shc34XdwRoEDqfrZfENT%2FVCVhpyM08MZggcNiI8jSOjhDPVmVoUHcPHnhaXWxO9JJhNoWkKlsyU%2FCYNe&X-Amz-Signature=d3c962020c5dffbf044a01408a604ee37164ccb7ce61e5fc772bb4f91559d7b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRRPPQFB%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T005918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHUsoXTshkA5fbk3FmeROoVRVR1YjRSHZYAPpn3WZ9hFAiEA96vUc59b9ypq2oQSeqalhuVxEsM891nT6NpxkN6N8NgqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAF7Az1I3%2BpK6ksFPyrcAzv8R8KnbWGn3x4ZFJH9WsvdgmrubAbMjuiLuszrFJBkidaAzT48KFeqyDjAwdaBfKkqVB%2Fqqlp%2Fb%2BxpSWyDBJDTQD67sB7bar1hKuP7R8eLh2yTaHMdINLeiznvk2hkBGqeVYxTpFhI2x%2FTSsd1LrgqupKnK1x5gDqHdY1KczrwlMHyXwsdcdD1CsH6qFLQDyco5Xu2SY%2FrsYnBCUj0%2BnUtbtGLOgfHEFPl0NXk%2FeO03QEXCRCK939VpE%2FzxbmwlaNYCIyFpEWP5u25OnNMwe3gRWMO4jQhfClhWIltuEkaHtW%2FuVb8NGqjtye1QsL%2BL94yBg%2BVLpWIWC5hufhTpMGkta0Q2EQHBSgUWQsWj0qZSg2vWntSxtcPtpH21KS5lj6ewXUkoi7IbUWFTaF0wocIPaAJi2cZosrdRIMojJt0oMFPxBbeepRMCgSuzHsD%2FbGs1oLUn1qeAVhQwLzk5k4jbJfkdICeqZNUSzKE6Rew5vTz%2B6N6MojOR4oaa3qhjs%2FpSZQZ4r2177texIk5pdh3TICGpORXCWFuc7nA3Yz7azrSUwk4EtWSa70Ex1kcQGz2EQ66F2qi4EYe3SgBaQuUojO4bZhseyy6HLNvt9%2FOU7HOVies5nFsPEFlMPfXjM4GOqUBGjdyJ2ULduNO1YmR791xadvekkl9dbtSB4OCvgohRiknPaxep2Q%2BpDVEVqRfpy%2F3j9mbcDi4mi%2Bhqv5tlJA3VVwn4CLGUWrA2ptEUVnD2KJvJCuRojncmsx%2Bq5zHpKNpx2UFLFK6HhN8jpUcLhG6wBbUEStqTK3nraA1NtQeX%2Fzn9%2FGZupEzBT6h5XvVsPTWL9alljNZfcvxAwxvro1EO7CCfQBp&X-Amz-Signature=dfb595da04c90df09412c51d7e206433666c7d8e9c66f12026e60218be8ac2b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRRPPQFB%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T005918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHUsoXTshkA5fbk3FmeROoVRVR1YjRSHZYAPpn3WZ9hFAiEA96vUc59b9ypq2oQSeqalhuVxEsM891nT6NpxkN6N8NgqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAF7Az1I3%2BpK6ksFPyrcAzv8R8KnbWGn3x4ZFJH9WsvdgmrubAbMjuiLuszrFJBkidaAzT48KFeqyDjAwdaBfKkqVB%2Fqqlp%2Fb%2BxpSWyDBJDTQD67sB7bar1hKuP7R8eLh2yTaHMdINLeiznvk2hkBGqeVYxTpFhI2x%2FTSsd1LrgqupKnK1x5gDqHdY1KczrwlMHyXwsdcdD1CsH6qFLQDyco5Xu2SY%2FrsYnBCUj0%2BnUtbtGLOgfHEFPl0NXk%2FeO03QEXCRCK939VpE%2FzxbmwlaNYCIyFpEWP5u25OnNMwe3gRWMO4jQhfClhWIltuEkaHtW%2FuVb8NGqjtye1QsL%2BL94yBg%2BVLpWIWC5hufhTpMGkta0Q2EQHBSgUWQsWj0qZSg2vWntSxtcPtpH21KS5lj6ewXUkoi7IbUWFTaF0wocIPaAJi2cZosrdRIMojJt0oMFPxBbeepRMCgSuzHsD%2FbGs1oLUn1qeAVhQwLzk5k4jbJfkdICeqZNUSzKE6Rew5vTz%2B6N6MojOR4oaa3qhjs%2FpSZQZ4r2177texIk5pdh3TICGpORXCWFuc7nA3Yz7azrSUwk4EtWSa70Ex1kcQGz2EQ66F2qi4EYe3SgBaQuUojO4bZhseyy6HLNvt9%2FOU7HOVies5nFsPEFlMPfXjM4GOqUBGjdyJ2ULduNO1YmR791xadvekkl9dbtSB4OCvgohRiknPaxep2Q%2BpDVEVqRfpy%2F3j9mbcDi4mi%2Bhqv5tlJA3VVwn4CLGUWrA2ptEUVnD2KJvJCuRojncmsx%2Bq5zHpKNpx2UFLFK6HhN8jpUcLhG6wBbUEStqTK3nraA1NtQeX%2Fzn9%2FGZupEzBT6h5XvVsPTWL9alljNZfcvxAwxvro1EO7CCfQBp&X-Amz-Signature=0c2870047826c62fd5d7557feb59fe876962f22588cfcd84d6d9ce9ca539366b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RA5LG2I4%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T005900Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHGOJ2Sb5oksQd8sgh7zLtjjfqlKPsRgwKmZEnNqc07rAiB%2B%2BcIEi0fu%2FAGS7AQWKnCIz2JCCIRvWZlFAr9xGC54YiqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9OdDmdJgyzJZZ8mXKtwDOQT5CTSRQFbiVWM0E3FRxO%2BQ1OoVrZOlPeK0ZYPR3AL0A%2B3Xr3odLqrL9gg%2F2tzlQ8U8a%2BwVjYysAafDhl2L3a%2Fum3CsjzYwugZJNQGDcSSDOan5JGJjIxxi2BeZNosgBUi%2B95gVzNwNInBIVuwrTUSqTZiiZm79e036zCmzRqGz%2FPAtDcNvCu0C0G05BQyi4EPO8jplx7aTx0a8FzUJiG6XLznyhFiC1CqwT8XFNwxNKSAq3DiuXs7e1sdvgmQo%2Bque7GqBpCXN0WBLsBBXxiYYcHv5Qr%2BT5WLJIKx8M4mrHzd1C4sO0oPsAhA7gXLU0pWUegN4mvcJccya7cMwaQ%2Fj5%2Bm%2BWhQSnqQUoSH%2Bm7QqvpnS9Sl6STUIaxxaomrUekpKqZVb5Cahmrn8BP4YtszW9vkn60KeaFM2x3a6Gf%2FJDgLr2L7zYq8vDkLgMLqZS63NX3oZMV6L1DVfB%2FijDmUfSSoGzMMIhhAD6I%2FKT0F60oH6ydb5s1gejzxpx2VGGQga21woste%2FmTk%2FMzLoZQ9yUKnhSw2Tg5g5OsixLoweT5R2mYp8ZSl%2BikbYMqT36H2HTFfaZ95q%2BzfBJWbcNy5rYedoOsi0R6WIbY3lyV0fVTFj0BGN8kpXdb0w29mMzgY6pgGCob%2FTfDYmnENUN2x76fKbk4Vu68wNrpoo1oksRhZzS%2BEK3XMpzNCZQ%2B6x2DXfQBLsdHuu0hcgLRiwliTyYpOObgZM4eK%2BmRHR1PPmvNbQ%2FHHkrYKk8%2Fgd5fbVuD%2BzKe9xD7TmzlFUC9aMdHm2Dmf1cpnaSxLN3Ed2DAIMysRbP%2BMszRyrpiKTQzZB9bDKnePoEbjTk7weS4CeG30lHY4t9Qlv1oW0&X-Amz-Signature=be07168966f6e7978d098a5e88df318a89d22a98d873d2372332e3a57e580dfd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665PH4ZNJ%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T005919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID3fMAAybcWE94GEVB9nDlssOfVVU1OCC5Zawm93DxkUAiBC7kp8l1pw0x2%2FdXfvtfzyX2mJypeTTLP85cKlHvzZPyqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcy6IXiTN5BCrsTNYKtwDG9wwCHCV%2FsM0uDKhhOgWu7zIuGijmCczWq8tvZuKp%2FUy7yNSDG7KmTz6eJDIfBWywk2RCKSb9t2YTy0i7hdHRZd4fcyuRqeAIQcfHXoP72IjBl4R95iAHO%2F2fj4NYlYXfuV%2FafVJv9TR5BcEA2Pxv43IFO8Vf6ThB8llDovAiNn8alcJeSKIGA3erPJBYtGfNfeBIrfE42SC%2BjJiQRCxNUV9y4hWWj3VSva%2F0dy921JTVM5ezwWc8%2FhCLxHslxLnDviDuXvKlgfD0xoUyaBcB1gmb6gunyj4AD%2FCPlBKpBU2UXL9eZZOQ0XaNRj82%2FXRl7yGDT3VTeKvAOnzgqv15wJqAb%2FCukROEvxqla6HI8LPBtBFNX4rLdH7NmZVGBaoqFG2aGYCaQLny7ptbqzPsYN7ANlhU64%2B6%2BIuRx5SIQ76FQUyx%2Fs%2FoPAYmDUE6E%2BEKqWJ8z3eI43BD5z%2FzV3jzkP57ngCxrR3gPxeq5jLO0pVRuKnZ5H6BpmY4hwIywUTXEeqkDCSZ6C7d0%2FS58DAD9zo9MMKTlW1Afbivzo4Tww6dn2m3kUd9SoIar%2BwrlOHit1SVNQ%2BvTlfq0ZgQFpNRAeYx9ofQmm54cDZ9uBKpyMBHBgG6LNHtbXsAYAw79mMzgY6pgHYSZo4t1OHS94d4Bk4MxkuuwJq%2Fszt%2Fx4xNOaEL%2BRfGmNmDLGp81FWtjwoG8D9E3audm67Yw78L1d6sL%2BHTdUUa%2FGlT8hxv5%2FBoukr%2FV1rSs6SKLn2ws2hm%2BWRzywTyLGogZ6MmReLEylTn3AEcXxnfoA98DFcxnzHpEFxHxQLEsQffsAQt2G5ycjSKCzuXMbDou9ZcSyxGwNbrrOYY3RZBhLtltWC&X-Amz-Signature=a3faee62494984de809c0d279402c43a49d4d0a84f604275636faf922716a0ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665PH4ZNJ%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T005919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID3fMAAybcWE94GEVB9nDlssOfVVU1OCC5Zawm93DxkUAiBC7kp8l1pw0x2%2FdXfvtfzyX2mJypeTTLP85cKlHvzZPyqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcy6IXiTN5BCrsTNYKtwDG9wwCHCV%2FsM0uDKhhOgWu7zIuGijmCczWq8tvZuKp%2FUy7yNSDG7KmTz6eJDIfBWywk2RCKSb9t2YTy0i7hdHRZd4fcyuRqeAIQcfHXoP72IjBl4R95iAHO%2F2fj4NYlYXfuV%2FafVJv9TR5BcEA2Pxv43IFO8Vf6ThB8llDovAiNn8alcJeSKIGA3erPJBYtGfNfeBIrfE42SC%2BjJiQRCxNUV9y4hWWj3VSva%2F0dy921JTVM5ezwWc8%2FhCLxHslxLnDviDuXvKlgfD0xoUyaBcB1gmb6gunyj4AD%2FCPlBKpBU2UXL9eZZOQ0XaNRj82%2FXRl7yGDT3VTeKvAOnzgqv15wJqAb%2FCukROEvxqla6HI8LPBtBFNX4rLdH7NmZVGBaoqFG2aGYCaQLny7ptbqzPsYN7ANlhU64%2B6%2BIuRx5SIQ76FQUyx%2Fs%2FoPAYmDUE6E%2BEKqWJ8z3eI43BD5z%2FzV3jzkP57ngCxrR3gPxeq5jLO0pVRuKnZ5H6BpmY4hwIywUTXEeqkDCSZ6C7d0%2FS58DAD9zo9MMKTlW1Afbivzo4Tww6dn2m3kUd9SoIar%2BwrlOHit1SVNQ%2BvTlfq0ZgQFpNRAeYx9ofQmm54cDZ9uBKpyMBHBgG6LNHtbXsAYAw79mMzgY6pgHYSZo4t1OHS94d4Bk4MxkuuwJq%2Fszt%2Fx4xNOaEL%2BRfGmNmDLGp81FWtjwoG8D9E3audm67Yw78L1d6sL%2BHTdUUa%2FGlT8hxv5%2FBoukr%2FV1rSs6SKLn2ws2hm%2BWRzywTyLGogZ6MmReLEylTn3AEcXxnfoA98DFcxnzHpEFxHxQLEsQffsAQt2G5ycjSKCzuXMbDou9ZcSyxGwNbrrOYY3RZBhLtltWC&X-Amz-Signature=a3faee62494984de809c0d279402c43a49d4d0a84f604275636faf922716a0ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEP6BQJI%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T005919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDbHfnBv7kPdUapbxwcLm6qL8Kr%2Bxaw1mAAAVhXqOg75AiBEpufpaOqYcNHXCBFCt9RATb92%2FGC8d9Tz1Awym8wKzSqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsDZKSVECy14WE2j7KtwDLw6NS8THEgx9Un6PLjW1NbiNvPL%2BgjFWFyTek7kuf%2F4GPu%2BMi4uyLqMcHGIaEKV1%2BaWxOtQOrwKUxnV4VhDcEu6GUMoNW8lTIQvQEJp0eBOVzQOD6VBQ%2FrwDf6dDSA0D1yrlIuErGjF21xjK9joXMBPPuKcxxgIjyxvRKvxwM5X30E1eyxOg%2BI0wCY2NOTEaIqLVg2EKYRXwL0l1PCsEUtTmyj9%2BTbfyxv3mlyIqNEY1BINAy4XXfkVEHj06lPCh3w92HBvkQND5b7wSr70vfXyJgKMQXJbLSvCHz56Qp0d%2BVrckkWvIW9JNJvyjlUO9Bu0C21gEYR1AVMYAUYa9l5L%2BBdR3VZjLQWQzjMnW6GW6wker9xwJn4pHPb%2BErrQx2Bp9qf7nokHdrsI3IgIrWICQi%2BlNjNm5rRo%2FbOyCrOK%2FftEdTi7EYzGl2nEuMnPdQnyx6BHrLwfWf5xODfh1DqUTj9C0GGU8lWKFcu4SHvEHlnK4ewui2TSAz2ZUqy6IgtC6sit%2FPCuN%2BjySzgUzUGDdCIf%2BoNu%2FmcaQrLvrUg1Es9v2MfYDL1SI3YuAIC1lBfowUO8unAr%2FC4LI25DLQo5C8JYLuK1sS2xRMxUzvCWu4x7c7TqmwhnzaE4wltmMzgY6pgH67w7bFsEKmDzXvHy%2BkQrK%2BP3Hzf%2BZrY0uDxWJnvVlZOsihN605nO1BDGWMlBC4JjHE6ci07Aa%2BDwlyYahq2P7vhrDIAOOZ25UwR86LuTW9BfzLv56B9Oxk0QKxeIDV177k5PfjbFmh4fJY3Cc%2Bv1OVqebyx0DapwjT%2ByaEGxwJimEdzJ5hODvOYKcsalmgZOrb7o%2F3cDDjGu4r%2Fe3yYktSDAV9xYm&X-Amz-Signature=b96c26e97b15db70f88f7debf7e9d17b13099f28ff3d8f35e9c6538e831d51da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

