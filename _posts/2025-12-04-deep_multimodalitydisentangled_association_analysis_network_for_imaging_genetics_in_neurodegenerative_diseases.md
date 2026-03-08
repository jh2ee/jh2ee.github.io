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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HIHZYFQ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T161302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIFZwTIaVFQhSo9Ts73DlFvpA2wj2hLfjgD39UWmj18lMAiEA%2FxFNraS4DJK30zyN4PjXkqVC9pXxOpHtYo8xKbqyGH8q%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDKJVplvderRLh1aiwyrcA1bjz1HF4dnZWE09QPRDOqSk8cirV6CoI3hnhRjpKmlZsHOmT1TiFlnjYpMRGORJibA9NtGjGis7a1LCp8w%2F%2BCVqW8gkzckybbRGcLb%2BRZQLcniE7TQX7P9w52abZw7ghwftnY%2Fu4OnhqJTpggM07DaSWm%2F2mY8fcy46yRsJ7weT6XR6gZpJjjD5MvLFSig6b5fysP7tUtVJkIrA7zCUGU5FUOHtlIkRLnoc3W9zllSHtZnwyUfh7BDkzaltVyqWB%2Bq4wcEiugg7d%2Bh7uRAlW6pvzOui0rY6nvNZEsKO%2BwJ2kPdWEmESsHL%2Bh2terkTKTi48ArYn%2BtifDd9Ykj9x%2BOVlnV6QXRQlK5shuEXa0yWz5xFrgjK21Xzi7n8oEVWKeaVqBye8pOOJLxnx9eL4n3njjuLLmgbN%2BhBp8wU2dZNbkuhr8vRxfMMi1pXpzyhJYBDUw%2FDuL9NrWBIh2Q0jRlCIH%2ByqkrDOxaiBnDpdKWGA%2F5UohzjB9qUM2PDmiGMwUo%2FW2o7J8P0cWMUi08kwmECfca9Kt8L6JGNE4nniUJp7wS1PVbDo3yanS33HmMHisgkMDfWyUJD0TYVCBUAccpxRgTvD1qK2cxq2cvWviSkyarb51QNH7rl1BmVXMMmhtc0GOqUBzUoo6K3z7z2kfVkvT%2FB%2FmlWu0qKO14zIxFEhDq1hpbM29EgpW%2BTAPQju%2Bb%2BnBU7bcFeNnoLWWjxICY28SAYQ34VgONktYjY6oUlP%2FeAUjA%2FLK2Yli6EBgcg5BUgeGejTVSc%2BTCbVCCZlQBWawvVoO8tNBxqdyQ1bQZ2QbePVwRnfbCmsndNcALUITi%2Fuujh0wfWLGtq%2FyMJywPrhrg3cb4Hcymcn&X-Amz-Signature=2bbb73271433eef38385b7190894bd138e50076515f80eb2d541b5316fc3e879&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HIHZYFQ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T161302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIFZwTIaVFQhSo9Ts73DlFvpA2wj2hLfjgD39UWmj18lMAiEA%2FxFNraS4DJK30zyN4PjXkqVC9pXxOpHtYo8xKbqyGH8q%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDKJVplvderRLh1aiwyrcA1bjz1HF4dnZWE09QPRDOqSk8cirV6CoI3hnhRjpKmlZsHOmT1TiFlnjYpMRGORJibA9NtGjGis7a1LCp8w%2F%2BCVqW8gkzckybbRGcLb%2BRZQLcniE7TQX7P9w52abZw7ghwftnY%2Fu4OnhqJTpggM07DaSWm%2F2mY8fcy46yRsJ7weT6XR6gZpJjjD5MvLFSig6b5fysP7tUtVJkIrA7zCUGU5FUOHtlIkRLnoc3W9zllSHtZnwyUfh7BDkzaltVyqWB%2Bq4wcEiugg7d%2Bh7uRAlW6pvzOui0rY6nvNZEsKO%2BwJ2kPdWEmESsHL%2Bh2terkTKTi48ArYn%2BtifDd9Ykj9x%2BOVlnV6QXRQlK5shuEXa0yWz5xFrgjK21Xzi7n8oEVWKeaVqBye8pOOJLxnx9eL4n3njjuLLmgbN%2BhBp8wU2dZNbkuhr8vRxfMMi1pXpzyhJYBDUw%2FDuL9NrWBIh2Q0jRlCIH%2ByqkrDOxaiBnDpdKWGA%2F5UohzjB9qUM2PDmiGMwUo%2FW2o7J8P0cWMUi08kwmECfca9Kt8L6JGNE4nniUJp7wS1PVbDo3yanS33HmMHisgkMDfWyUJD0TYVCBUAccpxRgTvD1qK2cxq2cvWviSkyarb51QNH7rl1BmVXMMmhtc0GOqUBzUoo6K3z7z2kfVkvT%2FB%2FmlWu0qKO14zIxFEhDq1hpbM29EgpW%2BTAPQju%2Bb%2BnBU7bcFeNnoLWWjxICY28SAYQ34VgONktYjY6oUlP%2FeAUjA%2FLK2Yli6EBgcg5BUgeGejTVSc%2BTCbVCCZlQBWawvVoO8tNBxqdyQ1bQZ2QbePVwRnfbCmsndNcALUITi%2Fuujh0wfWLGtq%2FyMJywPrhrg3cb4Hcymcn&X-Amz-Signature=2bbb73271433eef38385b7190894bd138e50076515f80eb2d541b5316fc3e879&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3HVN2U6%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T161302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIB%2F1RHojUqthOQlteCQ0iWMgNBmvVaNozWhBc7c%2BF7sLAiB%2Fem1pe0gzPEOwR2epsp55vuujBnrLjFLZ1HCBUnEEBCr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMNMS2YaqDiqomYZtwKtwDUJIBmXfvZkggFWz0rytYNaC2EKEZObx1D6VbhsYRs%2BRrpdldmNosDtRQGtU7v%2FjUxUz1ftdZRxDQyp6VffNTVRjxEWLVfntFsw7D4p7PgQcp%2BfcgELBT2O0WLm2PZz4UUm8JokKsazHGvvVVC1v237ZRYVQEDhz%2BikINd5tnffH%2FN12AmFd3nKlOD5nwRCAe65lHz3i8bvfp9ej2ZxydJz9oydpfP3VoYf0oe1Ar059ehl9rS9GYJQQiI9ZEvtigcOu6hsbJaCHbJeXlpJ2AsfQWjncifEEKVhQXQsB%2BMT70Akh59VJeTQ85WAbU4n0Kv%2Fpq93eRL%2BURIE%2FcHTz6lSZO1xPCTao%2BDrEgu0ozXgYLP0EQnpSSQar4hkP0eHNKdSYb9SgrAMifk2qvgFK%2FgziMRrJ2m3qjNM%2Fzd0ae2VJ3eBlu21fVceqCXwpUsZKdZFXF1qG4dAzctrsR7nRRIkDTY85oCVS17FZ8c0GECRUOrhHlNfW0wGQLrKN4uwb9ZuSBAKjtVWWYVFqy8Fzl7w6XK3aD3%2FMXJJmL1pndBIBEL%2BmZcHKzBcW0GeuhbuVbLxdHGkIXW47ziP2JJvZ86Enp8p1hz6resIye43bkxyAImytUvik6ukcmW3ww4KK1zQY6pgGGUC5T4cFgI1CoCFs56%2BibHYZfgmG6SUVGRiE1MZHFptDgQ13x7q42xa8reHvT967Pd%2BG7yRFskJtH9AJF8mwlThJlSe966oWCMlhjnroW8Api8Y9lyabZT0QFxWXW76NLX9TJ73%2B2rcg1FL2JrigHfNeGLLVoi%2Bo8lowU0eSx1HA2BOQUyzE%2FhukyqYkf0Zp4ysGCt3CurSa2bkLxjakPrgyf2MSI&X-Amz-Signature=7f5f7315e724eda0276f8439c18b95c0d10feac464270235da9e25fc0981d440&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFNHTCCF%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T161307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQC%2BSk1f0KK3p62xjjSbJfvpW7MC9pb4t40drrE8mJD53wIhAI6ZDTwjkuQAmKXIruIxVeu2FKl7njFQrHow19P5rLiaKv8DCBQQABoMNjM3NDIzMTgzODA1IgxQmpFe3ga94W2XmpMq3AN%2B7Ua3s3Dh0dJDLyj%2FxcomqwxYhPfMrIcWajbel0CIo%2B44SGdtdj69BdRqwA9tqjNmvrqrDdjiG%2FmCoD2h0jywCS6GhaIHYEXWEmKmcxbXZRoAhGoshR%2B94Ck7f6i4vy4fSFqHyN4zHa1fxVAwm%2BqyvY9yHT%2Fg9mHZ9CgRnTCUvBzfk0uCbtqmewnRGcjrIN3Rc54DcQpiVlTKnbPIE8vqMkLuAEjry4kXAbYHtRIRIaQTBhYmAFbE%2Fw2po512O4SRQXYfZkxUPDGzwgQjfsizP0VDjAiDO1P%2B76Pn2i6XmZeptOgaGlIxjb73P81hknv4SrvNjr9A5meahhaNAE7Q6TW5mfNXrtPmEUVWmqg8kUzzlKEEYJvebrYR2zED%2BOJEH%2BAIHFKdyz6hUm0%2FQjF96mF94ATy4K3wZ7HV1wMhDjPm1dakHgvZ9kZ36h3UUZZwUSbgyTSO6hSJLBdQm6sMal11NnNgncuCAR5lbCIRNWl7XDZkTFILbz8ZI%2Fctr8r4oFt8%2BPRXspL%2BzTbg4%2F5VOJYZikLtqf8wWgXIbL8l5Evc5Vo63pY%2FOdhXfkvbZPnsTU38LgUB%2BCOkh8594mxwQ5P4C0reATR4FC2sjKTzV%2B9YrilTB7ORJCFrSjD%2BobXNBjqkAZWcr8MX7PEoogL1G8NScz%2F4g2QKNF6MwaPkUiGXNlwr%2FCpSegIIr9RIBgo39n6V5yiTF%2FBqrTdjX1FbSBmtX5BxDyp1tmd8eHYuz9W545bgC9vOhC5NykZr8epxF%2B2Ed2KplsPBl5dx7MsHa3R6n6Xuq8O8rLdUgfxsufGOjYMMP6OL6sILX4dzWuxzrLAnqo%2BJ80I2AL156Vcsr%2FD6GK4XjCXy&X-Amz-Signature=ee95ae63a4c716a98f6c7212e21d3a692901e5cbceb704f155ca81c7be450f77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFNHTCCF%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T161307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQC%2BSk1f0KK3p62xjjSbJfvpW7MC9pb4t40drrE8mJD53wIhAI6ZDTwjkuQAmKXIruIxVeu2FKl7njFQrHow19P5rLiaKv8DCBQQABoMNjM3NDIzMTgzODA1IgxQmpFe3ga94W2XmpMq3AN%2B7Ua3s3Dh0dJDLyj%2FxcomqwxYhPfMrIcWajbel0CIo%2B44SGdtdj69BdRqwA9tqjNmvrqrDdjiG%2FmCoD2h0jywCS6GhaIHYEXWEmKmcxbXZRoAhGoshR%2B94Ck7f6i4vy4fSFqHyN4zHa1fxVAwm%2BqyvY9yHT%2Fg9mHZ9CgRnTCUvBzfk0uCbtqmewnRGcjrIN3Rc54DcQpiVlTKnbPIE8vqMkLuAEjry4kXAbYHtRIRIaQTBhYmAFbE%2Fw2po512O4SRQXYfZkxUPDGzwgQjfsizP0VDjAiDO1P%2B76Pn2i6XmZeptOgaGlIxjb73P81hknv4SrvNjr9A5meahhaNAE7Q6TW5mfNXrtPmEUVWmqg8kUzzlKEEYJvebrYR2zED%2BOJEH%2BAIHFKdyz6hUm0%2FQjF96mF94ATy4K3wZ7HV1wMhDjPm1dakHgvZ9kZ36h3UUZZwUSbgyTSO6hSJLBdQm6sMal11NnNgncuCAR5lbCIRNWl7XDZkTFILbz8ZI%2Fctr8r4oFt8%2BPRXspL%2BzTbg4%2F5VOJYZikLtqf8wWgXIbL8l5Evc5Vo63pY%2FOdhXfkvbZPnsTU38LgUB%2BCOkh8594mxwQ5P4C0reATR4FC2sjKTzV%2B9YrilTB7ORJCFrSjD%2BobXNBjqkAZWcr8MX7PEoogL1G8NScz%2F4g2QKNF6MwaPkUiGXNlwr%2FCpSegIIr9RIBgo39n6V5yiTF%2FBqrTdjX1FbSBmtX5BxDyp1tmd8eHYuz9W545bgC9vOhC5NykZr8epxF%2B2Ed2KplsPBl5dx7MsHa3R6n6Xuq8O8rLdUgfxsufGOjYMMP6OL6sILX4dzWuxzrLAnqo%2BJ80I2AL156Vcsr%2FD6GK4XjCXy&X-Amz-Signature=2dfa4967f9f2d05287b970f7bdc110f19f5a25b9f778a3204094b2cb111afc87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466677DW5P6%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T161307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQDR4s7Cg4k80v6zhospaJbs3ubzZ9lu0yVc%2B%2B8Q7BQzqwIgV9LWxE61ainUTmlGFDYKVPT%2FWS0h%2Bq0NnIBY27JT8hIq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDHggYGrYpKnMuY1giSrcA445uYIrfz0uMPtKWUJKh2NYhdLrU7pKzkWqMps6QmpVd1sbN8V1b2ICqLv8R8hlvUELzv36p2st6Te8eskT%2B0CL6weo0Ief3TIgEhsA1rHm2IEw7IPQsnYugHrSZX6K0acaDTPHyeYzoXn1ORizMBVbFC2QmyJ4HTUbvY2MejF6nvrNcP44WtrxiImMAWoq6sVnkHQcrcKUeKWIXec6eYYJiAADSbaRpUAafUnABLj6vqYKhlvGq%2BZxga43TaL4uI3uTQuG%2Fv9eOV5SCM%2BApOTSOXWjh7lpP1%2B1f9QOb4QwdJD4Saj1Dnu2uLjEnC9C3efKKBINWeUG47K9XiDNFsqVudSuWdJPMiunFVZrPCXcEK73XslszCnW39osF1uny0Pi6LTL%2FkroZ4qZICmkqeOouHIYIPTb%2FXyYNXFvNbpzVlOLK7yCrLNnIwhuOBomYLD1PcmFN%2FNUWYxZ8SdutvNDJB64QwOyH0ZZpboMQxsitjz7tXZXjPSK1VgqCNt74PcXXRNiwTPXHlv%2BRkazW%2B9Y%2FaRM9zZNBkaiVALT2ZVeGzwHAZx8ZwM%2ByPY6yv%2FmydHCtbuN1pTS5PKxTqmd2BYsIB2jWn1bE28rb1u%2BYYKKsubAuwmsIsMt6F7%2FMOuDts0GOqUBfrhdo9ZQN4jb0Tzj%2FHkpm%2Bn8Bsx445t3vy0jZt9KiPxCK%2FdE5%2By0pRt%2BOB1%2FYedfd%2FMco2gP5kN1Ucbtz6JJOBYWC8ViW1xWiY8wa7SWXCF3XKkFTJ8lIV5EDp0d3hDcs48Zy8YMzlWOoSJZgVUIyPoacuiAd0y0KW1MvbzbXVWtv50%2BHrTH6eceC%2BLL%2BOLC%2BPEO2Y8Pl6m5tYojZLm7h6ek6l0P&X-Amz-Signature=1fd9a3620accf2b5f014adb897b22d6feed4104624f3d4ab8cda66601e7d0383&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4UZRMYQ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T161309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQC96JTvL5gMWi7OPlP%2BTaz9EyoKGyo47bRpgz4dbTdW3gIgMrL8RpJt9LSkNHpJGwqeisAm3CZDK56b%2Fwteq4x5Kn8q%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDPd%2Bpl7rieW7XMsE3SrcAzelgbmQUT6PeO2CU20LgFFtkmGNkFC03HPjLiBKdDjwKuxe9wJfKtZ1oH822Hd6jOuaSTCUjElqzbHgRBqFv%2Fzdwr%2FZtBdgmm%2F2%2B6D8m6Z5hiPPFHrr3yKtZGI5p08%2Fugc92RT7h2tLJHsKuRVkTBkefMOlSDx4B0qxUbIX708zMtZa1GGPGhkGozEiLxkVgjWF2uBtcajtHCuHs2tCLtjZ27wD0oxK6%2FE6Td%2FnGY3m%2FR39RL8VYMhUe6m9A0C6DlwZh%2F87JxPFumN2eeKPOGTWuTC2OESa%2FOfN4OwZBKy%2B5Y7lDiBEOHB2ECKO3EGEcCPU5JipgW8qhbQBwjD1VKatvOQzsXZXTnohE%2B2laXcbu908NATKWDWdfbJqh5uA3irvIenSMQgKs3T14O6Spu4oyofiH70YiP%2FXzhf%2FAWrOMiekaVWwunzxt6YnMXk2GysZjSjpNwTzAye%2FaEiRGWMRYDIYCfy5tt4B75MxMftdaohLaNv0wxVTRxVhUi1tQzF0HNOK12rtULtWaC50hDqMtd28J0qF3YoJ0InjX12a200fFw46dZiVTrvE9uThhS06ZKSv1e0JnhFaGy5AC8%2B9GF37do%2FHxSVClLwO%2Fk%2Be0MpoqTgQzpmIMkFOMLeitc0GOqUBD59sXKH2Es%2Bp%2FH0yKCLY0cwLyF4gBvP81ibS2K34gDxNjxBQIPQBf5SoMFbGDJU24Y2tJbAdus4yQo6KWLD22uGpwqQ7kbK5hCVvUpz4MdxCBpt%2BJPO9EAG6qrknnRjzsAtR1dBNJ69XHYOk7RwDSldp6%2Bv3%2BbbQehbmr8yqle1SPfrMMfTcZkmneffPHdwHnsg2wAkhRVPYbkHG7fOkWyU9heU%2F&X-Amz-Signature=3c9a296d35b1a666f477b10865301a0289e73ebf0d6c202ed8aa6b3f4c4ef69e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHW26UU7%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T161309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDgZ0azM0PD30m0RX5hbCbSwKAa0bSmE71Tm3LH5p9ikwIhAMM8kOcTy14XauHBSVwWYTi1ZTmn%2FhwtxagxnfpHDUXzKv8DCBQQABoMNjM3NDIzMTgzODA1Igy%2BM%2BwFBibz7TsTGR4q3APf%2Fc8mr516V8ZstmlJXrvzfWR3a8feipB3iz6Kv4s951w0sk1Ny5jtJ9T99Sxd90l4io6Vwvr9FndGliBhONnhbizfyu5H21mplYznCCsKVkyLAn9QIDdtK%2BoTEos1jPX1yyu%2Bpyfsf5Gff2H490tisxibHAplw37m5t83kQqqHWRI6bD6gp3dXzNkV60oOfGcjbVH%2FpPMucKbWetQqwAu8FsjvkRBDYBN99WZXTX64Hsog2vs629lMgVv5zbposw3ZCNkVVpLXveJ9iwJsapWTOgYCZCCaQpo%2F8FamYv%2FV7LIVZldc8XK%2F8K9yvncxfgLW7M%2BzsYRJYh5jcX6jW3Nj5kkSgwU754sbAPUSzh1V273sZfxf2TlYcGOqbJo4sP3l%2FQ0F36HdpqyfXH1Mi5K5E7LUF4TUdNkna8wLbK1G0vRCUA4wjI2Oh8n3YOz3Vvey9qmRD1arda%2BDGJqU2nLuliqP2XMOU4n1LQcAOgVjqRW%2BPW%2F%2FLlnQu7CRsLDIDiI5ofN18BxSL%2FqYVepmML0i0ENTPW%2BejgwI9%2F2EiyaR13gWqllmY4io7H9J8Tz2P048%2FTaRWWKAscCrtJWSA2HN%2F279wLfZMBJkNbM6MgHNfoQtXcdZXYXH2%2FkQTD1orXNBjqkAS43R0SBQFfDvYU4q5xdtH7HIjMlaCUkAAjhV75mcZtQFO8NIkWdtZ7He5s%2FbW9NJQO8WNaP0sQmX0L1cQI0FYQ9T0K%2BKWEt9cTCYBZQoC54n2FP319TJTSZjx%2BN5IbS4aKhjf4ltVpmvG2n2paPvJ%2FYDyoW9ITJhyU22i3xaBDTEFwCUr%2FMTZP8f4domnd%2FycPVTsqQ0FT7v1yfUITDDG2cWRNV&X-Amz-Signature=61043223a947ca8d77d6e33e8378701409f73ff485a0a786f7c2f6e6a052244c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNWETOQ6%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T161311Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIDvTSP7XJ8hdkkJqPq7qr%2Fjeag42IILpDmiLAciy8kw3AiBG0MmNJbPp1Ld4OUZ2SKbagw9KmWeySvWhOUxTf7O2nSr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMMhn5XBdnLeQw3v8IKtwD4%2BtFc4WYxPRC1QyqCLXY7jREtetQzWfV4uaSWlXeIhMIrA7Gyne8I7p7SxupS8E9NIhAYWPg0r%2FCUrF4UDMc8PdXUcyIa6oK52xne9bXzIx5uPUEdhyPKb1vvXPxQPtJ5cNUWARL4ECukF%2BXJYF%2FlIhxPlVCIUqwIMinsKREYpKNq%2FZNNDW5QSbWqytqrGA6rx58Yqxx7SaSkZPQArSOAUM4MBIkyrLAVjWGbF%2BbdSHLnmWT5KeSr06jgMcmqC1I3wVtDu9bpIQeNufeIz%2FTES0oYxWYLsSdpG07U%2Fq9aokPJjc%2BMCmFnpWvD4wE8nOGpmIPUnSnivFec46zgnmm63j0oPR4q1Xr23S26tcVsFoAxLl8py%2B%2BVk1Jqea7qlcBXroouZeFUiVFKxiLUHTe9L1EENkGrHqV6D4vyAXQHp3d3oG0bZwTAwoOAkQHZ2JogBIDcIcwBoket6BR9p4zjz3bobSaVnPgIGt1%2F73iNie4geuWDrC8ADi7dOG2lw7qDz95Lo2A7D7KVkak5N7KoY4ApRBAvuY9DWb0VXccVhHSX4OUUIEZyv4H%2FRwmUZ0KyS0%2BO6ltmB5%2FMCIucmZw1RLq%2Bo18AHTWGp13AV52%2BeKL8LJB6YezBY3UT9Iw46K1zQY6pgEunubq9v%2Fv1HKeby2dFp%2FVz%2FNh5SkadwGegeyESEdrdXxq%2FeZyUy0Jq6roT5F9wVbLPxuxG%2BoKkGjotXuTdachknDb3dukZVx9kV9qCZUKHXfdXLQD7yU1HUm49j1rHIFmi9CeUHEn5rH4ePdFJdsA4HqrUIK9oSkvh1nt9Qc5%2B4KzVp5OzR0m9frWo0AZZ9LqHWL4piH9hvrxXJF%2F46sYwKd08hNX&X-Amz-Signature=6411a8581c72bd4825365dfd9933ea4539f579926e35f65a9c5d671826179a7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNWETOQ6%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T161311Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIDvTSP7XJ8hdkkJqPq7qr%2Fjeag42IILpDmiLAciy8kw3AiBG0MmNJbPp1Ld4OUZ2SKbagw9KmWeySvWhOUxTf7O2nSr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMMhn5XBdnLeQw3v8IKtwD4%2BtFc4WYxPRC1QyqCLXY7jREtetQzWfV4uaSWlXeIhMIrA7Gyne8I7p7SxupS8E9NIhAYWPg0r%2FCUrF4UDMc8PdXUcyIa6oK52xne9bXzIx5uPUEdhyPKb1vvXPxQPtJ5cNUWARL4ECukF%2BXJYF%2FlIhxPlVCIUqwIMinsKREYpKNq%2FZNNDW5QSbWqytqrGA6rx58Yqxx7SaSkZPQArSOAUM4MBIkyrLAVjWGbF%2BbdSHLnmWT5KeSr06jgMcmqC1I3wVtDu9bpIQeNufeIz%2FTES0oYxWYLsSdpG07U%2Fq9aokPJjc%2BMCmFnpWvD4wE8nOGpmIPUnSnivFec46zgnmm63j0oPR4q1Xr23S26tcVsFoAxLl8py%2B%2BVk1Jqea7qlcBXroouZeFUiVFKxiLUHTe9L1EENkGrHqV6D4vyAXQHp3d3oG0bZwTAwoOAkQHZ2JogBIDcIcwBoket6BR9p4zjz3bobSaVnPgIGt1%2F73iNie4geuWDrC8ADi7dOG2lw7qDz95Lo2A7D7KVkak5N7KoY4ApRBAvuY9DWb0VXccVhHSX4OUUIEZyv4H%2FRwmUZ0KyS0%2BO6ltmB5%2FMCIucmZw1RLq%2Bo18AHTWGp13AV52%2BeKL8LJB6YezBY3UT9Iw46K1zQY6pgEunubq9v%2Fv1HKeby2dFp%2FVz%2FNh5SkadwGegeyESEdrdXxq%2FeZyUy0Jq6roT5F9wVbLPxuxG%2BoKkGjotXuTdachknDb3dukZVx9kV9qCZUKHXfdXLQD7yU1HUm49j1rHIFmi9CeUHEn5rH4ePdFJdsA4HqrUIK9oSkvh1nt9Qc5%2B4KzVp5OzR0m9frWo0AZZ9LqHWL4piH9hvrxXJF%2F46sYwKd08hNX&X-Amz-Signature=993015011697d6a980247445b322ca01e523ac8725ecc7b8d4abb053d2118911&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664GI56B3Y%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T161300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIHUpOWEoM57eco9Mph3plLfKwqw95Va76cB34YBc9pv%2BAiBmp92tbrAhipR2fCODOtUaJuYSRpnUtTLOoObZLe4O%2BCr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMzARyGbf0vBXXMKCmKtwDGm9bFjQLZj8qfPIuNhM7sEarl4%2BW440N%2FM%2BUlB9F%2FpYRg9cL64JzA5h8mRDATJyKoxfQaEBkfqYJL4daScm64j0t4LfBMbyY7qKmnvd3Hz8yn90QGP0ZGQF2RUekSRHea9AdsU7EUkCGEHvZujzCy%2BBOLS2K688y69Sqh06FgQOF5u5Z5v1sH9rTocPHrQ%2FG81EbqXHGzroVCxuTsCVdMJh4WQrqpzTtfvqkT1g7vnO8DouY3DvIKRV%2FmigI1aIWqFYeyuQ9vR5awH%2Fo497XMhMbxty3%2Bc4aZlC1rEJgejBZIaEOH4h19hhq2DqDAqXTAVK9%2FOOD0Hrd3TSKde2Mc3btyRNVh89NA03bDa5tJogWRQvg%2FTz8VccLRTdszCky06cIl6r3S26p7lwnbS7FDxJ7GIk5hf9zzuykiklubaR8Tc1qeLpUHnxy%2BBNLdhVL1wgepET0GnXiKsWKlo9rq4iQBH5YpRMxJeOcjHXplMbBpt5jNK%2FRRwBQhlAbb2XhY9%2BSWUklEcblDf9lZBsNYZP4YSiMkONoc3QkwuCFarkmjIj6RvAqDcjTnYQog3JuiQNa1u%2BMBXqi3u4TpUj5pcgvvCy3L5TqvHXgSZIMYx8O6XXkdhvbyVhgdwEwjaK1zQY6pgGlhRPRQwFG1z7aM9Ncj3fish5jMNiae9KlJSvoac2%2F1WZ3ritCAAYQjOY7zp%2FUVoz8CmOfbzti3EO77nKHCSR6EoGRHYF72xwt7S2ru5qAy4YxYLBA4RKlo49EX6dMLbktFeZPhQIfvNJlvaDhx0yzIKndnenrZjwA%2BoYsSR1ypwOJw8gG3gIg9SygwTpcNbMoTuERsBIIqinmo3gMdd9I4EVmluh%2B&X-Amz-Signature=d0c753e59ac4e78b8428a55b21da521102cfddbe74d2f93619ccd1881dcb0b8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YCH4GSW%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T161314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCID85U0jcrzOBMZ17cSaYwITiLuY2Jb0BhmaM0iSp%2FUspAiBKDBUZVMylS9ofNtYDYWaMFZNX%2FMLmzmpQMRCuMEb0cir%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMedyMJU3t%2B21wcOhLKtwD%2F5Bu9sn7jQb%2Fty6hCyPJqtUrpeEtLTmbondvQiQnUBTfrKdrESBuGsLAr06AClW5lDFAzpRL2AMFCtrpDh8bUl8fKV7EnR%2BJH5EsmtonewfFF6Nwd1l9foHzotnZxs7qHtUbhRdZPoVqB4N2srpEsepLxCEVNH8kDoBPKneQhQLAdAYeIZW2k3%2FthMOI6ZgApEOyBS7uVUbHNq%2F%2FIYWVMPvYe6aFN%2BEAWoF%2Fo1wgIcbeEZhB9TwdaJj%2BfuSggTuryGkD%2F5SfkhV2mt5aroWgdofDU1S2NbuOw2rSXMzqXjeWwXUUEq0itsJPtbCMB7i5HGGJFFXDlGir42Owiq21QbTly1kmCJqfrkVjrRIRmh2%2FK2Shb5ztmOz84YipDT4JmBOP%2FWl82gL0ANRXD%2BACxE%2BvQ%2BOQK5SjDej0ipxosSqObxr%2FcLbpAq0VlVg8dLtA4jVV5LD7feFu6J5DzWbS400FAofIM6i7p8GggThQgKsiYIWK9K9En08nmodj4kguQvik8Sz9N6fIyw77TpJqnxvsS3vxuFbeqEXpt73oS5Md%2BK1985XTXC%2F5NzK4HUdckcTPhzEHqSRILAIni6udYfwQ8ZsE2pg8BTMKDNQS6bdOllKRvxOH57BK0MQwpqK1zQY6pgGnp3TVeDfepis3c31dnCnXaBSzHhuxxr9PqoGiB8Xi5xfFeElb8GJMTE8Vos7DLyNwaq0%2FK5OG2g9NNNUjTG0pemzYW9qCoq32wGBkWZ%2Fs%2FS8Vi9cPxqgdHBzClRbGiMB4gnJ0IIWzSn04G95zc8XLEO4wq0CptOPRjUJ9EK%2FLMlkAULXeY46qVebkZqA1Z83ZqTkBznhgG4m%2BhUM07GCkqzj0HTom&X-Amz-Signature=94a0463d074f70c0461f499f19ffd8894a7c8219fe974d519ae2c0b66f755063&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YCH4GSW%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T161314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCID85U0jcrzOBMZ17cSaYwITiLuY2Jb0BhmaM0iSp%2FUspAiBKDBUZVMylS9ofNtYDYWaMFZNX%2FMLmzmpQMRCuMEb0cir%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMedyMJU3t%2B21wcOhLKtwD%2F5Bu9sn7jQb%2Fty6hCyPJqtUrpeEtLTmbondvQiQnUBTfrKdrESBuGsLAr06AClW5lDFAzpRL2AMFCtrpDh8bUl8fKV7EnR%2BJH5EsmtonewfFF6Nwd1l9foHzotnZxs7qHtUbhRdZPoVqB4N2srpEsepLxCEVNH8kDoBPKneQhQLAdAYeIZW2k3%2FthMOI6ZgApEOyBS7uVUbHNq%2F%2FIYWVMPvYe6aFN%2BEAWoF%2Fo1wgIcbeEZhB9TwdaJj%2BfuSggTuryGkD%2F5SfkhV2mt5aroWgdofDU1S2NbuOw2rSXMzqXjeWwXUUEq0itsJPtbCMB7i5HGGJFFXDlGir42Owiq21QbTly1kmCJqfrkVjrRIRmh2%2FK2Shb5ztmOz84YipDT4JmBOP%2FWl82gL0ANRXD%2BACxE%2BvQ%2BOQK5SjDej0ipxosSqObxr%2FcLbpAq0VlVg8dLtA4jVV5LD7feFu6J5DzWbS400FAofIM6i7p8GggThQgKsiYIWK9K9En08nmodj4kguQvik8Sz9N6fIyw77TpJqnxvsS3vxuFbeqEXpt73oS5Md%2BK1985XTXC%2F5NzK4HUdckcTPhzEHqSRILAIni6udYfwQ8ZsE2pg8BTMKDNQS6bdOllKRvxOH57BK0MQwpqK1zQY6pgGnp3TVeDfepis3c31dnCnXaBSzHhuxxr9PqoGiB8Xi5xfFeElb8GJMTE8Vos7DLyNwaq0%2FK5OG2g9NNNUjTG0pemzYW9qCoq32wGBkWZ%2Fs%2FS8Vi9cPxqgdHBzClRbGiMB4gnJ0IIWzSn04G95zc8XLEO4wq0CptOPRjUJ9EK%2FLMlkAULXeY46qVebkZqA1Z83ZqTkBznhgG4m%2BhUM07GCkqzj0HTom&X-Amz-Signature=94a0463d074f70c0461f499f19ffd8894a7c8219fe974d519ae2c0b66f755063&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPYSE76A%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T161314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQC%2BVZ94uYHA4ozm4DI5V7Ve6M4qKUqQUb2xbmQCfZZUWgIgFrruXTnRp7LUmvquGpuO9y7DzmpvQbWaqxg330FIDPQq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDATGx5egKXgkXO8A2CrcA9nF5Z7rObvT0PNSwPEPcALDQtMVkLSIz%2FJrukXYvCd%2F3foyZvScz%2Bq78hVxdrL3mI0oQA1Dv2%2B%2F78lf1xHzUl0rjBRkNrmZ66Fy1FEas4RKftcGAzdDJKuywRvQ8l4elpbUzmRQPJjN7aDB%2BSKSD3vAqE7eJNktPU%2Fn0s6IS0Uo7SaKVm8sP2sI5wecukPVJXAmOpUBKbnIFfKitJSn5I3sIWg%2F5BaDkzZMbYi38CLluWcspXu4c2yBgmnrbf09g9V7%2BgYgJlHopQEm9qnpkrLc2zCo8ENMjnGROO5MaRW%2FhZXKhJ%2BvrS4Q9n72zdaexcPjsBGXlQEoVNwHQurwopZG9uLiwkBMBr8m5SMkoaiiXrq9O868wb%2FvFK1yOSKMsy7g%2BhEGiFCup5bNRsO9wN4AY8YhgdCs7q5YpNU5Bx8w6M3Q29Fqui5sM6EOLKCXpFQftG%2BByr9NYn7rcdkwxVo7bQNdxRLUeLIRU314xNRbJOTbRkaN7o3PaGLSenGj77SJDwdTPitQl%2FaSJGx24Np10N64drWe1IzIwde68FJJFdDUiSQWf9vnhU%2Fwf5Zif0qxuLFpHbW9KcSEy6GnliwL5dROKY9UrNdw6mpidLRmnr5JFlJsxfxRBMAdMPOitc0GOqUBGyMLitot3MhaPJIhxit0V%2Bj1CYxb2Bsf7rcbhZfjIa2eH3wVvZ5OQFfQBG%2BBP0NRHRFtzYNUNqpSJM1I4XjwhbadXbxjpOiqX5rmInyyslxXufsVhSTiIce%2F9eaniLzJGIOfoEed5bjzd4QxchLreWQ6eSZOBjMzn8xeuO2fYxvg1JPT%2FncS4x1eNQtu1CGE9sHO3rtKlBBjlBn%2Fy2Hqv6htu1G1&X-Amz-Signature=6ca4b19127d30673a64d84cfe8d229e031eb5faf9b6f4098960700ead7f0b23d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

