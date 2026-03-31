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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUTQS72C%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T060746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIDBHC6Fo3%2F5Oysrk6UHPZctkuH9ngYrSB%2Brx2wX57E4%2BAiBQAln1a5IKkAvlPhzjEy9QOD%2B8cQxy2qvg27%2FeYTYNXSr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMhUuOBXVdg61isF8MKtwD8BDs%2BL3HUAqv8D0oL38akcRy3byQ2uzcuubSdczwGl5JnZLlPeMhIj5TRe9rCJfCOrlogJMIw4wfXA6qXwEqH86SN1sxnFwUNbCeB73B9xyGeV8zsLVU4yEDZXBuST1CKXI4ubC5rvqe2wWs3gI2%2F5491eMWm0x%2F9OVJUQ%2FAvMDVA5aWAwIwOXvv%2FUfi2DelhCA1PFBsnvXRIrWtHWot%2F146blqipvVDRICpvx66Ikdap7ctZZKXYLH3ujV9gn4ObIuvdhEQ8D1HpLYQruSQVBNe5aAZr89PzTBNbDMf4jk8T2lCYRGizn1pMUGAkE6D24PnHL26taVytSta9yjD%2B2Ho9MbylDR45AOk4R%2F%2F87QIIsixy7Q7qdbRbR%2FBX0rC0BAQJ0rlfqM%2FVoqiKi0wjWbp5%2F%2Fa5%2Bo9yVas2Cc%2FmZF9npOAWrQSXcbTwwKMEXw8MAxruID8JwvfpXRL%2FoqX65KIFtQhtGucc1eus6XxVqEJdTI4o5dSZVYGDK%2FGGSNDTtv9aV0ZPNDXpUJuaStJhpUZnukdn2Oo6YavRfGI486%2F8dSKh5D7uik36e1bMsUn16Yw%2BpACOv1mPd8uf6DGDwd%2B%2BfxCrc%2B1Xq808ofeXqtyOkRWI%2Fk4hXeJnVwwmaatzgY6pgE8yFQ1JxMiKbyldGOXG%2FB2f3tPSPvx8hwhnN4XSKaNwlrdw2xIGyU%2F30uE7njoO%2F3Er2bfisR63BOIOq86faHfuNnBo4oa8Rr8GY8bP4wDVERnotIg2KKOpTl0CXqB1ri%2BwZBJ853s%2FKhfy8FRXUFHuxB0q997k2OY8i%2BvtfAtF7FTRj%2FxJ1uRl9YzVFU8VcRUfx7HlXOMgHkY7VQZjHiriCdeOoUB&X-Amz-Signature=1125523bb563d8b6a776b73095c2bc37ff45a0268efe813a4f83843c7d2fae4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUTQS72C%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T060746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIDBHC6Fo3%2F5Oysrk6UHPZctkuH9ngYrSB%2Brx2wX57E4%2BAiBQAln1a5IKkAvlPhzjEy9QOD%2B8cQxy2qvg27%2FeYTYNXSr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMhUuOBXVdg61isF8MKtwD8BDs%2BL3HUAqv8D0oL38akcRy3byQ2uzcuubSdczwGl5JnZLlPeMhIj5TRe9rCJfCOrlogJMIw4wfXA6qXwEqH86SN1sxnFwUNbCeB73B9xyGeV8zsLVU4yEDZXBuST1CKXI4ubC5rvqe2wWs3gI2%2F5491eMWm0x%2F9OVJUQ%2FAvMDVA5aWAwIwOXvv%2FUfi2DelhCA1PFBsnvXRIrWtHWot%2F146blqipvVDRICpvx66Ikdap7ctZZKXYLH3ujV9gn4ObIuvdhEQ8D1HpLYQruSQVBNe5aAZr89PzTBNbDMf4jk8T2lCYRGizn1pMUGAkE6D24PnHL26taVytSta9yjD%2B2Ho9MbylDR45AOk4R%2F%2F87QIIsixy7Q7qdbRbR%2FBX0rC0BAQJ0rlfqM%2FVoqiKi0wjWbp5%2F%2Fa5%2Bo9yVas2Cc%2FmZF9npOAWrQSXcbTwwKMEXw8MAxruID8JwvfpXRL%2FoqX65KIFtQhtGucc1eus6XxVqEJdTI4o5dSZVYGDK%2FGGSNDTtv9aV0ZPNDXpUJuaStJhpUZnukdn2Oo6YavRfGI486%2F8dSKh5D7uik36e1bMsUn16Yw%2BpACOv1mPd8uf6DGDwd%2B%2BfxCrc%2B1Xq808ofeXqtyOkRWI%2Fk4hXeJnVwwmaatzgY6pgE8yFQ1JxMiKbyldGOXG%2FB2f3tPSPvx8hwhnN4XSKaNwlrdw2xIGyU%2F30uE7njoO%2F3Er2bfisR63BOIOq86faHfuNnBo4oa8Rr8GY8bP4wDVERnotIg2KKOpTl0CXqB1ri%2BwZBJ853s%2FKhfy8FRXUFHuxB0q997k2OY8i%2BvtfAtF7FTRj%2FxJ1uRl9YzVFU8VcRUfx7HlXOMgHkY7VQZjHiriCdeOoUB&X-Amz-Signature=1125523bb563d8b6a776b73095c2bc37ff45a0268efe813a4f83843c7d2fae4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJMYTREO%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T060746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIFhgzoKBLSF%2B5Ye16ouJwewrwwaJYDdhyPviiw14%2Fx13AiA9qbSA0l4lfYVe%2BuZH5Wf3g%2Fh5DBFQfKSLZTbig9kmhir%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMh04NFgPQrec8w3rrKtwDckRRZJSErMP1Heq86OSSYRrxT40OPVSiygHJF3kCCHIG9HK6auffmM9swIa5YWWGzXGJ%2FFo3HGazp9JlSHiFZhAqYRuj6sDbxC229QVlcNUP1yNNdY9Kid4sz1s8F150kN%2FZbCiq5WK9oOVLTo1SnYfs8VdcZArQX4qiZCqwVYBIx6OzR0bugd0XxgsyuhsMHfZZjJjjQFtgMyShl8tQLfmhxG2hXpYSAw9g7tcVjJOXEtt3Jx7SV2uxoMRZ3Tn9DlQYp65WBXNlgpgQrV%2BuWZXxWpn6d%2F3FNXZeCCo5mxqMbov5cyng7kt3WiaTrGfiy6aWOGVxQZ22M6xnHao4KPk21qM2Tcfb1xU5kP6ONL0i8SsnLu%2BwjsSoiHPAsUj%2F5prlLDGQX0%2FUCworgbvnGbyLRMUhOJdlr7bdT2A2HbxSN1J%2FNpxMd330fANR%2Fh8MkPceOSzHafIonX6tlMjW4rk8NahI17QIoiAr6Xqud5WG7PXzCVuWQ%2BHAK0of0QpwnMkKF06frvRyFszxyMRoNcZhkilUYnUTqI8zkBd16K3Shxalnv4dpowXljNtxlGwBSNBY5MIO9jAx5SPd25tBVqGKdFFiyBHxmOIAv641uWuQMDC%2F%2Bwd9HPjBJ0w4KStzgY6pgH5%2F4CVg7tQmp2c%2Be25NSUNpGdpeV%2FizFfjJuViG728y248u8sVOri3PpCmhwMAmIkIgUXTKBKWWZmRPQ%2FbZ6u4bWJem%2FgDBf5nJdNIVhVrEK5hNnoyAxJAVTmhx3fP9IW1Duo0JfWUc6Wy%2F8%2FJEewwCBWVa1EhN6h0Hp27FsquQEhxaQKT4LTzLp08ZG1R9vckW4AWOpFLQQLbN1WHXAVlPk0aiq3T&X-Amz-Signature=f867b1f7a262ac501fc51875f41a3c61d1c283bfa9f71da19b6fbfdeb2fd6cec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSP6TVYZ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T060748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIDQoumDC1qJ%2BGrnUB7WKNmeVkeUHljrWOfJkEDrCxaxIAiAZalJJorMIuvLHGd1vqDKawOHC9eeh5e2svl9lVkblhyr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMX%2FbYh2knXDRXysJNKtwDXbtYUcL7fh1xE7l82tzMLCSX6E8tjmZC7cB4%2FIrlXs9HqlilbiQz2d12sFqygi45z3rczF9X6LQEp7Ymd65RWAv%2BH9BeWN8LoYpEK6NQdH46nX3%2BI3Ux3dXyYufPFO4BW%2F%2FtlPgGuUAtuepTx%2Fc5cvlFHWCsP3zEDVR76xL%2BAWTgJGt6mrVrlB471WieQG4rDKxMoOGoLF25HS0Vy%2FUBKX60CHZ02rtUYiIrOeyIsG9c8m5SASJutg4hHCFH2GGsgPC%2BFSS5G8oDApDr%2B6gsk9QWNNraCiR2ft3tr5UthCqme5khxcfj9gWCW%2FhqHMgC7IurDbxfPDtBZ5XvzRGRgqsHNd2nqOlm8WQjGDd56LhvrdXHvYG0a7dUnvm3p014YCP5GgIy6vjBGr9gc09KkSl3aU1PLrsP8H%2FWoHmcNmkUovNDChwCoPP%2BPNkBF%2FM4mWB4mq9HFZXzPN%2FNuFh0MozFfdz49K%2BwhgmQpiSCA8r%2BPYhwsI6BRjYLllmChhVEVZdVouVAo%2BqyjQjcZhRxNynp4PrXocAhcPHpRt0ywUTfcB3xEfbx3L%2FxsZFIyscXo9SxVHEXI6l2mXyBsAkYdEY2e%2BFQZNjAluBpapR7X5XYrscu1T6XfGTn5Isw6aStzgY6pgFO8Ef01sOkKDopj8mzoT3w0Wme0yGcwRIW1Rbde%2FVXqNxUfxB3chPZPyGNLN5gvCGYGDoM5fSlH31yAlLxQlAK1PZgnZ8kzNb4FJ%2Bk21SbTrPBvUYGbwn7DTFzJAln8PcbpLKhvNAB93TcuP9qNuItrkGGTGSfaiFVIAogYU4ICHYl79%2BSPnxMRubRxu6xkte5EbFNnzcN6x1omWJTDEudfTEeeslQ&X-Amz-Signature=490bc05a8b980ee0fd2a4f6b4247ef4a8078ca17c9fca4142f29ea4395334b35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSP6TVYZ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T060748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIDQoumDC1qJ%2BGrnUB7WKNmeVkeUHljrWOfJkEDrCxaxIAiAZalJJorMIuvLHGd1vqDKawOHC9eeh5e2svl9lVkblhyr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMX%2FbYh2knXDRXysJNKtwDXbtYUcL7fh1xE7l82tzMLCSX6E8tjmZC7cB4%2FIrlXs9HqlilbiQz2d12sFqygi45z3rczF9X6LQEp7Ymd65RWAv%2BH9BeWN8LoYpEK6NQdH46nX3%2BI3Ux3dXyYufPFO4BW%2F%2FtlPgGuUAtuepTx%2Fc5cvlFHWCsP3zEDVR76xL%2BAWTgJGt6mrVrlB471WieQG4rDKxMoOGoLF25HS0Vy%2FUBKX60CHZ02rtUYiIrOeyIsG9c8m5SASJutg4hHCFH2GGsgPC%2BFSS5G8oDApDr%2B6gsk9QWNNraCiR2ft3tr5UthCqme5khxcfj9gWCW%2FhqHMgC7IurDbxfPDtBZ5XvzRGRgqsHNd2nqOlm8WQjGDd56LhvrdXHvYG0a7dUnvm3p014YCP5GgIy6vjBGr9gc09KkSl3aU1PLrsP8H%2FWoHmcNmkUovNDChwCoPP%2BPNkBF%2FM4mWB4mq9HFZXzPN%2FNuFh0MozFfdz49K%2BwhgmQpiSCA8r%2BPYhwsI6BRjYLllmChhVEVZdVouVAo%2BqyjQjcZhRxNynp4PrXocAhcPHpRt0ywUTfcB3xEfbx3L%2FxsZFIyscXo9SxVHEXI6l2mXyBsAkYdEY2e%2BFQZNjAluBpapR7X5XYrscu1T6XfGTn5Isw6aStzgY6pgFO8Ef01sOkKDopj8mzoT3w0Wme0yGcwRIW1Rbde%2FVXqNxUfxB3chPZPyGNLN5gvCGYGDoM5fSlH31yAlLxQlAK1PZgnZ8kzNb4FJ%2Bk21SbTrPBvUYGbwn7DTFzJAln8PcbpLKhvNAB93TcuP9qNuItrkGGTGSfaiFVIAogYU4ICHYl79%2BSPnxMRubRxu6xkte5EbFNnzcN6x1omWJTDEudfTEeeslQ&X-Amz-Signature=ed7c140c738f65a5ab403fb29272edc5ceddff2387d7e87eb7bbd2a343422826&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GSVJDDU%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T060749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIFSM9%2FaZX8oETKjQRoDl6FRcf5eNV51l1IqWkn06FMFhAiBvsTzBh%2BoZvDyRs1IGFUUxRB31jmBNYnLXigMLZd6HOCr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMlg1VcCScVzs2zCpXKtwD7slzrZeXAp99f9Mo6x6EsNd1D0YDX1DIR5qQBrTTnWCHNETrqZ6R2nMZq2eAoLR1kCZtZFGQaHvd5oIOeKYTMwcgphqCDDDUY1lXXgBvfaa6A66y37yv5VS%2Ff1E284XDdL%2BQNPf9yuVJiD42OM9moMZ%2FJbNNAW2NJVSXjye2zwoosroDjNLvFFhN%2FVVREKQD7baJ3ifsf5CPNtQ9M%2BL0AhQEsbMtfsEQJmWIEiYOHwKXA4kfEmhdaqCnJFFePLJ5m1QZ%2FHj4B15wRuBQE%2FRAsc8I4hgIV6xhphDfgpNVPdVto1HaHV8OZjMUP8J4sUMwGvc5%2BH%2BtEyPJS7hmTAGSN4hAXGwUQgoV63paeN4CbXLWi4qFUh3htH6fCYyOw1NIHrylBWw%2FhE6W98NzAb1V2F5Qfe6E2GzrJH%2BvI1QgH34k4ZDZp0CpRrviokjqqfZek8%2B2CrR8z2YL6xRbo5HUzAtwfQxA0o7ExaQXJmas7JMmzNMfiOO3X8UCm8oky45kaPl5BPcaO9OuvP%2FgOadGA1CeoxJsABKbE%2FnPVm05unteN0tHzD2yp3tzK9m712JAO96xxzGP4Ywn5LwOR%2BfauIntDebc1EPrv2RghPWjrZNeRwLho%2BjgEahzzacwoKWtzgY6pgEYdjCKYAq0Rx44mrYH5jR%2BxUWngt0BqpWcUwgo00nXLXfpD8gkFAvx0RcAyzTRMNTA3KvOVOPb4naNpdRGBg3b%2BkU6YFokngBK09QWbZ9LJgTIKnfQxDWTC3CjYkzQRl9SScIUzdoWeNqxZeh6djQZOqwOiXB%2BKQ1hGXQybPPFOO0ewDnbO7BJ07jNQQAg3nc5Qfj6RO%2FnhOmCW3GAGjIk6J%2BHSy%2BN&X-Amz-Signature=e048da1a4f268a47da7a02242f670cd911408a81e0172f9f4457697a3d9d0539&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YYKVC47%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T060749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCyTzI1knV4BkNU3GfZL7WAD%2Bou3xjH%2Bwj1l99bfcXQOgIgCUD7ONUYX8u2v9n3YLZ1p7A0j8%2BYnIT4W0vwNUN9ncQq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDGqfCFBNFXgqrFg5tSrcA%2BiEtDAjfvaBO3DqH0UKQjX%2F68Y%2FDZstb2TgXFbijNt5hHXnlH9%2FT4DuECEh0nzw%2FyI6tGjGdWBTVta0ip8byUfOowfLbwTGX4fDvQpXAHuzsv08EDvd9yiboJop7p%2FCrkADRvmS03iktzfn0T9twRtVQzLOlBNncSP3bJ0z5DcZ%2BBvvw51DFp0Z%2FzLXkyHGZjR5nUljUocOGqhiuyGrUhWU5lLFdtpZ5iZcaKgLP7YpKNrLTRcP4FjhoY2bfYOiU4%2BeOOVYmedMoeNKihuz5HY78NK8zBnoNiiS7kMwDMz0BMXhEK1mNC5%2BuoaSKboVvE5zpk45Kv9YxoPsuBg0uHG5k%2B0DhUa%2Fu13zMYcC1aKMckPd1WCrhoVcJNReHejQ6XLAJ7nzwjc6WE1Lu49beRMtdH%2FLJF7S0tKGG%2Bn97TZIyidgPhYDDAMxsf3aEsDfPMm2J2h5azIQ1ACcc1wKxxX0Xo%2B5bKqHRHIiY5zM9JmgpuuoQkndoOyVTrTVlDfq5Cxz2N5zvuW8R0odSnXvkO4MF0cNeciXWIsawDnYpDS%2Foe67ySMrkEEbEmz4YFqzePPaOV7UP0%2F6lX7dJvAVtvwi1mDGD%2BBb%2Fvbhcb3RwwsKC90dMPPY3WIIFPDnMISlrc4GOqUBdxWWao0hFUBv2sIfcdrvDFjz64LOsLLn%2Fxy3nmQp%2F%2FK0pZDpT6FaHJd3CwWXo4Eb2mYM41obKcDq8DoaGzCNW080jvUOZK7Pkx6z4PJMzop9rT36c5RebYIYvxVm59yjdbkH0v0bLQhpzUoSRKQnTjbEoDqCLz%2FIDVOoWeZ1R3dvyzmTlJ658Y8uls0TRTWVG2%2Fsezkp7eLbT6Z4ln%2Fdk8wcrZy7&X-Amz-Signature=0525b17234499ee78233d3b45c4d9cd19abf858d1addffbf8ac79dbedd5362a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GJ356K7%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T060752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIEBTxUDtiOmAxhqVr2DiK393vBudc3LMl2B%2F0piRUpnSAiBgFOc8F3TtdIleTzPOyCxH%2BbYxmFjGP%2B8Dd%2FqDe4WyNyr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMwqhdmGUpIVJf0T3%2FKtwDjBOURyduY1bbF4z3lyquhpeEekSL86KTEBIqZquiCA8zZZgBjPLNxk%2FaGWdekRM%2FmkCrr7qcsGbRQAvdrpCppgQX5xRxZTFEf8AmqthSCm8xUTQQHRBgnGcnspJuEUvQW9tgXvmU76G3jLKGU06BSkyE7%2F9ff6GAGdDlMnSJSArZjxe63ur6mnogL02jnRZ30YqMa%2BMcD%2B7tahOV0ZZX2F5reudJ8XVzctkoxFM1zMkb8Yhjwbl4Y13UZE6rTR0%2Be%2FjvU83RsyAyJWvyS1nxUSAPnf36sL1WjAkSzD%2Ft%2FRy5bs0sbedk2ctmQPMpwQqnnVHbc%2FjG%2BLzuF3gZd0qPls0niqOGiG3C7lrcu2OEBBoVXy0mkY8%2FqXlQjA6ikHtbtDN0ie2bO89W%2BIk1QIEqsKlXLxZzZPMWZuu%2BZ3fDP31sSeJlo%2FwXi2iJWZgZ%2FXiwPnJWJvXS7oGYf0p6I11AjUvgqeH63EM%2BtB953xFtmvcb%2BO1emYMxUt38ITIdUDf3JdJhgelbkhSAAdtMvallC%2BwaPGBw71VBxLkvttJOrff5bEf%2FxKvIaot0ZODlQAzYXDgASW21mBQfZUhKSXVVADIUASBihEKCvOf7ziE0yN95e5HBZ4HdmOM5cS8wiqWtzgY6pgG3w5yElkSKUXnLu%2BLZ17g5SlhxDj1vCEDeaWVw2rJGZPDO8GiM0m07c%2BN3tY3FGBydPhyV0EmzQUasnm7vowI1ZCWIliFjNOVkSoPrwKQqkwLePm02z17E4J65zLD%2BS3CkUpEAh2aPko1gHBRqGYaz%2BUTrb0812QJzprjzdZDGrk5yYguDY49DeJs8aaSOvZVRrQhoxtyWv%2BUx%2FARbObwbiOV8EXSd&X-Amz-Signature=4eaaa87f7f7014340ec6ad494b16af916411b386afc703c009315c9daa4ab902&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BMJC2ZG%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T060753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCHlpRUqDT7suY%2F4ds7%2B%2BNnCbRyarsn8GxVJE5GTzMCugIgeqLwPgju6uNDEfCsXMxt%2BIP4wvjEkgS%2BYf9w1hLPxG0q%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDDpgllbaWyAhM7S2AyrcA8rlUJhFCCJ8tWTTEES5AShR3uUiecE8ERqfoBFtBUqg6i%2Fudj9JSiPYfGFnD2IbQLKltQh0hTOFEHHlrfv1pfttQogsPuhUz4E5Mq4PjerDxvLjgngum9W%2BB1e%2FLKp7g%2FuSp03qJZ0k4tB8ODv7hk%2F5KejmPxpTyHZb%2FJjat6HGD74s5%2FPWYH5QHqXwPBfKZrM5%2F%2B76kjMpb3CHCqoiANsq8BPetu4n1TyBfDIe5z9QLFFAdQoVfYDf07aJcEslJmDMYkCBjQbjuVZvD%2Flxbx2cJIzbRVtJxmfRdq3m5UWhU0X0lzbC6aSGgMqMUcq9RPeH9nlqAPI%2Bvkt0g9HxJt59cMA1EpitgETDuYWQkXtJ6%2FajBI%2F5489xXqtOsK6bT2cODaQdFK9rtXFK24BYH%2F2a7tloPf8a37D45ynaIqf8%2Be3YWE5rViX3ESTx4rFRmXJndr0db279WXtGzJeH2jJNZdpeA9KjcnyQRk8KYhJHWSjjbkZmYr7A%2BJp7%2BsaRCGw%2F2QgMQFDv1kt3CQWw8OlVpeQsz4hAW6GkFGgB%2BKTzF7FcGqFqieli8N%2Btk6WTvGOQ%2FzydAyYbnW3q6UWEmyX230YtwFGPDXFC8sLGcnPEzqAV6OD8SkgXh9gLMLilrc4GOqUBzAcwiPmyIkVHAT7Bwknm0nNrtNidw4%2FcR9qhUwV9Bwq3VjJ6XHqfqVaSg4aw5Wirly1nwerRjGjeY1Kb9iYxRLcxViTdOBlzD8m3GL3JOJ4WjmzDmy2lnLm9yreUqffMk%2BlTPtL6waYxlZM1jto2W5cgWU8NcjkQ57W939yX0CO0BXBpV9ymGUcU5BeUGT%2FXqXTgnDZoQhYSSb5C60bZUeTOGBHX&X-Amz-Signature=11e906154d716db38df09e9bad48e77ae8d31dad33fbaa91f0b9ebe7a119de9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BMJC2ZG%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T060753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCHlpRUqDT7suY%2F4ds7%2B%2BNnCbRyarsn8GxVJE5GTzMCugIgeqLwPgju6uNDEfCsXMxt%2BIP4wvjEkgS%2BYf9w1hLPxG0q%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDDpgllbaWyAhM7S2AyrcA8rlUJhFCCJ8tWTTEES5AShR3uUiecE8ERqfoBFtBUqg6i%2Fudj9JSiPYfGFnD2IbQLKltQh0hTOFEHHlrfv1pfttQogsPuhUz4E5Mq4PjerDxvLjgngum9W%2BB1e%2FLKp7g%2FuSp03qJZ0k4tB8ODv7hk%2F5KejmPxpTyHZb%2FJjat6HGD74s5%2FPWYH5QHqXwPBfKZrM5%2F%2B76kjMpb3CHCqoiANsq8BPetu4n1TyBfDIe5z9QLFFAdQoVfYDf07aJcEslJmDMYkCBjQbjuVZvD%2Flxbx2cJIzbRVtJxmfRdq3m5UWhU0X0lzbC6aSGgMqMUcq9RPeH9nlqAPI%2Bvkt0g9HxJt59cMA1EpitgETDuYWQkXtJ6%2FajBI%2F5489xXqtOsK6bT2cODaQdFK9rtXFK24BYH%2F2a7tloPf8a37D45ynaIqf8%2Be3YWE5rViX3ESTx4rFRmXJndr0db279WXtGzJeH2jJNZdpeA9KjcnyQRk8KYhJHWSjjbkZmYr7A%2BJp7%2BsaRCGw%2F2QgMQFDv1kt3CQWw8OlVpeQsz4hAW6GkFGgB%2BKTzF7FcGqFqieli8N%2Btk6WTvGOQ%2FzydAyYbnW3q6UWEmyX230YtwFGPDXFC8sLGcnPEzqAV6OD8SkgXh9gLMLilrc4GOqUBzAcwiPmyIkVHAT7Bwknm0nNrtNidw4%2FcR9qhUwV9Bwq3VjJ6XHqfqVaSg4aw5Wirly1nwerRjGjeY1Kb9iYxRLcxViTdOBlzD8m3GL3JOJ4WjmzDmy2lnLm9yreUqffMk%2BlTPtL6waYxlZM1jto2W5cgWU8NcjkQ57W939yX0CO0BXBpV9ymGUcU5BeUGT%2FXqXTgnDZoQhYSSb5C60bZUeTOGBHX&X-Amz-Signature=e2e72664f39111b4cc4af3bb19c5955ad6e4ae184614ec3fe8419fa1471ea57d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QFMTVUAE%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T060737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQC7xToifuE7BcBqJI8VRbrPx8BbZ%2BuquvLY6gh%2FJSya8gIhANF5qZcxZoM3ZEKag1Sp6msO58k7TeXuvjw4bv4lC5rzKv8DCDYQABoMNjM3NDIzMTgzODA1IgyaT%2FgfAeRWPUjMGmQq3AMcPPUZLFYnIWeIdNdV8pwG0bMkKm%2BNArXUgpsiq1LV69K8LREWvXls0bKatLoYprCDEUVl9n6WPbhD9EDspRHUGp3Gf8W7KGAJDCCDfwDcv0NtaK3hk5IWCIaMGg97alhOvkNa4oHTNQ0sVMQHo4MzWUNt4jLaD6W5iMxjO%2BKOoogK6RHKtGfMUdie8X%2Ft6wK696DkL9AsJc%2ByM1B%2FiEht1kfSvXZiGUIhpp3MlWbOv1nsfay%2BU2yKezI1DAeNKuA6sd48AOomC%2BkfTXhwPBypDDcY2ZpSz95M85ALeXUwilaTwS0ZM%2F84dMjrEva2Fwz%2BqhqwHQVhV74ftY7yX6LquymZMQAJsFO0uc64ykxpR5yhA08GCUSQt59kbZqWUOd3RjF710gSCqnuMmbtPTi5%2F0ea%2F51Ryi3r7s8fQNufpVZGl9hQ%2FC%2BO0Nb51d%2FyPl3D67TglNFbTXwXffbss3PkUcpkluMvuW9YlMcdc7MHUPtsmBojKW5Hn7xFzamN8FIRbZLmLQByO9EBlgY6ewwxWQ6yHVkgYG0gQ0bCKw2Wp5WJj2ywZo1rYpnGf1gtZcba%2Ba90rmfme%2BhlDv8%2BRcML3OzkmCjL3kUTBgAJGPXYDY%2F2U3X9g%2FuDJ6UZgTDUpa3OBjqkAb8MK6ErCX%2F1QDXmgWalOyM3q0pdPr7iPrBfqH4sSN%2B5%2BU3amswR1BcAsxdXnCa%2FsRfGzVBNn52BqbU595WpGlpXTzNKT3ZcoD5iAK1DNnwJevrfxkkMoRH%2BZznpnChn%2BT%2FByrbH9b2AoQ06SjnOz5C3rR%2B0cldMNdzkj%2BX6Q%2Fq1yeMIkjmvpTWIRXmlU%2BFbVUhX90w2Z70YCAuf4a6ZjjkjMFYX&X-Amz-Signature=0916b1d809ed447f8653fda8357b3d1a22f0858d7e316628834f34040826931e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIUL62TA%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T060755Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIGjoCyRDD0mNkeTlVAFGyEAwDpT%2BzVRzr9WviXHVONbmAiAwxOw461XlUDXapsWZ7P2Fd9nW6uG6t5DVSo%2FhB9F3rSr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMhvXpQCLIhgyCIOc5KtwDjl%2B6meXY%2FVAWgVorooiJL2eKbyP0VYnpnO4rLOPfybkI6IftiloeJOwCSA0r2mx%2Fm5lA65xWZng2wHqyzgfisjxw9wDSoe0i02EVITrBlw%2FTRqlUkz%2F8NP0znZeCOXhV4%2FLEP%2FjZ6paZ8oiW4FFQYrXamJ7RqThheGmk1sbqur1JbIZtjg1%2BYvBz8ppyQ1jyt3Fqfk1BCE8e1Ng%2BByAQ1sPO7CnsBHLvYB7BL30CZjzX73mIJ%2Fo1H3TcfMCK8aiHci8K6KBvCg8e5fSVArpdkfd3VjM38xytlQJwtNgyKVc%2BtzkMaNkynHlBdk5lq75Hicn%2FEp8E39toI6VcYf714jEwNa1tRohAbqTQAgNZOYhumnbRunDCl4RyjjUvPTTpKu7f5ulbjM0aeLJVXpvFVjW0nyBffRyaUJZcRoHYGUZt8XE8FobqGTWtZLBO1DxeTxllK6B8zht%2FQY2che2KdGL9Y37f%2BBHarNO%2F7XlxTcQB2lCqwZI1gQDoCwPdMh2zXQcTIMNi4X7KOeuCNTdD3DXc0XdRvV7K6LKPxIQ1%2FAIZHOYRq%2BjglqZm6vayX6jYg5eE6SA%2FpvrYYQiBcsm6dfMjEn%2FLx4PApGSJqeoG7qAi3EMD2pGGotNCRDYwr6WtzgY6pgEZT8vgDsikhDPtD8SXkaf5cv4F0uzfV5i9BzdFmDqjsHAgEiRyeZ6CT21zFm6tySAOk2SsWS39x1JfD0Wi5Jzy%2Fh13Z0eYrA7jABEJ%2Fb6CZg7a5g7Nzqs2aBUrpM4FtLgA0Xo%2B3wUtRqRE%2BBMdQfj9bTmNp37R1ZjCMgg4tzwvX6n%2FeG67UbMoscBR4Hx%2BU9WoRhVmWYR3Fih8Z0xHiCDedMf%2BVpQX&X-Amz-Signature=204a8bd11340f937ae39093c26d897590bc37b865652a186eea489c75675aa0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIUL62TA%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T060755Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIGjoCyRDD0mNkeTlVAFGyEAwDpT%2BzVRzr9WviXHVONbmAiAwxOw461XlUDXapsWZ7P2Fd9nW6uG6t5DVSo%2FhB9F3rSr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMhvXpQCLIhgyCIOc5KtwDjl%2B6meXY%2FVAWgVorooiJL2eKbyP0VYnpnO4rLOPfybkI6IftiloeJOwCSA0r2mx%2Fm5lA65xWZng2wHqyzgfisjxw9wDSoe0i02EVITrBlw%2FTRqlUkz%2F8NP0znZeCOXhV4%2FLEP%2FjZ6paZ8oiW4FFQYrXamJ7RqThheGmk1sbqur1JbIZtjg1%2BYvBz8ppyQ1jyt3Fqfk1BCE8e1Ng%2BByAQ1sPO7CnsBHLvYB7BL30CZjzX73mIJ%2Fo1H3TcfMCK8aiHci8K6KBvCg8e5fSVArpdkfd3VjM38xytlQJwtNgyKVc%2BtzkMaNkynHlBdk5lq75Hicn%2FEp8E39toI6VcYf714jEwNa1tRohAbqTQAgNZOYhumnbRunDCl4RyjjUvPTTpKu7f5ulbjM0aeLJVXpvFVjW0nyBffRyaUJZcRoHYGUZt8XE8FobqGTWtZLBO1DxeTxllK6B8zht%2FQY2che2KdGL9Y37f%2BBHarNO%2F7XlxTcQB2lCqwZI1gQDoCwPdMh2zXQcTIMNi4X7KOeuCNTdD3DXc0XdRvV7K6LKPxIQ1%2FAIZHOYRq%2BjglqZm6vayX6jYg5eE6SA%2FpvrYYQiBcsm6dfMjEn%2FLx4PApGSJqeoG7qAi3EMD2pGGotNCRDYwr6WtzgY6pgEZT8vgDsikhDPtD8SXkaf5cv4F0uzfV5i9BzdFmDqjsHAgEiRyeZ6CT21zFm6tySAOk2SsWS39x1JfD0Wi5Jzy%2Fh13Z0eYrA7jABEJ%2Fb6CZg7a5g7Nzqs2aBUrpM4FtLgA0Xo%2B3wUtRqRE%2BBMdQfj9bTmNp37R1ZjCMgg4tzwvX6n%2FeG67UbMoscBR4Hx%2BU9WoRhVmWYR3Fih8Z0xHiCDedMf%2BVpQX&X-Amz-Signature=204a8bd11340f937ae39093c26d897590bc37b865652a186eea489c75675aa0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXQ3QVKJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T060755Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQD6FGQA%2Ful0YADVarf7GeND747xzbWt1XewF6ak%2Fln41gIgf2hqL%2BL2MtqOycVgmCvS19jcYLVhABH2WV2utGg46nwq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDPjc0VezzN2JvQRGZSrcA0mUUxqq4ivnu80yKFQe%2Fv4czTp5K7Dzs9FqOZIIbuJKKi3SKk1Mw%2BoKqpZ1AhR9jG6e0t4zCa0xhRhBQap8fVL1qhv0wFBCEEG7EDrrFNe%2Fp3mHi8139iLy4TlaeirzCtLjFldXkwJ9ZyHAGc1K8Kcytkf8dPjRDEKqmztc4EGBqubAWnwtdm6EtOsiX9H5gIItZeQrNYK8g5ivXeW2Ql2uWFs7w%2FM2NB1uSR8GX7JZCvOudVoGRlpga2ETtIrx3vEcnWUvhpBWg0oRz%2BomvEm1aPMvERHVsv5dmmKwSB6NWO%2F2EjXcC84D%2B8sIepaIsnPAGNDetiyeki4ANk%2BCooTr1NrpIhakKH3uhLNSV5F%2F%2B7Xufwf3qQVSK4fu%2FLwUogvAIeJfMENjRJz78xWR0xGY90BCBkC9x1gvTgkPNLX2hvX1QiFEfen8RM93TtoDfqkwcYZSNWHdRthFZjqYkLd6sPAa49QwxIqtw0RWmkZumtER4N7x5AfL6V2yApqlgwSTldaXL%2FwNgnuOMbOmBZzIAKPcdn1CoBTadMawv6elj9xYEoqMh5pVv9DVsR4op5gxelXGDtbzLbtBHiQNDfIp6rOADc%2BCWLFXbKB8N5Cb6XDHECFO2LD%2B8GH6MJWmrc4GOqUBKlDR5rDZNChoe%2FAdPXOq%2BVjyH2LoxJJQ%2BaZ4pbZBlobVOnLyNyloS1cfT3X5%2FOwPbz3%2Fci%2F81KpEZrKj0RCeqsHmouw%2FZiGU%2Br04hFVBECx2EALDqeuTSQnkO0wKnS6kF1bPgn%2B4X1QGHo99H6GWjugl5a4mkgjfam4irfkjyNJmzMYq0sLadS%2FWxlnKsnVSHFNtd004KTVXhnsJ9YDsDtMlVw7j&X-Amz-Signature=21f9ce08604eaf4b1f86b8789de36370acc83dd2d3896c78eb71986885c6c0ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

