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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FGULJXR%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T133428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQDdoBPVZpZ%2FM%2BRNcnfSma2LM78dcaaDRT6JYcVo3Vn17wIhAP4pCLVK9ykj3nZTKZG86kNC8u5JLCQSBNtHlwkqzAOZKogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxBpctQ%2Bc%2BwyhJGCYQq3AOIjqSLz50R2t6IFfOwxwaCNHnw2lvHZm7iEAwbsUJqylmUx2K3k2eoG3gF%2FVe62i%2F4c10%2FB808wfHBjXPjtkqxlMzPjd0aFMZknAlVWMJnTR6dG2occIJro6pwU52SspLL5YnctFhg3aU%2FYik5oY%2BJYdAa15SBksLrilXnNyq80UAym2vnP6AfPXTZGxY8PnDJKqHDFj8y1fbwFB5hxYZam95WfANBjiPecp3peUJorGXVddRRGdS4jOckh5ruQEy9yNS0mp0%2FeuET8V7OoK5M4IB6BWGC8ff3W%2Fu3Wn4VeThL6Mnv9sVxduerzRz5RGisEsJ82GgVrlO07lQOpZCUl2456mZ1U%2F%2BX2HrQF%2BrYcgk9oFeFg3eqErvg8jXx72J7unzaaJcobtxcxGUAC96uiiOuciRCVwNOZhusVwDSPNVfjW%2FITtMe5rjVo3XO%2Fu5QxI4U9ozD0W8%2BAtZxsOe6NzJ4RgcRofMWQYEkFk9VxyRjePuKg%2BfmK%2FarUcOtOTAuATli3WwzCuL4C91au7vUJQ9vYgRHQHnVjDQRZ4aK%2FohAzsSnVJZHu60k24Fvj9cxrGNd7tE%2FxmM54CSear%2FW9LReho0%2BeeqpVBWeh5D1dJXExzrULPjEzBNBKTDm2PzLBjqkAbauEjrEZVAmtKz3zshGpkR5DHZ3na8PJcmP4lzmrTuqRoTAYFo6QfYlVVh8bfmA%2BQuUN49M0q0sjIpozQs0p7x6eID1%2B6IAtC8xdVKrQoHY0IK4CSI3HPt6n3wHx0rb36d09FVLkqSMTJi7ZrTY932eHl47meg9qBPEvcZu%2FLYLF%2FtW4jWsFKrFAefw0MpJNSM4C%2BeGWkdE4lnKRJRN0My87LaU&X-Amz-Signature=4c960e020a43a4ac493107388b40f0f13dccf53e4370ca51bd0e4ff174685736&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FGULJXR%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T133428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQDdoBPVZpZ%2FM%2BRNcnfSma2LM78dcaaDRT6JYcVo3Vn17wIhAP4pCLVK9ykj3nZTKZG86kNC8u5JLCQSBNtHlwkqzAOZKogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxBpctQ%2Bc%2BwyhJGCYQq3AOIjqSLz50R2t6IFfOwxwaCNHnw2lvHZm7iEAwbsUJqylmUx2K3k2eoG3gF%2FVe62i%2F4c10%2FB808wfHBjXPjtkqxlMzPjd0aFMZknAlVWMJnTR6dG2occIJro6pwU52SspLL5YnctFhg3aU%2FYik5oY%2BJYdAa15SBksLrilXnNyq80UAym2vnP6AfPXTZGxY8PnDJKqHDFj8y1fbwFB5hxYZam95WfANBjiPecp3peUJorGXVddRRGdS4jOckh5ruQEy9yNS0mp0%2FeuET8V7OoK5M4IB6BWGC8ff3W%2Fu3Wn4VeThL6Mnv9sVxduerzRz5RGisEsJ82GgVrlO07lQOpZCUl2456mZ1U%2F%2BX2HrQF%2BrYcgk9oFeFg3eqErvg8jXx72J7unzaaJcobtxcxGUAC96uiiOuciRCVwNOZhusVwDSPNVfjW%2FITtMe5rjVo3XO%2Fu5QxI4U9ozD0W8%2BAtZxsOe6NzJ4RgcRofMWQYEkFk9VxyRjePuKg%2BfmK%2FarUcOtOTAuATli3WwzCuL4C91au7vUJQ9vYgRHQHnVjDQRZ4aK%2FohAzsSnVJZHu60k24Fvj9cxrGNd7tE%2FxmM54CSear%2FW9LReho0%2BeeqpVBWeh5D1dJXExzrULPjEzBNBKTDm2PzLBjqkAbauEjrEZVAmtKz3zshGpkR5DHZ3na8PJcmP4lzmrTuqRoTAYFo6QfYlVVh8bfmA%2BQuUN49M0q0sjIpozQs0p7x6eID1%2B6IAtC8xdVKrQoHY0IK4CSI3HPt6n3wHx0rb36d09FVLkqSMTJi7ZrTY932eHl47meg9qBPEvcZu%2FLYLF%2FtW4jWsFKrFAefw0MpJNSM4C%2BeGWkdE4lnKRJRN0My87LaU&X-Amz-Signature=4c960e020a43a4ac493107388b40f0f13dccf53e4370ca51bd0e4ff174685736&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VT5LHREM%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T133428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQDxMWlYfr71Er0ZRsYXZ23W8OJJGeLChwZtQ6lz67AH%2FQIhAKsIo6KgUFqcKGSwX0xjDhWMS8FTaIb2gdv%2FtM3bGV70KogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwiQm2jEsmRGkLJOn0q3AOf8mzLZyXYo73JiJg3VKaF2dVQVEBSqzSyE2akm9MnkZ4LR4Aw3RqCkcSJMjaflrufxYJeDYSrnfYo7fVcslC9JiolWwlqbn1VGJ4nPihorLKjicS2hlsGsrsaFuv82k8nds96x8iw6oeFwFzks33KLFvDKJlAWGuB8%2FdnkhlfD3aOu8WsSvfcHvZnEOj06icjqnoPGz5UKxVncTWag5OBREWTlE%2Balp1hpj0Ran%2BJ05nNN6mCP%2FfIoAWFmLKd2kCiFD5FAdx56A3fDd6mtUfgQyVqmg99YPkvEJH%2BsIWIOFgn1Sfmq3O3gewTtVSlhZ6G%2FQQP%2Fmct26hFLNiUbvaLCQeKhaTWMsY6H6o6CskC0OrtXUG5zUaJPCHzngQ41wTr06OecWHfC08MhMzvrhKDBny1azqmNsWUb5vGthxcR7V23QwbVfQ51Y3XxlRGuKJhD%2B33Uw03PADXPHuOjcRZEMiVGALLAKMWoPYCZcPX%2BaukVzmiU4i8czjuPJ0Z3ZGfz5kH9YnI0lIwcK5qO68oXbFgZtErk8cDbOoklyyoXuM0FaTHjIDjq%2BmEqoVknCIwHBuvUIeB8iEFNNOjOD2vKCOfBEq4AxbYWhqxKSAFGGcOJPxKKY6IR%2Fn%2FzTD42PzLBjqkARA5fmR9NVwALYoXA1jSM9pvnN8xpY7sN5MGhbUJPJvHD1waTqwqKsfCpVrbcYbWzFkGCWdGSr74iSIHzq0bGXdo1qNntZO6oIBsDqoRWvYSVli0Gqcnh9tTS0REN44vHiPF1mxfJom3o5xJXvD8TGOFZcpwifjDQc3Uea8er8Ywp7iQN1MEfjCXu80mIG82mnNFd5kRI9mDzRlO8TH35zuvclWK&X-Amz-Signature=37ae166ad57e2d31e7452f93cdee4e1fd862083b8c0c5660e5f22960efa32483&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VHF4BCP%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T133429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCICj8atZj%2Bz5YXxdTvsKyWuIJuj8ytt717LjhBvtu%2BwweAiEAtG1omInLERb9beOjILi0QXBuHlysyQJjb052bsS1iS0qiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB8CJATlnSn6ft1uRircA9oAR3KWFVfRh%2B90ePbbCwP1HPzOk9%2BBd0nIJ744ofoA6tD2y%2BgPXiBWgvfAG8HAkAsHhM6ZjQ332j4HurwnqMLhCXY%2FtNtIImdI141JRjUbWFHv%2FZAj0uf%2F1brve3C68albZyNhANJMpBGO0mT8At7dj%2Fesi2lK9E7XafL5nEAPAK3OZTQjzQOap9mclBKz70aLoIiTujdxTACgNqEjJXUBb5GkU1pvihnqZymhAi2UeEBiRNqymbIhlnNkmr%2FUje6hm9NiqFuOkbtJg3qflpR2uzkYq5zCzHzWR64GVLNRF1aS%2BKUNaG7gXqwjcTvhI9FzstTt9AK8ThWlEBaIWTwuxY%2BL8tiRxYy3q3wMqIKOTpd7j9VT1LzzWADo%2BD%2BWT%2BAtZnPFEUwNU3WJwmJ8wHJl%2BdfGMBwST9rYEfGU5rD447Uo3MNOHgUaeMYIVACxKbbAgsbIRGHbOxCsTbMwi0Ceh%2Box53fo1Ex4EHVGLhcLcSAcLfk%2FZBu1nEdfEdSd3HQTIknSw7JtddbyKNLj9lAG0ipu3XGSydL1movflBQPHeusu7YNKHgFLxyRuJE2sZA1dB35nQSXvYvk4yGNxKD7fHif8vFVeB7zee%2FDDyhR1vxdq8B3kHwuNZnOMJfY%2FMsGOqUBBQVoPgcEoZDpxi5tcSxQwkzrOEcXtJN9FYMz%2FWDsa9h8%2BahzmHiqxSYzzyYwh7V%2B4lkVK5pviRzYj4C5qRIMdU9GBPEV%2Fgn9IydtP%2FnuWQH6kIL4E2YtYJRV4PcX0o93HcJRN7m0hyIKu72DuK2DupNX4NXIQnk5p%2FgcTN603pvufaZpi5OEI1YzRq2e1WkuTKknS9kTAREV%2BtL9XKeUhRY6ojeK&X-Amz-Signature=f76b00dc41ac17307ec8182e7d6d337181ec85b7c45e3dab82bc6e0f1c62a528&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VHF4BCP%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T133429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCICj8atZj%2Bz5YXxdTvsKyWuIJuj8ytt717LjhBvtu%2BwweAiEAtG1omInLERb9beOjILi0QXBuHlysyQJjb052bsS1iS0qiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB8CJATlnSn6ft1uRircA9oAR3KWFVfRh%2B90ePbbCwP1HPzOk9%2BBd0nIJ744ofoA6tD2y%2BgPXiBWgvfAG8HAkAsHhM6ZjQ332j4HurwnqMLhCXY%2FtNtIImdI141JRjUbWFHv%2FZAj0uf%2F1brve3C68albZyNhANJMpBGO0mT8At7dj%2Fesi2lK9E7XafL5nEAPAK3OZTQjzQOap9mclBKz70aLoIiTujdxTACgNqEjJXUBb5GkU1pvihnqZymhAi2UeEBiRNqymbIhlnNkmr%2FUje6hm9NiqFuOkbtJg3qflpR2uzkYq5zCzHzWR64GVLNRF1aS%2BKUNaG7gXqwjcTvhI9FzstTt9AK8ThWlEBaIWTwuxY%2BL8tiRxYy3q3wMqIKOTpd7j9VT1LzzWADo%2BD%2BWT%2BAtZnPFEUwNU3WJwmJ8wHJl%2BdfGMBwST9rYEfGU5rD447Uo3MNOHgUaeMYIVACxKbbAgsbIRGHbOxCsTbMwi0Ceh%2Box53fo1Ex4EHVGLhcLcSAcLfk%2FZBu1nEdfEdSd3HQTIknSw7JtddbyKNLj9lAG0ipu3XGSydL1movflBQPHeusu7YNKHgFLxyRuJE2sZA1dB35nQSXvYvk4yGNxKD7fHif8vFVeB7zee%2FDDyhR1vxdq8B3kHwuNZnOMJfY%2FMsGOqUBBQVoPgcEoZDpxi5tcSxQwkzrOEcXtJN9FYMz%2FWDsa9h8%2BahzmHiqxSYzzyYwh7V%2B4lkVK5pviRzYj4C5qRIMdU9GBPEV%2Fgn9IydtP%2FnuWQH6kIL4E2YtYJRV4PcX0o93HcJRN7m0hyIKu72DuK2DupNX4NXIQnk5p%2FgcTN603pvufaZpi5OEI1YzRq2e1WkuTKknS9kTAREV%2BtL9XKeUhRY6ojeK&X-Amz-Signature=5e716a20b67c97e9e9182834dfb86adf60fab013a36aedf503a9441e7c36ef26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5KBKCCS%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T133430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCIHzW2uvGF%2F75C%2Fda64d7hqBh9NKZ1t9UY8%2Fil9a07MyjAiAJWPU2NHYfU64sBWT0tMmd4MYnECFtUf4O8ApztJzWVCqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNI9IwBe23CYz1CoEKtwDZgKmpnuJYtixy40F0qvVLav7RcWJ2ijgwZa%2FoEgp5Rfvu9PiJdI3uV3OBBM0UJRZ%2ByGE8QVQI%2Fvmy%2FyOpc0bXPdwn8I0IM9VS8I1%2Foh0kfplRARCm4SwtcM%2BObKd8pmyVAd6iLa1ZJVv3Be9IkcLHmpWK1RwMvZco56I3xS893hAqqX7YutbSX54225hCAng7kntUpUfzGUplI5aR5ht7d7ALkUW0HeGSRfQOWHy1UyBkx4tWH91VyuvsS0CfajTJe%2FKIx7FGMIandaB9GtqtL087VxhKlF9gIhDOVpqJdfx%2B4WU4%2FqS8ZmJYOUz8gopoJoEjGwt4JdhbbLP%2BCsJC8jENPxkKsjgv6bSMJnI3c%2F7CJTcsMaf8kelqlHNOFIBnb8eIbRthdrWwQvxI%2FMcLblxuXqadZPN8By2ROSOAZRHSm4C5uXFAc6DNlDbqTku%2FU%2FibBP5mSGQ3Q%2FPa2zZR2tm%2B4CzTIN5AkfEisoNF07%2FtaMZ8%2FHprnDIBOL1bDnwWz8JO3v0OPbInI6YBBMwETYv24IrM6jCCPPJJB6brUr%2BW1Djrqtk6kw24eqFulClEbTfbKg2tzjl6K4%2FzEZX3wf35hJsq5NVf0gNJQzgCPjQgLvY0%2BvKHir49v8wt9j8ywY6pgHqyR5PLreWv9r%2B1ykFWTAtic%2FGaysDEMksxnakRJb3fRJjb7Nmn2Q3mLf3qLTnxOfpKC8%2F3ptYIBZGTPr4y5S0VN%2B6%2FWD721uX5YmWaXzwODKZq7GsX67VJ33gauDKvgLQsWrGH742%2Bpgpy%2FC6KM5H7RO93kW4Np3U3i9Png4h6MvGoBNkMF%2BHtqXkkMYmvyxMZdxOxWtxrjZq4GYFfyJGY0RomobF&X-Amz-Signature=a6a7ad2b3eb4f7399e9d15677e0d00c8f9254479e68f9d675a264826005e1e39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVCF6KKM%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T133430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQCfq5aouNKUREsL9pZ5CLRM6PomtlU88%2FfMPaWcidwIqgIgIMF5UI9P9eNJ83Y8Y8357FUsaJZwl%2FGE5F7j919ESh8qiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIye8z6KZqUqJYmxgSrcAw9rIPthPiaQIsi7Ffcs6TgkKRdHU5MsXrNhvSwj4JDGyZFGbrl8bsUgLL%2BaqmiV9NWHBlDkUMEleGTpVdZ8mMB7FIhWP0YH53wCs2MvrKR%2FE9%2FQQGYxNOl4PaEDgTTUrOu0KyAnB46yI2VdFMJRBvlfj9U6Sr1U%2BZQkvK%2BQu%2Bq9M3V4wroXjyj3SdG4lHEw3IOsbdMFMTmsX1FaeFe0eLJdVWTreiQ%2B20tLiUJeN4yAJM%2BWicRnU4tGmjyOvjAhEuIz1sQ%2F1WYmcaJFhHXGWsJaqjL4L5DYtL%2B5Tta9DQBfxlHd4Vn78ftB3HVuQdvMiBqDj9WbSnBmGMNWDyjqYCya7wSYr2wbjiPCYkTaJsClWnw0tvegvcmrjeIsRBvVbUqWjacaRvSTi5zAhT5pLuBwsSe%2FYj0RCDFeWZj09SscACBVsKPnXOpSvFS7oh1oYRfgXAr75tmOtHdrrXTeTPepVoQ%2FK7luXlw5sCsy%2FSkceVjwF9lnQYke%2BXYAhudTxHpotAS6RhnNgLd%2BxB8yIOc1BHIeKLwR%2FXlvIaCXc8zIBiZa9%2FStWcB0KichmZJ%2B4NhmabluL4oB6RJKMO2X7WH5PkIZMELFT3RB07k4MuKKmJrEjsiT7pQxo7m6MNbY%2FMsGOqUB1WBS89vZn5%2B4IHrla%2BeaHQP5H5FXxI%2FssUrb6xkozct0qwDoiTX4FsIzBBJE5HObF0HfOxjcu4khTfNg32%2F1C1tuas4RVbZJheZrG7E5tBKYbUxyxYgrzSf0FHDchnnPRwIAKqa10tPPVyvCPOtGHBm9M8gRl8dPcLRbHX6PnefTMPB5etEid%2FlRdA20IHepZWgciztMtyVD3AxDdHyh8dTpWLBL&X-Amz-Signature=6e908a3fc5d8ab760e1a461945f25f5b7b4fd254e04d65cca635a36b604e5d62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RY65DVTY%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T133431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQCy6I8R5D4GjM1DhAeDJXoA8sGVEquNMawrqMk%2FYvxYAgIhAIVav9EAYCrvow3Em0wJZ7dOgiAOBh5Zw3ocSud%2FXZ78KogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzpatZCgx3SOO4bsWkq3ANwJQb9acc9jkT6c67HjAN2QiSGj8DqaEqCY63qYyGZfFqG81BHHMJKV9AZGa8dV0WO5tkyZ%2BXme8CfW8cUQ4Tg32XfNlfmHkxQJ%2FLrj3vnf54g2H%2B%2Fu4%2Fg4dq1S0vEX4L6yB8Qy3iJ8niN66EtWVzPxq8X05ePIq8kP4HS6QUgZ3%2F5mSurIorobrNVwX76%2FiGDqaDFuTjJzPCDTaiTYsMKhb9AH5JVqce6ttxX4fAxPBheSJWJrHyhqi8GevPvGNLXj48KF7ElMCERq0c5KbJiOS975LsrBf5MPeozQ7DWAERSjNe90%2F%2BlLQt4jUuoUR2u25Bt1ujY8UCiToEmWzl3khA8EGnbh4AV%2BipjCn5J8PVW6OmGEiWn81A4HVwoT9ozld45RI4cwv7n%2BxLxca8X2I6wsR13Ao6r2KtPuBSrUalry1sbdPzk6FRvbs2l2%2BZibm7SQCiOupy6wgpNnQdj6iKqOpmudo0sL%2BQJfnNH7Z2gamvqLYOSFc%2FeQZx3LFZntO%2Fo9%2FyZxi%2FDMswhZ4c%2F6%2FYKrJm95GZxi%2FZMXuhjwD%2Byr5AltJiWHb4ZMvhseudX5pyvao6FUAFGyC6KYXBRwXQHldYft3s0%2BUFCUPzeaZkubW4QlIvYDZzQKjD32PzLBjqkAUhdiTbT6KnkmOO0IS2gGo3SSAUQq1JLIAFM%2BWFyL0iDVDtl4By3nUfrZbOtE1wmHE00knY11ixraJX67GA95DFhXAcGUGbFkD%2BfbiRU53utIs9MbYZf3CgbbZDWv6LtZgRtPu2jSvespFFfHbZQq108uIM%2Fwvcf1kvAzcjLwGzoNyMmcx12AQwdeA%2FKrc%2FRZeeZqR4GZjsNiV9s%2FzxWm8GcbZoo&X-Amz-Signature=cfeddedec0a4f68a6b087db9e83fb16e5b628aaed1e921c121667be9b22873e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDSRM22S%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T133432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQC3TWL8IOZjw7xyhfj2SWhs%2F00WcaPkeresVhtjzv9v0wIgLCOYF6M3NY%2B5mWQj5WYvSkTWvNn9TVHQi%2B4NI9I4swkqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF56HomLKw4fe1NbICrcA04I4e%2FO3OHYTHjI4Jlvw8SzBO71UMeQPkq%2FddwoEvKHa2zeQEfZMM4ZGztd0glD4pJvXxt7dhL%2FAIaNksxXvQhvIXtyKlmMuufgTaoY31CSCt8hmHMmYVSdaXaCDSJ3uek9zXejOJ918XEbD9RLzYbMBaQvgKs59GP1nXgUppRPj6mBJSf6QkdIxIHiwERd2ygqS6QA9gvg4m%2Bxky0eHzsudcVIGZdzrmAx8e5Iox2g62Des1KLO48KTPs8FzaSRJ93hwT%2BNLC4SpBETaNdYJfBDCDaGVNJ2qwhL6qLpZc6Czk%2B6ZCLjm3vB5TTqk1eGuDPoobZ1RDM%2BQA6mBttHSlTIbs7F0ih%2BGfg8oQ0piPDKEH%2B7hQe5FpPZrPtd%2F3LPs5%2FEN1PWS927Ia1u7yVFr4GTswcGzGWTGzVY8Zshz1OYrF3uYbIns0wgL3PJicSh2Rsu1iD7wA2O3o0t5c1xB3XIrdC2%2BlLZT4B9Mm3jJaye8VWlNPgeEHrzVx%2BFrM9K97%2Bj7FP8L54DAjVbxrxxqI5C8vgEVaRIyLXEjkPk56Kwd0eHtyxOD5Uw7bQ7sXOV5Dddr9XYl0Q9%2F8VhOJQpnBhsKGiaTJPnrI66stapYLEqb9yU8hyZrHRKd8hMNXY%2FMsGOqUB6%2F%2Fa%2Ffz61HHrb1DAXnmVO3e86dst3kRK7ve%2F5tXjCFeoioh1vLaTZwKdcaFdwzVwKPdQNfPvZEKqQMnI%2Fp2UhcSH6FPa%2BvS4ppIeBUGHyFAYDgvwzRIrFErxG7hQQbgdEEgtscFO1tl6gNnb2vNn%2Buwcta4yPOdranWHLgW97n0UXvg3VH%2BvjSuwAU1ouB2o4DKJ5BvOxE5aYRcRztfrQH1aCZVA&X-Amz-Signature=b68fe4ec3087493f06400b744f3a9071c7b0a8a5ed7dd39302d235ae1749d537&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDSRM22S%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T133432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQC3TWL8IOZjw7xyhfj2SWhs%2F00WcaPkeresVhtjzv9v0wIgLCOYF6M3NY%2B5mWQj5WYvSkTWvNn9TVHQi%2B4NI9I4swkqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF56HomLKw4fe1NbICrcA04I4e%2FO3OHYTHjI4Jlvw8SzBO71UMeQPkq%2FddwoEvKHa2zeQEfZMM4ZGztd0glD4pJvXxt7dhL%2FAIaNksxXvQhvIXtyKlmMuufgTaoY31CSCt8hmHMmYVSdaXaCDSJ3uek9zXejOJ918XEbD9RLzYbMBaQvgKs59GP1nXgUppRPj6mBJSf6QkdIxIHiwERd2ygqS6QA9gvg4m%2Bxky0eHzsudcVIGZdzrmAx8e5Iox2g62Des1KLO48KTPs8FzaSRJ93hwT%2BNLC4SpBETaNdYJfBDCDaGVNJ2qwhL6qLpZc6Czk%2B6ZCLjm3vB5TTqk1eGuDPoobZ1RDM%2BQA6mBttHSlTIbs7F0ih%2BGfg8oQ0piPDKEH%2B7hQe5FpPZrPtd%2F3LPs5%2FEN1PWS927Ia1u7yVFr4GTswcGzGWTGzVY8Zshz1OYrF3uYbIns0wgL3PJicSh2Rsu1iD7wA2O3o0t5c1xB3XIrdC2%2BlLZT4B9Mm3jJaye8VWlNPgeEHrzVx%2BFrM9K97%2Bj7FP8L54DAjVbxrxxqI5C8vgEVaRIyLXEjkPk56Kwd0eHtyxOD5Uw7bQ7sXOV5Dddr9XYl0Q9%2F8VhOJQpnBhsKGiaTJPnrI66stapYLEqb9yU8hyZrHRKd8hMNXY%2FMsGOqUB6%2F%2Fa%2Ffz61HHrb1DAXnmVO3e86dst3kRK7ve%2F5tXjCFeoioh1vLaTZwKdcaFdwzVwKPdQNfPvZEKqQMnI%2Fp2UhcSH6FPa%2BvS4ppIeBUGHyFAYDgvwzRIrFErxG7hQQbgdEEgtscFO1tl6gNnb2vNn%2Buwcta4yPOdranWHLgW97n0UXvg3VH%2BvjSuwAU1ouB2o4DKJ5BvOxE5aYRcRztfrQH1aCZVA&X-Amz-Signature=d6b1fe53a2f9fbd24e06559935bea55b35840fcb9f5ceb62d17861a6283bc8f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667X27S4RS%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T133426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQC23vRqko5517QTEvzn6dr3G5A6byMWNnLZLpJuZVbV%2FQIhANLUbX4uIwRYB8K8jyqEShYVvtZa4vVfo2c14poJsY36KogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzN9gkqGo1qlxWMO28q3AN2v9PUOUaVULmiGS5CD5GgQHdKdkgH8E2GLWz0ynMqUziw4w3poE4WcKghrzpfNuS2DOlVNVjraNLSwSprOIkQF0fSqazxRSouIuNlUyo2TY4zs4l8kihcOUKQ3hYTk86B%2Fno7ZUBMpKGJw73qghoiBkACfhOzEtvxzokTfZZ1D6viBxFCE4%2Bodgqiy3D7EpJEMO91KPQCevLFvORmyRqKgFHRzn%2F%2BSjHcbkIimDY9yel7av6n58mF7vYqXjdcnbw3H1caVmn0mMaJBlqJWLLAEFcmp2gArMO5nbmiv479yh9LKoLASYI1OKrwKnXkCFrNq6DYERU%2FymL88w%2FGvd3M5RHDcLh0mp8dagRAvi%2B%2BjPK1DlsU4ElFFC4FvLdH3ztbAvSF7BWuLscz5kIAhgkT87k4%2FA82Iiy%2BlIkOz7ESTKVplrkr9fedwoD8uRzayt9e9XJHSMQs3lOdCAD5E%2F8A1a8cAAg2limdmyYJzWMCWxkLXFfV%2FB8%2F3TVK8Uqwp4pkNwH6OIRkJ9gDp%2BfiUgsYgvbFs1NRePfJYTFhgzBdyDFDEqdY13EdG%2Fcj9WzTqGpg7sgFDtVkbxary2wyKTi0TReTX9RlAgYbw1mBer3S%2FfOpnKySHiACYg4QXTDu2PzLBjqkAdNsNzKJj8rEFsfgXMjgUETNqZ%2BEzNIj2BLM0w8CImKxzjQ1S%2BtrMpu2mEOaUqCrF21cL6ECVQsB3KhG4RzUor9YHWNTc7skDNoVJDK7jMgsfm9UvhQVRTlEobmX3yH8Vw%2BgmZR0YjVnW4ZCek2pp8Ap%2Fz6ljdIudBC71ZQ746diFO5YO8P7JtWIiahNHp8AXxTmltvr1G3TiO2beCs1IQDwW1eE&X-Amz-Signature=11c80037831f8d719a4c1e672d76cc37d394c003c500bf7403b1cd1790370c48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMI4QCZH%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T133433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCICr60YJglvayKgselPm7h0e4mObq9Emq5kwS62B0k1uSAiABSnMgWJNMpvfkWX4kMkZGhoSsIz5CfmY5ncgPLEK82yqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlsXTSffC5CTnym%2BRKtwDZab0tKOiXOehg3CzClx1djsjx1BAIJJ%2FhDei4kX7To1KxW11kzYm%2FvW0gqM4Jg1CcFAtssNje0Fy01auGwu%2BubVHfL9fLFh7GWMJCJZ8b%2FhKTEgnb%2BVeHhcpFqYAExnFzDKirRHhpmNYV4LWuuaX6NFdH2%2Fs8ti4%2FTh%2FTDyxgPOAS3Mk5qtI9rtR9iZZ4B0HEm%2Bmh6hnHUYo%2B1iY6rQlmm%2B5vPdxJJleUCQ5UcKvTnf5yViultFGLUz0YVZo0B2OcHJQyGGY3RW7CSS9oDJPq%2F9XPnum6RAMLLDflDelJlmOKskeuggfqbPpWMslZgE1DIWPtPlf%2FOhaDJR9pdSNKSrv8FI4lDJkjnUA3poEs31%2BtvqY8UXv2g3VdThCXgJAAvRMWcXIzUKvgdxVfCzxBLjkz3gQPnBuPtD1ooqi6eDbS4AxYK0PSqF71qk3fx5I1mj33Os7LGSjcQSuPbn8ILWkF6nybGnDOlwnHd87dVlpsFFhwmTVaO8TvSSALFhhHxxlerwBK8gD1pJl9kzIYpN3iDLbwSmrU86BFqGyNB83ZIyNPGdgasMNm%2Flpma9fI6%2BOX8mENo4mNrZfAHETmiQ1lPKEIQ79bcJiwAHUlC5P7COlNB7en2aRrFwwwNj8ywY6pgGj%2F%2FDwMXWqQ5cbv%2B%2BBV4lYrdcK0EbiMairfX%2FyDrAyc9Y3MMZepLuo8WQSQsZqufYs9oqYbUSB3nIru9vK0vkqTYJk64GzM5K8mCmaLPgOLrYZYgqclPd%2BPiKSV8OVrL2S6s3zTy8vbwAJUWeqbiw7fW%2F5J1EjJP%2BxtnIOJk9K2FbVeIFOLeXwFy8ja4CYD611D5ETN%2Bq2%2FeVhhQhp32nKMyipWU%2BO&X-Amz-Signature=80b313b7cbb03d527cf736fc89b256e4ee29fa26287adc7653c1c23db67b30dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMI4QCZH%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T133433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCICr60YJglvayKgselPm7h0e4mObq9Emq5kwS62B0k1uSAiABSnMgWJNMpvfkWX4kMkZGhoSsIz5CfmY5ncgPLEK82yqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlsXTSffC5CTnym%2BRKtwDZab0tKOiXOehg3CzClx1djsjx1BAIJJ%2FhDei4kX7To1KxW11kzYm%2FvW0gqM4Jg1CcFAtssNje0Fy01auGwu%2BubVHfL9fLFh7GWMJCJZ8b%2FhKTEgnb%2BVeHhcpFqYAExnFzDKirRHhpmNYV4LWuuaX6NFdH2%2Fs8ti4%2FTh%2FTDyxgPOAS3Mk5qtI9rtR9iZZ4B0HEm%2Bmh6hnHUYo%2B1iY6rQlmm%2B5vPdxJJleUCQ5UcKvTnf5yViultFGLUz0YVZo0B2OcHJQyGGY3RW7CSS9oDJPq%2F9XPnum6RAMLLDflDelJlmOKskeuggfqbPpWMslZgE1DIWPtPlf%2FOhaDJR9pdSNKSrv8FI4lDJkjnUA3poEs31%2BtvqY8UXv2g3VdThCXgJAAvRMWcXIzUKvgdxVfCzxBLjkz3gQPnBuPtD1ooqi6eDbS4AxYK0PSqF71qk3fx5I1mj33Os7LGSjcQSuPbn8ILWkF6nybGnDOlwnHd87dVlpsFFhwmTVaO8TvSSALFhhHxxlerwBK8gD1pJl9kzIYpN3iDLbwSmrU86BFqGyNB83ZIyNPGdgasMNm%2Flpma9fI6%2BOX8mENo4mNrZfAHETmiQ1lPKEIQ79bcJiwAHUlC5P7COlNB7en2aRrFwwwNj8ywY6pgGj%2F%2FDwMXWqQ5cbv%2B%2BBV4lYrdcK0EbiMairfX%2FyDrAyc9Y3MMZepLuo8WQSQsZqufYs9oqYbUSB3nIru9vK0vkqTYJk64GzM5K8mCmaLPgOLrYZYgqclPd%2BPiKSV8OVrL2S6s3zTy8vbwAJUWeqbiw7fW%2F5J1EjJP%2BxtnIOJk9K2FbVeIFOLeXwFy8ja4CYD611D5ETN%2Bq2%2FeVhhQhp32nKMyipWU%2BO&X-Amz-Signature=80b313b7cbb03d527cf736fc89b256e4ee29fa26287adc7653c1c23db67b30dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXGGNNEA%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T133433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIHOStZdiFIOuhNxjbf9iYqhX4Frm%2FDIxwKxveJDA87CcAiEAjnDa7sX13zPLc32%2F1sY0l6QoiDXoYas3zVUxKdc65IYqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNIvNsbWQSqrmXEmWCrcA4fXFZhWMkKl61SLNtQNVhD0qpL9HazDDfJvzryLBL1kb4smdWKUKTn2lLOlulQqstoVKhH%2B1htdulddV9wKcndZQeb4fjc%2B4cYwpWwJqTrEC2tTcShIRa7OFa%2FhCQD%2BvPjeLHkOqbsqw7mYCtmh6SHIUduKeCCdTfFA6UHTAeIDCsL4z%2F%2BFaIosE9hlb2F%2BjH99r11CDdehx24eNzasaKRqdNPOKyLSca2CMLNrf1i87Uh6U5AG5qjRiQ9tbSLrIP%2FWxCJ4nd%2FGtbF27kpxmdUElfnfOVhYjhZ7%2FMwB897T9I3BYasY59bpZtIF3L%2FtYwXORVj8odxhHYT1Eiw7dVbYErPeJ%2BI4IsF9dqrOOh%2BPYQMJFQ8%2FhqK1RfRLahcs7TJHPbIC00Pn6sNGMWSpN1hNDAZZnrsOaGf02SHlUpShnFn9v4mdOkzKWOkYs0D0%2BhHzkVgAgdRxWerntPgLQRdl4QNL6wkadgBdIgsupGRuF%2F36PtQlbRyU%2Fk59vhmJ5HoeLcQhvnxN5iQMPpjpkE1fSK0aRzVgFMwdgrM2L%2BewzH%2FclPnvumLbY5Mi06GBKD9cs%2BK1VCmH%2Fu2lG4Cr2SrdgAQozFR5tVpO0oBtHigRmuJX8dEGDygUVXIwMNDY%2FMsGOqUB9xuNChQluDzXWHDp3G6MWipCtEJzZF8oZYHAKidlmKd8rHWZDWzPhqe7QsHGJqHwnoQRRwyrI%2BhH3wWXvea1G%2F3h8LX7sSzuyWI4%2FL%2BVLqtaf%2Ffa17KyKEWv6%2BgUkrWrFyp1vXW7HwWKXmA1s%2FsLth9m30w9w%2FH7HIkTRs%2FZ4UwLn3%2B8tIWoIgmeBiEfk2hBw4fMLaEAuLzWPOqoP15MjM8etyl2&X-Amz-Signature=cc15827887a6454b529f126694b8bb394dd10769a0afba26780c27d08b47063e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

