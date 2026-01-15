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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QE4BWTBS%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T121825Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIFQcC1V5E%2B2Svu4ckZhkqtFHM%2BDCs6nGsIHtURlM91DuAiEAnLuLIa0c%2BoI8uNS1YoRmTXLGIQK%2FFNZa8A%2Fwidg8vdkq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDFH74G31LGbR3M2GfSrcA22kRMoC8rEKdHWDBe9a1WFuikt1ElHMgV9UlMmKN9rHHi6%2BKmmGcX6O2ZlQ%2BZ1EfxOhHBzzu0uKNpRLlfCaNlRWZ9Cih6SvkSU%2FpzxtvSTxTc7z6CWQCQ%2B%2F4DnRyUEczS6n5BKoJoo8iEVe0zMIQy6dkJGFBRAPDGc75d7XeqXP6NCn9Y92PL0kUX7TWtG7kCGKCTlHErUbmkJRjWDWrS34knUR%2FrnztZ7Esxlw2QZBf6QXj44YvgEpSENtM7pzlhH0gC9WWbQvkVLCniGi6scLVKCrRWvgArCeV%2FTSnTdF7bi2vyzKDcD59pfaDV7eBNgGQhm3BGbeEiqtkNyueWNRJ6nQ9B9AqvD0699R8FL3hG%2F0mA37CEevqj%2F9obu%2FFYomEX%2BpQvUGO0WwDddo%2BFNNh4tsQQ9gHDvV85i4XuXvP%2FPmjiCAXmWAE80AD1zJMVEogirloKJ61MhbZ4nV2%2Fy1P63y8T0cH5N6sWhMdDo3IIoYY2NDO7fhOXGa47iaVGiQrxKF023hr8MqzIbka3tPck0qG%2FdYs4lAXom3eyLhDy7ONrVBrVJ6%2BphRvB%2BH3lBD5LfNaNZewcIOOWqqB1lnSxh7DshB8KbGBNb6r4qrYibTb4Z%2FCAfIQ4w8MKWeo8sGOqUB5D030nV2MeGCLxAvy%2FNDN%2BvPqBNpEqB0BccLIHJ19Jqbaa1pTiW4DH2O78FCVB6DFA5SSgKDB0%2FoK72WdDeOSjkNWgCLylRRx%2BxEJRxB0aZViBwNGu5vD7EDoXKliq00bZ3wtvTWTFSCjy2fI8Kuk1Xdw%2FRdcouToLAxa2xbqXdfhyvPcGCQmMkdZABPPWgtnOzDlL4O4ZfdrBjNyVT%2F4XujCLyj&X-Amz-Signature=69f05d54e9430d363213a64bf6aaca377041cc37df5909b2cea4bf20882aaaf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QE4BWTBS%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T121825Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIFQcC1V5E%2B2Svu4ckZhkqtFHM%2BDCs6nGsIHtURlM91DuAiEAnLuLIa0c%2BoI8uNS1YoRmTXLGIQK%2FFNZa8A%2Fwidg8vdkq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDFH74G31LGbR3M2GfSrcA22kRMoC8rEKdHWDBe9a1WFuikt1ElHMgV9UlMmKN9rHHi6%2BKmmGcX6O2ZlQ%2BZ1EfxOhHBzzu0uKNpRLlfCaNlRWZ9Cih6SvkSU%2FpzxtvSTxTc7z6CWQCQ%2B%2F4DnRyUEczS6n5BKoJoo8iEVe0zMIQy6dkJGFBRAPDGc75d7XeqXP6NCn9Y92PL0kUX7TWtG7kCGKCTlHErUbmkJRjWDWrS34knUR%2FrnztZ7Esxlw2QZBf6QXj44YvgEpSENtM7pzlhH0gC9WWbQvkVLCniGi6scLVKCrRWvgArCeV%2FTSnTdF7bi2vyzKDcD59pfaDV7eBNgGQhm3BGbeEiqtkNyueWNRJ6nQ9B9AqvD0699R8FL3hG%2F0mA37CEevqj%2F9obu%2FFYomEX%2BpQvUGO0WwDddo%2BFNNh4tsQQ9gHDvV85i4XuXvP%2FPmjiCAXmWAE80AD1zJMVEogirloKJ61MhbZ4nV2%2Fy1P63y8T0cH5N6sWhMdDo3IIoYY2NDO7fhOXGa47iaVGiQrxKF023hr8MqzIbka3tPck0qG%2FdYs4lAXom3eyLhDy7ONrVBrVJ6%2BphRvB%2BH3lBD5LfNaNZewcIOOWqqB1lnSxh7DshB8KbGBNb6r4qrYibTb4Z%2FCAfIQ4w8MKWeo8sGOqUB5D030nV2MeGCLxAvy%2FNDN%2BvPqBNpEqB0BccLIHJ19Jqbaa1pTiW4DH2O78FCVB6DFA5SSgKDB0%2FoK72WdDeOSjkNWgCLylRRx%2BxEJRxB0aZViBwNGu5vD7EDoXKliq00bZ3wtvTWTFSCjy2fI8Kuk1Xdw%2FRdcouToLAxa2xbqXdfhyvPcGCQmMkdZABPPWgtnOzDlL4O4ZfdrBjNyVT%2F4XujCLyj&X-Amz-Signature=69f05d54e9430d363213a64bf6aaca377041cc37df5909b2cea4bf20882aaaf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5O3F43A%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T121825Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIFdBGIK6yXqlQnF%2FOuBZVgOBQtyYzUUtHSoZvXe%2BLB%2BTAiEA%2Fe2Y4kfZvrzUJpZ%2ByL5%2F0fbo6QO%2FS0ijdvLpzSFFMBIq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDBZUy%2B7aBsSBzcQ63CrcA07U9DRf0%2FnoHGBZswujX4dWf%2FdtRwIoW5iuZA1VpGS5y9B0avrrltxQ8Qau9uaL6dFAsJMQ8E6R6KUhMoOCEWjvJUBAEn%2FIl7Yk16Yt1PAXe52HC6k%2FETvXCOaIB06lngwKMuMt%2BgkY5t1Q7ZqZycD4%2FiVKZogCloknhjayP9Ga49vZU99A9xDhpDkOcZoyiPyg%2B7CQTAlEg4j2k04GgLch8T4uxJe06vfuSl0hFVjOzRLmPb2nrLu8LpXDg2DW88X%2BePfCLAaJUpD%2F0mUGzBy8aIzh9TGTJTSkKasaWLCyVYao%2B6qwDiNepkjaQkiMGFJWA9lRxXCQQaDtj3X%2BMoGmgCj7IOHlTnP0KigIYtu%2BiY01FOp2XeOw2CWgwQQd30aCQsTtKRT%2FDQ8uL8WUunM1LdqwTg3iUr9Blrb8qy9Yw5qxpQwIDcdJrSDpCjIP3U5thP5y%2FHKzFIO9J6PmiBq%2FuWQH31n65YtRKfiwyZb5J71y7VUBEYNjdjXpky2RDnQfvhQZooN7OqbnsvaBRnHNQvpxGC0Yw7LjtaHeREUocpN41JkwCr7Co81St%2BnIFSnfkYB6wJt1Kq4lfBbQyKCb6yCkLoFnhldIbOu02qkD7acPs8iWF9oEyIMZMN6do8sGOqUBalfRGJcf7qy2sIGIxJVv9TQf8D27JQvdca00STqPyEb9xFHs6qcV%2FVp7RJu%2F30pY4wEMsIWP17vmFnvhB2H%2BxzzV8jCSpyaeYdmSaEVPYNmHApMU2QDYkool0k6Dxj%2FX61b0joKcbGptP9OhbJ6vvpt1waDnRuQ%2Blf765cXn5%2BwYIHzJEFCpKBX43xTyNnDab%2F6zysnKBo5Qzv79%2Bej5LA8quZYi&X-Amz-Signature=e9ec3b55c71b269615aabfa42090b4570d20e3e83cc82b7f073f358362c0682f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLBQ2HYE%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T121838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIHQDx3ZeHhZAc1oADUWIsfXHv7jK2lmwcVYp4l%2BjbofPAiBij9uTVUIdvt4n4nKaL1iyEhbmrogLzCtvJBPFM75YRir%2FAwg0EAAaDDYzNzQyMzE4MzgwNSIMtlkUorwIzLbMYGSoKtwD3cSQ9qglU2M82DOQyPRjYbwjwkqtZxcKT5eOXshBOizRTcgECtE8Qqu7ETMp4WXyG3BefS2m3HRgqec4rmCTTDgCrM71bMs6LqzYc%2BVYBK9PRb95tXcox3feEPmYMlTFvq5NbQDzwfabR4FSjcxHtC6yGRU21orv%2F6A2VrtgS%2F79XIXOZO6WUzHLMAPTuZLlHg1NvfYBoBSamvG6GuD3nx7T9NCzy3GOQiFUVVyivFOmHOChSzGfPe9QDTtfko8LpQjcH9BQrqxFXEJrGJfLqEMYnc%2BzbuZZf6PjEDjmOTdhoKXQPnv6o76XxMtPJr0JslrVApWBTP7ES6nx55JwmeNtGFbKb612sdHXh51LBFQgaA4UBotsdNCwMzjhvPs9DDmtGZG%2FfPTDKbmSOI3hvNPPD5ZhLzs5MjTi5M6h%2BIdY08XXdDkIAo6ow1bqcRmfLDw84ZJy%2F8Fk27UUf6hIXxm%2B3xNqPDZay9QsAdDs7pdUG%2FgkhLfsnX9PE5Zwf8uvXlSSfUDt3ti%2Fu4lw9w8B%2FXQcPjjynnOS7wGiMO%2FyOBVuoopcTHEoqc2q35xIueiE9k865NTlpTXYh0CLDDzqo876wbqSPmPSz2FKtTW5SiAL8dZLA4OMSoEjwvEwwp6jywY6pgEOGc%2BNBrjsxxs4FFdp%2BYc%2FSkjGw8rgqDZe7zUpYM3VJ1rqqi6Z9gVW83rZnrI7DYwZ0BBFcto2z0J73JDVNVhgxTyor59f%2F7WGZbD9k11fiWsgxYywNZ3%2FlqkTICiGu6XikDvUVA23MN2BfhazMSmwxV4BtFjRA%2F5hCp%2BmKnQJHF5WH63vja1%2Belwm5%2Bn7jyggEyF%2BWxnHKlYzNcxJ6QUeqStlj0%2FK&X-Amz-Signature=e16811dacce9ff4e72b917743e3808df4830ca7db5394edc49275120a72f85eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLBQ2HYE%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T121838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIHQDx3ZeHhZAc1oADUWIsfXHv7jK2lmwcVYp4l%2BjbofPAiBij9uTVUIdvt4n4nKaL1iyEhbmrogLzCtvJBPFM75YRir%2FAwg0EAAaDDYzNzQyMzE4MzgwNSIMtlkUorwIzLbMYGSoKtwD3cSQ9qglU2M82DOQyPRjYbwjwkqtZxcKT5eOXshBOizRTcgECtE8Qqu7ETMp4WXyG3BefS2m3HRgqec4rmCTTDgCrM71bMs6LqzYc%2BVYBK9PRb95tXcox3feEPmYMlTFvq5NbQDzwfabR4FSjcxHtC6yGRU21orv%2F6A2VrtgS%2F79XIXOZO6WUzHLMAPTuZLlHg1NvfYBoBSamvG6GuD3nx7T9NCzy3GOQiFUVVyivFOmHOChSzGfPe9QDTtfko8LpQjcH9BQrqxFXEJrGJfLqEMYnc%2BzbuZZf6PjEDjmOTdhoKXQPnv6o76XxMtPJr0JslrVApWBTP7ES6nx55JwmeNtGFbKb612sdHXh51LBFQgaA4UBotsdNCwMzjhvPs9DDmtGZG%2FfPTDKbmSOI3hvNPPD5ZhLzs5MjTi5M6h%2BIdY08XXdDkIAo6ow1bqcRmfLDw84ZJy%2F8Fk27UUf6hIXxm%2B3xNqPDZay9QsAdDs7pdUG%2FgkhLfsnX9PE5Zwf8uvXlSSfUDt3ti%2Fu4lw9w8B%2FXQcPjjynnOS7wGiMO%2FyOBVuoopcTHEoqc2q35xIueiE9k865NTlpTXYh0CLDDzqo876wbqSPmPSz2FKtTW5SiAL8dZLA4OMSoEjwvEwwp6jywY6pgEOGc%2BNBrjsxxs4FFdp%2BYc%2FSkjGw8rgqDZe7zUpYM3VJ1rqqi6Z9gVW83rZnrI7DYwZ0BBFcto2z0J73JDVNVhgxTyor59f%2F7WGZbD9k11fiWsgxYywNZ3%2FlqkTICiGu6XikDvUVA23MN2BfhazMSmwxV4BtFjRA%2F5hCp%2BmKnQJHF5WH63vja1%2Belwm5%2Bn7jyggEyF%2BWxnHKlYzNcxJ6QUeqStlj0%2FK&X-Amz-Signature=451fa99f1d7b2ba983493a09fe448117d59f3be87e21e1ec9512bbb6b99de20a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664E6SOSO5%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T121838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIAktmuwD8Q4zjHnIndDQ2%2FHQE1%2Bb6qpeFEseP3vZw%2FgEAiBrskpYy9V0QXcImBDvMLwf%2FIx6vVG6SxKQrkq1eh49rir%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMcgu7vSpHKrC3qWmlKtwDasfg8rTW%2FgLK3kMVWBXwp5D6fq5g0ER5vDDLUhj7XjdTD6y5%2FcQ7ST6c1RZGBQydqp36soNzZjcwxku6faXWCRVbryzTMvNz2CrduE8l4X5d%2FEo3jhHwz40xrOw2zVdEmehOLYqzm%2BYjuhOGKOGmurmjIpp45HpsHUaGFjeaKd4Q565A545ur1lyrqiB2fkMf72XpKJ7kIT%2Fb82M8jUoowRVp0juBG4UqYCSDVzpzphvNKoKMWgCRLV0l%2BGhoqxc%2Fyl1ScMdUog8Zt%2BqAZIMQxC2r6%2B5K3PnSOx41onIYak3V5TjydUHMPeRwIzV7jtyxIyNbIZRgq3tnjD4ncc%2Bijo97rLexj2xMgxlv0a10s9y6CKAq9DrBUTlGpNh8sDmO9HYiEpgEQatSVBZ0SbzEKbsW%2Fheb8128%2FLBwSqK%2BEzA6zezq9A2JRBZiv5z0M5p4tjxcAXj0BmVXNueJx8aHpA%2BGpkogYfs4bUrBHQcJ7N2s8fOZuF8rcQxvsr90qk9o2gDDTS%2BzAtgC0so6VSwW5CNV4h3cFhIJd7nfwWdjDIBVqPckPjQw%2F2a%2FQo4jtAs%2Bva3oMdW%2FwDCVD938N1WN4zpAOpm%2BDTznd9iDNUiGsTR%2BRSW%2Bof1DpgBiTAwoZ6jywY6pgHi8ImQieuHFvq5x%2FN20T9aS3zrdWITwfuNQOI6tIgJCZbislpOaXbs2tRlEiASil9cY1lTcRbk%2FGObPhc7HbFaHacW6JIj5JA5nqZQY3EM16XRdDrIv%2BQvXRZjmkQUUuESpgVlK2VDn0daflSFuncEia%2BXRje5912ggccMxkED14C0udpi0RZfvFe%2Fkd%2F%2FARFIe9rErTsd8j5I5Ea1HvUiSWPPwmP%2F&X-Amz-Signature=338d983f11ac1dd2f69882310942add7eb45bafeb4e39442faa14e00a33de4e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUF6SB7Z%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T121842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCICWVmifdjSvPAEkwNH2GQXC37BQ3ReFMxD8QKdJCf4ThAiEA%2F66RZVs95%2B4nvHlacsht4ewFVnAbfq0teF%2BJY1U1JcEq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDJK8Jl1lcZMqtw8fTircA1gIWcCoI5Ba6sW0WcHnh1I4UUTXqTvH%2FJAvL3ovl8vEjtj%2FDapbku7%2FPuoA%2BfoxQX18KtmHjDYxtCOoKf8Qf8KRUc0H2pfgnu5Tf4TB6u7ds52%2Bxo506Hg62tvJXR0cyVgXDjWfShfrrHvlwfoQqNny%2B1pVPO7zVgtvAgaSQjFdf756b7rRDCNWtq9Ma%2B2ybE21O7cRDxu6uyuhaOL2orJUkCJhZ3GKYcITkg6qutThnHdNAj7fH0oGaBl7gvZ7S4eSz0uJP%2BR%2B6t%2Bdg1veJV6S3JajyifEiT7lThf3byAHXi6g4Nm2BXoU4SgoS8kzYp%2BHT4iMWxHjZCH3EtUSMKzJV7AamArNpgdNE6TMfDmRjGGsrB%2BeszXAj7D0dZt2bj%2F%2BSz%2FF8%2FEyESGcuYvIeLcsty36BHu2OcNm6IW08mYC28ckaH6jmODlrUQAyh8rPtxKKLLr9kmFMZh59kmuSH3OZz03cocrJcMCha34ACimFlNM08jGIuRTBjdemT0favR%2FflGAZyv4LCK2exrZY7cMznNuLcyjUNqaCCq7DDIA%2BxZibiTXBhc8c0BJjcxAXJ8uGpRxPo%2BGjF4EGXDCoH1wb6DwmfomQs1AdQZQnR%2FGgHCSx12ysQTvR2ILMMedo8sGOqUBszDrrNjehCxMX%2Fxf2v5NZtZINy709MvfIS1CgpD1yh9KkvfneN3vIkw%2FRy2Eyi7Frq1MVQmnSbHZarummKtSF5NXyGFVGXFwM0%2Fy%2BJT69WJOCn%2BMVdSkZ4vm5Mq6jixdBH3%2Bp72Z1YdUgmAmkpiST3uX5ftNmhGjYQpWqiQw89KXedQu3OIICcfm6xFPGvNMcv8Mil7dhO2ngMzd%2FuzK4tUTcXdg&X-Amz-Signature=6999d85d205ca7aec8ac82aeadf7161b2b52b7daa966f680c4c9e874f47a4d4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3ED4HRS%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T121844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQDvLvqhbbz3131f%2BZ3zF9PCyXxXLQv0rWG0gc6LRw%2F0zwIhAODVPcXJQz6qbpSZcwsWYmw2iqTAdK08uKXpDq%2FxwSXsKv8DCDUQABoMNjM3NDIzMTgzODA1IgwCnUzTdaWrknMs5aYq3AO5aW%2BcuQkQsBptEb5cY4crBI9fik3WdRCw5RrA0uYY2QdLPZPuy%2Fdu%2B%2BzLSmDLAroBTTjn5Uu5CI2wNitG7m8wNIZk%2FhvIFco9UWJVKM0SpDFPCalg3CFXqIwwmKsvYFBLUDM3QWGtMfEie6%2FDqtLASJ5tjJ36aO6Ia5QgM4nbaPqBHoAwLYaqYV%2BNzxbstWLTQ5gnUpS5FtQU94Rdx3jaBUkBRH7FPLjvChs6kwAmVt%2F%2B6YzhwBnsJrfocoNuI7129JjBahO7rFNRPXnYjzMQSWTGK4b2MD2dSRujWkNG366lzti4VO5OvbxQKdCBQ8GtHpNLpgAwXqjExa2PyWyd61qVdQ9ipYWWuFY%2Bws8ovrzwWm2ovOKp0s2KU6BukMNm%2FovyBzyKe1WNW8KqU9amnfIx0RXXxUcEkWnmxxycYg0A55VopeVucNzf0hX9FTsGvudcvACXejIHnI%2FFIdbOH2rtGCxby72mo6HtMJvZiBQm7TSHbLa%2FSpdm%2B0ScULiq6kZ2EYO5%2BO1cngrrwj7xFTH62TlJoDteSnF1SfiIF4s35Gmnwju6n11Cdagk5Rb%2FpdLZ7SX5qTjzFlypOvClT7dzKpfKC2TvSKrJZ7phGc99VwlEvTc4zfoQZTDEnaPLBjqkAcvA5YqRU6QqJWAruDt8sD54e80QG0Cu5SssXf3bWEOCkNN6zLFbeZkNjAeDhM5P6ZHBgPaz3aha0I8Aygc7h9jZEssZdqQJA90KUrTbjH%2BoqV5asD0MwXgUeAykzHgYyY2OVOiS0pFh9czncyMKFhYsLHZsYJSANyHzFwdESGwsTyTZtyVI%2Fpol4bHTnXTEZx2Rsr2yqik0qlz5nEsBNgc8nAno&X-Amz-Signature=829d9ef4802a5efaa926fe1c6a472eb0527fbdee19501a5de26a79d3c8a22070&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOP6HVP4%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T121847Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIDTH7EKmW%2BPHBBgtrDCFOjmUbLhgvQ7HAaU09kSlTkbPAiEAoZjU6UfK9vQBXYQFNAPNUv6E1UALsEjfMAcHNGm5l%2Fcq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDPLBRYX0NCp%2FM9UK9ircA%2FKLHtuHC7xkx0XLJn7pmtd4MILDPmcwqEzJRfR%2FaoXcOiHQpiYJGJj3qMkphhYRJOrSW%2BvDAJVMkhbLQ%2FEOIRMYA4e5PcJAEiN0VhRossQnLNyuy2PlzS7bc3SZrpQAgWhFUvCPvzugIiaSyci96%2Fnk%2BORObJQ7rxVTASTyrcEMyOfc5e8WtFl4KoZSZSbUFZs62J6u5wV1IZMpttyX4caub5mJXSLjqVWHZjXlbFKdFSBt8GPp5drsdNOEkKIny0dYcAea3iYfxZAU4ouH9YLNdIXfbuOslHS4oXRvDzmuVPFsbaN6pdwehzSJlzR0ownzU6ge7t9Iq8983dKWmDZbMiM8OPrEZ2WsYgFfkqHlMrop0%2FCs%2FDFO7qmVeC8u75pRlFqBNF6V1GkswhRMRLfBHzXHC%2FiE7%2FV1YB3CGlhusPXhpcDckVu72O%2FyGZW4hzv6z14xbLLb2jYbREl6TJiu5nzp38F%2B6Xuoiram9AYxFngD3Nrc2AfwNK5hOjAE4b74hRup9hpTD4cRZw7LHOLSAcs8hbsTOGzpHAreJGVHM1YjkRnv4A3LR%2FZFj5LD%2FGuDX2VXDjqmkop6W2%2Fz%2FM8qnfiK%2F82ghTrjH%2B9D%2FCYtivzNMcQgrV%2BwtREkMNOeo8sGOqUBLvVc%2FUPLGQd0bmONnX%2FVbV4f38lhtoJGf6F3Qk%2BGIl%2BjLPXXa9cq2CTOduEbfz4V8cxXwmubJIrQoepARtArMAFQdLB7XLZZNKIaNEhzUxepNs0RQO7xjMvYj7Lwd5Ps9gb%2FW7DUsdeIs1TiCCldAr6Lk%2BlnL3Rw5qF9SgjysglB2QORII6b2VgXhbFWd50WuJkF16bV5fOLPQuKzQAk2c3zRLvG&X-Amz-Signature=f5e9b8200310d5dace299f66557baecbdafa60eaeeebe0572d50e789988804a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOP6HVP4%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T121847Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIDTH7EKmW%2BPHBBgtrDCFOjmUbLhgvQ7HAaU09kSlTkbPAiEAoZjU6UfK9vQBXYQFNAPNUv6E1UALsEjfMAcHNGm5l%2Fcq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDPLBRYX0NCp%2FM9UK9ircA%2FKLHtuHC7xkx0XLJn7pmtd4MILDPmcwqEzJRfR%2FaoXcOiHQpiYJGJj3qMkphhYRJOrSW%2BvDAJVMkhbLQ%2FEOIRMYA4e5PcJAEiN0VhRossQnLNyuy2PlzS7bc3SZrpQAgWhFUvCPvzugIiaSyci96%2Fnk%2BORObJQ7rxVTASTyrcEMyOfc5e8WtFl4KoZSZSbUFZs62J6u5wV1IZMpttyX4caub5mJXSLjqVWHZjXlbFKdFSBt8GPp5drsdNOEkKIny0dYcAea3iYfxZAU4ouH9YLNdIXfbuOslHS4oXRvDzmuVPFsbaN6pdwehzSJlzR0ownzU6ge7t9Iq8983dKWmDZbMiM8OPrEZ2WsYgFfkqHlMrop0%2FCs%2FDFO7qmVeC8u75pRlFqBNF6V1GkswhRMRLfBHzXHC%2FiE7%2FV1YB3CGlhusPXhpcDckVu72O%2FyGZW4hzv6z14xbLLb2jYbREl6TJiu5nzp38F%2B6Xuoiram9AYxFngD3Nrc2AfwNK5hOjAE4b74hRup9hpTD4cRZw7LHOLSAcs8hbsTOGzpHAreJGVHM1YjkRnv4A3LR%2FZFj5LD%2FGuDX2VXDjqmkop6W2%2Fz%2FM8qnfiK%2F82ghTrjH%2B9D%2FCYtivzNMcQgrV%2BwtREkMNOeo8sGOqUBLvVc%2FUPLGQd0bmONnX%2FVbV4f38lhtoJGf6F3Qk%2BGIl%2BjLPXXa9cq2CTOduEbfz4V8cxXwmubJIrQoepARtArMAFQdLB7XLZZNKIaNEhzUxepNs0RQO7xjMvYj7Lwd5Ps9gb%2FW7DUsdeIs1TiCCldAr6Lk%2BlnL3Rw5qF9SgjysglB2QORII6b2VgXhbFWd50WuJkF16bV5fOLPQuKzQAk2c3zRLvG&X-Amz-Signature=f0c07d6e2a201fd44d240ccad17944325e0fe374b0acfe818414eba0a44edc6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZIOBGWC%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T121822Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQC53o5yH19qUlRZMUYZsb8zy1S%2FWUWcpkU6KmePPm%2FlfgIhANVoLJDa1SB%2FOdXaSs8Nd1Q37k4JXKz%2BAmAdbnHlVf9KKv8DCDUQABoMNjM3NDIzMTgzODA1IgzHJDK3ZEo8TdAzKIwq3AMa8gYYZQHI%2FGbLDgK9bMWheLcsRRn%2BdmZPBUR60THQg38j6%2B%2BhnhwzDdWIIK7%2BvYiHbk0oJBaAPuVmaN8MNFsskMfPfEv8%2BfLk95Q4e%2B%2B%2F2%2B5EhpZZQtOObfa%2FUTXlE9RuI8a6nOxb9igiQOBQ8j1RT1KYhiEPgYZxb5jF3OkDfftdAXhZJGzWRX%2F16OQT2ue%2BJWfQSruNso5Xn3pwwSezSDmdM1uxpRwsPM7w9wsobrFcTmPKBo7Sx4cnX5969eP8S8WhYQ71U03%2B%2BAA5kOcfmjf6TfArmxgMNmwqfMbYt2Lfbt7CNSbVCNR0SWLPeDghkunmocCM7z%2F2QobyhBDo03ltrJV3nATr1FiFROqPXZlW%2BwYv%2FIUmnLUZwN9JUUwpD1op9OxlDSH6dXf2gYwAx1RixmK2V94p4jNIi3to2JAflSRZgdgCuaI9tHOY9nTUfV%2BvkGxpfvXMNfORsh%2FVmLt%2B2d%2BhCce245OzaocjEI3YtTSpwQi44q8crpUATdXnNDdK0oLnv32%2BqhLarcICu6wKxCyzcgTsMnTHY8hw0WCoxCoa651GRfbTz4be52FkzIxq7u%2BkinBDBPJUllYfW9Fs%2BjyOpor9vzG9svS1YzY6lYb2ygZsQZTpFjDTnaPLBjqkAVu4FqrqBorAvJZWqvxF2FscHmwVYDYqt5qtK61iLtyHxgbpuE1Ckc0V%2Fd3cOOE01Uo%2Bl8Hbxmb72zOI1gBEnCMcfEkYSXzwbhYRTzY3ZcKWOWa2F3FNmIXLxKXGrjwgqHl8DRmh3lrjJI9HAlscO2rFSbqFMYFX0FSpGn%2FBPkWMs3P%2FLQbl4SeFl%2B0nEhsxXBKMTModWN%2F4cn1vJQwtv%2BvIHj7Q&X-Amz-Signature=848f7bce429e3b82dbc4c77a920de4ca5277e3ec5bf8c8238e5980cf20d7715c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4DOKMEP%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T121850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCg9ES0yWeb%2FAnombqPtZyottNZU2LWQ7PWMJHTcQS68QIhAMwyW7uWs%2FN%2FHr4s7%2Bf2jLYu54fA8TGnMzleYHMkMQSkKv8DCDUQABoMNjM3NDIzMTgzODA1Igz7ZdUyXIircvKR5rYq3AMcPhJom8I4R8fOQIbU0uScq%2Fr5v5jWATW5MwtLQ3Wdb%2F7ERKy6rotVUZIZCjm2rIYHlM9BvdSi%2F%2B0xdMAqbtX%2BX1IWLG1vUtUY%2B%2Fl5KQCXpxj%2BTyPOJmDwywVxz4AdSF%2BisEp6u3nW4anA%2Br3lUw4AUU40UCTKgIw6pjj%2B1Ll4ZdNwZiU8FRzqU7BKQ0%2BHfvcmZ%2Fkbn1Wq9taH5gdSr5PYifcPuVKeNI5n0VQ8%2FrZWQ3wu4%2Fces%2Bhb43xqCZYJt57Mlfvqpxb%2F5LFQceaCXXvPp%2F3SZ%2BbshFSJvFy81SKpRzbKWtKlGMm0EQfEMG9IApZqN5ga7w442ZU7DcA5BqW16tcTX%2FKLCo%2Bk27HfOwgULZVs23bGDdalyvwXeK55HWzPGJ7yM2BzhsokWzSZri1CeFk01zG%2BVZkP1i64bkMuxJjCRLGyce4voKGPjk6LWgZ89cYNwrmg5aM7WYHoxLORNoU6zP%2Fcaph2chMHxYMTrUvM3v%2B7hkNf0DOA5lRoxQ%2BXRzgBJVFfU%2FfYN0iWsxa5g%2FyXWnmlK8ZjSidftixnJUD8MRzcy%2FvAadsLaqt5Qw1ilT2bNgh%2BF%2FYvgE3ZHwdYZillxh%2BtJLCRoa45tgF0SrduDNXvj8QiWq%2BlhTDDnaPLBjqkAWnOmJ7%2FkLz1qZnpv4qaCW%2F8eu2eWF1yDgvqcXqw8N3SSeyU77BWhRKfcGcU3nG1dAyf3TqNq%2BoVhhaDYTGDNPZj6z6MFYUf0VhTj0q3Oh8TTpmstl1LR4FDFiGjxi4NtHFNLKBtvQ65Py4QVpM%2FpSAVLmFJPoeig9sVqXL7GwDDDyicMAsEstNkiZrEnZDBcIwrQCDNeWAZMYQH1FmWTYNtnq%2BR&X-Amz-Signature=f9f2f75045eab9d9920a2112daf5c3d8c09be5ca418dd46a88530bb3e204e483&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4DOKMEP%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T121850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCg9ES0yWeb%2FAnombqPtZyottNZU2LWQ7PWMJHTcQS68QIhAMwyW7uWs%2FN%2FHr4s7%2Bf2jLYu54fA8TGnMzleYHMkMQSkKv8DCDUQABoMNjM3NDIzMTgzODA1Igz7ZdUyXIircvKR5rYq3AMcPhJom8I4R8fOQIbU0uScq%2Fr5v5jWATW5MwtLQ3Wdb%2F7ERKy6rotVUZIZCjm2rIYHlM9BvdSi%2F%2B0xdMAqbtX%2BX1IWLG1vUtUY%2B%2Fl5KQCXpxj%2BTyPOJmDwywVxz4AdSF%2BisEp6u3nW4anA%2Br3lUw4AUU40UCTKgIw6pjj%2B1Ll4ZdNwZiU8FRzqU7BKQ0%2BHfvcmZ%2Fkbn1Wq9taH5gdSr5PYifcPuVKeNI5n0VQ8%2FrZWQ3wu4%2Fces%2Bhb43xqCZYJt57Mlfvqpxb%2F5LFQceaCXXvPp%2F3SZ%2BbshFSJvFy81SKpRzbKWtKlGMm0EQfEMG9IApZqN5ga7w442ZU7DcA5BqW16tcTX%2FKLCo%2Bk27HfOwgULZVs23bGDdalyvwXeK55HWzPGJ7yM2BzhsokWzSZri1CeFk01zG%2BVZkP1i64bkMuxJjCRLGyce4voKGPjk6LWgZ89cYNwrmg5aM7WYHoxLORNoU6zP%2Fcaph2chMHxYMTrUvM3v%2B7hkNf0DOA5lRoxQ%2BXRzgBJVFfU%2FfYN0iWsxa5g%2FyXWnmlK8ZjSidftixnJUD8MRzcy%2FvAadsLaqt5Qw1ilT2bNgh%2BF%2FYvgE3ZHwdYZillxh%2BtJLCRoa45tgF0SrduDNXvj8QiWq%2BlhTDDnaPLBjqkAWnOmJ7%2FkLz1qZnpv4qaCW%2F8eu2eWF1yDgvqcXqw8N3SSeyU77BWhRKfcGcU3nG1dAyf3TqNq%2BoVhhaDYTGDNPZj6z6MFYUf0VhTj0q3Oh8TTpmstl1LR4FDFiGjxi4NtHFNLKBtvQ65Py4QVpM%2FpSAVLmFJPoeig9sVqXL7GwDDDyicMAsEstNkiZrEnZDBcIwrQCDNeWAZMYQH1FmWTYNtnq%2BR&X-Amz-Signature=f9f2f75045eab9d9920a2112daf5c3d8c09be5ca418dd46a88530bb3e204e483&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QA62PED2%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T121850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCweYkPWvJC6CcE3xJaslmx6Humrr6XogcRFMdacxVBQAIhAJRUV3XS%2BrbbqeoQfbcYQHFy5MDpvu18D2OjsOM9HAwdKv8DCDUQABoMNjM3NDIzMTgzODA1IgxHEwzt4IBNYfu2Frgq3APDeAOmfWJsDUVxlQSx9ihroRF5QTDBR6F22e7v0%2FF1dQ2IFFc3n3njpA9Q5TJaD5BKnK4oxEPZHQNUhzTpcRZP7LKXpqWPXiqOKtVHkv1RcjiB8am3CBX1ojnPsRrsXLmofxTpNcT9JdC4laMw0YFuX8UBcx0YUNKZvZ5ijGxi6r5irOZJpaqxJM9b4nzPeouH9tN404tONtjDEpuNTI3W1aFGyDYMKUVPCM6YckYQ3P4LBK3CqSoNM0P7WBX14Rw%2Fhd4SS8O5nL%2BKn7uFDrEGo9jehYgZAcn0%2FAS03LofR0vrfQJo78X%2B44Zd1gIEwvqbuxWl7RXBFD5TtTzrQJyGzSFSlgDCrR7xqgt5n0EhY92QYCRc5pCKsY3Pysad2Sf%2Bsub6eOn%2FxCNQHtPjA0ytJoHXwP%2BaLXcq5dVMAIXbpXuFC%2BR1VgKerUjHBQkTcw6M58Kc7Q%2B1FYndXfUEs3MMKefcNcdEYjNWqvtdhJeYddltZRjhRfiQq1waHmcghTuKOc6C%2BXGJ6Oy%2BAtdLbmkchRVRrweGJx%2B0wcpK6YvGpuLLxdUtbDyz2Kc8zn%2FIMO1mHbdtqBtjXVdaMtyKIFf%2BtxPJVMRjwJqvVu7siu0R1RpiX4OyGp%2BHszE27DDFnqPLBjqkAVx4FxFeU4SyasX28%2BJQO7xomyoHEsaKTWfW8PzeH4PxoZM31OTzZupMlLl5ubWWLER4ENUG3f3x8cZi%2B%2FEgdTp8ekDKtY%2B4EwPMfPJLXUdExnS9QTO%2Fis6W6dej6q8fuOaIWW4vLtPHoRPNkmBlKYJEvfkjPiJZI2H2iR8waOd94gcGhdAWPVfyitkJRQwao%2Fp4UMEFmTH1RUV87Vva1BahcV4%2F&X-Amz-Signature=207b245a725566f238e65c1026fc1a9d58e00500835483117dfaa31a183fae45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

