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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6VI45YV%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T103726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID9XUEk%2BFs%2FcU0y0RAXvnnb3zzlLHmjt7om27lcrEGVKAiBSaB0fHELYw3d4HRpaH%2BCAdSRU3WIBF0SkHc29U7uLpyqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM7nYhmTK7yXpxC%2B0iKtwDfUn15HUX%2BEZxgz7aJbqabQTAi2OKQwUUUmoWOgEEGXWnGpxCUTAvsHSWvglXgN3u9QQh%2BM7aUnRYtpTVuKQdYfJpQx%2FnORjYpnzO8WdnkskSzrCGtC80HorTuBTWAJfROab0Af6GjF1Vi1SfjlGb9vWKHwU3F0OIIXhL5AQj14tdwcMeOptmEE1iGksRxpHdhAj6iuOMekPdY%2FtyzzQzkGLvY5952LAjnesWQnMBvXTRyfiw%2Fadvmzo2cwAev2K5795XmqYGn4hN9folpRDfxBgIdQOTHipCSnlakS7NvHeRR4JpsrI0tbPok04BZ5VSZhXr7tfHMdF8cIyzO4qKB2zz%2BbqGMHJUrxQUbyG5JFklj5JiSZ4UwKmXZWEhm8DkOLcXsqKQ%2B0O%2BrMuL7Nllr6W4L5F8N6HDTxgJMLBdCuigXWkBPTSaTgTsix7wWW8P0CNfrhtrtrdK58eCmtIVNWeEstweOZ0HfQ37WJ2jwFu1Ct%2FJQeGd3QkP9Lf7AbOtVo3WzX5LEy%2Fck1HgDrCVCgrGY%2F%2FsQM%2B%2BzoochjxQd2d85HVVmxoFQ7NHo6BkVRaIVODQT4LxVYeIZ8OBpitoZ%2FPjQKc4YkUWngh9uU3bKoucfjOFliFbZAi2cwowvs%2BJzgY6pgEIqWg2bPmqq%2FmoUhGQcLtC5DlbTXVa5OQsfUNs0NvwCSVW01%2BjFppNSHha8OdfyrbQK8xYiCiUpq54ifXjrp5%2BjyFLqc1WfvD0i1MNFXpj1%2BvI2WC%2BMWqi9mMiHv2bLKp53FgAJSgekEiimQgI%2BXrS1U%2BrjQjaqGzHe3%2BUgOP0sNAQKahrUDWch7EydFJ%2Bsv5HxPl%2F21TIDWl%2BGaTQFgTjARocniR0&X-Amz-Signature=2487450389a461e2aeb4d458fb1edac9512038dd77531f7fc7f7b49959be166b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6VI45YV%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T103726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID9XUEk%2BFs%2FcU0y0RAXvnnb3zzlLHmjt7om27lcrEGVKAiBSaB0fHELYw3d4HRpaH%2BCAdSRU3WIBF0SkHc29U7uLpyqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM7nYhmTK7yXpxC%2B0iKtwDfUn15HUX%2BEZxgz7aJbqabQTAi2OKQwUUUmoWOgEEGXWnGpxCUTAvsHSWvglXgN3u9QQh%2BM7aUnRYtpTVuKQdYfJpQx%2FnORjYpnzO8WdnkskSzrCGtC80HorTuBTWAJfROab0Af6GjF1Vi1SfjlGb9vWKHwU3F0OIIXhL5AQj14tdwcMeOptmEE1iGksRxpHdhAj6iuOMekPdY%2FtyzzQzkGLvY5952LAjnesWQnMBvXTRyfiw%2Fadvmzo2cwAev2K5795XmqYGn4hN9folpRDfxBgIdQOTHipCSnlakS7NvHeRR4JpsrI0tbPok04BZ5VSZhXr7tfHMdF8cIyzO4qKB2zz%2BbqGMHJUrxQUbyG5JFklj5JiSZ4UwKmXZWEhm8DkOLcXsqKQ%2B0O%2BrMuL7Nllr6W4L5F8N6HDTxgJMLBdCuigXWkBPTSaTgTsix7wWW8P0CNfrhtrtrdK58eCmtIVNWeEstweOZ0HfQ37WJ2jwFu1Ct%2FJQeGd3QkP9Lf7AbOtVo3WzX5LEy%2Fck1HgDrCVCgrGY%2F%2FsQM%2B%2BzoochjxQd2d85HVVmxoFQ7NHo6BkVRaIVODQT4LxVYeIZ8OBpitoZ%2FPjQKc4YkUWngh9uU3bKoucfjOFliFbZAi2cwowvs%2BJzgY6pgEIqWg2bPmqq%2FmoUhGQcLtC5DlbTXVa5OQsfUNs0NvwCSVW01%2BjFppNSHha8OdfyrbQK8xYiCiUpq54ifXjrp5%2BjyFLqc1WfvD0i1MNFXpj1%2BvI2WC%2BMWqi9mMiHv2bLKp53FgAJSgekEiimQgI%2BXrS1U%2BrjQjaqGzHe3%2BUgOP0sNAQKahrUDWch7EydFJ%2Bsv5HxPl%2F21TIDWl%2BGaTQFgTjARocniR0&X-Amz-Signature=2487450389a461e2aeb4d458fb1edac9512038dd77531f7fc7f7b49959be166b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WDL25HJ4%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T103727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICP1Wj1ztE2frLoI%2FFJalAvQxx5pKKtemSfxu3XujQkCAiEAjrIRfz7eCCrAhoOuH9f9IU265IWhlP%2Fhnp794yxyry4qiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJdCR3hb7TXzeQd3KircAymEj59zkmHTRsZ272oHbuKbBDRrBJ3xg5pnt7G0OVqlENnBRivNHNcTYs78uTJXEiGBqsrpWjzQTElzxrzQqO7TLzGiAj0lQNc36Q6dz6zfVKcywoCuIKvczDAynX4%2Bwi7NNE87ypYCHutJ4RafEoAXdjGH%2FpO1mcQXtgAxjT60aNPvMEbdtf02WURBe6zBCOp5ngJJy%2BpKj2wcmK0gQ8vgBNQzLMFhV%2FvehmH52QEha1I6CTHL%2Befe4oW%2BQbJDdADQrbdbWhVGkKw%2F2kdb0C9lKWWQ3Rhp95UsA4Lq3actn%2BuH3DLb243805%2FutDdw3h4gSoTc7ORKShLSX4BJUKyNZ7ok3xXR9itHqAQd77Qbsso1TJyYxuuFasZ5v5mRtSyL2hdOBnKnP9UFMzusA8ucb8l%2Bn4B1wAids4LBAv9IZjEeORHVWIguIWAnhSoZzrAlMS1qObY629cp1ZoLlHgiL7mxNie%2BSEU7nR4YK3PtavHyFhle92d4SJMcDUvcAkEYR8CD2lEAVkOug3dS7GxGHt4t0fbRp3F03qJlxhR%2FYeZuAPiWK8MYywn%2F%2FLogtxfplmgrnVmWitNMwYeHg5Sl6cFHz%2BR%2F1uF77HMAE06RsPvKG6LcsqmJVkNSMIHRic4GOqUBJ%2FpyY6swk7qeP9pvSbSFoO23kjUzqg8%2FvVoJiZYw8qhK6YM3U%2BYfNMYHeX4JgNfDjNXJw5vEld9OcNzx9Le2nmBJ%2FwVvsx1J125ga6Pl2TtNWOS3FYN6F2GLcahVXKh0iPNzqbV%2FGns873UdVuGfadV69%2FcSjHlJXTYoj7xinizM5%2F2z8xulrsL6glfLXp6eAo1GEGZZn464MGjYh2KFLN5SJW%2Fv&X-Amz-Signature=9f8ae22fc5e25b0fafb8e7846656851d281aa4c0687b480428dcfdc69f300bac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLTZBE4X%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T103731Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCm%2B2TRZl3ljG34PadLZPYkViNDlru%2B6tbSMP6x7xt3VgIgYYqyfgXHVviii%2FGmQgF08yiPIMiFocr%2FOFtdTP6lWmwqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEqrFeBlYz8wjkz5vCrcA1J8ZUIymV8Q%2BV%2BYdRkBuXzITgfStbtdLGThtt42Jdl6tJhLfuNr%2Bk2t%2FfzCUcwAt6zx2yFPipQ6ZMSywZninpgv%2BfpLr20MGUuSVAYtbwpRTARASb8URFwoAu%2FiZ7n04%2BQN8pF3IYJSHTUvHYYdXWefH%2FXj%2FVgn6zjM2eLSjn1PCY8mGhTy9PtDSsLwtbmFV%2FGro8l6VkXUvlYI3BVZJ7wSoWaLmZoai9Nbuxi17uI%2FfArNa6TYnY4cxclogDahez9IMOaimTnc%2BNGUPpW9WTVY%2B2YeD30eWoQMBnUH%2BFahqkCrXirXM3i4c5w4%2BTNvwfEBdPDgCjjl6Lwtyu3JbWiXstSseQoAUJNQDhurcncvn7lXVX2NixGycqa2QsOSX3UygwY1np6gbCkzvc63eQ%2BxAEWMSyWMxsaPqO0KC4p7%2FE7qgnAoV%2BnieZipX3fRWVXq4yRBUZKbfQAENnwG%2Fi2RRiaQG%2Bd255D%2FvxKqdGdxApKyAaAiUT2ynb8fAu0bMlfMmXkI6ou%2Fh7YT%2FEHIpQwT8%2FEovR3ifYhZajVib8svJLP6TYNKCTTWmSRMi%2FDQg7dYvvn2oL4plcc3XYM11RIz8KpgsJCZcPJfZ6fayRZIvOstU6u7t27S2%2FWUMJ%2FQic4GOqUBy6HA8zmQmpdgth2NxdvaMPvuo3t40eXKBtjBxLguI3JPVQFwGmh9ZF5ysbjogvN0kSEE1biWzY7JvbuFO8XJSosoFXr4DAOwsKjQMldchGF4RRlYhaIys9%2FxvUyDuGRDRlLFW%2F3TscQWh9BRR0g9Junl5m6slq7ldEwO6YKDfajrT0%2BRno0Bf6CwK%2BmZMEFvjZMO8FMi%2FRgY0FUAjJrWOHdiT7TB&X-Amz-Signature=e595c298701a37472fef435898cda934df5d76ca095e54eb5ab83dcccb67cba8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLTZBE4X%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T103731Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCm%2B2TRZl3ljG34PadLZPYkViNDlru%2B6tbSMP6x7xt3VgIgYYqyfgXHVviii%2FGmQgF08yiPIMiFocr%2FOFtdTP6lWmwqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEqrFeBlYz8wjkz5vCrcA1J8ZUIymV8Q%2BV%2BYdRkBuXzITgfStbtdLGThtt42Jdl6tJhLfuNr%2Bk2t%2FfzCUcwAt6zx2yFPipQ6ZMSywZninpgv%2BfpLr20MGUuSVAYtbwpRTARASb8URFwoAu%2FiZ7n04%2BQN8pF3IYJSHTUvHYYdXWefH%2FXj%2FVgn6zjM2eLSjn1PCY8mGhTy9PtDSsLwtbmFV%2FGro8l6VkXUvlYI3BVZJ7wSoWaLmZoai9Nbuxi17uI%2FfArNa6TYnY4cxclogDahez9IMOaimTnc%2BNGUPpW9WTVY%2B2YeD30eWoQMBnUH%2BFahqkCrXirXM3i4c5w4%2BTNvwfEBdPDgCjjl6Lwtyu3JbWiXstSseQoAUJNQDhurcncvn7lXVX2NixGycqa2QsOSX3UygwY1np6gbCkzvc63eQ%2BxAEWMSyWMxsaPqO0KC4p7%2FE7qgnAoV%2BnieZipX3fRWVXq4yRBUZKbfQAENnwG%2Fi2RRiaQG%2Bd255D%2FvxKqdGdxApKyAaAiUT2ynb8fAu0bMlfMmXkI6ou%2Fh7YT%2FEHIpQwT8%2FEovR3ifYhZajVib8svJLP6TYNKCTTWmSRMi%2FDQg7dYvvn2oL4plcc3XYM11RIz8KpgsJCZcPJfZ6fayRZIvOstU6u7t27S2%2FWUMJ%2FQic4GOqUBy6HA8zmQmpdgth2NxdvaMPvuo3t40eXKBtjBxLguI3JPVQFwGmh9ZF5ysbjogvN0kSEE1biWzY7JvbuFO8XJSosoFXr4DAOwsKjQMldchGF4RRlYhaIys9%2FxvUyDuGRDRlLFW%2F3TscQWh9BRR0g9Junl5m6slq7ldEwO6YKDfajrT0%2BRno0Bf6CwK%2BmZMEFvjZMO8FMi%2FRgY0FUAjJrWOHdiT7TB&X-Amz-Signature=c32fff450a4ad51f41947b000c3e35258d01677aa4d169a8463f635b847c60fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXIFOGR4%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T103731Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDQ5SI%2FoR2MhVC6jHgItI9Yoq580GLw%2BCxDEtznvNZHnAIhAJ5omieDWYughqP%2Bz4Aq1cTxLC2NaSHl%2BfZo%2FdX8%2FL5GKogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzWsL0LoyCF1iS2C%2Bkq3ANP3Oj3TdtA%2BvxrooSGG0%2BTIKPbEzfWyyWmFd8IvpJqMpOlGLahxFLNsbl4bVjbbsbDKKz2y2xXgeEO5xOyBsjUiEYwCCj3mh0kuT7esiI7vhwaFx1v7iw%2Bxn2xILXzwOcbxY3ruhFIBgtr1%2B0ARJoVjcVDA1hb%2BzNAohq7kiOPcvzuX4MK2nypr2M46HIpdmob8XOkE2fobb%2F5pdh8lBXZNDxr5IW%2BNDWk7DfO1SYvP3WPe7PbT2xb219YwvS6VzIwpdgmWPv49Wdp%2BDAvUJ9toOiEZS6TxglB6%2FHxWJiY%2FblrhWm11Mur2SuXS8xsIiTN3Hju363Pi3wtuMAW%2Fbs4vXCKO%2ByOW2F9VUkoyEA%2Bo0TWAZ02JVsQVVFf%2BPfmgpuSTdCx1mJhjHOdJcUYM5w8QgcTRKi5b6gK2c6rshWZlV3wbnUsu2dTJC21anz4lgJtdW2vFqoNRBjs8smN8pJSWx2gNLLSW17qOgBpHjlPJXJ83si88fzmu9%2BiZyUSmjzsIGsF0Leyl7RDt%2FlDa%2BBa15GiJqbmOG3nuFtPktuWirGGeNx7pLqYqKPeTs4ObwCZK6OWRg%2BT8ivgUfkX5Ad0UHQPTMe%2Fstd6fNrj2n5Eu99Ux4IICGjl3SVhgTCU0YnOBjqkAeuaRVx%2FoH5CIvwf%2BnJDyQrJSo0UZS6i7ucVOybRPYiCY%2Fk9IvxHiPjaWtfkkfqDXZILCO4Gf5iUVCD89h3rSmaTsiLjiMBKqOpfv0X7WdB4iq6LbGu%2Fia0ZjtYLThUU9EWmeWHvdrgfOgUKgnwAeZeIHYzBPd5u4s6Ft8w%2BqYqer5DK4hWOGkXkMc0FkCCvVBNNQGsCo0Z3r%2FBZtH%2FO7j6GMXJb&X-Amz-Signature=d7fc1951218fa08756a86c8f15fd8a5ad84500114397cfae3d5ec53450b16d1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IWSCCQO%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T103732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBxUhn9vAlrCoTjds%2FQx6jXkmzh1tQ2zCTB4NXdVRYd9AiEA4EygfBThjT09k69pXmmHgy866mboy9krsaa68MYwjyAqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI%2Bgxxie7%2FLENWCxlCrcA2GoHrk0ox0BKvUd3EYd4KwO5eaCsmT2MxSp4uZofq0x3v5DPHVg%2BruTdfOj6CUKEeJ%2BkshnVvwRaXRuwQ2wv8BwAEt%2FskdCMUTe2%2BM32Ts1evQiTrZshrn6as8gHg3CFyhJjCYVbFrEam%2Frn0md3rI8BcUOPXuW%2BCK6FMfe%2BuDRF2KUfxl8EaekerkP6B0jS1QX18aXBjfi%2FqDTNG0osBDTc3YFR7iUriHgSkgpTPMNOpM4HYrhQ0IWw3vxgkVnSRs%2BciAks5Vxf5TMjy6%2FNRh2qr9xmVDd0Iqwz9Wpue%2FLJM2iipHfjFmOCRDay%2BuNfW2m2eUUSeXsPJA19iihyvGdGkMubT%2F7fQTod2FBtKFdtYl%2B8H0Mujby%2F6LpFuXQS9JjUYKL3T9tOEZII4oXHGKsI78P3dQ8GFiv89eVyl8eC0aSGE0S28EkuiOBMfXOYwWkuj6KwyJSizW4zRrE7zqjhMD%2Bbg6m4Lg4OOV%2B5s9KGQuSrgy5NwRWSQ9SlYdpX61gn58DZ4y7JfYBOh86kW0sC%2FbMxMoZvHZaHD3RhF1gH6PmN8iCahFePDbFnDAZzzDN2K4BjE9HsE0w6A7LUdQSVKtCzoZ%2BwXyW7IkBKpGCdoeGF%2FiVSKGMrfQLMKPQic4GOqUBY98kTEq5Td6%2Fdmcc2FqTxxyOwxwn1KWdYDImoQ1p71KppZXyYjzTTit45uEQ6WMsSRpUP4ANjA%2Bc8AsRY2Q2qwMYn9iMbhjppsRWThCXgbXW%2F1oyReMjbB%2F6%2BEhdRCmywk4o%2FMN35yAMD6Mzwp5eZ8eGJ8IBXsalpEiM4e%2BTAM9%2BX5%2BjcjHIg8BNv8c%2BAgosDXxQdRDjQftOH9%2BWtOB8N7UMO2Qd&X-Amz-Signature=6fca2367078084c19a9e8da2b93b5d8990e59762e53a82d4a8a6b1378178d1f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664M4ALZNX%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T103736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDYOvpvtHhZNKMAjHSXbMSHRXEapru79Aoyc7pwwI9nygIhAKBAejiYvQlQILDxSg7vrC9g2%2BUKrH%2B1W6YdOlKoB%2FU%2BKogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzZbVXxZuyVbXI8AMYq3ANxCj75BZS9ZOtba8M%2BIfSybPgXEMDW%2Bl019bJeoYC89ohZ5twgCca9x7WJwVzM298owr06c5fo46eA%2BeFU05LOx41O%2Fpl6VcY16C2pNLKlBAUEccWe2QW16TEPkmFyIIp%2BDsNj3rLj7bDGVbKqBZFepx3SKLrUFDff%2FQ2i%2B9TMLb0%2Bac1zY0%2Fb2ooyELq%2BUTzCydNCcA71fI0wt03pVPAEIyljCr1%2BXH9SOAiyqcCDnNfu%2BqH2CtcdIN%2Be2dlKYAJ%2FVwZV3K9ZlSNTV77c%2BQKpp2cLLqDD8eH7I79LYtpFswwGsvKr6%2FYUfYBV%2BMyQrVFkjPyWxDUx9BiKs4JGz3ebnki4S64Vdp9XNEbXBckl%2BObFqA5FoT1XKYviKeYvmxEC9DHPrYoz%2FI5ts2qeC1f%2FuJjvrjw3t5dDBWh%2BzUZU52RgE87kZIOWXd1h8nX8ql60F4RG6gJzQgiT829lD2r0zWopphf52fFcWbr8bLkV86dZxoka9q2US28%2F5BOFY9JdRHb3u7E1aJ%2FaJWEDMYXfBPBInQ0BIGkhL17Z34Aj%2FEXOQQ2huel5PyvjJwYQfmlHv84oySqtofreZcb6ZNzdOK1ltb%2FabQl5KO9LK9a%2FDQZ2mYOUPboxU7QJ5DC90InOBjqkAbV7S2dG90EWr8erd9uHEAbpEhuzWRWEpYJWTTg%2FgPJ31j11T7uEWZ%2BLwiFaHTn8JqpMATKdQhczBzu8b8Fi226ABL8Ql1YIJ1vcRTZw5LqdylseAWQz9kTxCoqJdzGoLXPfndCR665hNF1QQ1U7zzcszr5FGiNTYTPrhJy%2FkGVhUv3Ohq%2FfjiqTIsn6dJSI3WjQprFAlaN2KuHb1IkVHG8VNsoY&X-Amz-Signature=1a2b1c472493b99dde5ee11627e442332eb8be8a440f55bcc7a532b74f681e4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WDJ4RUUY%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T103738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH4Q4NEV4Cm1UxsPZ4ISEIXLrt9TnOoSkW053ufIXtSeAiBLyc2J4Pb6yCFsqEnX%2Fhfeg6wGA4jUCW8Dp78qbcXMbSqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMG3BShxkpTaPgLPRBKtwD9WjmLRv%2B4Jng6lvenV2PwUV8mbYlMKSFNiyoA0BhVu7UVqOtT4cm96aryP5e3LJ7RiKZHaGd5cH9ylizUvrWv7MIKRS%2BHK%2FyiQabj0xSLopnIQ1EcgLI02DuFA0LIpZY1V22n4kJmMO3hPsh%2B7o0yIDJuLONqi3NOK711SvoNzwgV90i5kySnYv9wzOdBRxYmnli4jG5sDXx4j99Lfk466tvTsHIpP6mYk2YCYM1GXzeBDJKJgmXlvfrRfvC65OAAOtNDD7kvzmf%2BMlw9mKLG4XJAXfYVO%2By6NoE1LO49A88UL1wJPqUNF9dUt6jsREdGuXSGGymjL5dpF9vIjEUIKii7H2AtFeJuKPPya%2BmpVvLW0dOqh5I6pM4mPyd8Qe2IaN47oCp3bdVesjrNySFho7wzm%2F7t5q6nJZLP4DSsUes4MoeCNfxIs3VPmUGQtH2wSf09qe1uN%2F0eYflQYyq%2FsKSB0kxiBPvA2FwjmZv1fYmPJD6lW5mObVVVsPPQ%2Bef7mf2ehzaGfDB2VxI3eTYKC7z1OuTnC14K56QNEBOZXwjNCd6Fw4ur82WpXhxqXP2vkrwk4Ke8PWZ5cs%2BgtQnWP0CL7g8vMzgusiIiQLvkDnAzGiJK4ty2zdKldIw3tCJzgY6pgGp1rL3HlCgusxNDJsKw4ThfKdYrO7FsnswkBzhvhdKxCMNeIR1FTx43PagOYgVxqzCsDrDIsxzbbmXmqBJ5vj2bmp4HAoJUFEtXLHERJ4YT4sZT2tUUhSyg%2BR0RkdmI6LXvvTJXBsmnYsQp00aB9dikyk0b0NiZuOQCdqu0QmU3qNMwSK83mg8TdROmu6DEPSlgjhAPIv63wmVqGQ2Q358Y77f%2BD78&X-Amz-Signature=1b82b90acfc6f3333ad80fb7bb28c81cbcbd9a9d98009d13cb1816a586d03cd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WDJ4RUUY%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T103738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH4Q4NEV4Cm1UxsPZ4ISEIXLrt9TnOoSkW053ufIXtSeAiBLyc2J4Pb6yCFsqEnX%2Fhfeg6wGA4jUCW8Dp78qbcXMbSqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMG3BShxkpTaPgLPRBKtwD9WjmLRv%2B4Jng6lvenV2PwUV8mbYlMKSFNiyoA0BhVu7UVqOtT4cm96aryP5e3LJ7RiKZHaGd5cH9ylizUvrWv7MIKRS%2BHK%2FyiQabj0xSLopnIQ1EcgLI02DuFA0LIpZY1V22n4kJmMO3hPsh%2B7o0yIDJuLONqi3NOK711SvoNzwgV90i5kySnYv9wzOdBRxYmnli4jG5sDXx4j99Lfk466tvTsHIpP6mYk2YCYM1GXzeBDJKJgmXlvfrRfvC65OAAOtNDD7kvzmf%2BMlw9mKLG4XJAXfYVO%2By6NoE1LO49A88UL1wJPqUNF9dUt6jsREdGuXSGGymjL5dpF9vIjEUIKii7H2AtFeJuKPPya%2BmpVvLW0dOqh5I6pM4mPyd8Qe2IaN47oCp3bdVesjrNySFho7wzm%2F7t5q6nJZLP4DSsUes4MoeCNfxIs3VPmUGQtH2wSf09qe1uN%2F0eYflQYyq%2FsKSB0kxiBPvA2FwjmZv1fYmPJD6lW5mObVVVsPPQ%2Bef7mf2ehzaGfDB2VxI3eTYKC7z1OuTnC14K56QNEBOZXwjNCd6Fw4ur82WpXhxqXP2vkrwk4Ke8PWZ5cs%2BgtQnWP0CL7g8vMzgusiIiQLvkDnAzGiJK4ty2zdKldIw3tCJzgY6pgGp1rL3HlCgusxNDJsKw4ThfKdYrO7FsnswkBzhvhdKxCMNeIR1FTx43PagOYgVxqzCsDrDIsxzbbmXmqBJ5vj2bmp4HAoJUFEtXLHERJ4YT4sZT2tUUhSyg%2BR0RkdmI6LXvvTJXBsmnYsQp00aB9dikyk0b0NiZuOQCdqu0QmU3qNMwSK83mg8TdROmu6DEPSlgjhAPIv63wmVqGQ2Q358Y77f%2BD78&X-Amz-Signature=56b852cda0ffaa0170235a6eb1caf77959fcc80363e0969180876109ebf0c777&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTQ2AF6V%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T103721Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBr3jxfnYRrpR5NNexniA%2BeX0NK3YLWWG3jF3AE8gZOXAiEAgGEuq3cze3krqf8J3GvrnIojkIIAQQPnE3HQb0H3A2QqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBHyIt9o8CURTZc4GyrcAzzd%2FYUIzn%2Fk%2FJKyr752mKaZJkG6K54UBg8QtQ0QeliqbGHad4ES%2FEGTRFc488vsR2E28XDPGMYaVt%2FjX4EXn%2B8k6D5s%2FBl20h4GhUuNH7urTDj%2BvhQVLo5kAwmAapZaPqb6%2BRiE1B4l9R%2BvHBhuqFE9c5v66q1jXfhsM3eTkn6a08GOn%2FwgKn5eN1SPr6Dc55C%2FeDAg43nLEW9uVrd17KZifP3z1QDsLOhThPTJPbli%2BFnJVELdV0QPtuvBdJhP9eY6e%2Fy61Hktu1XuM%2Blk5AE%2FWT9Tzpy1hNpIiG%2Fv5ai57IuHF1DJMZR%2B36RrBffEgyXFWVZY5BDpuEH2RE7%2Fo5CP7AUw52AsdH%2FusKmNaSzkAvEBE%2BVRgFDGB3tOIDb%2BcGo5HcEnE2jtlTBV4TJ9vL%2Fd43WNxSzm%2BHqzGDLh2BsG6ZOZA36GAQzLxsiPvDvAFoqdLVrg7cSYxrHZoNY4OjL4%2FOdyUS0m%2B6ItvjQ%2FqDRrlQF5heK0c78OnK4IO74Cz2fdSeCeWhjBPgPvXcfQyXROOGY%2FLKOf4G2LbxQvLi6BrLorZkZQCqZzMPD8LOZuV1BZk37L%2FYXbGKCCkKjoFcJ4r43ECP%2BlzKkd%2Bf%2BU14VAO2raDwMjlfMS%2FcOsMO7Qic4GOqUBEp2KinvSMjhnaPucuCiJJja0VTQ5x6Rpyjk4cSpTeXY7O5QKRUPUeDv37h7ZEXkEkCDG5L6t8iFp0tS9Qs10PXtSWMTEf01%2BEzLO8q3ZtA0mit6nt1nh4KZDdt0aSoXVp83ZB5UPRH2P9MaMSQhvX45VrIm8l58GvyFOERLjNoe2xUZ9kzWcHOz6XRlJ%2B6YKEZhXHZjmTR%2FSt6LTNQX%2BDL4NFE%2BE&X-Amz-Signature=c7b18879f4342755073f0801bdd101a9f0c2b8a154410a39eaad9ee416a87bec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCH4JEQG%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T103740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD9JPGW%2FcTRPPA8kguv08vrQtoGGjVUzGkhHOYc2iNVKwIgIMcH8rnB%2F1XW3fBzskiigaEQ1EoyAyTxhOGGxKikxAQqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEKBOZwrDBtKRw%2BdPyrcA9hQGJlwCGCUw9e3LtOeHVCOhapIRmEa9sGk%2Fnsnss4VuvDj%2B1qkShlNq0aWSR4Ds2Zn1g7iL%2Fsrps2omUoWmGaH102%2FBCfCdxS%2BoRj86CipryE5AXtKSpUOLeW7TitM%2BbXL8j90AzOQ5VbrNwdR1P08c508caGAKN3UU177qvsPcv%2FVcArICqGlpAkJcaAoHOCZS784Kt%2BeZYSjIhaFYp0AV0NpmP6itGWs%2FGofkjp7oAJ5D9hhuJQj79wthtlQSAAXrCOiPVV9SZO%2Br%2Fmb6cyabeGt7i%2BNAVF45xok%2B9me8ZiHTuDnkhK%2FkQ1QxNLgQJdPlcfvik%2F7H8s4B4jDtJwx4uGPHYapRFuIjBHhccgiz4W5FQgtvkykrsfj%2F%2F%2BI%2FQTpWfc%2B%2F6bJcxdLpMZdpQa2NfyzuO87HdXFW3Nq7QCcb%2FBZ6w2hh2X4XHWpEthaioVA8bh1vh%2Bzd8J3sqdHsHRg6OYFK9qKwiHW3nbuVwUZTbN6dOCYDRhyjzgU3QLplVtsLPwWYpW8Qw%2FKq1UUI8DLL64DBjX6pLhTIQunX3Yem66j5fQy3GORehyuECdJmHFagBFhyq4fNU%2B%2BePIoZuSK9H5l%2F4Ko96ebBOgldxF1hfXpShJM61rJP7tUMPLQic4GOqUB1Gd9tAFWYFfQbuuKlQ5PReFDQdPHawpVWMI%2Frqc6cZ%2BX9z4ILef1M9ZgXSxbDtvQ8NrI2BSK7q2PVaIkW6xpj6P8ElXeJIlBmopGOCcNcshtIl%2FtgzUKhjAt5gN%2BnPaEqCa7dADyCMBFPhUcYVGL5WSBp7by9n3hiJVTHbiDjD%2FaMb%2BgYSFcBeZmqHAW9o5%2BdI%2FZxSsYBP2P8kbhMOzrhESdi7qt&X-Amz-Signature=21ff586427bb6a6ff6f2dfff981c35926fb67a575d24ef7123f871bf85d9fe91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCH4JEQG%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T103740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD9JPGW%2FcTRPPA8kguv08vrQtoGGjVUzGkhHOYc2iNVKwIgIMcH8rnB%2F1XW3fBzskiigaEQ1EoyAyTxhOGGxKikxAQqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEKBOZwrDBtKRw%2BdPyrcA9hQGJlwCGCUw9e3LtOeHVCOhapIRmEa9sGk%2Fnsnss4VuvDj%2B1qkShlNq0aWSR4Ds2Zn1g7iL%2Fsrps2omUoWmGaH102%2FBCfCdxS%2BoRj86CipryE5AXtKSpUOLeW7TitM%2BbXL8j90AzOQ5VbrNwdR1P08c508caGAKN3UU177qvsPcv%2FVcArICqGlpAkJcaAoHOCZS784Kt%2BeZYSjIhaFYp0AV0NpmP6itGWs%2FGofkjp7oAJ5D9hhuJQj79wthtlQSAAXrCOiPVV9SZO%2Br%2Fmb6cyabeGt7i%2BNAVF45xok%2B9me8ZiHTuDnkhK%2FkQ1QxNLgQJdPlcfvik%2F7H8s4B4jDtJwx4uGPHYapRFuIjBHhccgiz4W5FQgtvkykrsfj%2F%2F%2BI%2FQTpWfc%2B%2F6bJcxdLpMZdpQa2NfyzuO87HdXFW3Nq7QCcb%2FBZ6w2hh2X4XHWpEthaioVA8bh1vh%2Bzd8J3sqdHsHRg6OYFK9qKwiHW3nbuVwUZTbN6dOCYDRhyjzgU3QLplVtsLPwWYpW8Qw%2FKq1UUI8DLL64DBjX6pLhTIQunX3Yem66j5fQy3GORehyuECdJmHFagBFhyq4fNU%2B%2BePIoZuSK9H5l%2F4Ko96ebBOgldxF1hfXpShJM61rJP7tUMPLQic4GOqUB1Gd9tAFWYFfQbuuKlQ5PReFDQdPHawpVWMI%2Frqc6cZ%2BX9z4ILef1M9ZgXSxbDtvQ8NrI2BSK7q2PVaIkW6xpj6P8ElXeJIlBmopGOCcNcshtIl%2FtgzUKhjAt5gN%2BnPaEqCa7dADyCMBFPhUcYVGL5WSBp7by9n3hiJVTHbiDjD%2FaMb%2BgYSFcBeZmqHAW9o5%2BdI%2FZxSsYBP2P8kbhMOzrhESdi7qt&X-Amz-Signature=21ff586427bb6a6ff6f2dfff981c35926fb67a575d24ef7123f871bf85d9fe91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSEZEGZ3%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T103740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBzC%2BcjrRdVr2UXvsWYOBT8ERSd06RiAqMZEKMBirrH%2FAiEA1q8qBMAaWiuOc1iZ12WRn85iwe4XHX%2BYkRmRSusVxFgqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHm5Xc6c5HE6sscYMyrcA12JUydoPIPSJUw8ceUjzcwTequuP4ByZODHOTi%2FqczYLVwzfnrXQZIu5Plu7qYAeZFEgL2V0Kb%2FuxsgXtRqleg%2FpfhNdcdBwwh%2FU5ZzFgo%2BO2jKS3xdpQcvH%2FLRJNw2qFduSU%2FNIYEtLF%2BEQCXJsiKqHYFe73k0QVJu4LBU3sDK3vLVj21pFW%2BJPYZhSZGb3453WGX94F1s7cZ%2Fj8dUrZ7xOUlaIYtLox4F2Y0bQK1qbIjnR5lRif1EUPseGACDwVn4tKrbTEaWgomA2ZFdIcjHbUXmvLLnKmAdsEW0oaE4zi66PE8eOgIgqsLLvm3Q6BYbd5y1iPCj6pnMT6g1GPpVY7%2FYO9XgN1xtRw4YlDcg%2F6Cbx7Y901CKhVbyesc9PNW4lbVHKafNl04Ipys7kajGS%2BMyhYg%2F4bfJ6KIqbB5Khb9QcEbMzWT3MsBCZED6PnCxJ%2BLq764FpMhSgo7eoAIjdNGYJYMEA2yzm6lyfCl2sGh42NF5yOr90gppLUGfz%2FnIFjsIA0tZwR0utEz0tHivwTK%2BhvCxqXLdWtb2i3K4kX8KLM8eMSH3XkfMSp0Bl2czK%2B47n%2Fe%2FsEkxvWyO8Ha9eS1FzxhsrYjPRbbRZBeBvjZy0mG%2FeAA%2BW3u2MN7Pic4GOqUBvrmICM6joshH69DRHGqZDbOoB5Kul0i9jinbuhFWVjb%2Fe8kXe9QGjoLEXPCHwzFpvOiI5KuKI2nuM%2BMJmoZT%2BRIOPB5qgV7fRgvf9GvlBhsmky3f0zj1tNWUE6%2B71uWjSb8cFJfQRGlwnI%2FH%2Fj%2FjbgIYgUUYNgKfznrSaDFEY84FKLtOFO4Jo1NzWCelvcAKk%2Fg9es9iadX%2FuzTi7yrxKOIiQM7g&X-Amz-Signature=779ed27e01c62a28e299fab96130d4a4c2f23e684256e775eae770de6930e21f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

