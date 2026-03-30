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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626YCHTEG%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T114324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQCbI%2F2LDXTHisa09y8v00OH7AJTt%2Bul4UGLEBszlW%2FYHAIhAPvpLTxNqorWwjMEpdxKPAt5q%2FOuGOsTny0E5KqWRz5IKv8DCCQQABoMNjM3NDIzMTgzODA1IgzhEqDVQeHxMl0OGR0q3ANldW6Jgqp%2FOBciDzQerwP5bx64MSRIYjXuA6486LsMnwk9%2FOHOj48lNaj13Sk7vYMGz5q83NBLhi8pcLnGp29pRTCzcFPdYpfZHC1fqrv6C%2B%2BzmbGTxuXEq6sGN%2B3Ek85GJo942Vtdn12%2BrxWqbBNWidKLUG7Hvkq9phRiXkNo8%2BLBvIrqAdBuFZQfZqkLNDiznfs8zedpe0X0jbMwJmJH9qkSqSY1JTVlgPNlyDLtwY3%2FZlSkm7EZsQkagX5gafaTaQNzE1fNo1y%2FvAXupuw0vr4S6p2IhedL3Pv4M5TLHQR3mLKh%2BTP5x8w1N2wjzKIYJSTfCG0uTGSUuRbyrUS83cjbNyBWzt88C1bfl5rbojpnvg%2FzBUQ7kiW4S%2BYbNN%2BEOVNpPoPW0TmntRBDu8pFTnX8iNtoYGrl0o6scT6E7Y8vG5NXbRtcI95ezhY0TI%2Fmew%2FZNngrlZs4BkqhbFcd7Ag3nBYG1lPDB9ceS8DznV74p5bL38iwfUeGo1hlodOfeAZNxddKoALeSwlXbAzro8EemY8SzVuXUKyyZfZMHWhBW6%2F0wtGmSAFV%2F0myIHGiPkIgJPHdEj7aFAxfjTElvrJxr%2Fok0Qbr5tJJw0Fc2nBu8KCxdpHnrA%2FMijDXoanOBjqkAdmISyx86%2Bp8MyHNHns02b%2FJ8Frqk8DVux53y8zV5KsWF28nHwKWJJb4uz4Vmt5VIBv2Q%2FByzMV9cZt6WhfiM2KP3J594r9a8Gnkm%2F3YQuqKPJV35%2B1vyDlzhdZzZ%2FmVx8Wgwol7VoHIm%2BpVfpFTFE%2BD0zTDB%2BpKHbUCsc4tsQp%2FEA23kh5n0dFf7HOe5%2FRuT4JgI3R7eyLt8yATbnni%2BDIvlDWP&X-Amz-Signature=5f5bfe0f28f7d19f416891331d0febfea6209151a27cdd3d903ed72911be186e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626YCHTEG%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T114324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQCbI%2F2LDXTHisa09y8v00OH7AJTt%2Bul4UGLEBszlW%2FYHAIhAPvpLTxNqorWwjMEpdxKPAt5q%2FOuGOsTny0E5KqWRz5IKv8DCCQQABoMNjM3NDIzMTgzODA1IgzhEqDVQeHxMl0OGR0q3ANldW6Jgqp%2FOBciDzQerwP5bx64MSRIYjXuA6486LsMnwk9%2FOHOj48lNaj13Sk7vYMGz5q83NBLhi8pcLnGp29pRTCzcFPdYpfZHC1fqrv6C%2B%2BzmbGTxuXEq6sGN%2B3Ek85GJo942Vtdn12%2BrxWqbBNWidKLUG7Hvkq9phRiXkNo8%2BLBvIrqAdBuFZQfZqkLNDiznfs8zedpe0X0jbMwJmJH9qkSqSY1JTVlgPNlyDLtwY3%2FZlSkm7EZsQkagX5gafaTaQNzE1fNo1y%2FvAXupuw0vr4S6p2IhedL3Pv4M5TLHQR3mLKh%2BTP5x8w1N2wjzKIYJSTfCG0uTGSUuRbyrUS83cjbNyBWzt88C1bfl5rbojpnvg%2FzBUQ7kiW4S%2BYbNN%2BEOVNpPoPW0TmntRBDu8pFTnX8iNtoYGrl0o6scT6E7Y8vG5NXbRtcI95ezhY0TI%2Fmew%2FZNngrlZs4BkqhbFcd7Ag3nBYG1lPDB9ceS8DznV74p5bL38iwfUeGo1hlodOfeAZNxddKoALeSwlXbAzro8EemY8SzVuXUKyyZfZMHWhBW6%2F0wtGmSAFV%2F0myIHGiPkIgJPHdEj7aFAxfjTElvrJxr%2Fok0Qbr5tJJw0Fc2nBu8KCxdpHnrA%2FMijDXoanOBjqkAdmISyx86%2Bp8MyHNHns02b%2FJ8Frqk8DVux53y8zV5KsWF28nHwKWJJb4uz4Vmt5VIBv2Q%2FByzMV9cZt6WhfiM2KP3J594r9a8Gnkm%2F3YQuqKPJV35%2B1vyDlzhdZzZ%2FmVx8Wgwol7VoHIm%2BpVfpFTFE%2BD0zTDB%2BpKHbUCsc4tsQp%2FEA23kh5n0dFf7HOe5%2FRuT4JgI3R7eyLt8yATbnni%2BDIvlDWP&X-Amz-Signature=5f5bfe0f28f7d19f416891331d0febfea6209151a27cdd3d903ed72911be186e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZUBBIFW%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T114325Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQDEJshgMRXkm7AwQZcbrubaotsTydhntxyJQXGgepP9EgIgXKQqKZH9rOK3onIuHX%2Fx0XW%2Fery46hDV6%2Fk6Vfq1AEYq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDOy%2Bg7vZN71GRf5%2FXSrcAyW1epVudmH6wrOSSNfrk9y6Fxid7Shrp6yPYTCafDhGOW2z1nkqrjkVYRdhDJ3UJ88oXxDfUviZvCSpWgi8IOSimNBHZh4yWKG2XbIjLlsrBcfxo%2Bcl37R3XHYQ8%2FNhoEdZZy7sl13knZWI%2BNmGnQCRZVhO8OT3ZEDGeKnAdJN5J8ehdXE0Ulh2GbqJzs6uhxaiN29wdmEOFkMN2f9EwTbrLkm521JS4jcKb7TTt6xugjNIkubV4NAonLCb7dqAIii%2BBoyFPic9v8aTE%2FdXoPfPbkFS27vhrTIhWmP9MOqAUSVJuhA%2F7ou1mIXnDQ6L7dy5JuL1X74v%2BgU2SVzhkwLr%2FmXfnQNBBW%2FemNf4%2BsuSrnFwMOvEqR2GVYNmxaE4l4%2B82jmXuisPew15cMDtTxWJwjXDbCwWsErDeVdMTcM9cIrK0sl1gZtA49CWZXHPj1XfkhBJOLgIGnNLe3Imgngm9uVC4jXZAj052Aj3nb4Of458rHvsJcRCK4uDzgbmXK9k%2BUMa2t6FXlYF%2BaqbDAOGS17J8aL9Xn6%2B2QxoBlMCb%2BbIXoW%2FU4t7YmL%2FZRq1ci3j2alvVogN2vg9i5zT6hGrX8Ahodxx3TBhty3g%2Bk7ySPrAdZesHp1PKO2hMLehqc4GOqUBj6R9WKtaYpC0L1bzqvuz5gbZdULMQDj3jKfUnvVx93gPhAc7cYVDxW0ICDGyJozYejp%2B3yWRGVzCHAokTZbWxCcoAVpyr1r3sHO3zbifjZnmyzZQnXhf5kBT%2F5Kch99T8qfHiZiIpkJX1Vs1xahiTU1FhaGqwVEytbGVp5H4%2FTNPgUyTB%2B26vjAgswvLciZgJJq8M%2BgM5DDSywKECRtbnR8q4ifn&X-Amz-Signature=dab1754192a3705b2294efa94e0fb6c05418d8b4f2f122d0f825fda4cd88eaaa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFWRTZO7%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T114326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCID2JVoMkkSDMTaOGdsNHU6OwWy21a9xlp%2Ft1w6c5Ij4VAiBz5QpcJtFgoNGwawDE0wCyWZ22i8Pf%2BlqKSznI5W5ntyr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMSUZm7HsdCgUjd872KtwDuReycSEzc6sa6nDhEBJHbOT%2FPPuhU7H6qElxmlWi9iWmYSD5AUGU7s3E6tORkcoLVq5zWQM4MaNxEICQtuQhd7Xmlmdtp2vMv5n01c60%2BHBGgFyZP4L5ScdWxjJAFNgLEI02B6jh5Sfc%2B4n9tzqkeITVjvGg5uv3%2BcMnKC9fDdATm33pNZYwESdS3%2B5dQ1nLKEuWZRl5lrcNZakbB1dFenejJy1CqzVzyZwb66UOUzZ%2FWQ64J3Tts39xvpl8yJzQUB2gwrN2RaBtDtJhvoUU9bSY4jwB1mbrMN1koDfskxh%2BmKoXvFXdJCCTQVfpkkS7gjx9aG76gfVapZ4LCvei5pucDRx1b1l6j0XfjUy0523LhbvvHyhlSxtEEGL5h3lo3BA78HTWd0%2BbPeEsEMqIdLfXB%2FA2%2F3nnukLo2fvHQMs6YZDUSwehnq9CjOVro0vfWDSUVk3mzrl72DzjJ4Hp8pYiGjl4F5GTy%2FjRN6bBAWDk%2BlUzhURtrab7aAm7%2BGoKh4RTzqH4k7dcWgh4TugBhN0dXSlzgCGsyYDT8SxGlNu04RZz6IRRalQbSjilZjOubZPgU2cukkmHsgD%2FM1W28F2O3CBFf6t7BrxKdhdLA%2Fm2g4Mx4ukJ3ATOIOMw4aGpzgY6pgFYQNQ1r0nXkEpTdHbxtOgwK0kA2v4jKXetryP%2BGhdceiySh4rvSNYliYVLh8hdC8TIeqIanq3aomZ2PHEgsTF%2F%2FXYHOpY8vWZAvXnYa0FOz8eQ4CBdn%2Fj3RnNUifBAHmhGmgmxul5Q8mncMnVViUXK6ESojzgWQYSwjeTyXgtXuMv8DVdezPfl6NJhDAmOBrVwrrLBxqbBEj%2FwCpNmROPCNwbgI0v1&X-Amz-Signature=c1b22822db4f19a94f20211caf1c2cb7ddb679132b6d6ff3badb66f5e55f2fb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFWRTZO7%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T114326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCID2JVoMkkSDMTaOGdsNHU6OwWy21a9xlp%2Ft1w6c5Ij4VAiBz5QpcJtFgoNGwawDE0wCyWZ22i8Pf%2BlqKSznI5W5ntyr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMSUZm7HsdCgUjd872KtwDuReycSEzc6sa6nDhEBJHbOT%2FPPuhU7H6qElxmlWi9iWmYSD5AUGU7s3E6tORkcoLVq5zWQM4MaNxEICQtuQhd7Xmlmdtp2vMv5n01c60%2BHBGgFyZP4L5ScdWxjJAFNgLEI02B6jh5Sfc%2B4n9tzqkeITVjvGg5uv3%2BcMnKC9fDdATm33pNZYwESdS3%2B5dQ1nLKEuWZRl5lrcNZakbB1dFenejJy1CqzVzyZwb66UOUzZ%2FWQ64J3Tts39xvpl8yJzQUB2gwrN2RaBtDtJhvoUU9bSY4jwB1mbrMN1koDfskxh%2BmKoXvFXdJCCTQVfpkkS7gjx9aG76gfVapZ4LCvei5pucDRx1b1l6j0XfjUy0523LhbvvHyhlSxtEEGL5h3lo3BA78HTWd0%2BbPeEsEMqIdLfXB%2FA2%2F3nnukLo2fvHQMs6YZDUSwehnq9CjOVro0vfWDSUVk3mzrl72DzjJ4Hp8pYiGjl4F5GTy%2FjRN6bBAWDk%2BlUzhURtrab7aAm7%2BGoKh4RTzqH4k7dcWgh4TugBhN0dXSlzgCGsyYDT8SxGlNu04RZz6IRRalQbSjilZjOubZPgU2cukkmHsgD%2FM1W28F2O3CBFf6t7BrxKdhdLA%2Fm2g4Mx4ukJ3ATOIOMw4aGpzgY6pgFYQNQ1r0nXkEpTdHbxtOgwK0kA2v4jKXetryP%2BGhdceiySh4rvSNYliYVLh8hdC8TIeqIanq3aomZ2PHEgsTF%2F%2FXYHOpY8vWZAvXnYa0FOz8eQ4CBdn%2Fj3RnNUifBAHmhGmgmxul5Q8mncMnVViUXK6ESojzgWQYSwjeTyXgtXuMv8DVdezPfl6NJhDAmOBrVwrrLBxqbBEj%2FwCpNmROPCNwbgI0v1&X-Amz-Signature=ed78c8edbf38c8ed2a181a0b546e2c9b28cfc729c3f737b91c309c44294e7227&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFUWWGRY%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T114327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIEMAg%2Bx9vtdZnbWo4ynrRVVwIE5yPpRWa%2FcYCVCicxVVAiEA3abzjOeL1M65%2B2hKuZio7D6t2fZnRk420TOvdrNqYnQq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDM4qBuJEbznv0zaKyCrcA2IfC6ORUqdSaxUnXoXDeu1d3%2FJntJ%2Bg6ECiXfguligJ7VfdW6ZDNJD26PFq6U909lq9V26G%2BmX1J67bwjz2UBfoiYJlVzQo9wuJSgOVRGgxtGy5406u0Qf2UV%2BjwTq00mpYdAxmt0WBH%2FD%2BiwFeIAczRw7mzlfHYfLkX7UT%2BIQkCib2U5dbpV4KmMKCsnyrel9f9eZc%2BJCo81lMxKkxMVTpgP4uO4ddz7vNrEDKbOPgRb08q51LtsBZvm9VeNIO9MrLuoDWTtoKcys78KxM7W8s31sC3ORPDsH45dtddajvChC9IbQvlycc3GuRArhAM6I5X1BgYbDF6o6ULL%2BSJHxp6bEMuydPnr332VMzH%2Bxd5H%2Fm6CXyuxO25kNMYMpyVyR9hD1Q0pGgrddTGVVSPttwpLHsB4ptKVOh1xi3PyGGPHX78M3qF2XV6OUP%2F7oZmIsyus9Ij3UKiP3IKjdg3VmWN8CnaHFRY%2B%2BaunTPnDimhp3hJsdFGdVzu4O6u5v55BL892P3%2BYiFJY0cpw8eDsO1dIkh2YJ2SMC0nvjou7F2nnj2AO8SDU9fLKOQEB8qdVorxm7wM7mZ%2Fdqh3ptFhz4qnmmscEUTm9zBEnosKzfzaQryyJlnwWCpURkoMO%2Biqc4GOqUBRUkiYNJtN%2FURHGIeqtQNLjYq%2BBeIZSMA6Ep2M0My6HQzcaH6bRJB0yNynil4TnM%2F3GJuRd94IkpuJ1UqC3nC3u7I2vYVQU2kpY1%2B%2BHGOPSg0PUsmvfDpxAXPFcbUNnNVARrjKR9A5GNYYyckHcvF10i3MoDnkKE%2FYBfZmSnLjaslzNEf4oVJAydBOXyw1jviM0tpSd0ahkbj9TJigTKfe3%2Bhcuw6&X-Amz-Signature=9c522232bcc4e1e0c2e23bb24a31523c1b531241731e72930e46ecc9ab5f50c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XKH3XT4%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T114327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQCevZ5s4bEiJJd8HNpwjBCzSkHHb2YLxKyFh7CiganOSQIhAMikO%2Fnzr7KWQpVr3SvnoIGfRUdklgJ%2F4kFZTK8HhDANKv8DCCQQABoMNjM3NDIzMTgzODA1IgxN80UC7T16wiu2DIcq3AOxExWCzSH%2BnDNxwLYCdmCZ9oROJ3zKEHqO9Lh4m1U0rGUK3m40EqqW%2FgZeq375JPKPQZwImzCrJN8R8alPuWod9KZ5uBIXozEsNVKJbrBAzTO9lVJc6f4I%2Fc9hKx5paYXQBbLasDX77VJ7fpmlSf99aXr7Rm%2BlNUM0twStbWUoJ01XdnYlSNUeoe82WxWDfHOv%2Fo1VPkwqqMdIFTlceG5FKziLbZFwXz8NOTJ7yaSO8aO9XCshBtxszjG908taoehL3k%2Btd%2BUc4M494IWQi8UhI8PVGYywFs8TEVK%2FqxmmDiVGIw3LEf4b5wuDjOjVIyRorlZwHwN4xrrSQR01ke%2Bn9kFJi5PPlbLqqDOOBuG4KoRxyQH%2Fry6zX4GH9cP4IARAtLdwiQTMupgR76KDSLI%2B3MsLFyciVPuGQSSwYVoAcip0br5wr9nPpiHz%2FmFunROZUrJhBcU4oN6Vqfk3KrRhmroF5ttPBpvQi4vjkwXMz029pNnvaK0ejjvl4jG8DlI6C3kQo1%2BB5u8CvCua0T3Q260r0dbc5SyQnlMOkZEZ7kURutOxqZ5qwwR1LOMkQ%2BdiqMlm5cv1F5KYcUuZvxHGfdbE4JBrVaQlSTQy4O%2BUDmsiQgZR5dl3WRMe7jDmoqnOBjqkARyROt7u%2BgyfhdXiukiCZTzCGFch7bG%2Fm3EoOt4jt9JchEe%2BenxAsGk0o%2BAtOG1WMlOuTkXvNhZiQjJ8P5fVbxUFo%2B8675Elo4HYbhK%2Byc5hgc%2BqcempNim5ozbSdLUjVCBzaGSRcgKLGWnytmrWXxIjnlngbmCK9M4EwawD4c40QwtWWO1thaft631EC1geP0ryYXTGG1UZ8eaMRlTWNJJ6Zj3R&X-Amz-Signature=e2a0451d34019c7f66ed008b827d11f3700f07a9b37416f4e69bca8dba9bb204&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWEKO5Y4%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T114328Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQCkQNlEp1zFN7fCv3g6SsFksYlD5DukeiAebiixDtASrAIgPUoxPrh7Oi3nrBmFBQuhnt0Zmu84mDqU5qAQ4MyTDrUq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDCPu%2FH%2FPtmud783SWCrcAwNonOVXMpPY2i%2FX6cmn%2BnzjaSe8EcTlFYGkyW3cP46Fql%2Bl0ZBXy1tDZUcpeinlDBDUVgqXfsEBs5LAp98m2boIw%2F23lhYxabZ5O9b%2FDA%2FnHLpd6YyfUqZ1Ajkfb3aGLl7qeo3gAIQobsBNcAuj4uQcH7rhogeoq038NkTRLXSGc1tuNXpAYzZnbH0ygi%2FyaUea6G4sxMCWxAKmktjNzMqVvNCdYboEtWjygRw5ilrwyF%2Bke%2Br9%2BVOEjlNqyRLoSYWgBsubUcAZlpGrnj03SwabHLovglnTktapIGGFOq%2BxEnF3wXB%2BGs69umCQ4HXfyy0Qo7Wpp1oNaBEJZOSQ3jUsWIEirwPhwQrqLhhbyaec9UvlSEcEPZInrazVlS8G0uH5hl%2F2t9%2FI5YLU56tY1%2Fq1isCZ2MEj6yjyz6fYvuetk1guUxoMgkbHtmaLpgIG4IgDaBgAWs56pqU%2F5fHFvsL%2Bmbxt2VJH0J4eT32FNWe3Tbud55f%2BeXptTIETpC6b%2BCYtS%2FNTiY2RiByUeTf%2B9lf6SjjC8A4nGkEdIVCK6IrnIiPaq9izY4r%2BnwOlsoUuTArH4K7nL23iFTzecwZT%2BCoA3vORAuwopVksceuDNl4Z48jAnD6GBuQNsy5CMPehqc4GOqUBC3JyBZVPpxD2z6Tg7GDMwkEXPWgNEJFpY1kqxP8sGuYLWJ56tGFaLLg3JLXrbJC%2B7LS2yuKbfh%2FLwEd%2BK%2B48meO08LhwsxOzAB5Ya9NP1723EYH9MlOfBngL16A9Ymiapzmbn%2Fwpgx%2FKGvHLjUzkgzI32y4qOc69u5wtpxtTdYzxGoh%2BjpEx8D19qKMzQkrqWVvZONon66ZuYhYlrAuVi%2BTUDxRF&X-Amz-Signature=782a8f07c663d7e572781fb34a3397adefd1da80abfeff66ea9e2c58cf7b2c8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TC77MGLV%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T114330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQCogDpoUf2012c1aj2poI6SeI%2FvsjQft5t8jKteBbDepgIhAK9Q%2FlS8LoA7EPWV9JJoyeDNvOxbcgb%2BH4IldnvaqEeAKv8DCCQQABoMNjM3NDIzMTgzODA1IgyWIzTWpY5u1zbQIc8q3AMqvWrKvNppjLoFsjhAzxUBFS6XRjXu4YGi2igMjXTVbxlZF33Eu54V%2Fy4wJiiSoPouUSiygLxnfLWtWO2kVQIZsbp2bcPEAB%2BF%2F6wsxSkrulrd8O%2F4NLAcW8tp0yKtwbMGgj69V9o28Yue1KNAWOTkG%2F6EcAemWHmIm4299DbrzxgQBj9qIyNmoYk%2FwcMO2MDxJfLTG9Ng%2B%2BEJQelr8a5062W7YBqZqvNJ%2B45WcJ3pGwVDaLtAPBraAzLZPs1GANOWppW8ykY9zAf89caILmjjJAs9seLamUkMAf3qnpHBpZCYlkq075CJSliKvdmVz3OiCEGqrvrFlk3Yl7qDmuiHs2UwJtU%2B6P6PE06dSgPy%2FRG%2BPFyzapRBvJZe6z33%2FNkKFA3%2Bh62Deqfkq3xh230DTX4Q6poXVkU2tefr2lkqBVsOXhof45ApcQ4bUl5os6C62v3C%2FAJUkd1Ck0SZKAMbmnfRqNeziOL5aaFw8QbZ2F3cMpeern1jSc2LrDeGgKuDw0ogqi5mrWnXZr30MQXthzBoDhlpxQ3c0w%2Ff2ri6CRRcJIyWEoU%2Bx0xSg6RryPPRSEdehR%2F7y7rJFlQIIpb7Qy1e%2FxDoJlTdk3wC9zCA4v0DPGtc6cK6Lo294DDjoanOBjqkATShdiohMX35b5FcoTef4i4aLanoeHfJfGWXydZwcn77vMk8WX9lK0e77ue%2BvwtF6sxkLEJgZ3egl8vS1e6csvN%2Bdr2SH7xrRBrFQ3GPj%2F4uVHNmlp9WX4Z8oS8xK8ADVHZub6Cx26%2FmQ1Xvu2V%2BOdlrXVZmlyDFpig7UmmBqnBiQKt%2BfE9aIFxSFbzyrqu8jUzgb0kqw%2BuVUkIA5BMF8G2kD6pj&X-Amz-Signature=1c13b28e39f8d1bd30907eb03de4ba0b1746549691f8d21170c9d158927711bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TC77MGLV%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T114330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQCogDpoUf2012c1aj2poI6SeI%2FvsjQft5t8jKteBbDepgIhAK9Q%2FlS8LoA7EPWV9JJoyeDNvOxbcgb%2BH4IldnvaqEeAKv8DCCQQABoMNjM3NDIzMTgzODA1IgyWIzTWpY5u1zbQIc8q3AMqvWrKvNppjLoFsjhAzxUBFS6XRjXu4YGi2igMjXTVbxlZF33Eu54V%2Fy4wJiiSoPouUSiygLxnfLWtWO2kVQIZsbp2bcPEAB%2BF%2F6wsxSkrulrd8O%2F4NLAcW8tp0yKtwbMGgj69V9o28Yue1KNAWOTkG%2F6EcAemWHmIm4299DbrzxgQBj9qIyNmoYk%2FwcMO2MDxJfLTG9Ng%2B%2BEJQelr8a5062W7YBqZqvNJ%2B45WcJ3pGwVDaLtAPBraAzLZPs1GANOWppW8ykY9zAf89caILmjjJAs9seLamUkMAf3qnpHBpZCYlkq075CJSliKvdmVz3OiCEGqrvrFlk3Yl7qDmuiHs2UwJtU%2B6P6PE06dSgPy%2FRG%2BPFyzapRBvJZe6z33%2FNkKFA3%2Bh62Deqfkq3xh230DTX4Q6poXVkU2tefr2lkqBVsOXhof45ApcQ4bUl5os6C62v3C%2FAJUkd1Ck0SZKAMbmnfRqNeziOL5aaFw8QbZ2F3cMpeern1jSc2LrDeGgKuDw0ogqi5mrWnXZr30MQXthzBoDhlpxQ3c0w%2Ff2ri6CRRcJIyWEoU%2Bx0xSg6RryPPRSEdehR%2F7y7rJFlQIIpb7Qy1e%2FxDoJlTdk3wC9zCA4v0DPGtc6cK6Lo294DDjoanOBjqkATShdiohMX35b5FcoTef4i4aLanoeHfJfGWXydZwcn77vMk8WX9lK0e77ue%2BvwtF6sxkLEJgZ3egl8vS1e6csvN%2Bdr2SH7xrRBrFQ3GPj%2F4uVHNmlp9WX4Z8oS8xK8ADVHZub6Cx26%2FmQ1Xvu2V%2BOdlrXVZmlyDFpig7UmmBqnBiQKt%2BfE9aIFxSFbzyrqu8jUzgb0kqw%2BuVUkIA5BMF8G2kD6pj&X-Amz-Signature=10ac17d0f39693d036e1aedf50523bbe1b2e7f22f901ab9e3eb591b3fc8590c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUHU36VC%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T114315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIEEDrZe6xUWmXLcig0LDhc%2FcZ2tQkmPOYezub4EmOmIOAiEAy%2FlRJzW%2BcRhhn%2FZElgWyBb2eoUDFf6MJrjZ5LQocHOsq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDFHCfivGg1xTzWwiwircA2kHG%2FLpcLegt3%2Br2OM3fowA2SW3%2Fq9dMDTrA2MSiCM1gWULcltcOBbDzQTNdxZXhRlE87kko%2Fo8SVctgVTKmo86K7eZFbT5x0%2FRcqEYALXWTSe3TGdzx5F5Kw6INJtywV0nUY8j4vPmwHyj%2FrOwfz6lMTQkB5Ck4C%2Faz7EJAFecbpAZZXZY9wulN6yC8EwdsIr1bV7KMBp4unhZRTdjbksWEaVw%2FXTZ25r1p7CUD23uOu2uAKnpqJ%2FyIN4kM%2Bnh4gLWeWg6TjklZScfoPO7fIp7tckkUnzlDbD4gABfu%2BF8U%2BsOmimB821fuQ4TGoQgnqzVFuqFtC8FKJ1LeVv5XN%2BvJL0fJWoxY9I05knxH%2BQIns7092itCHyjZZAGBK2ijV574TvGr2aZ%2BLPchyERYmjXkmXp4MphcRJ0ClnfuGuXJzBGrzUu7dYEReaBi4lwvJezlQyrcuDrDeFjphc9iPDj2HFd4jrpoIDGSk7YDV8iIstJyBNGLXAjMcBeBhZWFz4CV0yNFbQaoXiVIO%2FpWCOJLJV4r9xUby4NSiRdcjKqECyKc5o6faM8lmFpRPnZBaTJLtNJUKFonJ414UNl7JaNk5JflJyDEqOqYIc65yed63S4un1YYnHvzVZWMJqhqc4GOqUBP0qZN9ckKgfjFvbLvupiV1t0ZxbzV%2FT0XvmWos3wHrBhcOggt01m52V%2FbZgOx%2F2KqMoxAUQGgeLtePpMclsetRjPPXZpMODcz5E0h1bAFtdOjVUaTRzxykxXLFlsSGkgEwNr4P9Rv7DHav8uBermTfLUcajTL%2F1IMIOHUwMK5fazG8JmAprtK045ZoJTqarab74K6n8vk6tqk3CnSryt8R7Oiwyt&X-Amz-Signature=71793a33e43c7ebd6ebfabe9f38400eeadd6e201ad43ff0a428b9f9d82bf44c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4DCIIEA%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T114332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIF%2B%2B5JrGUZoPV2h3QD16YEk4rGtPedFdkadxtpHdL9rhAiBv9wKowTEVZa3lgetS9RgbRHBOMHbYZhdeGEO4bE%2BsdSr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMNKnhVUIbmSf4K8diKtwDSV3TP7fU6RG858LFfUblfk%2BY7D4CmcYnd0FBalQ30I%2FvatudKVCDtSb9tPx8I%2BBAw8nsQA5hBBixVoQRDdVOdYnveParK7yRjhJFjF2aT3CVK%2Ft%2BVmEKU%2Fk0GvbmUZYNsTODJs75YeO%2BeRK0pCRw0QmxY46VT9yfpB9GkUp%2Fx8F0TrObmhU1gq1GNi8PcC%2B2LjqA7eG4lQxWDsL%2Fj60c043hgaNahBXw6zm839Szs86RzKDoFPVEDm9A784k6DQOZgIIXaVd5ZTBnSDHu5Ur%2Bilat8Z1%2Be4ltrMNxPaj587hwkTiuEFzYA%2FLZbb6SCbwDcl2pbObciPOhJEd%2FHJpFMM3jDsCWWcj6Pf1F0xqGhLf5opXaJ7rZKY5X6CqXN%2FCpqgdNc0tOqf%2BwQ48GGigvfqtZgssxTpbk1tlUIzllB%2B2tn7GV%2B0ddNS9zhM%2FYW8ysYc7io%2B1yjMbmOWMOw8%2BmqR9P9pCm6gFXgRVA1KJ0YJaGtIZ8MTtV5LBP0TvtVazqcm4PMH2sPTNebCgq1Ch%2B8YbIMRx3F25r5qFF0OYMalwln4BuFeJ0AZgaxiHMxrp9oPLKpcgzRurJzFLjHMSiDUn02QrjjzfuUBZefm7jr2t%2Fo5x%2B1am1%2BLFZ3IwjKGpzgY6pgGlPFmsU8xbb%2BcP2Z%2F067LXu1lH8tN0Go1yLrHlnf%2BgLpWyqzssWJCG2rfVp6Muib%2F39SktBp39YDwoZW23zPOWwe3rxBHx2ovpTlsH3bQJu7x%2FOaZWmyTbwr7U1481hqdeyIqp26yzmCVFueXlENBdjmoxy9pu%2BTqi%2FyTKFdjc%2FIOoDOGEOPGMWvsnl574saSTxOYKhJ7tTb7dtks74ae41oMuGu3U&X-Amz-Signature=53b0a7955b1c23720321c844e307a6058e4a1bccb7fd05c70f401dc576cd388c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4DCIIEA%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T114332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIF%2B%2B5JrGUZoPV2h3QD16YEk4rGtPedFdkadxtpHdL9rhAiBv9wKowTEVZa3lgetS9RgbRHBOMHbYZhdeGEO4bE%2BsdSr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMNKnhVUIbmSf4K8diKtwDSV3TP7fU6RG858LFfUblfk%2BY7D4CmcYnd0FBalQ30I%2FvatudKVCDtSb9tPx8I%2BBAw8nsQA5hBBixVoQRDdVOdYnveParK7yRjhJFjF2aT3CVK%2Ft%2BVmEKU%2Fk0GvbmUZYNsTODJs75YeO%2BeRK0pCRw0QmxY46VT9yfpB9GkUp%2Fx8F0TrObmhU1gq1GNi8PcC%2B2LjqA7eG4lQxWDsL%2Fj60c043hgaNahBXw6zm839Szs86RzKDoFPVEDm9A784k6DQOZgIIXaVd5ZTBnSDHu5Ur%2Bilat8Z1%2Be4ltrMNxPaj587hwkTiuEFzYA%2FLZbb6SCbwDcl2pbObciPOhJEd%2FHJpFMM3jDsCWWcj6Pf1F0xqGhLf5opXaJ7rZKY5X6CqXN%2FCpqgdNc0tOqf%2BwQ48GGigvfqtZgssxTpbk1tlUIzllB%2B2tn7GV%2B0ddNS9zhM%2FYW8ysYc7io%2B1yjMbmOWMOw8%2BmqR9P9pCm6gFXgRVA1KJ0YJaGtIZ8MTtV5LBP0TvtVazqcm4PMH2sPTNebCgq1Ch%2B8YbIMRx3F25r5qFF0OYMalwln4BuFeJ0AZgaxiHMxrp9oPLKpcgzRurJzFLjHMSiDUn02QrjjzfuUBZefm7jr2t%2Fo5x%2B1am1%2BLFZ3IwjKGpzgY6pgGlPFmsU8xbb%2BcP2Z%2F067LXu1lH8tN0Go1yLrHlnf%2BgLpWyqzssWJCG2rfVp6Muib%2F39SktBp39YDwoZW23zPOWwe3rxBHx2ovpTlsH3bQJu7x%2FOaZWmyTbwr7U1481hqdeyIqp26yzmCVFueXlENBdjmoxy9pu%2BTqi%2FyTKFdjc%2FIOoDOGEOPGMWvsnl574saSTxOYKhJ7tTb7dtks74ae41oMuGu3U&X-Amz-Signature=53b0a7955b1c23720321c844e307a6058e4a1bccb7fd05c70f401dc576cd388c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CA6LP4Z%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T114332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIBZ174RwzuPIhjSr5eZ7x3XKEZiUSKb9%2Bfngljv34JHHAiBBsXWnqQYfQTWdt5QzyfMTigOOhtjW6nxqFItYY1Q4xyr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMfv81eb2fsMhrEFJfKtwD1VCwz4zb32yRWgvjPdKZ28hqpcu692LuGm2W4eWNRGyh9m8X8rAJS7eFOTXxIovBD5OCUBZXSZlJIRabwvJh2oBC4ycXnTw%2F2UgtiNuFW0OQkPTGkGOD7V1OM47gonA3q4B0PUsDdE%2BQXK46J%2B%2FnQ4V95UvX42Z7NdPt2y0tKDqcCn24undzQLQZ4ftHq202u9WDtxvHIObsQ0Lj1WMdAPRjKLPcSuxawbeXDzMUKLMCeTnkr3A5K0fgOtjTYPjZL2QQEO8vsrmSHxMdhvNxZqryFm6UqzagxtCAFzrHZ115ANmg4bFVPQES1YMK9tJJRgkERPV4lQDmWQP6j2kJj0CjTBhbT6k8I3IsQS2Gi1ZnQG%2Bqo%2BzosUy6YtVnGcOJAHa0mSupk1Mj9MGpJd2HwmyY2LFB6K3GcE7vZMLDffcqSfw9PklfsVucfLr%2FbcanKuvjpZXmJBkJPSknUGYS6TPzcxlVeMCnfsYRMx61WJ3KORc%2F2yEDHG3sAM2YgQxFPLu8VgSWag8KpHSNr%2BNseAiRBqOZET9Wx479NrgFJnSah24VQlX%2B7ag%2Ftz6k9k3qfllYPcm2SImfjkacsBoxnYYABe0%2Bh4nX9%2BZA%2BbVT8C%2BwLYlaDudEwOB9Fw0w76KpzgY6pgFotOcIzBUDWK2bfN3jlEA3k8RrIbhF%2FcRsI2AQzR2V0TK%2FafeHCy5svvio9lASMANXiir9kp9uvkMZ%2FvNwX1eVtmqSQhOId8oaThPbVrv9vFROnWjnGc09JQur7aOdUTqg4HNZoLakL3SDggvDHzsfYRYVrymkd176b8nJh8EK3LRjgwgImcNVoH5CVCNCgHlpjqzURP1ZJONU064O%2BrhtMDcZ3mBI&X-Amz-Signature=a3180cf7afe8411bcf6e22d7ed8852c7a88cdf0614aa7e268af89f6eaa841009&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

