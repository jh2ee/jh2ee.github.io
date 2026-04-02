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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKLZEO4F%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T113515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDmWvIy7K7uXEKGdg8kZGdi%2BQi77geluRcOmitrQPEmDgIhAKgNC5CAzy5TpMHWRaxXjn3fbW0c%2FKrp7bO7uROjp4wfKv8DCGsQABoMNjM3NDIzMTgzODA1IgyvV0tZgu2e%2FPjm%2FxQq3AN9pfyFYrMAIUx9Mv%2FDSl6b%2BeG3U2ErHI3bZptvx2II1PCaO%2BMLn7gSCa%2FvrIDQt6DfK90kdGSxLywKiNvphk9DZEKUmWrw7UKUKr69lwzuoVhizA6sh8m6E71%2BpdwhyaTcFwboy4pbtk%2BSpUQYZsKVmI%2F3f3kesM%2F%2BtJg1IHgnC%2FkXDExRYb32ylL%2Bywhshhb1Qg800L6QAB2Az2Y7ubltZ664Yikd34QkOTbNFcIqQWqx8tYMUiJESdc0bKPqii48qJi2SjJYXAckO752MYO6PjFfBE%2BxxMae%2BgRQ2sgEp9eZ6QctKhQbhe53Kz1xFVhZjHIm26EDp%2Fttpdr3fS4ioH6S4cPXXr9Kt3ocT9B8wegXOEJM31nnDXs6UtFXmaZ6fxXgVmD7fa7zOyzrUCe%2BmdCDxi0GckON%2BXcWno0VFuukmoC9IF6%2B3Dv0K6lkj6HkvfHopWW58NVKj88zYvi36MU%2B5cKx%2BQYQ1cycMne8wjZA1R9xj3CC9trsUPuWOQBKfcP7Q5nQslrFE9mbtuQD5063XyD9FZZvQfMt70xqCDV%2FVyvUxJ4FOHpXnz%2FEAKceR%2B0SbLTcuzmArnyrz%2FKylyM%2F%2Flc9Hi4fWgTe%2Bz20zmjLU9AFGzAzP4b2EzCkhbnOBjqkAXXRmtX%2FinLlLytzFNVVVoJ%2BNzfD5lKma5zDGU%2FxI3hFwSfA%2FGQ3%2BoM2smF8UAb5CtY8ZqvkbZU1Cy%2BXbZ%2Bj1rGeuYSoIeeL7dskhAAtKaUerrXlbDklQXDAy0%2B%2F633KfcprlcQr4t8fEpkdbm07Mn4ILsYkEaXwJhXiTQMIcO%2FiE5f1I2lFwFUvkt0VSzJGjQStdFYvxpudMIcBEONKk2ZPoDCD&X-Amz-Signature=029ab06ad1c40e141930d163329b9dc6e4157e61af1731a03c9310fd95fb6352&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKLZEO4F%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T113515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDmWvIy7K7uXEKGdg8kZGdi%2BQi77geluRcOmitrQPEmDgIhAKgNC5CAzy5TpMHWRaxXjn3fbW0c%2FKrp7bO7uROjp4wfKv8DCGsQABoMNjM3NDIzMTgzODA1IgyvV0tZgu2e%2FPjm%2FxQq3AN9pfyFYrMAIUx9Mv%2FDSl6b%2BeG3U2ErHI3bZptvx2II1PCaO%2BMLn7gSCa%2FvrIDQt6DfK90kdGSxLywKiNvphk9DZEKUmWrw7UKUKr69lwzuoVhizA6sh8m6E71%2BpdwhyaTcFwboy4pbtk%2BSpUQYZsKVmI%2F3f3kesM%2F%2BtJg1IHgnC%2FkXDExRYb32ylL%2Bywhshhb1Qg800L6QAB2Az2Y7ubltZ664Yikd34QkOTbNFcIqQWqx8tYMUiJESdc0bKPqii48qJi2SjJYXAckO752MYO6PjFfBE%2BxxMae%2BgRQ2sgEp9eZ6QctKhQbhe53Kz1xFVhZjHIm26EDp%2Fttpdr3fS4ioH6S4cPXXr9Kt3ocT9B8wegXOEJM31nnDXs6UtFXmaZ6fxXgVmD7fa7zOyzrUCe%2BmdCDxi0GckON%2BXcWno0VFuukmoC9IF6%2B3Dv0K6lkj6HkvfHopWW58NVKj88zYvi36MU%2B5cKx%2BQYQ1cycMne8wjZA1R9xj3CC9trsUPuWOQBKfcP7Q5nQslrFE9mbtuQD5063XyD9FZZvQfMt70xqCDV%2FVyvUxJ4FOHpXnz%2FEAKceR%2B0SbLTcuzmArnyrz%2FKylyM%2F%2Flc9Hi4fWgTe%2Bz20zmjLU9AFGzAzP4b2EzCkhbnOBjqkAXXRmtX%2FinLlLytzFNVVVoJ%2BNzfD5lKma5zDGU%2FxI3hFwSfA%2FGQ3%2BoM2smF8UAb5CtY8ZqvkbZU1Cy%2BXbZ%2Bj1rGeuYSoIeeL7dskhAAtKaUerrXlbDklQXDAy0%2B%2F633KfcprlcQr4t8fEpkdbm07Mn4ILsYkEaXwJhXiTQMIcO%2FiE5f1I2lFwFUvkt0VSzJGjQStdFYvxpudMIcBEONKk2ZPoDCD&X-Amz-Signature=029ab06ad1c40e141930d163329b9dc6e4157e61af1731a03c9310fd95fb6352&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DXFHLW2%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T113516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQClWRBMiFvWvgvofUkltN1bcPgfGk%2Fd6pa0Bh8ijzGehgIhAIjIzaAmi0tQU%2BP8GobN5I8tBDG7ETs5sQqPn56AFhnVKv8DCGsQABoMNjM3NDIzMTgzODA1IgwQ0ypiZ4dAyFCt%2F1kq3AO60P4LUo90gcUFomkS%2BzarVChbcJUqzYNpx8nAnCyiv2GBYZFlwuwCWFY5pnnt6wGcDrCp1%2BJ3P8EriJxtuGTnRxHXmVPZZI%2F%2F4lILkbl6IRbxtsa4Jr2hFChIyvd2UUyWwyAqzTueoLmJlRE9Kz4hBCW%2FyF3pziL9q%2FJeIdUqkzGsPDsSk4CtsO0rt7hsICCJJmQ%2B6l6cPMVismcsEyE9%2FHa9BQgwBzMs7pJX6Qu6Q0pT%2BrnBDqmUB%2B981r%2Fmut9j0dOnoSImE2qxiFlpLsqFir4LRnEmmOt3%2BsRbP%2FlBBy17T77rqEJDR%2BrHsXiokcy6i5VJO5NKnkSf5OCgOr8mf2PSbfQTeeCRnKI4%2Bv1S1dKq%2B815UujYGacepK%2B6VP%2B4H7w4s9E0RCXqRaw6VwIpOmq8sZIotpwCpHBGI%2FXrpmflXAkyYIcTdIG1gQ6GbO9W3yH%2Fn7rNiIInZr%2BB3irvFiU0eajCokWHtrWqXO2czWEzGnl1Kokm7cvFrcdCggP6fCNZWC7gNNd7sHnnLE2A1zDjEPdfyGEOZdLPq8QXKHd4fC8ouX5A01rW%2FMRUQMCfh0EdPlZ7r0bmgiA0Ii9JwVhtof6s3d%2B7O4EMxtCcK%2B278kp%2BRYzcjX%2FpjTDUhbnOBjqkAdx%2BlM9ki6gizybn%2F%2BbS4j5IFmO2I2ARaZEPOhuUmJlMSZ9mig4bGs84KJJl1dIHPHqx6B7FkBB4GLMv42rzj48rIDJxutp43YNWb%2BSSNH1KVuxAVvzTSWSxqEvJcxBi3Dusvgtgk2EQ%2FG7OWzR57bhvEXIzKub6fwYqsFEcPIQnluP2aPZXifdl5Rci7LMcfe%2BnZZzwkntD%2F62XsZK1CNGwvqT8&X-Amz-Signature=ec7e5cdeaa4b19824e0536a8277b1eee023386b7fa722c324cf27dbcd537466f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOQCQURD%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T113523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC4pnGTl1L6qI07UZEyWJZmjBwDFahraAPjc8%2Feni5LygIhALKuiajldbq95DFbBbk8lzcuaA4D8BJa4C5cjAxq%2BO%2B9Kv8DCGsQABoMNjM3NDIzMTgzODA1IgxU%2B0KragIfAsjxPwsq3AMl45iNZ40xhWPIeqr%2B%2BTtNiixZZzTlxnfhQqZxO0UhrkoNLP20ado5M%2BLi%2BYtIdULmEe8DGXPNfSlLoi92EXPagN4CoMFeI%2FijNB6NzdnIMOjJ1ljpjMXBp4IqCObSJFKEhcZBtLLZ4938BSrndEGdBY9Y9xQda6%2F7dIU%2FBAMdOz2tcyuTlYopiIRduNT0loiykfe5OtEoFFEizwSQf5o2eGAPsyPFkODbUWecgHlFPy5d5dcqoTfvPQYeyMnHW2Or2WgomZMw9UYMy7T1zU5Q77yNq7pG5F%2Be%2B0RF4cliU9BOVreU6AS9FY61LzGKhg4B%2F2CjHqPFs93noJsHcEYHlC4PJWoiYtL0u1w%2FKPELzGQKvrEbpqR5Bb%2Fc7MQInHrHRc%2BIzmgAKL9eyPwoRNR2DigCgTN8iWNmXg33XrIv0ihwBoopj%2FuSC3KdHErjwhoEF2yPlY%2BIVU4ZDXGMIOXxNxMLlg%2BG%2BCD67I8EFkQHcYGB8qz%2FNv9LXWWMx8ccv81MWWy%2B6lzQh70R4aIsFKcMtkOW0D%2FYbaAiVdZeeDTqVZXhD9n1VW%2BVECURfWeqDLaG27b1KRpHpXp5bm2IY%2FvJLjGqC2kKQflHLBArSSFrkWaMEsqW2DwDtS3oszCOg7nOBjqkAZIJqsS6Lo7GSqHiPpe5MvtVt7VJoKHn7NHRS%2BHXn7IK8gIB1Fs7vn8DYBTwFIQZsoqIDKxN%2FHxqvEqupHtVGmms%2BrRz2pyEaGhufSSCieku1KhxNcMHvk75DZSl0b6lIgC47O7jHxDSviQLAgYF7FXyUIEX9bbn5ihYXMXG7T86McjEZii7BNM9RPQktS%2FkoOEdZnKbcNAY58kxGuHWZj94sKLr&X-Amz-Signature=1be11a79be86e2ccfdddbca8c46e34138ae8d6a940feafcd17bb4578f78b4c6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOQCQURD%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T113523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC4pnGTl1L6qI07UZEyWJZmjBwDFahraAPjc8%2Feni5LygIhALKuiajldbq95DFbBbk8lzcuaA4D8BJa4C5cjAxq%2BO%2B9Kv8DCGsQABoMNjM3NDIzMTgzODA1IgxU%2B0KragIfAsjxPwsq3AMl45iNZ40xhWPIeqr%2B%2BTtNiixZZzTlxnfhQqZxO0UhrkoNLP20ado5M%2BLi%2BYtIdULmEe8DGXPNfSlLoi92EXPagN4CoMFeI%2FijNB6NzdnIMOjJ1ljpjMXBp4IqCObSJFKEhcZBtLLZ4938BSrndEGdBY9Y9xQda6%2F7dIU%2FBAMdOz2tcyuTlYopiIRduNT0loiykfe5OtEoFFEizwSQf5o2eGAPsyPFkODbUWecgHlFPy5d5dcqoTfvPQYeyMnHW2Or2WgomZMw9UYMy7T1zU5Q77yNq7pG5F%2Be%2B0RF4cliU9BOVreU6AS9FY61LzGKhg4B%2F2CjHqPFs93noJsHcEYHlC4PJWoiYtL0u1w%2FKPELzGQKvrEbpqR5Bb%2Fc7MQInHrHRc%2BIzmgAKL9eyPwoRNR2DigCgTN8iWNmXg33XrIv0ihwBoopj%2FuSC3KdHErjwhoEF2yPlY%2BIVU4ZDXGMIOXxNxMLlg%2BG%2BCD67I8EFkQHcYGB8qz%2FNv9LXWWMx8ccv81MWWy%2B6lzQh70R4aIsFKcMtkOW0D%2FYbaAiVdZeeDTqVZXhD9n1VW%2BVECURfWeqDLaG27b1KRpHpXp5bm2IY%2FvJLjGqC2kKQflHLBArSSFrkWaMEsqW2DwDtS3oszCOg7nOBjqkAZIJqsS6Lo7GSqHiPpe5MvtVt7VJoKHn7NHRS%2BHXn7IK8gIB1Fs7vn8DYBTwFIQZsoqIDKxN%2FHxqvEqupHtVGmms%2BrRz2pyEaGhufSSCieku1KhxNcMHvk75DZSl0b6lIgC47O7jHxDSviQLAgYF7FXyUIEX9bbn5ihYXMXG7T86McjEZii7BNM9RPQktS%2FkoOEdZnKbcNAY58kxGuHWZj94sKLr&X-Amz-Signature=686db5b8d16030b97ace5ab5cbb51c0cf190655456e3d382a500a92a9820984f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTXDVOOP%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T113523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDmaCXFbOOXm%2Fxgd5jF%2BwYaGJdsCOVCbtl7Xo0NfEoGwAIgX1HH3uI2NPay5%2BMcujIhaGknFxsoHtvVAuZG0S8DPa8q%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDLDGIXT%2F%2BwpCWumHtyrcAz1wRZkodkAflOlXoowDCNWyoV013%2BZgoVmxASeOqYFzRogOpXd5IshPNNzJ1ywZWAcSpcx%2FfpUviDctswRN7i8MLiESmboNXjT%2FoUUuuZy5gbOhdqCNyUtfzpYCtEcgZ3jNB%2BwXtFWcWfF9T%2Bc3VFcVqvqR3VpCnZFGZkdUvjJ95lrFRlViMyaKwZJeouwa5I5jbnLziZxpxTD6DcSVDrymAmObe%2FUqr49B7wtHdagIM65cNzkYtbCUxzDHXXBdrphVt%2BB%2F1Ci4uZVkD6qEfPArBuPiDGTe7rzV6gF%2FfAe%2BB87f5201J%2B4M0JYIV6oLxRE%2FGO7l5Zxgs4mwdr9BIAVQuuool%2Br9A4Et7FXLDuMfSKso1w4rDJHPJfu8%2BjY%2FMt3I3LxepajN3HYI5FA8UtkgtNcgAsU0UofLM%2BtkBncZYuybWpgGmtsPllOWYC5YEUNRl1g7oHHubWLvClQsZYrgw6nRkBeOaWfuhtWrWx%2BIYQG6qgdOgoeVLw0i1zLgrWOlbMCg2in2w%2Br8a90uixpWmzmOG4LEUg9FrWJhsE8cjtv%2FzDypyofI70oNpTrxbgrhfm3zHK2XmtslPJygfEHQn3jxlLSDrruyCxQ8Xof4WEKb40supCxEfFpHMPCDuc4GOqUBTbcKSFS5YM5voMdCfK%2FxQJkis%2Fq4Uee7hBO9Pa0soqUw%2BgdDlLcCCEQH2ZpIdOAMH0Fv7aJtC46qotfz3SiHWP%2B9KhtisK86b39qEpVVXBAqCkJgqLvtmk897QHu7Jcu7ccwGHBHWaF4Oo0iZzUsaEHylnwixONWlUFR4WV%2BWeHA1FRbFoUNNU1OyYTjK2wP%2FbfvUZjte%2BgjZXbcCc9mcT2jPVPK&X-Amz-Signature=704dd656fc5c4fbe50e749e1fe63905516f8647fc5500bf4013e9cfb164e6603&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZUL37XL%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T113524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGcq9Si1s6lYDMVuM4FCl3EDhSFdWugI2t4ar4UqRqu5AiEA8suLQlmCjTaArqQu499uLwQaI3VsKPtfgLeE4VyJRusq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDEV7Bfp1rBicibqWYCrcA%2Bl3teyFFllHzLmGPCnD%2FQsi%2FQ2kJ1K6RtygHgh2RPqDF4yIWHHkNwLNNchBu6XjEkgZ4iR0evIDZ94BofSDxpZ5FfAxSo3LJFqWv1L6PxVbRywD5BDVOOhVyKetXpOPH4slYZYC8UFthVyFevMh70itfZKnH%2BKucJYhwgKNOnND9RiQKvEnACaoVKsVwmIp2bDA0mKqJUUhXONuVTr2VOmDSToMsFIZF2prI8xU6%2B5zQfB2580674OIsS3iuDKSB6lSJYbWL1cSpqPVkcyhqnjcl1cVV9GXkXH4wq78a0rHo9UCupF91sO12ERE6FmCw6DlzhnzuTozr8qNg5fdOp%2BQxKnry8Bv47BmnVV4zhKGcL4KZSVjLMdcooMSmhzLi3NZob2LJNo2HiA5FaiE6cZx%2F1VeBdtvgfrVLeLg5YMJkD%2F0Z6l%2Fd%2BpvBKPJwdvqV77DEMuRgXoiyXFv1EVz3sURbKitoOo%2FPGNc7Dbci1rwpaua17qMHPxFQl1QVkYbptK%2Bi6BHeqAzS2hrNTsqM4yctzQ1qm5f8zp6vSqSBRdsn%2BOj77Q%2BPi91uB1bcztxM%2BbqygT5C8fVDcKU%2Bn%2FFTbBhn9lJemY40Co69N5SI%2FMyc8ZglD7k8H6isl61MJ6Duc4GOqUBuCp13eH5FkfWJmjJwHDq5GzaXhhveGijwO7bBOIvXBdA2C9%2FM8j%2BwlXIfT3IzVonculcz46qBJUTvuUyTug6iO4epjX43yvQInNrQUtYm9O4zz7oqCI8yZcIyqaxJn10tHov6RvNrPzoFnqlEeSEHHrDOFtXHk30jf0KnuCmCKH0I0Jxj0uOk8ZnnFrvXwS3ejDuWnFeak9uVcF3ywKf8wCmR9LT&X-Amz-Signature=e51f64f0c65b4d05c4467c2a4223dce2e36a6be504a124cce34b38931eaeeffd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466367VTUJG%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T113529Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDUnSu4jpxJkED%2FUFIhOrs%2BXYsx7RxbZ5MLCBBwzPWhTQIhANM0WnHPD%2FPcxommn%2FDFtvvryN1n0L%2BZ6Duah8I2V1TJKv8DCGsQABoMNjM3NDIzMTgzODA1IgxvwIfdY0FzcRekyUAq3ANFiAmbtpjKkHBOg01h%2B5Nb90%2Fo6%2Brvr%2BMGMwIULE%2FuiiLNfw%2Fg3FHzgpRBLTss5xrk241SX1eNDq4q8ocV1hA90MFGzr64Zj%2FabCZ9XoUgJQPAn6SDJdjvM1NKekp0o%2Bx3qEmTqdJ2179Pf3rov2Wm7zEw8hkD4EWqJZdSg5lX4aZ8VX%2F0irC7BGQiAcsJlJ2uq8W5DKjwvVpAMTKwGuMVwJAjHzUH2zkabovvgr%2BuIYcPCbE%2FEl4kwvas7uqzKUmDiRjXdjiJqtXSRl606IyG5VKbHapj1LsnN9Qw761NS61gDz5X1MVME3Z5lV3dvxIqglCPOKcuwxlwZRI%2FJuDit1QA%2FwU81eOb3hmcqZP6JrWVjXdYA7HsY7iNIsc840K3uvlzDegxJFQCECb3cA6ytZ6fTka2ACmKKJ%2Ff%2BJ5Tri1dQaBrfnA0f9b9wu6ldxOhPJJngtxBPoBcYot6xhntYByQT3zK%2FbUkJleu17ya5Lcswh%2BwUc0twujE7qhvDXv4u2L0cLpGW7rtkrNk5b2DDLnAQwSGhAADT8Jl7jL0ljwf2e3f9U%2Fpx1Y%2Fu7YD27dyRjQpZ29SGUu9MA7hBWGNxZkaRuYtqB0REl9f2cHCiq%2BjZoYEDqMbZ8vOPjDWhbnOBjqkAeeLJ46rzoXNjtmLf5i5Yd2930dfPgskXxrv%2Bu2jZoQApLYoTlU6hZx12%2F99YX3350ldGcVeUrCatqP8ZOQG7wq%2FmIQjvyhNGwVwTV2OkyB86lHa2Pvf1Ci%2FEzRgibpb0dS%2F7sjGNB3uJCP%2BtYNF8lQD0KFyPp8PIx2RFeLMfq3n5hZxBIZQcwt0B3tygmGhGFbTZk9ztctP6ETgPcT6lHlMpFIt&X-Amz-Signature=6728d96059514ce153809c6369d6a47f4bfce70b586280fc54d1aeb68a4b4e95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QU75C7PG%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T113531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCsUlnBf41Oazrbr%2FdJMtO1qyMc1TcW2FiMfJlW75u2ZgIhAIYLO%2BbW7zDv4yz2dLOMe9HLSq9ybcAtMT%2FR8d5jG%2By4Kv8DCGsQABoMNjM3NDIzMTgzODA1IgxLcwjPPKtABjECHRUq3ANREnobKjkS4WS3dJ47RmblnCRKFZfflfRv%2FEX1PjH93Hp%2BLgxoZoF22rw991aFlW8eDuzyJnInzNwuSRp9GB11N6CwxbL6St0BKQYQ5G8Is650VI%2BSSnVJohRhQTbP26a9kAhNAEteRAWtGQo9e%2B1qnq4mnfHMI0yLmSZ67KvbuLwu7Aow7XbMg3Q9enrW4NjSA48ZNs9fzL58AKeA9K7K1fmQRQJDfvvwh87Q7E7yXwO2odT%2B%2F7d4Jy3tpvLI4TlyBoSGyOjWXet7pmLkyIlehAs6r%2BzwP5gsMPbUND3GgR4UXX%2BpUJ5%2B%2BHxGqurfV%2FzehryVQvivAhiDosS0oKv1dzC%2FfG2C2i3KAEsu4UgT0Tx0f5ulZMtu1OxpTamF%2B7JmIWc%2B0nk8VEwfAuGGg9iqK6kOJTXyEEVLFq6L%2B8pZofNNGkKEe6rMXkvMz85NmGF2VtnW1qG8SgSUrP3B4ikybCsdJUnfaDUghiZ9O2p1swyIj4oKIhCv0m8iSWRvB%2Fn0ih62rbspiYSFrwo7z2RNACoe6e%2BNLG61CljOSVyhwv5bFcm9s%2BjN1MBh8aMjL4F9o8PTIeh5%2BB%2FZ31Qqg6D%2BeCTNOBeMPOtdV0mgSfT8S4pvksKB9OWaQgUE7jClhLnOBjqkARQWc4t757evcbJnEB05redGv%2BWZy%2BXp3JvMH7bxOztYaUh6Yv%2BxDTzIfG86CdFUXW6vGHglgpOqzU48apKDFZBHaFk1LmZc1urLWy4XRzj2MPiwfGA%2F33aS7k3IhtooY33DUezNzuUv0aouTLuGS4BqjbrNwUw02lqssUY2Zva7zZVgNA%2FyHbghkIkNXCBYd3p0xUjD6woXAW3Z9Q4cr4MFl3My&X-Amz-Signature=323148594854c3886bb211d80d930a3c2ec47a281dc9cd9c604b2157aab30fb8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QU75C7PG%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T113531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCsUlnBf41Oazrbr%2FdJMtO1qyMc1TcW2FiMfJlW75u2ZgIhAIYLO%2BbW7zDv4yz2dLOMe9HLSq9ybcAtMT%2FR8d5jG%2By4Kv8DCGsQABoMNjM3NDIzMTgzODA1IgxLcwjPPKtABjECHRUq3ANREnobKjkS4WS3dJ47RmblnCRKFZfflfRv%2FEX1PjH93Hp%2BLgxoZoF22rw991aFlW8eDuzyJnInzNwuSRp9GB11N6CwxbL6St0BKQYQ5G8Is650VI%2BSSnVJohRhQTbP26a9kAhNAEteRAWtGQo9e%2B1qnq4mnfHMI0yLmSZ67KvbuLwu7Aow7XbMg3Q9enrW4NjSA48ZNs9fzL58AKeA9K7K1fmQRQJDfvvwh87Q7E7yXwO2odT%2B%2F7d4Jy3tpvLI4TlyBoSGyOjWXet7pmLkyIlehAs6r%2BzwP5gsMPbUND3GgR4UXX%2BpUJ5%2B%2BHxGqurfV%2FzehryVQvivAhiDosS0oKv1dzC%2FfG2C2i3KAEsu4UgT0Tx0f5ulZMtu1OxpTamF%2B7JmIWc%2B0nk8VEwfAuGGg9iqK6kOJTXyEEVLFq6L%2B8pZofNNGkKEe6rMXkvMz85NmGF2VtnW1qG8SgSUrP3B4ikybCsdJUnfaDUghiZ9O2p1swyIj4oKIhCv0m8iSWRvB%2Fn0ih62rbspiYSFrwo7z2RNACoe6e%2BNLG61CljOSVyhwv5bFcm9s%2BjN1MBh8aMjL4F9o8PTIeh5%2BB%2FZ31Qqg6D%2BeCTNOBeMPOtdV0mgSfT8S4pvksKB9OWaQgUE7jClhLnOBjqkARQWc4t757evcbJnEB05redGv%2BWZy%2BXp3JvMH7bxOztYaUh6Yv%2BxDTzIfG86CdFUXW6vGHglgpOqzU48apKDFZBHaFk1LmZc1urLWy4XRzj2MPiwfGA%2F33aS7k3IhtooY33DUezNzuUv0aouTLuGS4BqjbrNwUw02lqssUY2Zva7zZVgNA%2FyHbghkIkNXCBYd3p0xUjD6woXAW3Z9Q4cr4MFl3My&X-Amz-Signature=d193746cca7b6bee77e5c15340be28a8abc0690c950fbbf6eed6da9faca70b4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UD4IIJ3Q%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T113509Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCuoKFxIdwD%2FHUjIYQV6BN65NAkoVr3Ur%2BsKeBBGE3zrgIhAMg%2FvULdJK42RqE1m6Xi6WlxG0wdDH2YmozxJ0yaUgf5Kv8DCGsQABoMNjM3NDIzMTgzODA1Igz5bVQqBVDFu59Qk3Yq3AMZHZXhx8NVzzR3upVego1VATmxJZxIJIZoAmLWsx3%2FrxL5VXJN0AZvLM9U2SaddNyhXVAderpHlnu6fPPVSwBPjjt%2FyzgWz%2FQbyNJysZioqGD9pr9AwUDeauzaziPHpgmO38DhFyosoGA%2BivQpR1ZReGp9QWHIqGpaw5Oq%2BnUPx6a42f1HiYzgDjIEckit6oNzQgQU0F6D6h8dJZ%2B%2FlznswBa9o02%2FFPb%2BXrSE6hAiCISqVEIzUyAWvWrYoEZWhgGH5CeRE1Xh9IuWCI0yIq4Tbci6%2BEQXwIINN3gpOUO6j5Ysjk5MSGmSek5Q6wqXm7z%2BY3S2mixuRzp%2BZxwt%2FJwD2DtvexESmrvVM9TiUkInJ%2FhYyqTqtLxt%2FiioL%2BLrByyMvubAbFo7wgW4QXivTwVcpobn0rf2G%2BTySDUSMwTMMXCS9nFdwE2ufLU7qjsEQrY0wMxCorHQojgGc0JPTInITJLOefXZbgMi%2FqBpRjK67t8seGjNwuPJGC5dP7qK6os1%2BnlbBxzLBszPLVS%2FTSRybSiNNYQdoVgoBn4WjCtTaJSgeEiImm66BOxuhs%2BrlmD2st%2F6BHTn4HrCDQp2f7MMDfUmEJVrKyGIplGiN0NhM1SYN7n8e3cYDDgSpDDdg7nOBjqkAX%2B%2Bz5QjBgs1e7KW9lwYrZHwNAfsovru6wG5f8FNqsqiatPNJUyh5ODdvkv61fbio5iCyYazWzmJkwUvq6fxi2qQ9cBpVwodn7t%2B4YpgoTmo3opGl26I49BgadatcWRqqTy3UjRafj5KNJK%2BfL7CMhM2iKFWlzeXwPobQoVlu4UexU25Cxrx97cTfgWlnxUm6fMqVsW6fJ%2BTopMjxn30iZ2%2BcD%2Bn&X-Amz-Signature=fa90a56687d3cafb360810ae369a7404b4c7e06e3e713004da4e85be34238a15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVHFG55F%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T113532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRHECxu%2FjU2qEw8B0tbCn8IcU2NI1erQRX4Sh%2FQoH60wIhAPcLxtjcyhdDBfw2Pa6nQxLw3AOo%2F%2BudG%2BX8fvqojUG1Kv8DCGsQABoMNjM3NDIzMTgzODA1IgxEmrDxlKs5A3OM070q3ANWp7KWYpbJkuek8vwCJ8sdTM4JOrqU3UrMWNumBCDvtE4ZMWjF2I83xYuPh7yIbtH2TObXmGZHXXZT58EgimHjPuouBbHNuMHg3QG%2Bhnhr18zbQ6tF2lb6rO6uGVdpegKRL6XW5hREml3ufLCQEOerb5LEb8gORNzOnmzA3SSJQCcHRGi%2FCQh%2FzhogzEw6Np8uN%2BeqT2ZQ9Kkrhq%2BQREMXlWnyNIjQM%2BSNuG7M%2FoIYZiYSOq3GnOql1CNqMrPsQ2nQQWHfNm7YEogJgXJHFriuk7Ma6MJvu9HP7duGzZzMyNqhh9shVofdHLatagD%2BN1JC69FxsdRG0qyG%2BnCt%2FIl3NzFvZZQb1oQkMeuRx%2BOYwVYDQB2yt%2BgfP4FuXCdBrSO72Pt5sZ98RCz0Yb4iZVsz4l%2BMdOwgZpXEsSMhlAFlIALBCka4H5B%2B5C5ywsbadBh4WrJoza%2FTIhoZzGN7hzIQ7Z2i6jX%2FPBO7jRqTLQLxDOC%2FX%2BES7kzgWIi%2F5YJ90GK2UVy7vIuaQmX%2FqXXp%2FxCCYsjjb%2F7kLtBTh%2FEOIysUonRPmIAip7dpktADxGJiCH3h3FVUcMs9N7C2MoxXev4vfok5%2FL8qzd5hQXGI5hemkbxjXp4FeCb03wImXjCcg7nOBjqkAchzEILJZP0XHCcUzAv0NgLkv5LMzoVfT0Uh629YSTR8un%2BBBHA23lnyt%2BgOdzN9EKmeM84E2blRE723ub%2FES21nwi5Xpcq2g63uY8U6gmKwP9uBFe1iTsFDIqD1FS3Du%2FNNXjw6%2BA5wycFyD4bHA%2Bo%2BchsmUugQnOXt9coVmT9qL2vDaRffM8%2BhYP3N5G7U8jII4JKXLr3tuEAyN1IQp8ty1dzc&X-Amz-Signature=135e2156edb5a5522cb85dbbb3a1d3af7c5e76a6e10fa83cc7cc937d58dfe4b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVHFG55F%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T113532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRHECxu%2FjU2qEw8B0tbCn8IcU2NI1erQRX4Sh%2FQoH60wIhAPcLxtjcyhdDBfw2Pa6nQxLw3AOo%2F%2BudG%2BX8fvqojUG1Kv8DCGsQABoMNjM3NDIzMTgzODA1IgxEmrDxlKs5A3OM070q3ANWp7KWYpbJkuek8vwCJ8sdTM4JOrqU3UrMWNumBCDvtE4ZMWjF2I83xYuPh7yIbtH2TObXmGZHXXZT58EgimHjPuouBbHNuMHg3QG%2Bhnhr18zbQ6tF2lb6rO6uGVdpegKRL6XW5hREml3ufLCQEOerb5LEb8gORNzOnmzA3SSJQCcHRGi%2FCQh%2FzhogzEw6Np8uN%2BeqT2ZQ9Kkrhq%2BQREMXlWnyNIjQM%2BSNuG7M%2FoIYZiYSOq3GnOql1CNqMrPsQ2nQQWHfNm7YEogJgXJHFriuk7Ma6MJvu9HP7duGzZzMyNqhh9shVofdHLatagD%2BN1JC69FxsdRG0qyG%2BnCt%2FIl3NzFvZZQb1oQkMeuRx%2BOYwVYDQB2yt%2BgfP4FuXCdBrSO72Pt5sZ98RCz0Yb4iZVsz4l%2BMdOwgZpXEsSMhlAFlIALBCka4H5B%2B5C5ywsbadBh4WrJoza%2FTIhoZzGN7hzIQ7Z2i6jX%2FPBO7jRqTLQLxDOC%2FX%2BES7kzgWIi%2F5YJ90GK2UVy7vIuaQmX%2FqXXp%2FxCCYsjjb%2F7kLtBTh%2FEOIysUonRPmIAip7dpktADxGJiCH3h3FVUcMs9N7C2MoxXev4vfok5%2FL8qzd5hQXGI5hemkbxjXp4FeCb03wImXjCcg7nOBjqkAchzEILJZP0XHCcUzAv0NgLkv5LMzoVfT0Uh629YSTR8un%2BBBHA23lnyt%2BgOdzN9EKmeM84E2blRE723ub%2FES21nwi5Xpcq2g63uY8U6gmKwP9uBFe1iTsFDIqD1FS3Du%2FNNXjw6%2BA5wycFyD4bHA%2Bo%2BchsmUugQnOXt9coVmT9qL2vDaRffM8%2BhYP3N5G7U8jII4JKXLr3tuEAyN1IQp8ty1dzc&X-Amz-Signature=135e2156edb5a5522cb85dbbb3a1d3af7c5e76a6e10fa83cc7cc937d58dfe4b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OBFFYYL%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T113533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCap73Ng8Z0BZO%2FlF%2BwgqBH3YGlxSqm4ZJNZ%2BlBZmTHawIhAI8rujHOzMOPKmw7wBq29wRb4RosA03ZB5UWp4wq8A7JKv8DCGsQABoMNjM3NDIzMTgzODA1IgxLLAPg8caI40LtLxUq3ANGW7J367cHPIy3xGXFHdtqdZmL%2Fuyq%2FKhgpLliD5OVAaTbl7a3Y4wRQdhBeFjglTcDcM%2Bbr%2FSO0Y7SkrM30qKUZCruM5%2BL7XeMfTvqDkArC1e5JXJM%2F%2FnlHgr6GoyCCPT%2FtPu7VmS%2FtfhjDYuFmLmCNPw01lVo8mAkPh0A1%2B0Vw3RyggjPZk3oQcghZO8fx1Ui7cDmmLKd31Ncu8EvFc5hAdKCvHyWZvmmv%2BE3ZM6d3DRqm7y7Gr0Dy4prKLlwCgtWVkA5gAudk9pFWw2Ml2VwZ4pnH1NqbL80wy4bpBsqZLyuSCq%2FuU4uKFd91TtCStu%2BdAR5OADmIWjO4cNuqgcr29PSrTp%2BYWFr1ccoFBM%2BcO0UvkOeumXO1S%2BklXuEl5VrwtBtr0wS1VXk40hzW1k1vfadVkSlj90siJbZPU240o%2Fad1oJNMM41c32oPrwdaNIeWltB6g1deAFC51HlCgSa3RF1nOjZCUEptbEMa9NvZCc5BekBTlf5Bl1fBa04XJ83kZDPTeWsQuzfMvku7OU1D%2Bccjc2R%2BUnJL3aqJ3mAi17%2FYNCw6fLbOhRvMcPOt63CFwGzRuXkyIIuMNRpgAGnsnVnziwDQBCObK6pxS2kAOjd0dM8AlyrJGf9DCmhLnOBjqkARiCA1MmgQ0CJ%2B6u8KIlmMZM9na33pb%2BiEYVPgJdTzIM%2FtdQ6gIX2XcuIL2l0GMWY1svRXXNmd9cowaAfF7%2Bcuh42r8V7wsWtapR70JDg9h1fHikfxD7NgfdKfGWfOa14RocFq3RKvPIdAQoZZWLxgfwsnvExFUyseIZZmmeaMy3JB9%2FZnvE3nK5CRtCoC%2FM91M%2F%2FYrkFRLweMfsGpAYZqIpayI7&X-Amz-Signature=b6528809c9c2afd9282961a39d9fdd5889c7af5e3907bdee3f6dcad44aa69a28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

