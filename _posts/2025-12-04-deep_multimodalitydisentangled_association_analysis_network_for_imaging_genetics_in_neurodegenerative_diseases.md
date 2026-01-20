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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMOBSXMW%2F20260120%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260120T220102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDICWypcmwBBgPfO31roKOJ1BHNb6GVA34TGS%2BvsoWizQIgVoGRNKyf0xUJFGnss2BT1sSHgB%2FgHM9VbZKKTlNK5zoqiAQIt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP4Pzz%2B0TU5q1TluxCrcA8C0PU1uUs1dM2X4A%2BhHiKFIJuS2zZIExQ5JIBc%2BNy4AZs1YbQ8vuZ%2Bq98qswPu3QyeInLOhUhUg1KeepI%2FfJqVXYN2%2FwcFJ3QpDRYQOUUeo29naH8%2FSwPy7lqXbJlQ7LrZnubceKMHH%2FqDY%2FK6nPEQSNX6fdUlRnGBe5Cexmu3Jvh3OI4lDMPcNdGIDIh4SHceHyNai3DpFgVE668L6Sk6YKuvVyev%2BBZ3aefDh%2BgkwYfIHSkFi%2FIfcSf7cnIyZadFUZ1eTueJZ%2Fu7LK5OO3HYWqpOX%2Br6Ql6nCo%2FOMJny5T%2FKPFNK6fowyJVjYJprn0CGZ9qk9SggB0gOWUGaJVoA10IxIzbIb4Yxh7VAXSdFbGKyrAiqfMeOniPx2bnW23ibayaDZoTdEgWqHlqYwihK5LzQivShl%2B4gQ66f78Z8FRqbKivDcgJPhTTvb2F2EIueJwLWPqE8QVf30L%2FG2zRGiEDRQyZlog5vyoNyQSjxQho6EF8JupZ%2FR8%2B7F2%2FrLeAxLZPyw1u%2Bzi9Bq%2BXw3GcMY3MwFwY6lNq1oqLdopfu%2BKT1ljCWUuuyyiTm2ud7hlqks5cfRvZxnqjlqewxnWlZ9DHMNpsIHiyLjTnQ%2FjNIk8aPsRmsr2nNFmC5yMKbzv8sGOqUB1FaGEPvLXtb%2FMcEawTw%2BNyRi8dGSxyYj0EJsgfIGvy%2Fy8Pnj6GkzFe4gWNLY6nf9N%2BOA%2BU5zMmcNZHkc4kPy0AivbaQu7Jb%2BuuspBnQcsbd3PzYQn8aCKEbeA6Z%2BeDA760DqC%2FikGXi8dYoyKEtIZN3Gj7Mn33ixkzoLsggGv6UG%2FxL5M8YZl5iCOEwvJZXQ0oqo5Ywgroyu4GPkPYGwPxCyCsML&X-Amz-Signature=1e9a6a512ebd5ace5e19df335a48a76758db450dc289a905b814c27a5ee92f5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMOBSXMW%2F20260120%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260120T220102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDICWypcmwBBgPfO31roKOJ1BHNb6GVA34TGS%2BvsoWizQIgVoGRNKyf0xUJFGnss2BT1sSHgB%2FgHM9VbZKKTlNK5zoqiAQIt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP4Pzz%2B0TU5q1TluxCrcA8C0PU1uUs1dM2X4A%2BhHiKFIJuS2zZIExQ5JIBc%2BNy4AZs1YbQ8vuZ%2Bq98qswPu3QyeInLOhUhUg1KeepI%2FfJqVXYN2%2FwcFJ3QpDRYQOUUeo29naH8%2FSwPy7lqXbJlQ7LrZnubceKMHH%2FqDY%2FK6nPEQSNX6fdUlRnGBe5Cexmu3Jvh3OI4lDMPcNdGIDIh4SHceHyNai3DpFgVE668L6Sk6YKuvVyev%2BBZ3aefDh%2BgkwYfIHSkFi%2FIfcSf7cnIyZadFUZ1eTueJZ%2Fu7LK5OO3HYWqpOX%2Br6Ql6nCo%2FOMJny5T%2FKPFNK6fowyJVjYJprn0CGZ9qk9SggB0gOWUGaJVoA10IxIzbIb4Yxh7VAXSdFbGKyrAiqfMeOniPx2bnW23ibayaDZoTdEgWqHlqYwihK5LzQivShl%2B4gQ66f78Z8FRqbKivDcgJPhTTvb2F2EIueJwLWPqE8QVf30L%2FG2zRGiEDRQyZlog5vyoNyQSjxQho6EF8JupZ%2FR8%2B7F2%2FrLeAxLZPyw1u%2Bzi9Bq%2BXw3GcMY3MwFwY6lNq1oqLdopfu%2BKT1ljCWUuuyyiTm2ud7hlqks5cfRvZxnqjlqewxnWlZ9DHMNpsIHiyLjTnQ%2FjNIk8aPsRmsr2nNFmC5yMKbzv8sGOqUB1FaGEPvLXtb%2FMcEawTw%2BNyRi8dGSxyYj0EJsgfIGvy%2Fy8Pnj6GkzFe4gWNLY6nf9N%2BOA%2BU5zMmcNZHkc4kPy0AivbaQu7Jb%2BuuspBnQcsbd3PzYQn8aCKEbeA6Z%2BeDA760DqC%2FikGXi8dYoyKEtIZN3Gj7Mn33ixkzoLsggGv6UG%2FxL5M8YZl5iCOEwvJZXQ0oqo5Ywgroyu4GPkPYGwPxCyCsML&X-Amz-Signature=1e9a6a512ebd5ace5e19df335a48a76758db450dc289a905b814c27a5ee92f5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667B2NXLFA%2F20260120%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260120T220102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCUJdzLR0IpgmFJLbbqvDJkAynd6iVdYVRV8mp1c2n7wgIhANqMM5YLohMpNhk593pm4ykPq6CCpb6kql1Ko6SksuTpKogECLf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzRYlNp8Sfo0WxV%2FOUq3APsZl162TXfFcIFxg0PIl7jn8jN9GPNu307KNDhhipijzQcToH3JxDMoN%2FPX5ibmg4bsD0EYDqwHz22YKudydeEe8X44CmZsRtDJViLTTle5CUlC%2BTTC3kb750GVH7%2BNXtwZmfx3GluC9pcATFnSV%2Fu8sECynL7Sv41jmwoRDunPbx0XfVEePxClVTj7Bka9igOTb7w3T2WCM1VfzXidwvn9%2FkSrc2IE1wBpl0nxYUI5H6z9bljHJ8U8NbLVxSxzUZPGONGJ6g6O1J5bwMnknDoGnA8sfUQme0OmxGjxb5%2B4zwQQcLCp%2FVqmJll5iigJJx0sAWlZoofKm6Y0cO5f33TMcTIkhlU6pcUBUnOHDAqD9XSL%2Bsz%2FiHi6iJzdFKh745etBwVEvev%2FKM0NhgfQFWZ5gRZtwqyjQD%2B%2F1BAggSe18CjB8PrqWSneX9vrvv75LXOtgrzURIMUGzinz5G5WTenbGkTHafbqiV5E2a0jX06uBms2fqQRhG%2BbguEVTe7egvFtugzP5k0ejM9BkHKHTdezFWb0ZLQAVoYiNj5QI62HfapY%2FBNaA0bvAtJyScR%2Fy7DVopIpeQX0TALJTSaw54MkumBboL0NCHrDv30%2BbGLMd2SUFFI2mhAfAYcjC587%2FLBjqkAYoRkOR1N4ptmtPM8P4bcK0%2BgZpAXogDiKJpbIHddlgnmr9VduMt%2Bm0Iolm%2FmGzUIdBJB1cJviT%2F87ydWWDgqQ4OxLati5nFzSZsqG0TEDdLH8AXGkR25vzUcnvKiqiR4QfppCo5jRJmxX8p6Qe0pR%2BwqNTo83Ws%2BgRviO%2B1Z%2B2Vfc%2Fc6UCy0jgHVhA2zfYxupHjAn%2FB2bMUylf6moMO6eWOhqbV&X-Amz-Signature=50a68eede317e14982f8af2279296f470cf3dbc9ea88915c541614eed09641b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FPQQVB6%2F20260120%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260120T220104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBymHw%2B6DQCEwarRzToI%2FsnVt%2Fte8OHOKqvPRQ2nsXYWAiEA7giTxMadcr%2FLOeaN0cW96GVJI0MPi3uo1WlPf%2BK6DvwqiAQIt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBhJCWThiluJ5eFr8ircAyZ0tikCnJIdudSNYGTZD%2FherLb1bdygt2EQ5JQn%2BwHs8WO%2FqA7gg3dmJH%2BCGRp%2ByKDR11pJ%2BaS8bEGqnKvowXy7qPoVE4OS795sbZ4SI0v1v%2FWbFZ2HtvFatB%2B6ZrltUSf8BLVL12IoKJsZGZf%2BXzWwDIKMs3EDd0su8XpvNLsekA5J6T5bgfrjXzBaR79NnDtsdlKnATQ8nKEMXz7BNR5MnFfjiX%2Fx%2FO9PVuFdDgaEBrxzGB2YbXniu7lItw7aU%2B3d8hB2xyxolQg8NLU87q%2FD0B6lrkjWZYXHmJLBBmciiTeHI2JWxxHZhDqV8rF%2BY5ZzJ4fTTR4WyWS3bqVqIO%2Fsk4nsLTrkbgoSafETbGEYowESK4pMZOCyHyJp7QsSMsS6DoZavLY1XmA6cWwFOYcjJg%2B6u0%2B%2FjcDV%2F%2BPjPS5Xv%2FNdrkK2LZGi7IqkZmglU4FHPq5D%2BJl4A7FjOsvrFPynv7IWaewneP2Bke8O7kSZnoLCM%2BPLDWkopm5o9Eaywj2Ja9uPjMm8tPjSXuy4RKJhOcE%2ByhPrvikzv%2BHibo%2F1Bm7tIH1ELj8RlIx1K7i%2BXmgseoQOIySnbHKOhDFHTnyP9LN96cFurbolZRQe%2FjudRdaRMCW%2FeHnt2G0WMMLzv8sGOqUBfQXW%2BQ3yDg98enXwU%2F3mh%2FFuq09kgxNt2ysTIUcf8iFbYw37ulcv5e5aiBX%2B8ESPlhod3jgbS0NJraN%2BbgWTajbSd8o0vJlDupSNcGE3UmQhIGtxSbH7igyxKEvyaJ9XTnKyMBmd%2BcvUIf1%2FgMF4xLsDsL4GA12esS1NxlZj%2BHP9fra%2FPpGjcA1VaIFkrdqp%2F3%2BwwllWpuRNeZscIcYz5YYl8845&X-Amz-Signature=3c6ad815fb3112bbb092a83569a5f7635e39d625c17e27f387276aabb421bf8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FPQQVB6%2F20260120%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260120T220104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBymHw%2B6DQCEwarRzToI%2FsnVt%2Fte8OHOKqvPRQ2nsXYWAiEA7giTxMadcr%2FLOeaN0cW96GVJI0MPi3uo1WlPf%2BK6DvwqiAQIt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBhJCWThiluJ5eFr8ircAyZ0tikCnJIdudSNYGTZD%2FherLb1bdygt2EQ5JQn%2BwHs8WO%2FqA7gg3dmJH%2BCGRp%2ByKDR11pJ%2BaS8bEGqnKvowXy7qPoVE4OS795sbZ4SI0v1v%2FWbFZ2HtvFatB%2B6ZrltUSf8BLVL12IoKJsZGZf%2BXzWwDIKMs3EDd0su8XpvNLsekA5J6T5bgfrjXzBaR79NnDtsdlKnATQ8nKEMXz7BNR5MnFfjiX%2Fx%2FO9PVuFdDgaEBrxzGB2YbXniu7lItw7aU%2B3d8hB2xyxolQg8NLU87q%2FD0B6lrkjWZYXHmJLBBmciiTeHI2JWxxHZhDqV8rF%2BY5ZzJ4fTTR4WyWS3bqVqIO%2Fsk4nsLTrkbgoSafETbGEYowESK4pMZOCyHyJp7QsSMsS6DoZavLY1XmA6cWwFOYcjJg%2B6u0%2B%2FjcDV%2F%2BPjPS5Xv%2FNdrkK2LZGi7IqkZmglU4FHPq5D%2BJl4A7FjOsvrFPynv7IWaewneP2Bke8O7kSZnoLCM%2BPLDWkopm5o9Eaywj2Ja9uPjMm8tPjSXuy4RKJhOcE%2ByhPrvikzv%2BHibo%2F1Bm7tIH1ELj8RlIx1K7i%2BXmgseoQOIySnbHKOhDFHTnyP9LN96cFurbolZRQe%2FjudRdaRMCW%2FeHnt2G0WMMLzv8sGOqUBfQXW%2BQ3yDg98enXwU%2F3mh%2FFuq09kgxNt2ysTIUcf8iFbYw37ulcv5e5aiBX%2B8ESPlhod3jgbS0NJraN%2BbgWTajbSd8o0vJlDupSNcGE3UmQhIGtxSbH7igyxKEvyaJ9XTnKyMBmd%2BcvUIf1%2FgMF4xLsDsL4GA12esS1NxlZj%2BHP9fra%2FPpGjcA1VaIFkrdqp%2F3%2BwwllWpuRNeZscIcYz5YYl8845&X-Amz-Signature=77f1f39093e964640f917daf948b99b8bf65005838b7ba50975f8abebbf8eb55&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAYFGBUH%2F20260120%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260120T220104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCYFty8Fq7Mn3xuqFq5jBMepq4%2FdoCtCWlnlSoaspJe4AIgMjjfOinkgNQ5Zp8XSldv%2B%2BEbd0VUJ3qHAqyEC2ou5PwqiAQIt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIv5TG4TrvFyDNheUSrcA1zxESpKUBBtGYnOqOT5EPku3I8pEU3pkkRaxjNJlTFHF8G7yMt7Du9ndPYc5qLoXxhp5TRdYDkIxP14E1UH60W%2BSzDlZSi8zEenkVBNHSeq%2F%2FAfdEgQ6pZTKcQ0agkqrIGb616cdq2g8QSPJi23y0VwVuuXvloLgtKWXMZtZNgkOkvGCc3eeNyEcgCA8EH5%2FGVeFe%2BXPd74Kp2gdGMTV5oZN4Jd2OK8D2JMYAv29t89FOEgkgk1FDawUPGLNNymB6tniCsgI%2Fvxk%2FIWpW0TkXplwgGNYfKzJsKTGzP5H6iDlUgh50gIyvpK1y7qTvndGJek%2Fc0Ft2ugyofrYAO7aaDiit4oC5A1GFo%2FQYhbnoUhM%2Bh0Mcd%2BeE1KUPajCwOra0Z3DKFoEi%2BkzUizt1p4F4q0BrIbUClwdobbUZjg2WBW5dyH9f91dybSSuCJBPd1hSgqLatFv5Jbv7cQcyIHvf3iZ9vL2iEnP9Vt%2Ff76bfH4jjAINEh3%2B9lhYXfI%2BoC64v8IwuZfCXxg%2BOu04kprZNKTGZpMA8HyVM3J%2F1SP1FVJhcYC6LZnOKROWkoclFM86S%2BHTD2lAvHnoFcjgknuM962%2BJyeUHHU1EusyTHm57I2aMyo66dJJnRDAnx3MLnzv8sGOqUBvBnvndth4YkqJfOA5EasGauuLKakXwKeFAgCPLllSnZd0aen%2FMjlFtRS6NQ%2FbX8tGNcczjLHMrsRG3WBVEJTKfqee7klyeO12UM9Nk61Xtjpt%2Fsb6axCZAehDtPdzrqXGww7FWgsKSJ9aeMgVhKB%2B7Y4dXZegz10UfVpL5wZBUod8de3bKbChfj3EDkQk%2BoDhutznn7lY%2F9Mw827HEB%2FvZAF9cj5&X-Amz-Signature=712ebadc1e045018b0c92204aeb5c4eb2c672cc325abda2d51479edbde1624ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SECHQNQL%2F20260120%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260120T220105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDmcelPVRKNkwHSVKNCpLh%2FgAsJ942pdD4gH8qw2ZfGdwIhAPP%2BkBjyFJ%2F4B7UlDXVJmoK2ZFbDAkbSkVNh%2FkgQmhEpKogECLf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzwdkqToi5n7qNUUTkq3ANCYiGobS7JpiVYFI9h4a956YonQ92vwZAGzIkcodLLMC6ogENeMZXjRbN%2BqvnvVV7dGaxpRg%2BHYFbrAzruRxlOyoljK7zL2JEEt6XT0sVlcEUQlycdrIcr56ZpRQSyYQzGYoS1kpN%2Felzu1koUJhK6zpQBtwxiDaNKoFn4l3tqaC5eIC2mJUwlMYNTYIF8TdE9rbNNfF5cWIfuaM%2Br7ti2%2B%2BJLXrFdp1gETopSy%2BiGrqEtGJ2LDu58mUVZWtkgM%2BXWj1VMWzVXZrZ3MKswjR20ndT4T%2F04xfam8yHt0Ltf1sOsREQgA1GajYXW92bfkuuJOoOinfdE7dPCjxYNXg0QSkf4B%2Bdl0%2BOTqtquPdTWWqwLYN3Dt4UzlpoP1244DJhz7OlEPLJwCS4scpbgMPJoYW0U38PYTQtrlf1NmC8OL1FbZ2XAVRalqDLok69RPxNKmvDHR9PuOci%2FxMOEFFDEfKy8g4ftZyiN40FwxXMOSsUQiBwHWkxB6myaqQrN4wbo%2BoCxCUykeXp7kF%2Bi0RndoJudlTpEuhrvh5W%2F26LPP8N%2FbzcQMNFlnIGve8Mn883QfXkV7gYPHBbHWuVt%2FDKo2jBHo1uIp682vH3nNpoSQn%2Fjdjhs67t2fXtGnzCa87%2FLBjqkARM0G91%2FwZU67icjgQAv9gdk3brAr%2F%2BvzGio5cz2gjFUn2dk846pGOm04oFLIfTTIBcUAktWZ3%2FRe712FKTN41wu9jxc5qyh8dgWgD%2FLhZ1FdS6Is9rhtybdM%2BGRxxDiNVbc5fQlGWjL5rws2EVRC7OCQOK2V%2FsYSb5Jrq7qYmvtlzHSmsKwV1ut16Ney83GSz3p%2Fql9HBuiloLc55dkbJmt8BTI&X-Amz-Signature=162b24d54d336dfde0b713f3d5ba007ed54d2fc3db075b3cfc2f6a1b82e7a4f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KFVZ5XI%2F20260120%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260120T220108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG3M%2FNowt9ySsFON4gPsAPYRkEmLuR92qEuBtvOfXADmAiAgNhBB8bl29Yu%2Bg9%2FzzOkkjBfKI87fgkx8FDq%2FxOahciqIBAi3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0oZTJ3wyqNxYVt52KtwDpJ%2BymJEFWgV9wd23jn6QcEty25YuygPMmoPonPywUT0D%2FSWlipzoyELLj8%2FWOQl444KK9IWzZU0q%2F9Vc2juW%2FuEGmYbvctHLYLkYzp%2B7dXDhi8qABOlVxUVQ6cWonGw5oum%2BwI9%2FD2YqCxadrUnaVrXhsVjsbhxT451PRm8iNRfyeLFkhA4LxJVwn%2FCVFc25Xi6lzNTRnHvGW0cdCK18k8R47mxDvb7LvE%2BROQMQ8w%2BYHzIxGhEwtoejiOluYOdjT7NDioxNP%2F%2F5y9ODybsDYXdIbqrnkcnP1EDUSwmTRyICVqxMe4a%2BSEz1DdVSRoCkc%2BqrVG1uAOnBV%2Fn4Wvcf2AM3To3ac7BCs1rLNn%2FOPNLDo5%2BNf%2FWuZPRZy3bJEBiTmJQKdM5MUIOsNeVGq80tW%2B330UkfcIqkaAS4v2IgPVr2ZhBKBhYNH81E%2FE1GvkIoNTeg2j9%2BxnfKGiG1ovxR9qFGVLs2CQsflRVKKsJ9w5oMUKMP3ane0Y3IUJU3ZpO2MsesfpMSuHs6Jd0tYY%2Bn7fi2hqVUjrZz1pjEl6u0oT5VOt42t1MQ44x1HQTM9UbqvRkScP2j5ELg8NXFy8h4DvKe7vmWFCqERLiyAKRIvPYd8zIP55jxWpqtkjcw3PO%2FywY6pgHpIrMJ0a6I%2FYZ779tvyNRHLF%2BnnhBFnxaPIyThM3ID25UF%2FhsrZYHS0sVBP11mOfqtDDa5Up3tG8LbDak2XfGvP%2FOwDj4652AFMe%2FxhrjVte9GkhzPUeN9DsoOJuyJrxKSpZUPWkgckhUbJoeg4X0XJyxJ%2BzPQ85tuMvu0vFTNQoGb7N7OYtEfzP%2FynFzZGVA4ZK4KZzizKj%2B1emHA65fWtLpqB0oN&X-Amz-Signature=3c36643ef7884729af8e3e008ae93991c04cefd24ef2c5476d41c8548a4e0c42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46624EAHR2M%2F20260120%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260120T220109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDPiML33LThlibiUe4dQPafpFbZnXLvrL3xqTCkaYF9RAiAMliSrizpG%2BSLNp%2B2wy8UB77c2JHQoJopxMJaNXP4pHCqIBAi3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM74dvvCOwZwq6JMq%2BKtwDMlyUZR9ldWK1ix%2BtxCvMkOPq55zg%2FkOdaBQ9T0Q%2BjrK8yr7mfF63dDZZpU86FYLuDFm7HSmJINFmP8qMlfVNdrjPN5h4xEvAwS7jTavdu2Jfc9t%2BInbICMbHDx%2B3rIRDifxKt53spY%2FauFOJQuefe4wOZOYEw%2FYZTEofKJXh8KF%2Fz0B4dTfExXHpPMmFqnkRkTvdD0TTGREJ27O7j0zZLlMFQBQxJDaMY2ZfZDlWXWQP6hPXWZxzyIcURPLlAnhcdRH9r22HL%2BlaCst1bM0ajw3I2y%2B3GtSOGeGHLI2M3sjrkF7Mjg8qqMdvvc8%2F9IWKNhHdPU00dMi%2FsnCTpbLontp1zLky0V%2BlctAJIkXUQSb0%2FfSlKWPiSQEBQkqDrykz1RsDjoAhQNxbb6wQDeL2ewnu6%2BsDLWTgWgioeFU74PToJdeZOqfHvAVatD5jHfo7mf%2BtCm1577dqXqZXiZuA2g6k6IZ%2BAhofJseeC%2F50hdMmhEULa8LqsDgj4NobB7mC8i1sq%2FGN5Ik0kj5TX9T%2Bk7n%2Fyb1WGzgU8P%2FyhY64eCG%2FnXthvGhawtE2wJ%2BlGcPiqFXSZV1kAbQq%2FgpGc%2BqxvOv4uzuvalslfVBOuZNcYq9g3LBW0xfln1BqTycw8%2FK%2FywY6pgG%2BgzU%2BXKTfhkSJ3olF1x4A0s4bU4CzPkGr%2BwLScth5ZmNl4z%2FxGJNC58ySWSA%2FrGJhdgYZuvQ8jGu%2Bnnjf8OOTpfN3RPUweQucTtKhwokOjMkcGu0VgJRDgqeATFKIWa12Mr%2FEhbglKKvtCJb0%2BqQSqQfcqzBHhB%2B3tpkAaPWeLMjnhPnStP6cicvoWSyJwr%2FBZIhFNLwbMZoxAo0J4WWDxJJpwP%2FD&X-Amz-Signature=a892e32a4efebb6136cfdb1e7bbacfd4a2594d784d28e832f95b9fd9411a3ca5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46624EAHR2M%2F20260120%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260120T220109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDPiML33LThlibiUe4dQPafpFbZnXLvrL3xqTCkaYF9RAiAMliSrizpG%2BSLNp%2B2wy8UB77c2JHQoJopxMJaNXP4pHCqIBAi3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM74dvvCOwZwq6JMq%2BKtwDMlyUZR9ldWK1ix%2BtxCvMkOPq55zg%2FkOdaBQ9T0Q%2BjrK8yr7mfF63dDZZpU86FYLuDFm7HSmJINFmP8qMlfVNdrjPN5h4xEvAwS7jTavdu2Jfc9t%2BInbICMbHDx%2B3rIRDifxKt53spY%2FauFOJQuefe4wOZOYEw%2FYZTEofKJXh8KF%2Fz0B4dTfExXHpPMmFqnkRkTvdD0TTGREJ27O7j0zZLlMFQBQxJDaMY2ZfZDlWXWQP6hPXWZxzyIcURPLlAnhcdRH9r22HL%2BlaCst1bM0ajw3I2y%2B3GtSOGeGHLI2M3sjrkF7Mjg8qqMdvvc8%2F9IWKNhHdPU00dMi%2FsnCTpbLontp1zLky0V%2BlctAJIkXUQSb0%2FfSlKWPiSQEBQkqDrykz1RsDjoAhQNxbb6wQDeL2ewnu6%2BsDLWTgWgioeFU74PToJdeZOqfHvAVatD5jHfo7mf%2BtCm1577dqXqZXiZuA2g6k6IZ%2BAhofJseeC%2F50hdMmhEULa8LqsDgj4NobB7mC8i1sq%2FGN5Ik0kj5TX9T%2Bk7n%2Fyb1WGzgU8P%2FyhY64eCG%2FnXthvGhawtE2wJ%2BlGcPiqFXSZV1kAbQq%2FgpGc%2BqxvOv4uzuvalslfVBOuZNcYq9g3LBW0xfln1BqTycw8%2FK%2FywY6pgG%2BgzU%2BXKTfhkSJ3olF1x4A0s4bU4CzPkGr%2BwLScth5ZmNl4z%2FxGJNC58ySWSA%2FrGJhdgYZuvQ8jGu%2Bnnjf8OOTpfN3RPUweQucTtKhwokOjMkcGu0VgJRDgqeATFKIWa12Mr%2FEhbglKKvtCJb0%2BqQSqQfcqzBHhB%2B3tpkAaPWeLMjnhPnStP6cicvoWSyJwr%2FBZIhFNLwbMZoxAo0J4WWDxJJpwP%2FD&X-Amz-Signature=171188d776d83e993ee8f04a592a0aeb3e135a1a6474224ccac0e7f297107e2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WCS76IK%2F20260120%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260120T220059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEQSoSDUofH52eSzPmcbjzw2Z4iH9dq6kpZ5aDWrPZiKAiBhcuVgsBBY9xetEMU0CO5cojR%2BSqpdg4ri68UkS5DwvCqIBAi3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMMl1%2F9JYg72kG8z9ZKtwDcfSDhIo7T%2FatTowM3jVhCqLVVOkG2DwJ2WlXTGQ3yjaRbheVZ7wUKmNg2tU9OQxCYQ%2F5vs8VmvzjrPRbtk596ravyG4soZI4CG4kvCiOqaFlZHVuLkjHcWQAjWFEzT%2FnUJ%2B2ZDEhtHaRYCtTwJOk%2BWvr0Lvig17kCEiMNDLTZ16J3WZh72pnkpTd0hOg6GF%2B%2FZudDOjXihJHJYV1IggrAXmELrfOH0Aq4zXNkv5MhRJ%2B8fIY7ijj34DO8QhD5CT7I%2B1ZY6Mg6D5FMseivRZTcHUgRvOIOHPjBJea%2Fc6uyzx%2FGHKhrmIHGUc9yAev4b%2BgftejrDuFyLecZ%2FpayYJ4AeogUAA6SAcJRaetuvvvpOmHmy%2FqNkNuE0TktuzC8Nf5iYZs6FQ%2FzmxTr2I7FsNhrvnIcc0Bg2b26RW1gN8FWYrDYIX%2F9X3AIO8nnpzq8LJ%2B9VuMJLTMtrZvavmyMV3JsOrWnn5zIeiW2PlJlAxgTZRrT4Ly5GA6%2FhaoLn59R3ol%2Fu22qofb649uDImvy8E1LB1DF5bTZmE15A9Prg1pDzn%2FSTBboKu2cQXExz0%2FLEeOPWrLS5rwzRwj8AFvhoPfKfH2J3cPJht2fPhxg9ZJEWvbe3lfJkfDFS2RzeMw8fK%2FywY6pgFA%2BUz3sf2hUSfXNmeaBRMKAF3rkpfVFzknXKU4uTjjMcEqTbJyy28KxvDQtsPu1FtOaBMrPoS%2BZYvwDokmA2OaSW%2FR2DjS5belTJqX8R0aK0maco%2BcXEaqgSKUC93Xnk8KYVWR5ueN4KoJ99h9KmtqpwnW3qNr5Ht%2BX%2Bkp2nZcu8w03XJrpRST2kGlEKD%2Bfd5Cq5NQqS5t%2B%2FOa5yltVgUaOpg3KMcT&X-Amz-Signature=23bb6476efe95f9e1973a1b34127b1f00d824ce99150d5a4012fa00fe66e00ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PZ2PXST%2F20260120%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260120T220111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHh4k4uAOvrwW7ylqSu7P3g1OPFpuOZPoDe2TwOa4n3qAiEA0uVlbvgdLD0ZIN5YuCLRjkE09E4pY3FRWV195IRk8QcqiAQIt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGlpm1%2FPxZ7zeQFurSrcA8Gs26R%2FWh3x587HHWfVbcvAzXC6vh8xaY%2BIKCbGp9Skafo4lsuYhgEMtt0DyRF%2FfGsZTzL2XFjD%2BJpvFOx25IaKUy4pEhY6YWh1nTcUDFLZdyX54bRWUlw6pFKdzoFhyMCt%2FEqBnPqWASLbtpPGXBroct4qFr6%2BCYRjhM3Y1lgB1Z7dTevpogpQ3hrhP9myzYS6SZXKkFXnKvqqtUr6P6QZ7UioA2owRC%2FVc6nBd0f%2BaXj8Lme5w%2BJz8rKSOWiEZgfYCrAwV8o0h%2FldzH0ifWCm2NhxnXpkCZB%2BrJJDQ1sPAWPq7o1qRz6hq9oSBvAAeiII4A9O1jEsOqZWMbn3y8kA%2B9IgaYZL4IDiyo5DNyBssCXvGE1bG%2BtcDwQ%2B%2By1trIPUMjLDtgER5xsCG2gWSJQL3rM3u6TiBlqdy6lNakbeOVLNeK8jpzLi9154gdBqNMYlkxnxMhXgKviyXWKZT1a%2BNu2m1SY8lJ%2BL9yw37MhY2z0rSTPxxo7Avk8hcE4hx73QcoWmPBYsrPtsGTkKdUmzq2dP5lRKxzC%2FKExQhqObIjALd5LkEXu8Pz%2BYbcKd1D8YNoR7qepLPl3xSaGGGZxL6aEWJbddEDbKHxkSoke%2Bi8Y9Hn0Nyn%2FfpuG9MN3zv8sGOqUBTWA%2Fu437epYsj5pbegd91xcsYVPl%2FiQCZwbenNnSFyMYnRRNn1yUtZwSaa0tTAEdoU9mMNouM3YrgU8AMf0mHYI8R57chjHFTco9afRBtF6oFItA%2BhoOy7CnYhVKTZhz6iJVX7uuXWZoHaLmjlKneT8IO8Fbqx0QwGJWZ9ktmBrtcLPDx5CFDf6H4JP5U%2Fwj3mB7A01LjOVm0bRuv%2FacRyc%2FtXnQ&X-Amz-Signature=bbc56cb1e95c454995ee8d9244aa18ab5de0d3256eff1786c1da3e93dca51ade&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PZ2PXST%2F20260120%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260120T220111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHh4k4uAOvrwW7ylqSu7P3g1OPFpuOZPoDe2TwOa4n3qAiEA0uVlbvgdLD0ZIN5YuCLRjkE09E4pY3FRWV195IRk8QcqiAQIt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGlpm1%2FPxZ7zeQFurSrcA8Gs26R%2FWh3x587HHWfVbcvAzXC6vh8xaY%2BIKCbGp9Skafo4lsuYhgEMtt0DyRF%2FfGsZTzL2XFjD%2BJpvFOx25IaKUy4pEhY6YWh1nTcUDFLZdyX54bRWUlw6pFKdzoFhyMCt%2FEqBnPqWASLbtpPGXBroct4qFr6%2BCYRjhM3Y1lgB1Z7dTevpogpQ3hrhP9myzYS6SZXKkFXnKvqqtUr6P6QZ7UioA2owRC%2FVc6nBd0f%2BaXj8Lme5w%2BJz8rKSOWiEZgfYCrAwV8o0h%2FldzH0ifWCm2NhxnXpkCZB%2BrJJDQ1sPAWPq7o1qRz6hq9oSBvAAeiII4A9O1jEsOqZWMbn3y8kA%2B9IgaYZL4IDiyo5DNyBssCXvGE1bG%2BtcDwQ%2B%2By1trIPUMjLDtgER5xsCG2gWSJQL3rM3u6TiBlqdy6lNakbeOVLNeK8jpzLi9154gdBqNMYlkxnxMhXgKviyXWKZT1a%2BNu2m1SY8lJ%2BL9yw37MhY2z0rSTPxxo7Avk8hcE4hx73QcoWmPBYsrPtsGTkKdUmzq2dP5lRKxzC%2FKExQhqObIjALd5LkEXu8Pz%2BYbcKd1D8YNoR7qepLPl3xSaGGGZxL6aEWJbddEDbKHxkSoke%2Bi8Y9Hn0Nyn%2FfpuG9MN3zv8sGOqUBTWA%2Fu437epYsj5pbegd91xcsYVPl%2FiQCZwbenNnSFyMYnRRNn1yUtZwSaa0tTAEdoU9mMNouM3YrgU8AMf0mHYI8R57chjHFTco9afRBtF6oFItA%2BhoOy7CnYhVKTZhz6iJVX7uuXWZoHaLmjlKneT8IO8Fbqx0QwGJWZ9ktmBrtcLPDx5CFDf6H4JP5U%2Fwj3mB7A01LjOVm0bRuv%2FacRyc%2FtXnQ&X-Amz-Signature=bbc56cb1e95c454995ee8d9244aa18ab5de0d3256eff1786c1da3e93dca51ade&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QHRFVHBX%2F20260120%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260120T220111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDqPMyjnPyrE6yBxGy2JO0zeIdWGuMmZR7GvUt6Uod1QgIgZ1MHbE%2BkbkM6zkFXCAyFibuEuZXplVwLoJfu8FxRergqiAQIt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDU5cv3%2FJT8mRKEg7ircA9as0fJSVk2ia6unZwUDYJ4q5ELGHz3X%2F0HnmBtD5vM4zHh017TdeVXl88YKDu8SHMRIDDdJ2bNTh%2BtGTnpLoV0NiAppZ3KU8tuT1vcqScgZgiH3jxDrIts9U2wO6eeyZVDhuf7SmTwqgwFIfwBJUJ30LGe4wIYgW6vpG%2B8v4UdstZvCLgwSgGaGhDgty8WBnTOUSqd6fPUt6JUKMl0WsEwj1FwCFy3VWj2c7y%2FkXe0WqLgSwmSDAUCWIn7T8e5O3Eo5JXXHKjjVb%2F9YPcgZHFNPW6xQ4VOQSXz4PkYAiAzsJGMxR%2BEkzVE6676vsOvbOy0vjLF5Y7Ev8tsFgrMUh7w5LDi9fBSL8NaOwprqfhdOFtJwSGZaOHDafadBY0MLXcsYmi9GUeARRToAR3ZmaliTiyhcsP2%2BQFSpC3YxZbaQICJOIuDKW2n0W3HmLiSqfEwmVuJN%2FodUFanGyiZxkc3MSTdQfG6RjTBypxmnrMSnKpXS6TINkgzfXTrVb%2BK1yEyFUt88jtfXCas4HxYoWFpQZmDcY3EfNYtmxEmr4oveNogeatNn%2BBiQrV1Cm0crkC426xeoRQbzmwA9HiCEUuaG7%2Flb%2BvcTOWSADC4CDC%2BVMcadg6w7J%2FK1leRTMPXyv8sGOqUBIx8YB3J24XM2yfwk9oNXq0XM58sFAbjgDFnamrUdpFtX8%2Fl35hjTcIzT78ofq%2B8JQCMwX6cNjid7U%2Fp0Pelp9pUlIeVwXDVn7rshvTFflRWQtdnOQe4g%2BZtlGM4xOFSmDHOa8xSBNDRQ5f2O%2FBRQ9p41fXQc%2F%2FB9RUDdnj84x5Y0pIeyQmgJ%2FqIWFWbbLCA0%2BmoXONMPNEJTI5XKwag2MiWKn1Zd&X-Amz-Signature=f1b8dec8ab962100b5c0e9dec3e1ba8ea20d19e13c7071f039a9443308bee761&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

