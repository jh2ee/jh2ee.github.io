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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JVZN4BW%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T164213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQDa6r1HeKIzW2%2BDw8KsBQoThRGw9QrZNLed3Xk7pj%2Bx%2FwIhALoIZQyKonAT4D9ZwNZnhXxaJlwVK4wY5CC4UQ46PeCcKv8DCCIQABoMNjM3NDIzMTgzODA1Igwn4odjRvbc3isA5ucq3APPosDodwUcBy6QwR7CyLL3Vt6E6wzK10u8oCdZIEDiKYO5UTpK7gCMe6gFK86XllR1Nc7LWc0CvcjM%2FRuLc1udmlpSlF4sHAzsvlO%2BATv9wvzFz0ov4%2FlFD0%2BjPPOk%2BZQqQ4ZeSBVybV8Pfrpdak9Pl%2BgMaBs3dxfH4Yozt3r2n%2FmXZLTpOPxb4fgI%2F1LqQwZ0bBJ1dsEvzXDEoU8ueRqRZYVG1RhjMrZP5ey7y2TjtEudM6D8P5kLDP1tasIME5XD8D%2FzbedEzHBzf3VSV6epZmGFJUbP%2B1Qu1YCudlKqgX%2FwAxQHiWLxVtK%2Fas9ObW5CsXiJ7GyO5p9R78WQE%2B6CgZM1TxJHyxSoEdFhrVALz%2BSbrIu4kfpozS%2Fy%2B59d2PvA9iHTMK0E%2FsrfNXBeEw07BLG0q4c8v5iOs01vM%2F%2BKlw8c0190%2FsbSph8EZ%2Bm2YYtUY3lzxb6HxLIjgY%2Fww5UPAdC4mgJt1AWA3PPdSJ5OXWxBRm0aAXJ%2F0EQ%2FDa9Ji7%2BlUe42dFdYkOnuWXG2xHwzj%2BYI0rYm403BKc4dPPM9bEjloURAG40QtscNKMbx4R913loFf8KWUZ6mOKHMOStjnUmaZkJA8C1FOg%2BX09%2FD1EE1s9zOlnYRiWNzsDDpyvDNBjqkAf6D39c0Sp2dJ5j6JJVEoqvzlV7DJZFHRiMM8tyW909Ckk2rm%2BLyNq3PPJB%2BU64PZXYw4pcIYfWO2rIAc%2BE%2ByuymecFAEfLGgTFC85ujqU5f0k545y2KH2gRMHhHCey6TYFyxGM7lmMR8dDta3J8sK2qdIUBWf%2BQdGku1zZlzHuYyKbz3RdbB5pDpliDA84eAcX11vh%2Br1ErarAiLuw8y9UObMxA&X-Amz-Signature=772b4c06955ab5518eabe0ed1903a363fbf04d102eb8b2b6215006f0e50c3920&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JVZN4BW%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T164213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQDa6r1HeKIzW2%2BDw8KsBQoThRGw9QrZNLed3Xk7pj%2Bx%2FwIhALoIZQyKonAT4D9ZwNZnhXxaJlwVK4wY5CC4UQ46PeCcKv8DCCIQABoMNjM3NDIzMTgzODA1Igwn4odjRvbc3isA5ucq3APPosDodwUcBy6QwR7CyLL3Vt6E6wzK10u8oCdZIEDiKYO5UTpK7gCMe6gFK86XllR1Nc7LWc0CvcjM%2FRuLc1udmlpSlF4sHAzsvlO%2BATv9wvzFz0ov4%2FlFD0%2BjPPOk%2BZQqQ4ZeSBVybV8Pfrpdak9Pl%2BgMaBs3dxfH4Yozt3r2n%2FmXZLTpOPxb4fgI%2F1LqQwZ0bBJ1dsEvzXDEoU8ueRqRZYVG1RhjMrZP5ey7y2TjtEudM6D8P5kLDP1tasIME5XD8D%2FzbedEzHBzf3VSV6epZmGFJUbP%2B1Qu1YCudlKqgX%2FwAxQHiWLxVtK%2Fas9ObW5CsXiJ7GyO5p9R78WQE%2B6CgZM1TxJHyxSoEdFhrVALz%2BSbrIu4kfpozS%2Fy%2B59d2PvA9iHTMK0E%2FsrfNXBeEw07BLG0q4c8v5iOs01vM%2F%2BKlw8c0190%2FsbSph8EZ%2Bm2YYtUY3lzxb6HxLIjgY%2Fww5UPAdC4mgJt1AWA3PPdSJ5OXWxBRm0aAXJ%2F0EQ%2FDa9Ji7%2BlUe42dFdYkOnuWXG2xHwzj%2BYI0rYm403BKc4dPPM9bEjloURAG40QtscNKMbx4R913loFf8KWUZ6mOKHMOStjnUmaZkJA8C1FOg%2BX09%2FD1EE1s9zOlnYRiWNzsDDpyvDNBjqkAf6D39c0Sp2dJ5j6JJVEoqvzlV7DJZFHRiMM8tyW909Ckk2rm%2BLyNq3PPJB%2BU64PZXYw4pcIYfWO2rIAc%2BE%2ByuymecFAEfLGgTFC85ujqU5f0k545y2KH2gRMHhHCey6TYFyxGM7lmMR8dDta3J8sK2qdIUBWf%2BQdGku1zZlzHuYyKbz3RdbB5pDpliDA84eAcX11vh%2Br1ErarAiLuw8y9UObMxA&X-Amz-Signature=772b4c06955ab5518eabe0ed1903a363fbf04d102eb8b2b6215006f0e50c3920&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VC3SSJP%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T164213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIC2L2N6%2Bdw0aItKEedgNHW%2Fl18xKQXKmxxvegWQnG%2FpHAiEA9l5qxLeHz3SW0fbA9%2Fgx9ZrPos8haxoYbU9gC1ztj6Eq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDPbIZ%2FBOPz1q9GZ7gircA%2BTpKEAzlJMmeTuycJCUaJgszXKL1KnSrgSG7aRjOZslYSLTgKlhVZrzvL7XAci3F6YB4NpNg%2BEMaVmUwKeANN8tb%2BvS9h2bq6kdxq4weoIa%2FVRGgNFKbbNp%2Bo%2FphtsshNgQKzxwPruT1WR3ITM2LliN9H7AYzuwpyM0mz8rAAvGML4QI%2BHeIEGrui%2Bh98ugpyyda1zLF515r%2FDYFdf2rhVXNQaq8JQTqBVHUBtY5eYbisLqy%2BwNffRVaiDVXUql7pwyfsZVp5mv9VDWVwWo23FbW%2FahAcnq2lXpNfnq42Oib4xJSmT%2F1aDYEOTaJ%2BbIm9XoQLGB9QaisEDR6AsR8z4W03COcMpXWEGWXFPgCNd1OCl7HWbl%2B6y3CjvzhAfDoLUeA6oL9VejGHAV5nBpN%2BvAmS0UxxzBbRpuK%2Bmi0kKYaumOuMgQNSRjPPVVChvwhgHXls8K%2FkkmhNlLI9f%2Bra6eoTW0H73vhh6hJD3A7Su2FIS70GJYroKDQaXmZVnsbm0czu5X34fa2WT7UL1HxTDD7QGhDzE5zNSumIej05H7eROOzgXbneJnhVRfAXtE3kC71Fh19y8vLIqpLtiSW2Bz6twZ%2Fvdj%2B1Dn8wPEuQlJZR3HCCM0uxT0nSPfMPDK8M0GOqUBkoRVEDKtuIZbTYuCHqJ3NjsGxbdjJcdkya27bAmaPG61Zou43vNYsiagqhyXaGO42EB1CPcC9vbc3NqbMxmDPznlSiBfcYc2shDolTR%2BvutPm%2FOwrY5ziK1%2FQstB%2FQZlI1Ub4GoLP21omHQDwJ%2BYxgWYgpZl3zIwfgvD5WInvYkufk2dGQ8XFvS%2F2Y%2BxLoJ%2FnwSkzm91DHOZgM2uRlS7I7Xzh8HR&X-Amz-Signature=84d1cb7849cb526e981260f62c235ef878fde24d1715acca5a7959573c53c15c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LXLD2IW%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T164216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIG9xZL1vWzRsItciwDUCGiLM2dsYGaa1MIJD%2BpVId7XbAiEAzDwuRwo4yneLlW6eL4XvLD2qW7rL2reBcnSKPhJ2AKgq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDMhQN72Ntz9eB42LNCrcA%2Fg9BViz7hcjtlKDcB4M0YbRstIvJhd7Er2vnrcHtIEiJWkfcHpoWuzt1IkkCz2Qp7rJV5%2Bga%2BQ6F%2FRCsr3azoZfru5tOt2sWmbY5ClgqH7aZ5Dg9fETwuD8R2XFQ6lqI4oWsIFI0wxA23d0CoBwEBS5Lw2LwUVTHhVewcOsGgfUjwsv5hAuADr5emhiwwnjrQub0%2FV5qE84y62kKIVhyMGsTEYo6XqtbzFneSh7rnKrzgo8uw7CJyZdUkM9zjR9Wv1FWrD9xM%2Btp%2B340wyjig8QszMmGmo79%2BAdyozd5w5BYZDNCMCmjfD32lvm9K4DUUuHc%2FKXEOJ55cLdCeJlxdb76inRCceybQcLnc%2BMY2DL22G7iMNZe4xOQoyZLz2FlsXZoLvtWR4enGBZcB%2BcTC3kcF1Q6kKXYhRUKFqy%2Be6Ar2R8BK%2FcqBapDWH1480w0Q2Wt1AK%2FuiJ7CROmuKt1yoH3ZA7Dt89uHopbRnYX69RLUXkJhqT8oBtmO5vUwVTLDPUfcLxCMbq5bLNkTBpCoBoFmLMFkrQGcZKTVcpME%2FPqelxtlceqFp2l2ZACmGMhg2O%2BLYLwY5B5LK6%2FhUjoUee1gb19%2B%2Fmt6py66OBGl53WLNLS48i9br9UxIFMP%2FL8M0GOqUBRrGaYJq%2BmfhcFg4IgVP7QNQZSQADAKoKDyGCaq5RSgKU0S8JIrjgEA2vQZOZQLYr6x0O1wmIfcNGbvJ0m88FNwRCNQ%2FdMVd6%2BLEwRTLihJbDqNqZM%2BxPiZvDd6S0zFnQ7nLQL6idT6DvcBGlDbXQb8PF%2BQDGhkV1QM8fhuHMyoTC8%2Bu31MrmJTSISYi6yQJgdX%2FdMRD00rhwzLZDTmKANVYQtoMt&X-Amz-Signature=00f0744cedf89cd6ccf25605d619ed95c90c5f0e143a2056419c5bc0b91a3338&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LXLD2IW%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T164216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIG9xZL1vWzRsItciwDUCGiLM2dsYGaa1MIJD%2BpVId7XbAiEAzDwuRwo4yneLlW6eL4XvLD2qW7rL2reBcnSKPhJ2AKgq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDMhQN72Ntz9eB42LNCrcA%2Fg9BViz7hcjtlKDcB4M0YbRstIvJhd7Er2vnrcHtIEiJWkfcHpoWuzt1IkkCz2Qp7rJV5%2Bga%2BQ6F%2FRCsr3azoZfru5tOt2sWmbY5ClgqH7aZ5Dg9fETwuD8R2XFQ6lqI4oWsIFI0wxA23d0CoBwEBS5Lw2LwUVTHhVewcOsGgfUjwsv5hAuADr5emhiwwnjrQub0%2FV5qE84y62kKIVhyMGsTEYo6XqtbzFneSh7rnKrzgo8uw7CJyZdUkM9zjR9Wv1FWrD9xM%2Btp%2B340wyjig8QszMmGmo79%2BAdyozd5w5BYZDNCMCmjfD32lvm9K4DUUuHc%2FKXEOJ55cLdCeJlxdb76inRCceybQcLnc%2BMY2DL22G7iMNZe4xOQoyZLz2FlsXZoLvtWR4enGBZcB%2BcTC3kcF1Q6kKXYhRUKFqy%2Be6Ar2R8BK%2FcqBapDWH1480w0Q2Wt1AK%2FuiJ7CROmuKt1yoH3ZA7Dt89uHopbRnYX69RLUXkJhqT8oBtmO5vUwVTLDPUfcLxCMbq5bLNkTBpCoBoFmLMFkrQGcZKTVcpME%2FPqelxtlceqFp2l2ZACmGMhg2O%2BLYLwY5B5LK6%2FhUjoUee1gb19%2B%2Fmt6py66OBGl53WLNLS48i9br9UxIFMP%2FL8M0GOqUBRrGaYJq%2BmfhcFg4IgVP7QNQZSQADAKoKDyGCaq5RSgKU0S8JIrjgEA2vQZOZQLYr6x0O1wmIfcNGbvJ0m88FNwRCNQ%2FdMVd6%2BLEwRTLihJbDqNqZM%2BxPiZvDd6S0zFnQ7nLQL6idT6DvcBGlDbXQb8PF%2BQDGhkV1QM8fhuHMyoTC8%2Bu31MrmJTSISYi6yQJgdX%2FdMRD00rhwzLZDTmKANVYQtoMt&X-Amz-Signature=d9b2f6f464e6b5e5eababd7e73825508751e005022898974fc00a39c8f2fcd80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKLQB2YI%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T164216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCICcUmglPt5VDA2gzbf3Oy4fuxixpp6ZS7NnZ1m7uBsq0AiEAgKInNez4AGtrqSVaTXU1ALDX0s9lADCGYZnOaD%2Fm0L8q%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDHNZSaKLBm83FEUz%2FircA39oVh%2FvNgYjYNwEpUcFij7fXEvo0T0aqo%2FS7OEjw3wGnYDVT%2BlrDrA6chEl4EPHTDaL%2FX%2FDcln3i5s%2Fbyprxzrdwzf%2BKuz4OOluMPrHGJYcm1mRD4eLua5VnDKFZqO1Elm7kHBpiFlMzOgwRQbZXYFHxfYT6cdRdaDuCmIAood1rpSazpZyJgvUjrHoyUaINMadBUVF0lAtF1K%2FisnVALCLjBwoNKyytY%2BxRwh5jn%2FI7gJxOh7OOsyaovhXFYVlArLK6c5UnxStDvbU0bmA9da6cXWj2mJGiSf0Oi7BygTVw21w88ycXfp7BJkoMVtvwdrszjCrJAIVRearSK1ukZsDnP%2BRSajHwmqUBDLfapdagKj0BRnYw912OolMrq6%2FALh%2FXmUDMCJNjQMxwVvo29%2FxEEyEk8uUd5jyIOcCevawyOJ3nf1t2lr7Cl7ybjyai34b%2FWakWfO7ruZ14DPk8MuvCsur0QNqZMWdxujENGJW8txZfQT1CP6IdPzdwAGDQ35iD92IMIZdJti4uPYpeMcIwyxoSxRuonZ2yZe3BbICO%2FFKhT1ysQ1HV7q5YXRJ4v%2FXCT5JJ6GkIlcU6Co7r6MuNNEt4X%2B38KIJq6iSTWgqiZ9gKZ1xAZ20hpS0MKjM8M0GOqUBdcYYjJSLINrUSRU86aIWdaOTQxsn3mNj416V31fB70DhyuI6twJsElDxcnT2fWFDmfQUK3WA5pM0%2FTRFi2tIGJy27FuWAkkvqFqOghm7ssJURt3s1AScSPvkAhemM4HJy66554oWzjhlWuYETxbKvXAmFItMPGl5z0W0098J%2B8c23pHaAwkGMmoe9E9IoVv4g8wS4MC1AgapJS3Hensi%2B5AMRsSA&X-Amz-Signature=f9c63b9138cf7969cc0de8f4f6548f82366d1d4ccb525abb61dafb130820e57c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U5TWX6GB%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T164217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIQCy2sZop7LDT0%2BdfNkcc5LErYo%2Bckv63Vmg21qkZC7NNgIgXcyZr3kZwIzPZzt%2BEbDDsB4UMyEjDa1iwCuefgUTsEAq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDFkN6xAlRsExl%2FAoQircA%2F1ddW6Pj9yB1VfUi2Q%2BRKrnOwTA01OBU70VSsd5COKL1EBYVKXuJvXB8FU3adsLjn8EAi8EN%2BfdO2OJ%2BE5VRhf2RJXT5Z3Mso%2BczyJsS7oSWkQmTXAOOvgAfE2Jog%2FQkrEq%2BZBhXS1%2Fa3oa5Cu8Uu9W0KKpf%2FEIF%2FTYNowxF8O9eXRH3u4BMv4%2FcG9NzDBlAu%2Fntvmq7CAoJ9yFt5LBkmVAH7J%2FAnU9FbAclK0b1%2FyfCCQgi%2FZtxcqZiGqw5w9qDZh9YAUuTlNngxKFmpfzUBIH9i6DjG6eOv8dFblBVquEBNfNnRsIKGx5rf2c7l907hVP9BMFOOq4R2%2FBM8hX0rwMAAyXynX7O6GwcGY5%2Fq15SsSK6aWD%2B2GwrZ7TZC2UEaZYY0I209naJ5qVW3kiqUwGS1YBLL3tOUEensUVpbe%2FIAc6E%2F0o1SCoFiUCJDIUmdFZanQWzEBHqrK7X0FwQ5zhZ%2Bpqyah9L4M1lho2JrDILDo854ngPiHFOv4gPZmJQr7E%2F8IGTOQfCSqoT8L03zu7TprlpjZVNXzRUYSXM%2FIH36OISPKqo1r9rj37ij3k4Uez2Zqx5T%2FDN2clD7EToCbJlxHgpKpf0iXkyStoIYWyKavjD6osoVbqV6ujMNDL8M0GOqUBCcBRC8MRTyR82XL5ln%2FFu2gZqSnv%2FXSi4NqVGrH1CQZhEWeNo3pVRYNwpqYSyvpoOkGUno6pEIKVtNBvIjsNCLNagtW%2F3SzJQj2ibrRJ9suvgt%2Fm7%2F7DX85KE%2Bb5WKGgI7K1nP%2B4cJ9dn1uulaBQf%2FOIxHxA1Lukh72RO%2BWtzS3lVPR5jJji0qRNcUr2T8m3jqwEh6oM6YaLQvfj7S8WhGsdEdTb&X-Amz-Signature=46fd5ac843bafe87592afcefaf2c50f9442b436b468edd610ee65f42499498fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEKGGLFM%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T164220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCIGQJkeWW%2BvQxpu0qsT1ianBSgOtKj5eUC4c2rauuVYSSAiAWMMiE5ZGGkffv7WGdemUr5sFnDFthJ3x9%2Fr84VXDMcCr%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIM9vBMkaVGdB8IeLNHKtwDQmLN5zfzOU0NGFQpea0DLjqj3YJs30J8gyKzFPxPuEdDD%2BYHorzzMtEl9VVRLRns9MrBzstcF3L9qfuOn87ZtI8SWK5GZTp6jD8TLhbdwXX5i67nnNzGs6MB90G9dEU65dsjp5hyGDuhojpwOiA%2FshRbzboTkIwj3DryErjReeqfl9arACyMGCq74AJvle035uZw3GcbwOvm2W5csseIGKX1cYYyZeT9yR9nsSIZAEyEJGaAeS6MDZP%2BqkJB%2FFJHYWkK6SJE0ITQMlV8ihgtDzGfQ3WfYsHT9o9p%2F02Y4pJjoyqI3lDSZYVDyBvdjTak4FADxJ6HNtHDAEUBf2KHMhO2LMXizdFx9T4vQ9UOHTGVulNgppsE9IknZoTczOZsLEElFUD7CFEp8h5YEbPnNxXqoqRAw0lXQNQ2JTVx3Jy9gVcfjgwz%2BPDqjilyPN0q5XWjBEQeqo0LyfwEpAKjMT1aHvod%2FIMjVlDxce1uQd%2F9KxlGMtwmL2sZGidoYRQII8KAfywjRF6e6WpFRIgo3msBy0DfCZsEfq5hJoU9Es1I%2BjMzOAIDOFTt4zW0vFgHG2zDGOdVhpurV%2B6is7mm8LUhHxTTf8O8bCjD6qcsP7FPEe5ytV%2BewXfZp8ow58rwzQY6pgEw312PmImFH2Q0wMXi9%2B5McZyw27EcOWaxCdg3layEd7tAFMBVkjTEm2VBGyxAAj0I4K2Z8q0CvIjZLDslARN6F%2BFavxiOsZK5V%2FjKOZ5Go5Y8HXU3sSIEcF8bzqPv%2Fx6jg%2Bhp%2FEgi9S34Qnz25pm%2Bpo2KEWulxTKoRB42RZ75Ilcz6Au1Ksm7OgC40Dr%2BZbf%2BvAExYh79mhzayz5w0QwWZj59zAe%2F&X-Amz-Signature=dce82695ac10f7c60723eae206956ef216766c30e1e5a478f258e08d84d49045&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJFIM24A%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T164221Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQC8hXuy0L2Qps7u1b9LuNHaEYLcsBmALJUsF2uNDlyqOAIhAMGNnR7ABeyZpzTUNB4yB84doiZmgEbSekkeZvJpHX40Kv8DCCIQABoMNjM3NDIzMTgzODA1IgxvX6z4mb4ILtuR57Mq3APMjHaMRlqyo%2Bs6HxWLLRZg2QuU%2Fu%2B%2BwNHgGfOx50YeBrIYvM3n9ucsazJGuDn8QRsSUVNwYCLhKFMHDVwesGzwtnKBD8NQ3k5aUFSZ%2BcfoDQp7JUN1klzQpsiSDGCpfXp5o%2BA6P%2BwWkK0fDaKMvAZPLzTl7Pe9YXT9OBGly1duYmQN%2FfDbbMeyEDndj%2FnrMNL%2FBBTSDOgxDLtAyA34GNVpsVWXdam82dKAvyYb0ZEFGuJcJXQy2JEvsMb4mYADdPaS4Bf8U98tsfa%2FEiB9LmLKwCeVlA69lumsJjkah5SZwjTFQb%2F%2B5IJOYsvr%2BDdmCPv1JAbG8T0L2MIr79J%2Fsa7o9vOfoIVVEeCJInK4IzSNsmH53Y2zGetoLmHa5DKm1ZDL1L4z7kZwJuEuMXTcHTaVmQdxENDulD1Uea%2BMSUM7u%2FSslpEOZOm11%2FE64rEh8Jsyc5wXMtRiEWhMMcMWmsbUzcuAbLrX7flFlqCeeby3%2BIcJdzutcCu5tQVOfKD78ZJx3QecphB7d5BuyoyiXx0RrslvXpDnMFj%2FbFYZciqFkZ1qQWYgg%2BysTJDfrcXXB9aLDevU5G0%2Bp7wYb8wrAuLSGPowVrKD6mkkfqnClYPy7ujBDXfbiV0wWJKg9jDlyvDNBjqkATXq8UlKA0fuJ%2FegoAQ2jGPMnqtzXDCzfGf%2B08jLwGaBJIooD0suOpixNL7N8DHFKJwaG7KXFOJqQobH%2BbEzGh3t8T6t2HwbIDrSPBzWqp5WjwMi5S0Vfs3X1%2Fw2dE0qSzM093K04tn6wXQZQoDkDe8hmfWSxdVaETx7UJn1cm9Z5DvpthuTwyRhPBBXlzF7JERWYTPEAyU9v6r6APqqARLOiBU8&X-Amz-Signature=4c696278931fcf32af3e6b575177ce18c9f788fce8ab067895200bbe1c6fb70a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJFIM24A%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T164221Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQC8hXuy0L2Qps7u1b9LuNHaEYLcsBmALJUsF2uNDlyqOAIhAMGNnR7ABeyZpzTUNB4yB84doiZmgEbSekkeZvJpHX40Kv8DCCIQABoMNjM3NDIzMTgzODA1IgxvX6z4mb4ILtuR57Mq3APMjHaMRlqyo%2Bs6HxWLLRZg2QuU%2Fu%2B%2BwNHgGfOx50YeBrIYvM3n9ucsazJGuDn8QRsSUVNwYCLhKFMHDVwesGzwtnKBD8NQ3k5aUFSZ%2BcfoDQp7JUN1klzQpsiSDGCpfXp5o%2BA6P%2BwWkK0fDaKMvAZPLzTl7Pe9YXT9OBGly1duYmQN%2FfDbbMeyEDndj%2FnrMNL%2FBBTSDOgxDLtAyA34GNVpsVWXdam82dKAvyYb0ZEFGuJcJXQy2JEvsMb4mYADdPaS4Bf8U98tsfa%2FEiB9LmLKwCeVlA69lumsJjkah5SZwjTFQb%2F%2B5IJOYsvr%2BDdmCPv1JAbG8T0L2MIr79J%2Fsa7o9vOfoIVVEeCJInK4IzSNsmH53Y2zGetoLmHa5DKm1ZDL1L4z7kZwJuEuMXTcHTaVmQdxENDulD1Uea%2BMSUM7u%2FSslpEOZOm11%2FE64rEh8Jsyc5wXMtRiEWhMMcMWmsbUzcuAbLrX7flFlqCeeby3%2BIcJdzutcCu5tQVOfKD78ZJx3QecphB7d5BuyoyiXx0RrslvXpDnMFj%2FbFYZciqFkZ1qQWYgg%2BysTJDfrcXXB9aLDevU5G0%2Bp7wYb8wrAuLSGPowVrKD6mkkfqnClYPy7ujBDXfbiV0wWJKg9jDlyvDNBjqkATXq8UlKA0fuJ%2FegoAQ2jGPMnqtzXDCzfGf%2B08jLwGaBJIooD0suOpixNL7N8DHFKJwaG7KXFOJqQobH%2BbEzGh3t8T6t2HwbIDrSPBzWqp5WjwMi5S0Vfs3X1%2Fw2dE0qSzM093K04tn6wXQZQoDkDe8hmfWSxdVaETx7UJn1cm9Z5DvpthuTwyRhPBBXlzF7JERWYTPEAyU9v6r6APqqARLOiBU8&X-Amz-Signature=a74430e39304acf863f1e97aad093b5cd2f890d27b7cb56de2140cb9336fcb7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664G2UOS4R%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T164210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIF6AdBeIUKy4aY6%2FlZn3%2BWL%2BW1Bjrge6K2DEVysetNVkAiEAxm%2Bud%2B7reAMmI5oHhvP%2BD0kA%2FENoSPSA0M%2Fb0ktoW70q%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDF2H%2Fuxdq48yLh5xCyrcA7cbuUCd6OR5VrVG9cUMhq2iVCge5mQPfUXl834aiSrTrMf0vZRLdlRhS4FaOfYN%2FNis%2F08f3QOBIQUm2IHSY33NXjybV4XVMmMrP0dsKxHNrtgpUQrMs3PQobIvK8k4JxX5vlOB351RZJMgX8IRJm5Xrgu3%2Fh9PJpUjt3TJQQuxotKHlrRB2gSBPseod8dGnZs2Dkaic9f%2FtD0imZycDTiX%2BYzEZ%2F6u%2BBPktBy2AkSq91r6r8MYVt6OVS3yXeRMlED%2Fr8mvgE67ai1lVmjUQ%2FWOmW7d8oCUoRe3vXz1mxlS4OlHDA2D6e5DJh0Wgw%2B0QPxW1cG13EPsR4kdF8vetd3eV8C3IQPXsUZyLry%2BgbzGV4AMjq1nTSsAsrL2cMrEgHK4KcIBsEQqV%2FKO%2Bp0bVbBehYRU7n6OZUw72hAO8Xq%2F9LtorgtR7T0IlyhhFR2%2FLkAfn0Yc%2B42q9r4atskNAVGzLf7tVJv8nTWlCqOoV6RSU15Nv3yIf2tajThh9rhgRKqzAUxnvjfkQeIYh0GhlrxqX7N4hMctt14ovrSs7uDehdJ0IR3xOSYDBq%2FDW7s%2F%2BRSOXTTR1YjLBqAIgEyfWABu3NPRryiTgC%2BoYCJycWXpKB8PpgJp5rUTNnAoMLHK8M0GOqUBidaL3w5Qm%2FrgcOLpewSDOSngjex8BBLyq8eVLGlosnY%2FsYsB%2FyyHfh19rOatBTKtcJ6n%2Bd9k35Nw7PiPPpTjHicTqaBNyLuslPnGRE1qxyX8vbhzZ%2FK9MwOH7TYPCHgXhdkbxWgWvzYaWz2ogJA6z2wIclwSk7Q%2FuOl%2ByMk12zD0EHaVGjLHytMf8GIUjrtZeO%2Fa8hUK2hSpwbxgCZOUfrOAb2Kc&X-Amz-Signature=b9a89c507d8b183f3940e725fa3c3f7d8d3caa81ea3473a888d54368761a5ddb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUAMFMOK%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T164223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCIF1HE1PjUcTeadhbU3Vb%2BesM5t7Zyhy8SSFW90OuLMZbAiAPtXEu2nj%2BFWTlbeNAVqtN1w88UM%2FvRhdw%2FJBhiYfboCr%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMhw60YhR0GVz8wm4GKtwD7OYSEQ4fJVpBADhGAMFzjYLSVaXPpIA%2Fuc8UURUZXFYyFt97chxFSmDtlLBB7KPiC7dHIFuFe14ggYeU3aa%2FImN29Ij3R4SVV1A2r5UtA7g5IrP09mzDHl7Xl00Ke7xewZC918dzqpSJgfWhRNQHx8zdQ%2F%2BEbnEcOD%2BaPPhJD3SaNN6h%2B7rm5noC%2Fkf%2FHDw1fEdXL1Lgo5KTiRDNSK4IXwFSN4TgDh1jjpH4N3dOGY5%2FmGy5qLsbNXIoUqkKax1o0Ktjq88UFTiLr%2FeITwcbciAiGIlQpH1NXoVICQZ5Ybrf4N%2FxmqUD1PO%2FRzGixzGqL8zhrIgQiyeWzbCqDo8wmvoHlxH0Z8KxDWNz7sr%2B67l4%2BIU1sgVJVNRG1H%2B6SpKfYj7XEebE%2FjT1hl9DdTsLgWs3ULcfJS1aiwqMUOQ6vi9j2FNJ%2BHpUpz5VrBwAcxhHKErTCzQvQnkIh%2Fhhe3EAOpfitt9Jx5BXmW1Xdf0shM5ZSCz6kPzQBeUY6A3gCFyZDMHOI12Of%2FQpvuBGnvGyyYApVj3GsOoGpg2UHHSOODSjtQbiAWAbr2h4DZ%2F67na4hd9G%2Fb4jwvyamuXaSJcrhGwjMAco7luq19VNT02x%2FZ3ionW3DXlIOcFx43swqsrwzQY6pgGFe9xoJXYfAELVHCLS7YoqkE%2F35HJDpUcPXN%2BKPRWfQ2tgCYRpnfedcNSKhNPLyzw%2FuWo6W%2Fd%2FKASD%2B%2BZhGpN%2FiWf4LVaSyb9TNPesyl59HYEQsJUP%2BiWCxiktVUS4Otk%2BJzjf7ubXMK%2F%2FPyrZ0%2BVRN%2Bd5t2nU701bTWuzfFq8m64tjriSjg6KaDeymYvnSo%2BeNm31clvHNuW73exOoHszcAppmZ5w&X-Amz-Signature=1c5014246b12ad004ddb54031ca330bcdcf267c28eae23b59f4231f433e2fea6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUAMFMOK%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T164223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCIF1HE1PjUcTeadhbU3Vb%2BesM5t7Zyhy8SSFW90OuLMZbAiAPtXEu2nj%2BFWTlbeNAVqtN1w88UM%2FvRhdw%2FJBhiYfboCr%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMhw60YhR0GVz8wm4GKtwD7OYSEQ4fJVpBADhGAMFzjYLSVaXPpIA%2Fuc8UURUZXFYyFt97chxFSmDtlLBB7KPiC7dHIFuFe14ggYeU3aa%2FImN29Ij3R4SVV1A2r5UtA7g5IrP09mzDHl7Xl00Ke7xewZC918dzqpSJgfWhRNQHx8zdQ%2F%2BEbnEcOD%2BaPPhJD3SaNN6h%2B7rm5noC%2Fkf%2FHDw1fEdXL1Lgo5KTiRDNSK4IXwFSN4TgDh1jjpH4N3dOGY5%2FmGy5qLsbNXIoUqkKax1o0Ktjq88UFTiLr%2FeITwcbciAiGIlQpH1NXoVICQZ5Ybrf4N%2FxmqUD1PO%2FRzGixzGqL8zhrIgQiyeWzbCqDo8wmvoHlxH0Z8KxDWNz7sr%2B67l4%2BIU1sgVJVNRG1H%2B6SpKfYj7XEebE%2FjT1hl9DdTsLgWs3ULcfJS1aiwqMUOQ6vi9j2FNJ%2BHpUpz5VrBwAcxhHKErTCzQvQnkIh%2Fhhe3EAOpfitt9Jx5BXmW1Xdf0shM5ZSCz6kPzQBeUY6A3gCFyZDMHOI12Of%2FQpvuBGnvGyyYApVj3GsOoGpg2UHHSOODSjtQbiAWAbr2h4DZ%2F67na4hd9G%2Fb4jwvyamuXaSJcrhGwjMAco7luq19VNT02x%2FZ3ionW3DXlIOcFx43swqsrwzQY6pgGFe9xoJXYfAELVHCLS7YoqkE%2F35HJDpUcPXN%2BKPRWfQ2tgCYRpnfedcNSKhNPLyzw%2FuWo6W%2Fd%2FKASD%2B%2BZhGpN%2FiWf4LVaSyb9TNPesyl59HYEQsJUP%2BiWCxiktVUS4Otk%2BJzjf7ubXMK%2F%2FPyrZ0%2BVRN%2Bd5t2nU701bTWuzfFq8m64tjriSjg6KaDeymYvnSo%2BeNm31clvHNuW73exOoHszcAppmZ5w&X-Amz-Signature=1c5014246b12ad004ddb54031ca330bcdcf267c28eae23b59f4231f433e2fea6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IXRS4BS%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T164223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQDNr2LJS2AozWvtEfYuSBC%2FjrHG%2FjePfEznIhkCgC8xiQIhAKneEwH741rnA5qQD8MfFyhn1xpTfcrlIk5X6ad6Mfd%2FKv8DCCIQABoMNjM3NDIzMTgzODA1IgypdIfObaxwFRxLnrsq3AOmrEeRLZlJcjPCa7QnpBLhLmZ5YOju5MsUJnPJwNauPPM%2B2iLgYc0BvhmvWfpWCO%2Byfefny83ddlO4S1EPfscYkqmVdaoMikO6QcXQATovVd45Ms7O7Pv31hzaWYIY1BxeCJaCCZIF2p7totrk8yR%2FB6gThgsQc6rfOSWM7afQRB00OmsgzkSy5fiGEFOTpCE5E9FzFW3odkogWK64BxBC8PtwJQsQQ3RI5Npcq7C0U9AcCpFSNa7mDWD86nP2zpX5gz2yAHi4OXEsOApLgWHe7yVtqBKJ%2F7RZYbeunWWocHezKta3Y0ynI3FE8%2FgnqTgfbhr6BmBkwYjlxiIN8G8TeMcH%2BMEtOM4IEQ137dwqbMnUbJ%2Bg6ZpAD00DNU3EJQOcwwGpK%2FpXWZu57CBxRrHESHDDOt7vRnRoE1YLWTmTEMBl3PCmt%2Bt2jss%2FYBJBE9xfwbcl3T3AMUrM06IjVENknble0TNDfF2MY2HJv7%2FKL%2FbZlb4xzj5KcK7Q%2Ftouldx95QNpdG%2F0piiTq7OBtZRCkF0i%2BW%2FY4TRittILk%2Fz1dNJWnAxdqLz760oOPc9kppDM6mzqXl6AZNDCYPFh%2FlhyxSZlmYJpX3ZTriZNVcySx%2BwUCfTo8CmvFt%2Bl8TCoyvDNBjqkAVyb8vGt3zbxsPYs8afhZOL3r0COOOOM2xwOK9c%2BtIhnxNsTeXmV%2BB7el%2BrMIxoVzKWuI9x2NdGEwHni2eDdCP4wWFV3XwkqyTF0RxS7xuDXP3kAFCaeXMYdHquxop1J3BYPIDW%2F6KNWpX5j%2FrbwmwfPmY8lRK8LQozf1aq0TuPVGygMD%2FBMGdVc1atmXBrjsbEuDg8ICm6N%2F7cZi2wmaPAI8KTv&X-Amz-Signature=361a41b615ba80b5fe331c49838b6d57c6e63b3811f1dbeec0d45e461989d321&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

