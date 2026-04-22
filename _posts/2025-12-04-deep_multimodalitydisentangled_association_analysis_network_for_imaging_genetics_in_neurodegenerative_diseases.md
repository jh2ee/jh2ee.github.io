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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2W25RKP%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T043351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJGMEQCIHW84wiPRAd8WpsXbfIliKAmGQl2lWzPt0X8lh2QadrcAiANN%2FjQoE8JsQlNLBb2sJ4Rts%2B6eYzWPnfD%2FqxEMWGydSr%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMYoim4o3Q7%2BzEbwWzKtwD5Ja5ELnI%2FyL%2FM5x9PZqjj0Rv9ZFXjffyuwL1IT5Y3O7rFpqqifzJeVu8bOkhaNkrf64NZSGePj4mgyaTxKiHz%2BAza9a5Pav41Ak5C1DErUCVMdBhrbTt4Dl5%2FkY%2B7xiXbagvBHy%2FmzbRryqD4byD9omLu4I28a%2F%2BSP%2Fbp2%2BAKOfkcpOPxbTmyJdNVR6Qia9OCYNxQrgpluV%2FZQMwFK%2BZA5eVnoYsfP%2Bylbo1RmgS9V7ju5uUQpGpKP4qtYFXYuZyF2wNyaHYU0198t7%2B5iS5FcOyysrQKh3z495P94jCLmK5PfnlVrhDXIvi0sD1eWcp81bOj%2FiPTpfmVmZ9tdd%2BXLJWPbvNwMurIoPW3LJ0c%2FET8gzTAZjqRFGt%2F3DOgqueQgfppydzNGFYtKIO%2B%2FayEpMqpHN7FOoSyHlL%2B6gvX3Bqu9JTAmXjLL1AJDQfoiu1%2BL3%2B71uOoMV%2FXuJuu0H8N8ftkAVf7mBQwDVwENaMLDnvtEab3c0DFbITWILFnro29LB%2BSJN88Xe%2F%2BlkYkBipv7uXySZqt%2BQxXARok68rznOw40TTV6oY7MVZ%2F4ywIJbG3kJhCiYRb6%2BQPaZqBU69nGC0H1N82sA7tfhdFFvc3Ed5rPH1kvYZYjZqZC8w9oKhzwY6pgG5fyK%2BWdrY2xNf1yNvVxqn78%2FxXHkSZd4MZmMMD4lw6FkrqHVGJ7AgzectkiMPPcVLHO58OghNKC2ef9gHtrhRMLf1gfdssy31I%2Fs36Jnd3VDieuCbTmwiZHAz4oXclJtzdJhJ%2Faa9Ir%2FjS8tsrPKrLsNySy6irU%2BaWA7VjpW5xVPqNG58%2BfGbrA8%2BF%2F0uBmGBRlJdzmdfyA2SezBYObFsMWQR7aNQ&X-Amz-Signature=00ecb4e73d5449cc914d9e9d0321d53d1d423cbc9e640038c224f428191a191d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2W25RKP%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T043351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJGMEQCIHW84wiPRAd8WpsXbfIliKAmGQl2lWzPt0X8lh2QadrcAiANN%2FjQoE8JsQlNLBb2sJ4Rts%2B6eYzWPnfD%2FqxEMWGydSr%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMYoim4o3Q7%2BzEbwWzKtwD5Ja5ELnI%2FyL%2FM5x9PZqjj0Rv9ZFXjffyuwL1IT5Y3O7rFpqqifzJeVu8bOkhaNkrf64NZSGePj4mgyaTxKiHz%2BAza9a5Pav41Ak5C1DErUCVMdBhrbTt4Dl5%2FkY%2B7xiXbagvBHy%2FmzbRryqD4byD9omLu4I28a%2F%2BSP%2Fbp2%2BAKOfkcpOPxbTmyJdNVR6Qia9OCYNxQrgpluV%2FZQMwFK%2BZA5eVnoYsfP%2Bylbo1RmgS9V7ju5uUQpGpKP4qtYFXYuZyF2wNyaHYU0198t7%2B5iS5FcOyysrQKh3z495P94jCLmK5PfnlVrhDXIvi0sD1eWcp81bOj%2FiPTpfmVmZ9tdd%2BXLJWPbvNwMurIoPW3LJ0c%2FET8gzTAZjqRFGt%2F3DOgqueQgfppydzNGFYtKIO%2B%2FayEpMqpHN7FOoSyHlL%2B6gvX3Bqu9JTAmXjLL1AJDQfoiu1%2BL3%2B71uOoMV%2FXuJuu0H8N8ftkAVf7mBQwDVwENaMLDnvtEab3c0DFbITWILFnro29LB%2BSJN88Xe%2F%2BlkYkBipv7uXySZqt%2BQxXARok68rznOw40TTV6oY7MVZ%2F4ywIJbG3kJhCiYRb6%2BQPaZqBU69nGC0H1N82sA7tfhdFFvc3Ed5rPH1kvYZYjZqZC8w9oKhzwY6pgG5fyK%2BWdrY2xNf1yNvVxqn78%2FxXHkSZd4MZmMMD4lw6FkrqHVGJ7AgzectkiMPPcVLHO58OghNKC2ef9gHtrhRMLf1gfdssy31I%2Fs36Jnd3VDieuCbTmwiZHAz4oXclJtzdJhJ%2Faa9Ir%2FjS8tsrPKrLsNySy6irU%2BaWA7VjpW5xVPqNG58%2BfGbrA8%2BF%2F0uBmGBRlJdzmdfyA2SezBYObFsMWQR7aNQ&X-Amz-Signature=00ecb4e73d5449cc914d9e9d0321d53d1d423cbc9e640038c224f428191a191d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BPTE4NQ%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T043351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJGMEQCIF96j0PlL4k%2BaRwPkjHDna0zIvVdrQNmwwv%2BEtauR4kLAiADc7%2Btv3m5D8sQMu1tl2pKWFjRwhO1pEOsCDjIu50QTyr%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMTGg3VLEwCkYdkv6PKtwDdO%2FPK%2Bh50Q3JgaKxhZARoZ4OgQLKSagei%2BXa%2BD8jg9W2RiPhFrtOg4uN2mb%2FPFC4Ewc9%2FENLVWb08I3HdLFwdgg3db1reyngVh5YQ8pGI0kT6If1bAyhkJ1VdD1%2B4hTzZwPfCU%2FMJ4Xr663U5nZU2yRiLSgq2f2ojZ6xtG6FxN4lGiCqym3IzILjzipHT0AKpAwnPeq6c7nGYMmgplaiO3YB8dXB5dr77lFJmvQ2sU7hwbuRD7wyPzt%2F9SHdNgYpFcARkdiEXLjmO0tyEy9wr3YZoURnJ4NJjCywr7J7nq2U7YzuWLMHar7Lx9q7pE5JMqsO7tHgjbsbtFHTQM5J0ERTrBvKzGQ0bn6ckoTR2KxwhbagHhrSPT5oGiTlekHhkgtykrWV6kunv39AN3hnWUBuUWtzsq6GocyYvJpkOyx6EyF2O0HW65zlVSzN5OHEY0YO8UuM%2BF2qmtilXiSeiInzy2ExBq6w%2FiGxhmGn7X%2FuZyOCCglU7Cu5t9T2Z8jyq3PW%2FomuaJqeOs2NTrWOzH%2B4GZhhONbdfvFzrm9zmblQjC02TkyzXgnIGMY4CcWnv9pK49Z1b%2BR5W30MFgPYoG%2BbDXH5OVkzb4K8K9dizJP2Kw3lZMHGLOa0exQwx4OhzwY6pgExbn59tAbuF%2BaagR7yZDYqM8ka2fcDEMT2sgtndVRe6deyA9Vjxhk295tb1LnJbCiBTcODzTKzdWzrRoq9sGIBAtf82%2FGQ4XPpdCDytgyW4CLbVwKnMKHfRENzMBJfeKIxKrst8vtoKuHEPzrIVcTos6UWzBbGiLlTuc3mXAT8cytOat6X3W9a%2BULKIh7p%2BIptvgv%2BmknJKJ1x3zuG%2FDvdzxsxV9wT&X-Amz-Signature=a07a6383c3a951492a0d536f46685d632364af68b625a9e0651ba488f88c77db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWL447EA%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T043354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIQDzlMFyXrUSp3Oxth1zLMYUxRwLjQeFxIOS5B4YPGYY0QIgC1wE1WYwnZHSHwPieN32LdiR8v0RGhOjLt0ytfiltsYq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDKln0P4JmbEGm9CysyrcA5aYXaCV%2FMzdjBY6dlmtsUaGB%2BnTo%2BVV89pIcM7v8VCkQMTd%2BsScx0DF5yoaZiCDPmC%2FvI9P9s1quJTXnBUy%2Bb53oa5iBIEQ6%2FNl%2BLxgfN4sgsAN5OKTEyUCOCRKNstDJ5yuDslniVpo7cNes4PCxFf5gIP7JKlcY9a%2FDNmaAccOTmrPA6d%2FlEpFGgovGuWIV19hTfYZZanlHPPLnKWKCpmxQ%2BiYFxHDMIkgzewJjhRSudXt70AopZgdEBsREb%2FNUq5C2WWDxXrggf4OvBbMgmeL9IvnAhIPCVtuXt4DXhXh5S32yjr9Mi82WYneVJINpKhYaSLsdzu1CudsVIaxHD44qwkFL0mItADFQaELfSB%2BfF6PqgwCMKs8J4nH1snkUyhSQFkAu%2F7I9o2WGwd3Uleuub%2BV0LR9CfFQwx7Zhqf%2BrvAxNlZaoJ3EsdiggghPfZValNEWwDTGt6kT0WnZW3rEuFX8ocuOni8950gUnRCmr7XCzJNkUNBtfSLMIQzGRTrk%2FLcDnfsVckHt7qQTqTrwoe9xcs6JdhWCUTDitElaUS1y%2Fvvil15Rv%2BcIArqmgJY0pw7OYcp%2BPGGNbYB5sUeJYxyo3Hwg6KtTRHG6kn5CnvbpkPCMwXVATgk5MPSDoc8GOqUBC6Qbv4xPYz6beCMRxXePFAbY%2BPR%2BD%2B469CKKOeUs%2FHphqEkbU7hnOBB2UIxxElLdDIjbyyE9zutKqO8BHnDei6A33tPpgW%2FCUZwwCPK0C5Q4WX0OE%2FUEbOEOkKIaKBmjjmlipSvLIgYxkAmJb769YOBQnn0JCTLGAkUT4Fmx8RMqqeOkdspW6AUHSWA2Oa2CYAOV2ZVZEYlTProOrkryxjYFp7BZ&X-Amz-Signature=1a8c477cd8fbd5d17fa72c89134e44a70fe548d57e9c883077b51ea4858c105e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWL447EA%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T043354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIQDzlMFyXrUSp3Oxth1zLMYUxRwLjQeFxIOS5B4YPGYY0QIgC1wE1WYwnZHSHwPieN32LdiR8v0RGhOjLt0ytfiltsYq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDKln0P4JmbEGm9CysyrcA5aYXaCV%2FMzdjBY6dlmtsUaGB%2BnTo%2BVV89pIcM7v8VCkQMTd%2BsScx0DF5yoaZiCDPmC%2FvI9P9s1quJTXnBUy%2Bb53oa5iBIEQ6%2FNl%2BLxgfN4sgsAN5OKTEyUCOCRKNstDJ5yuDslniVpo7cNes4PCxFf5gIP7JKlcY9a%2FDNmaAccOTmrPA6d%2FlEpFGgovGuWIV19hTfYZZanlHPPLnKWKCpmxQ%2BiYFxHDMIkgzewJjhRSudXt70AopZgdEBsREb%2FNUq5C2WWDxXrggf4OvBbMgmeL9IvnAhIPCVtuXt4DXhXh5S32yjr9Mi82WYneVJINpKhYaSLsdzu1CudsVIaxHD44qwkFL0mItADFQaELfSB%2BfF6PqgwCMKs8J4nH1snkUyhSQFkAu%2F7I9o2WGwd3Uleuub%2BV0LR9CfFQwx7Zhqf%2BrvAxNlZaoJ3EsdiggghPfZValNEWwDTGt6kT0WnZW3rEuFX8ocuOni8950gUnRCmr7XCzJNkUNBtfSLMIQzGRTrk%2FLcDnfsVckHt7qQTqTrwoe9xcs6JdhWCUTDitElaUS1y%2Fvvil15Rv%2BcIArqmgJY0pw7OYcp%2BPGGNbYB5sUeJYxyo3Hwg6KtTRHG6kn5CnvbpkPCMwXVATgk5MPSDoc8GOqUBC6Qbv4xPYz6beCMRxXePFAbY%2BPR%2BD%2B469CKKOeUs%2FHphqEkbU7hnOBB2UIxxElLdDIjbyyE9zutKqO8BHnDei6A33tPpgW%2FCUZwwCPK0C5Q4WX0OE%2FUEbOEOkKIaKBmjjmlipSvLIgYxkAmJb769YOBQnn0JCTLGAkUT4Fmx8RMqqeOkdspW6AUHSWA2Oa2CYAOV2ZVZEYlTProOrkryxjYFp7BZ&X-Amz-Signature=769fa7dbb395791fe4fd190d3c8f2488ac2e60ecad4e392453fadbbbd487f0dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IATTEOJ%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T043354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJGMEQCIDFpz%2B8jr5DiR%2FODSKLza0FqVKRPF4QG8EEuCEqDmn3%2FAiA5TigJ0Sylowtf%2Fb8ZR7aqnURtghRy2xp5OTsGObFvzCr%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMrgmQRw6FWNyoRpNOKtwD%2FJ%2FedJfBobD5hzeWA9dmWpf93DIbzVWXnlwjlW%2FEdouDM6Ab1I91afMHJiEjSMA3WJIpKbxq6RTTE6fqQNJXimKkg%2Fh0GZfmX1BLH0YHoWB%2FiJF2i2TahJONMjWxGRoqreW6rUQlxBwIupRuKQt%2BqFdk9PZVGqtk5J%2BmTpLSVqYPug%2FFKjedm0KXHQRMUqd5pQly6leJ5OcxFVdbzIPv%2BKWbMdHVaZrwMr3LmHEA3hMhYErpIx61chSeszcZfaDmT6uVZBNSiE7SapBsaPexNjKwaD3jczyEHJh27sngDH48PzqRxPDdeVHgnuVMcdNLfsaCaYIflRt4h5JcnEyyoPpX6nCYcn3IHFkGv%2Bdi8hbdf53P6krjuLbWoSujZ7jBNr0szF%2BPP6TYWpHFRISRckzH8%2FoPPRRJRQ7pUsbWB8o70EJ4VagvWwCkHFsYz2c%2FHnfo96t10V%2Bp32VJSGgdBncOmQltM%2B863%2FfIydv8swP1shJ2JlKKjM8YtbstcXCIGQv%2BRfx4RGbhueKkFuDHZFjgAvNm2WK2%2FGmP8EeC33KwzGoq7IwzYy%2BBJnX9qwN1fcIHBRxPRREUGvrwh3D55Y1xwXVJsP2K%2B%2FwrI0KfWWkoPJ7fZyPcZUosx1kw%2B4ShzwY6pgGo4fF0tVLoM0zp6DtzU1mFWm73kwlz%2F%2BB9D%2B4qDXXY5Bx3uqFm13CnfJEX5L2wF%2BWrH3aO29IOd%2FFfv2fCxgaijemgaLyxngFghFA0OCKZn0lTFe%2Fwtm7iPF4agjeG%2BuddA%2FPxKCy022VwsxPZKT0hoFIt0ZMVgtcgEmJKQboYSii3%2FqhoFXpWHWiDsTIvq8IeuectDNvcDxDzL%2FrxjqmLgiMge0uL&X-Amz-Signature=d5604eaecab8cbddaf45b5e1ebf1aed011f063ed88a6f66936c0c2e61d5c2510&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLIE6Z5M%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T043354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJGMEQCIGk0kCGc8wKnQ5IuNZKpyAmjbpZg8dPdJFIpPXldc7PiAiBerR0wQxynRmT%2BKLZtFh5BHCDKP%2BFU5gjA1tSvU3C0pyr%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMPoMj0Knc6pt7RZCQKtwDco4USm36VRe8%2FdShtF0t0YG60x1Iz%2F6cZR3hefUVdUGrajxrSzLvdj34MvrnKptm6b8WcBgAPuvx%2BqYUjaldA7fDouGPXvIZ%2F3biJ5560Iyx4mz3fmEuDp3aVCn4rm9ttvuldmsenxvEl3dOITsKP9O9FDpwbn%2F%2FHObtAS%2FAPQQf%2BFbhm%2B%2BXsLDZuKQA%2FtQFF9OrHenNxO9zm2JKg2nDOxvSGFsR1sfPXQa3z4V%2FoiQA3%2FchhLFwFbBmK4B7wmEQ1emTa7yz9ClExmCKql3q%2BLrP6mBR75FqT1r1ja4vl1dJlOccSpqtE5aZ7dhdaD7pSF3ZZvzyP1va97uhG1ELhfgGN5lN7H4hVLOSt1QR7BJnBhbcin%2BWzOYWoOSFbvXRbmFA1v0UYRbqGShUIzmJGxuYqKVR4YNADd%2BX6IxI6HFycvgu%2BZ0PMUg2KFUGLLNiEOMPLiPRM%2F5V%2Bxsv%2B%2FA9l9qn5lwmQIE7kqLuzRZGUr3D0IRw8bn%2B3l8%2FY8AL6tPsnNsBrGio7o4ETF3o4qSdjTbxMxZVOo0yr02r4ykdro56vQLCrPWCTphFYCw%2FCi9Kwyv9dr0MR%2Bs2Dbzf0BiaeVhiUI8QpkuPAmCmLmTaws9m8n2ncZH2HRmuzhMwtYOhzwY6pgF3ETFDi7m9TxanPfGp0nb5o3thqpAlHgxP6dmLxKP7Ewnv%2F201b%2FfiSxob4Y%2FIdbPRVezIPW2hpZ%2Bkb2JNVlC7LtUGk6hArn2GgfgVzLaSHZOoKnbbZCDBGwZ1qSikrgU11bmD8xbi4djPa%2BFGqBlw%2FIwpBFOupMjmIFYHGEuG4A6MhAtwv5jC7E44XOLEqIUobuwo6zYo%2BB5uWYic2GiZKGjMO3B8&X-Amz-Signature=a9993f7364bdda5805678fefbe0059a42d53902e2fd6c94c3cdc052ceecc9b3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSX4G3JP%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T043355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIQDdPpbfgp9xEjNAI0z%2Ft3X20R85sEbEAS1fYsRPuKHrvQIgYduoL1g9Yp0YFAPS3MxyyuYbJyId9%2Bjc3SaHcpWevjAq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDFlxFOx57mfvHUCwJircA5EeUX%2FYvCnOGbJseE50xdFlSHios8m2nf%2BDhZZ16TCwhhFf0g0ubDWdfkh1C0Wh%2Bsi8UmHwMSwimId30sOHEPycbvrXQ4xtd1lvW7F5mBijjKsLmbtMkM8wCgzpDFdKrp0itbNrYxKya%2BhztdvLnQijSubZUxNYxbELLVxODPkMp5gVb%2FnSEarhVylZb3Kcbtj66Wg0EfKUihsaf5KSfvlN7oOqsM%2BI8ZdphLRTsQoMGxYHNhboa7N3ZWFqDcCHBeWIRBRAp92ZVmcbtOc6wmsNJAoLsfgZRrM3tHBE6PDq25EpAgVe1LMJ9jzdC5jbKcuqf4rXxvprRJdUnEco91P4dKfJ9RLqbgTLcSFeNE%2FHBJScdQrfG1BTOKSZOwrSojNlsrmnRndFHlTQ0Vb%2Btqdh2SmSZKcLZ%2FLfnowYX3D1bVqoc8eYz4URtbnaAdTUHKB%2FcxsxgmwYL2DghKv0D%2FC41ygVhQaivzzioYpFVMRDQ7hmIJUtkV%2Fn7chx%2F6c1bnK1OhDak%2FGmRYc%2Fq8WQ7MbfrL6%2BgqKS4%2F%2BZmY1QHD%2F2DI2vo0ou9GURWsuT4HgZKQwM9GsG3BOwFD5LVG02j09QDtza0od9vVItnQspVqrcmfkuc9K3edKH4udtMKSDoc8GOqUBlHJ1fNYAjO%2B3HtDhJjg%2F0sBWdXT9m4DxQBDajMJBK1g6kjh0F85k%2FddesQIkuZCc1b%2FXMqj%2BJ4HI16DSFt4gdvKbu%2FWYKbcrYgbOO9N%2FHCphNKA%2F75jyxVybHZYGBLNrb4DAcfs8DNMuyAEGuDJE3lGDZoitq%2B%2FIuGYyblKsGO6C8sPhHb8ax%2FH5F9q3GdpZncHKA9Fxtoba0l1gZa1dRMGqDzP3&X-Amz-Signature=6e654256fdbd09169a8907259dea70f298808eca086d52d3e860290affba1bd7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFDLKVGR%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T043355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQC5L7be8CWIOzGbrlBwH%2FcpwbduhJxvYOl%2BpslI7U960AIhAMD%2FzixjFaXAF6XmZqkelWl%2BpRQ9%2Bn1%2BKO%2FSZu8Fjy1yKv8DCEUQABoMNjM3NDIzMTgzODA1IgyNVqsGkTrv8hPqKX0q3AOtWatj6dRS71RHSF9zNKtQqE%2Bkem9OGpeTF7jwGKnF0pDkWcSelw1IE%2B1DlfV3BxROxc1oZHsRTg8b2r39CAng8hpMpXDElTfMc5SJhlTgtbTS7IombbIkJeiYchZtXjOaSrJYH1kMuJDQNSoupDli7HZZaU8W7BpBFc04TUyCq%2FG4BO1nP8FRjUVzUnpZTEAvw9NaGMRC9qMYLcgLgjxEclSuDy1bCBrO4%2BSMFq7aiSqEG6uMFfGLqPO6%2B3pfBs1cxke4MhiGvbMXbJEy%2FcVn6eqBSrcPhjerxuiv5Vua%2BoWMCx1GVPqljbEjWBwFe7cBJMCjTtWkoiFQEx%2BSXWmNbpqMdDbXPBYzw8PAcWRIaEvQZ6HBQlPYqpQDvWSQSJiszeLqFIilCMYuyxKcW6dihamJxjXHBqYMCMZqoyKA06drdii23WKFNa3slXRSUy1RNW1E4GzbETp0%2BLXQBW4Gbwn0mNwnLyzYMc8zwNDYnCJakrRcQ911pniL2%2BYwbBJQXIH2KNQeDK6ajN08Tv4WRe5DESeek0zIp0jW41mqsvwloYlUsv%2BrgMHM8iHktH3fghoNQio7nCwdkfNF9ygK7BE3aABC20KMJJjWdBlOyLqx1VilmH5iPhZGMDC0g6HPBjqkAdrQLG5tr59%2BTxiKdjahsjCZ7fIkipOPwW75GyMO4SFIKIvwgkZOb314Qdv964zK9wtgSGSHBV0OcS56qEjyqFHkUt9C0AnXVJNOc2RT4pSO5AlONEF60WEAV76IwDFdL94A0M9VyNdDUhLIWB39Ou78mBAInV64GiV6Rkdqi01vhhINyd88YEtgRXj323WBpmVqVCx45GY%2F4GS8mjni1JeHhQii&X-Amz-Signature=8b72094165d6cf1e0b0d5e5a1ed623e093b722a59228d913076686a9522c1102&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFDLKVGR%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T043355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQC5L7be8CWIOzGbrlBwH%2FcpwbduhJxvYOl%2BpslI7U960AIhAMD%2FzixjFaXAF6XmZqkelWl%2BpRQ9%2Bn1%2BKO%2FSZu8Fjy1yKv8DCEUQABoMNjM3NDIzMTgzODA1IgyNVqsGkTrv8hPqKX0q3AOtWatj6dRS71RHSF9zNKtQqE%2Bkem9OGpeTF7jwGKnF0pDkWcSelw1IE%2B1DlfV3BxROxc1oZHsRTg8b2r39CAng8hpMpXDElTfMc5SJhlTgtbTS7IombbIkJeiYchZtXjOaSrJYH1kMuJDQNSoupDli7HZZaU8W7BpBFc04TUyCq%2FG4BO1nP8FRjUVzUnpZTEAvw9NaGMRC9qMYLcgLgjxEclSuDy1bCBrO4%2BSMFq7aiSqEG6uMFfGLqPO6%2B3pfBs1cxke4MhiGvbMXbJEy%2FcVn6eqBSrcPhjerxuiv5Vua%2BoWMCx1GVPqljbEjWBwFe7cBJMCjTtWkoiFQEx%2BSXWmNbpqMdDbXPBYzw8PAcWRIaEvQZ6HBQlPYqpQDvWSQSJiszeLqFIilCMYuyxKcW6dihamJxjXHBqYMCMZqoyKA06drdii23WKFNa3slXRSUy1RNW1E4GzbETp0%2BLXQBW4Gbwn0mNwnLyzYMc8zwNDYnCJakrRcQ911pniL2%2BYwbBJQXIH2KNQeDK6ajN08Tv4WRe5DESeek0zIp0jW41mqsvwloYlUsv%2BrgMHM8iHktH3fghoNQio7nCwdkfNF9ygK7BE3aABC20KMJJjWdBlOyLqx1VilmH5iPhZGMDC0g6HPBjqkAdrQLG5tr59%2BTxiKdjahsjCZ7fIkipOPwW75GyMO4SFIKIvwgkZOb314Qdv964zK9wtgSGSHBV0OcS56qEjyqFHkUt9C0AnXVJNOc2RT4pSO5AlONEF60WEAV76IwDFdL94A0M9VyNdDUhLIWB39Ou78mBAInV64GiV6Rkdqi01vhhINyd88YEtgRXj323WBpmVqVCx45GY%2F4GS8mjni1JeHhQii&X-Amz-Signature=edf5af9bb2478287d2b681c0df3432a9800b0608103d72b07ad77e5b24f77093&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7KYN7EB%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T043349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIQDsFnzWNAYT2%2FD6qbZPRKvsttBzGW3zTyx%2BW7IdyGZ%2FlQIgBztiDxWGgKDpLXA2sW4UPRPcAAztAGFzZ6j3obLqYiUq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDAbBLuDG6wJVyJVOuSrcA8mvOUTqGxW7FXadpgUOTdt5JN%2FezxfOq66STfNXULhSDlWL1ga1G5sNStmGQmHS32ml8kdvE1d7pIeHFe%2FWLFjXgRqyVXsfFHYdAbKqikyVu%2BybgFxLA%2FlqK2MTsLRN95B97vw9CkP9S3dElRK3pEM91emZ3Rd9skn0cDMD17VqsUyLnE%2BKXsOx%2Fvz2TcbGdIVX7QvRsh73bH0q%2FEzo%2FJBHgzk5UxVniTL1Hr6kfLZ8xJLlHSt5MCxxU1ijgE1ynZmHGxCJS85uJvKHWvoPUbfrfaxMMs3s5YJ0rmxm0fLCL%2FFoqi5LRm28xaPSbRbLoCb%2BcnmW9uV0P8BnA5%2Bz33VNfjutGokGV7wo2SpSMGSj3VeD1%2FOmAgoaW6u05ARZUtVpJpJhSuIBNBR%2FU%2BDDWyB0Jhoj5d4pR3B5zWvKLJtJ9LVAwr%2F1b%2BXhlyDrmN0BvWxoS4yBxI6W4yeKYuxm4wZ6jUkcH7dfHK1oSBFr2bSYcHW77r0SMcyIxSPh3KwKQzSb%2FRSdi6JTUiFaVbdntOOlSXFI9Uz4yOPKeCPZVl32F15PUiQSvGuaN14YunalMb%2FixmU8HwHdSnPffs2un1mP%2FjAaOMDMnT6whokI%2BmUAqyfulAL9OJ2b%2By0ZMM2Coc8GOqUBRRoo%2Bh9LSUsi4RAt1IHnfXWY859dXjLXW7R%2FlQwV9%2F6ec8DgrFaHiq%2FORnTcHtJwl9sbLtjMCCdPYzAkXT1t8L33nRTAeJhM2Se3zvwat28GsOXDPHpkpI2E3tokkBHhNsW%2B7HW0ItSr2c7NLFryR2p6MWhBNIBKK%2F3qUTkEYW%2BHR75U689%2Fc8jl3j5TLa%2Bq1p7QuZrNmHm9ltgRUD%2FkxnsuMLg6&X-Amz-Signature=4df863fb3af0e54ccb63edfc27e0492eb21b17ddec11b979ef21cdee04cb70f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLHB5WKP%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T043357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQCGXrkeVG0oSPwSfhJtHbdKJsHE07zD4f0wQLAatfLQ%2FgIhAKxwOiPYYtVIxv0csQ1to3c%2F%2BlM6i5Syhdvz48IxhI66Kv8DCEUQABoMNjM3NDIzMTgzODA1IgyDj6AfZuT5GHX7jpMq3APkfdk9eyWExvrZ565%2Bc8t%2BTvaMC0xY8%2FlMuNxT0SpQlE%2FyKOQqURyFQOgpWIyfjv3PF3oJ2pH19yVFv6U%2FXTAN9EB6aNkrlRH5gBiWVNpGM%2F%2BUwORuzPFJvzEoGr3kuwdvGrbZoQ9FBNldwRK1NE2T2ps%2Bo83LFcstWGJGyucc1UfFQPZf42WzcUo%2FKidFGOFxswiF16vFPZpECSNjXmXJyumOltDRn6nORuJjs4GJnQ55CPIdjRWqow8%2F%2FGzoBsUCMmeMEScmp29fFf4CAkCwvG3nRuBtLOf9aW9uWr2iEVL8vTPtZIgZPTUx8HFq06ooDWbxsV%2BJ5tiFRv3BMJio8KHxA0NfpBe537fQ%2BJn8fsvprfiJTsbk4KagbbLMFNuaJ2IMr5h4whz5w5SZ4eZPjUZ2VCbhS%2BCMIE7Q9XGrnqJ%2FrKZUYd3lEmRVHamVHFzJ%2BrWUmQMJXbpNa7Da8JXKhGwotvPL8afQOFK8cUJYT2HxHha%2FwcBRdI9Hk7ZK8gE%2BcA9zBznoRgGn%2BPm3LxM%2B9ewmjYVujUDdOjs47YLi7MyvFGWbDs%2BFBPUQKhYT115aoUMcC3iIp8iY7HpBhH9OfExcAUsLSl0eZPrNtrw6mpN4%2FLvYSibRhzAR7jDJgqHPBjqkAYto1nX97w%2FePfIR0HOBgszPP2pP%2BHSfBaHYfiGxqfth1ow7CAZT8ev1cBxgsKbaa3L%2BF%2BRGGJme%2FzEkwWGUtGmsBsnM6YppFwu%2FApDOudsI9ogKi%2F9oMRjAlZQFO0S4%2BLyCX%2BTyaJvWlhkPcZ8ElWhhv76JsdUH4PzdF6chsAltzIz462QtiTu1pGd79T1BmwPZHhXNdWcfsLlDH4Cv%2BLHEVTJX&X-Amz-Signature=92559af65f0d4b036fb8527cd888194ed2a49326eaf5e6feed8d322fbb01f800&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLHB5WKP%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T043357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQCGXrkeVG0oSPwSfhJtHbdKJsHE07zD4f0wQLAatfLQ%2FgIhAKxwOiPYYtVIxv0csQ1to3c%2F%2BlM6i5Syhdvz48IxhI66Kv8DCEUQABoMNjM3NDIzMTgzODA1IgyDj6AfZuT5GHX7jpMq3APkfdk9eyWExvrZ565%2Bc8t%2BTvaMC0xY8%2FlMuNxT0SpQlE%2FyKOQqURyFQOgpWIyfjv3PF3oJ2pH19yVFv6U%2FXTAN9EB6aNkrlRH5gBiWVNpGM%2F%2BUwORuzPFJvzEoGr3kuwdvGrbZoQ9FBNldwRK1NE2T2ps%2Bo83LFcstWGJGyucc1UfFQPZf42WzcUo%2FKidFGOFxswiF16vFPZpECSNjXmXJyumOltDRn6nORuJjs4GJnQ55CPIdjRWqow8%2F%2FGzoBsUCMmeMEScmp29fFf4CAkCwvG3nRuBtLOf9aW9uWr2iEVL8vTPtZIgZPTUx8HFq06ooDWbxsV%2BJ5tiFRv3BMJio8KHxA0NfpBe537fQ%2BJn8fsvprfiJTsbk4KagbbLMFNuaJ2IMr5h4whz5w5SZ4eZPjUZ2VCbhS%2BCMIE7Q9XGrnqJ%2FrKZUYd3lEmRVHamVHFzJ%2BrWUmQMJXbpNa7Da8JXKhGwotvPL8afQOFK8cUJYT2HxHha%2FwcBRdI9Hk7ZK8gE%2BcA9zBznoRgGn%2BPm3LxM%2B9ewmjYVujUDdOjs47YLi7MyvFGWbDs%2BFBPUQKhYT115aoUMcC3iIp8iY7HpBhH9OfExcAUsLSl0eZPrNtrw6mpN4%2FLvYSibRhzAR7jDJgqHPBjqkAYto1nX97w%2FePfIR0HOBgszPP2pP%2BHSfBaHYfiGxqfth1ow7CAZT8ev1cBxgsKbaa3L%2BF%2BRGGJme%2FzEkwWGUtGmsBsnM6YppFwu%2FApDOudsI9ogKi%2F9oMRjAlZQFO0S4%2BLyCX%2BTyaJvWlhkPcZ8ElWhhv76JsdUH4PzdF6chsAltzIz462QtiTu1pGd79T1BmwPZHhXNdWcfsLlDH4Cv%2BLHEVTJX&X-Amz-Signature=92559af65f0d4b036fb8527cd888194ed2a49326eaf5e6feed8d322fbb01f800&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWRLJQCH%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T043357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJGMEQCICjy8QKqr9udaHFgvtj2%2F9bCPlGT1p1eDKeLyb2CWD5MAiBZT%2FQucAX9Ui6FgPF1VZvV6HEQIflbZD7mvZBXEvgGVCr%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMZMqT9r55V7oYzKtpKtwDU6%2FvP0%2FsYOgAQ7%2FCRU0BKTJuSoovV6b0FxeaPsWYBwIYnUY0UXFa4gR1DRxjI0mMua04bW2HBFPIx8iFDaXE5XjmuGPj3NlfDz9KlZiBC8OjH25%2BNJm5rW%2BKh2GoqWTT0iBgef5JVBqdW6oi9wnsMP%2FCgLrXAtU1JOCqaFkIwjpAaXqDHBUpIHjYzFLpRT6rOvRfpLFEyjvaCfvX%2F24UDyFt1WpVLYRGNpZivyj1qMs0gqvQi4t%2BPPuotZPNsP1xeWb5jCVQvaJFUkZoPvjjZPzbgsGaNBpTvcO2POrjQFUtpdqUpfwMZoKqkSrH9MgHxVvBX1uG%2FN%2BiyooAvteK0pzRql4ydxGIJH%2BX9x6Sly9LonIztXABl9qWndUqRJZCPFbLsYiaRUJHlvhZFGf2X%2FNEQbIt0LM9TeAOZVxdr7aaBKM3Cy0%2BMrjoFYDarksw9PD1PQicF%2B5mmTmO212ajS26hbluwos3QXJU6uGosO0ku%2FUZGjGhwbAWJU%2BsLgHYerRErm200q%2FhZA8ZBx3FArzQxz7ztk%2FChELz7fzGxZtTKJVis0bn4X7ZXpVhrxY4Eqn4rUc6W4x3xkBGkFot%2FJ9484xxslkogdfWjvPo5HVCPaioqCLf1OF8gwow7oOhzwY6pgGWA0ZjnQ5iys7sokQBT9NOov2IlL8bnfuVqk3%2BYtBfbsohGgOcGMbdcr%2B7axbJnrkjKUh%2FdTG6CrTRrN8Q5%2FqLHfnIUkpyDfUWlGkRA%2F22mYq%2BNO4wi1ZRwxEFIb31UKhD0XF%2BYIKLff2qSy3453cqOjaw9E%2BpCCj0AVeQdUaODA3dHhOrhnQh7SfogCik27yhq2GhkirMW29UOwuVf624tKzWWGIq&X-Amz-Signature=2c202d286409ff6960bba3b3496ae63cf46b3b4c5e6ef7dc4ce98d712eabe726&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

