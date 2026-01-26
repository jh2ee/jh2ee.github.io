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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZUAXOAK%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T151626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDo9B2%2BMd9uMTTB5JeZGB7IpRTgp64MLz35Nqomp9oAwgIgJRNtmSKyOGPQSCcIPfCfSwZfXdM%2BJbIjy3lkt3gLozIq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDCxotBldaw3KPdaJ9SrcA606%2FhnDS6M0STEbiMJECLjNaYRn4D7IbBrzmmk9GgOMyfM7ea1Tkj417PX8x5jARYgqESm7%2FpzLKOhbkluAKKyhx%2Bv7Ckd3NpPUh55Tzlvv7B72HMekB4TFC9NJv91EqYzseZurhgjjPJU7KtEE4niEHXknU4%2BnL%2Bz600Ai77p6TxsltjQEtWENy6HP%2FOGoaYe0G0APKyrMo%2BMCbW5zTGb%2Fs1PxTGqp3BhLa2vN8VFORLz2korIWFpkTKMZn%2B%2BUZDPc8kuY8WoNw8We1h6L0wifpKZgGZiorKEwkFHmpdATVM%2Bf7kjZZYRd%2FrP58RdGXd2tw5T7ZV8DGEq2CiMjNAtR3VTqc2d%2BmgO%2FFuECUi6A3ObzGV7cjr2O7yODnv0txHmwtAanMvN9ozDKD6asoKb8FBMLDY%2BKdNTfFFb1l8vvsyD9RbQs3J6zba0RLmuhOOx4joCoX1Xu1xrWaYt4BjbxLrm4vGWesuu7aY9W%2Bkou7Csw3Jd1kflKPZduvp17nYEon2hXxRSzADxxsx9way0owP77qkAJbC528dyJr%2BppTI8yROkkQN8MG5poa3MLV1bFZ8nGCkeg5uqPk0qOaZQad%2F5Hp6GA14mo%2BDpJDxHD%2FuVpibJ3%2BH7VULxnMKTf3csGOqUBQL6txWEcOufbyBHUg%2F3s3iGU6SiR9SFXKPp%2FClCMsEYKspLfmH1nlWIwP8D9JoUacofRW%2BYFN7nI4hm45t5mEXNSLzd7GqzWyGZIn%2FAfu1uJLOnU2Fe00S2w07a1Bh8eyetbDGj%2BwyVX8Q8Wlndw4yxf%2FbdNYKOHOrHYwCV3UGVkybEPXxfkuHFXy%2FB6cZHcqsQGIwHiExSj1416Ko91Izt0Seh%2F&X-Amz-Signature=50a3c101f5c0da4a23e17589c828320ee9037d7ca9ab8068409f459344feb2b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZUAXOAK%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T151626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDo9B2%2BMd9uMTTB5JeZGB7IpRTgp64MLz35Nqomp9oAwgIgJRNtmSKyOGPQSCcIPfCfSwZfXdM%2BJbIjy3lkt3gLozIq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDCxotBldaw3KPdaJ9SrcA606%2FhnDS6M0STEbiMJECLjNaYRn4D7IbBrzmmk9GgOMyfM7ea1Tkj417PX8x5jARYgqESm7%2FpzLKOhbkluAKKyhx%2Bv7Ckd3NpPUh55Tzlvv7B72HMekB4TFC9NJv91EqYzseZurhgjjPJU7KtEE4niEHXknU4%2BnL%2Bz600Ai77p6TxsltjQEtWENy6HP%2FOGoaYe0G0APKyrMo%2BMCbW5zTGb%2Fs1PxTGqp3BhLa2vN8VFORLz2korIWFpkTKMZn%2B%2BUZDPc8kuY8WoNw8We1h6L0wifpKZgGZiorKEwkFHmpdATVM%2Bf7kjZZYRd%2FrP58RdGXd2tw5T7ZV8DGEq2CiMjNAtR3VTqc2d%2BmgO%2FFuECUi6A3ObzGV7cjr2O7yODnv0txHmwtAanMvN9ozDKD6asoKb8FBMLDY%2BKdNTfFFb1l8vvsyD9RbQs3J6zba0RLmuhOOx4joCoX1Xu1xrWaYt4BjbxLrm4vGWesuu7aY9W%2Bkou7Csw3Jd1kflKPZduvp17nYEon2hXxRSzADxxsx9way0owP77qkAJbC528dyJr%2BppTI8yROkkQN8MG5poa3MLV1bFZ8nGCkeg5uqPk0qOaZQad%2F5Hp6GA14mo%2BDpJDxHD%2FuVpibJ3%2BH7VULxnMKTf3csGOqUBQL6txWEcOufbyBHUg%2F3s3iGU6SiR9SFXKPp%2FClCMsEYKspLfmH1nlWIwP8D9JoUacofRW%2BYFN7nI4hm45t5mEXNSLzd7GqzWyGZIn%2FAfu1uJLOnU2Fe00S2w07a1Bh8eyetbDGj%2BwyVX8Q8Wlndw4yxf%2FbdNYKOHOrHYwCV3UGVkybEPXxfkuHFXy%2FB6cZHcqsQGIwHiExSj1416Ko91Izt0Seh%2F&X-Amz-Signature=50a3c101f5c0da4a23e17589c828320ee9037d7ca9ab8068409f459344feb2b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YBKXQ77%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T151626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIC7Yy4LVWiBy6iSsKx5IIHnDYSMhkIUvLMJi0quSuUnGAiEA6GKPdXUAzMrdIUqTRwPguOHEPViQIJV7Yhu6oEKi0Xwq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDPHIcrxmqmTo%2BERZsSrcAwExu4ZBh4bQtBs7q23zyxmc6veEQC2K7pnrGh8TwZR8w4SLZNIM6mwMsTt%2F3mJLBteZnxwAK92KHwnuxsU9X0QjXefNaxsT0%2FzZcC2KZXbZzi1kqbn6mhaygu0vsNszs8QCo2IYu0a8nqPHOJFEzfecBLjfsLLoAynIM2Axtr55zxmln2OJRyV%2FGNKKGxZ3IljQDgxK88PP807UUKTtw65G8K6QWvxrpZlLMO8NpEjBSavWOlAEvy5KgDCDAV1UdBK8n8%2BOVJ68uAbJhq5wUqDk5S4JAEJcqVnXEvQP53aDurUo%2F4QErW8OxsyBtQ1m90Df7FFtmvNC4kUSzO1PBbyHIpT89GZ1u3xmKY5nhJvsXFbW65hBY5qyZibnlJupRx%2FbIqZrvSFO2B%2FJHLJ1NM0%2FUE1wQYkWNBxKxbGa8SAGjKyHMysMXgKrm0p2O5MeuWcsQKoWdR2a7VkHcqq07g%2FY97M5A9spiJHX7EWSMv5rs5MsETjdWgAYkBvt3KBQh%2FrsuPWfn3H0Sj4I%2BAa2mTMZjgWQjpqfX579kXVUPArPFgfy9eSYN2ny8zJz3mAeIZuYGvZQLmGKmwtbjFDw6%2BeBwJtgTpCNhz3BmjOJK2Sfdmf0Nec8ldSLvYUpML%2Ff3csGOqUBr10lmXnLdcPiU%2F%2FK8x3Zlz1tVJhdawRHlysvzsqtn%2F%2FK%2B%2FMNiSjrMbyZCGDyxGdi0XtjrJwWzshcje%2FFLKKW2a9tOPUCO0FS24YeOEPXzCjDqLn6ijwy4VGXQ35566LNU16u3ysaT9T8kmj5BBj%2FDOjPIe15%2BPDOh%2FP0qzsqBkS5bXn2xQRzXtSDDdQi3uYejeW12H4hNcDrV7fkkzVUerkl5pi9&X-Amz-Signature=975c686e1f8c61cd895af14f69b457befcc730f3989c768fe5c2ae16794ec290&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GPKMSZ2%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T151630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCICcsgA0fGO%2BaktReozQYdSCnXYnKgqCBV0rWUTUl7u02AiAWF4V2d%2BKD4NWgGg4BJIlroJZgYHX916mec3X2hzoCKCr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIM3grr6TKyd7W9YmIDKtwDV4iWohJNFLBto%2F1G1IXwfYz2cswEH%2BvvAP4sEtr2B4iD0GlBJlC8nsKmbxqcU4QhkcTagqKHaHUv8l4%2Fci%2FqYr7IyO64w0uIyvzypnsEgpSka3QINClnUDJp5KEjwBwAxRrvoWHjGC7T2RECovpEaNAs%2BUvHhNxjlC3Ve%2FI390Rf9Y5T2QhJ9%2FsMmWUywxytDVNxEKzbBHxkow0LQXv3yfqCu9tcYAb%2BMGGmEfhLNX9qLho%2B6n9kT%2BGRtiD40mMQUpVG%2B%2F%2B6Pw%2BhIc3ToogqjGchqzY3AwmsffAcJa%2BXXMc35jWBvl04E41zfAzitjtQohpUGf2AAYGEFwWgFGRy%2BIQ39lU0O32zjlSECrEeqQSfc4Fm1LugGkB8oeTchV1puzHL95m%2BvEUFNF5SqS0PtUv9OE5uLoVm%2Ft%2BcCkIaGOVwK6pweZ15X8SJFV0ptca8bo9TzX08MceEC%2BDk%2Bm3fvqCxSX2pGlShBm7JWVgqbUxiv3koa1nKv4ju2nKH475ntIVFp%2BhAj5W%2FJWoM755b%2BWRYmjzCyflMc0UrMjT4qHouDZ%2FQZPdbXch%2FVbIf9z4f0LMIZJZr5nPDqjf3%2Fg6I9IWqbzmXQHdMN13Fgc3LOxbPFwOTDHSwzaAJxJEw3d7dywY6pgF0nN7riFWShJSEVQolaRRyNwFHpdGB5DY%2FUGaqXfRInAHbrO54pSIXafUuuuGdS%2B8gg0sAv%2FYZSub6OEw3SJjzUFmiS3ZFe6mSxoFsu%2BKgbXmZn6TlFCOKr6zrT%2BRp5ccQMl64vO1nPAMrEJAkSlwZnPlsKcZ6if%2FCNaiKMXjvLhZ2ns%2F1AwEMjW5vEJMnncSB%2FrVb1THI2hWR0PrHtycQshzmvboo&X-Amz-Signature=62fbc94589ca8b95de6deb5453b4f53bfd3c05b8b772828605f4d93280121e86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GPKMSZ2%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T151630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCICcsgA0fGO%2BaktReozQYdSCnXYnKgqCBV0rWUTUl7u02AiAWF4V2d%2BKD4NWgGg4BJIlroJZgYHX916mec3X2hzoCKCr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIM3grr6TKyd7W9YmIDKtwDV4iWohJNFLBto%2F1G1IXwfYz2cswEH%2BvvAP4sEtr2B4iD0GlBJlC8nsKmbxqcU4QhkcTagqKHaHUv8l4%2Fci%2FqYr7IyO64w0uIyvzypnsEgpSka3QINClnUDJp5KEjwBwAxRrvoWHjGC7T2RECovpEaNAs%2BUvHhNxjlC3Ve%2FI390Rf9Y5T2QhJ9%2FsMmWUywxytDVNxEKzbBHxkow0LQXv3yfqCu9tcYAb%2BMGGmEfhLNX9qLho%2B6n9kT%2BGRtiD40mMQUpVG%2B%2F%2B6Pw%2BhIc3ToogqjGchqzY3AwmsffAcJa%2BXXMc35jWBvl04E41zfAzitjtQohpUGf2AAYGEFwWgFGRy%2BIQ39lU0O32zjlSECrEeqQSfc4Fm1LugGkB8oeTchV1puzHL95m%2BvEUFNF5SqS0PtUv9OE5uLoVm%2Ft%2BcCkIaGOVwK6pweZ15X8SJFV0ptca8bo9TzX08MceEC%2BDk%2Bm3fvqCxSX2pGlShBm7JWVgqbUxiv3koa1nKv4ju2nKH475ntIVFp%2BhAj5W%2FJWoM755b%2BWRYmjzCyflMc0UrMjT4qHouDZ%2FQZPdbXch%2FVbIf9z4f0LMIZJZr5nPDqjf3%2Fg6I9IWqbzmXQHdMN13Fgc3LOxbPFwOTDHSwzaAJxJEw3d7dywY6pgF0nN7riFWShJSEVQolaRRyNwFHpdGB5DY%2FUGaqXfRInAHbrO54pSIXafUuuuGdS%2B8gg0sAv%2FYZSub6OEw3SJjzUFmiS3ZFe6mSxoFsu%2BKgbXmZn6TlFCOKr6zrT%2BRp5ccQMl64vO1nPAMrEJAkSlwZnPlsKcZ6if%2FCNaiKMXjvLhZ2ns%2F1AwEMjW5vEJMnncSB%2FrVb1THI2hWR0PrHtycQshzmvboo&X-Amz-Signature=27c00050b1fdca0e7334d230be666335d6a618675296f18ca0801cbd9b390719&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626LPLG6T%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T151630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDV6tO9hAaIHDqwBQauOAPWSD1hS3P3%2Fv4SSaHPg9xp6AIgVFE%2FPiHQx9ij0be9FuPOxfEqrucz4t3ePaPvJbAgMV0q%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDKSCB%2FNqGfsRN16d6SrcA0oXW77oBEbXvMuCbsZ5kTXR3wpuCVI2CGHTzQ9okZCKW6MgqGdK11A9F2nXdYsHx8vkECTL%2FR%2BycjQmAOLtXAQ1KpeF%2Fdg1n5Wu0Dxf2BcTtzue9TnHXuuU5oYnVUfkdcgD%2FrRvwkZS6ucbhXgWYszdC3hZWWZqypJ2uqILiudyQW8k%2FVi2pkmgsisEkwAO7Xbm5dfcIyRwzNQH8rGlY%2BU5WKbg1O9WptTBsyPSG9JegVNcfg5Al7jvCTrE%2FNqae10B3ydY5G3JzoJ7trgsSlyfJiztZe0qzyvy0GQdlIZrvDtp7V%2BYXq5ke4Wndw27n5M4gPbFD2IvqBnBGwVUQcTV%2BUUNyYn8xl%2BWYbxlAmHwJDx2L9LenLtQHOWEcW%2BB1Fv9XftberYbcG50NDQV5v5wiBWnpRT10ym9dYcuuEPtB7zK8uJY5jmKF%2F8sYQwTvSPuuVE0zpM75KFAyfE0QtJYpqBfasABk6zWKMebKZNsiC3Okjm3FhPGzIDZtlZy5UmOHw5UxuCXXVQaAUmjHbKMJwZCHpbFticwegRpNIKru9V66ByRlTJnfXlD3AADq9TuAVNjFBZNP%2F5dZL8MT%2FWTBzehHJ1CV%2Fe06xdAyX1WiIySQ0%2Fbm8v4o%2FPJMN3e3csGOqUBnys9Ye%2B6ydwYQO%2FA%2FX%2BtwFZw0CGzozLvSYuu3lb96bcCccHS2Csj9XQpu1vHi0b6MN3pUKkcx4au25DQLU5cloZXd%2FzqNU8pxHrW43WA%2FfZx16btENggAtHhUa2euaIGQPdVIzb0MSYDaXCRDtg888lvcim8GAQMmn%2BewzUhP3EVC%2BZArL7U0boJDqdmtFsxshFZ1r1ngXZYV9n9BRFTi6LguxJ3&X-Amz-Signature=651bf934d95b859d600b96777e3989f5aebc58a53445bf2249ed0c90246b4ccd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWNJKBBQ%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T151631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQC9%2BgQJBDGraooYdDdvxFsIY37RliuVp2A1LDJWEcLrawIgesPCeZebuBvbFa1dXfb1bfr3hvL1tpWMPiYPMxzjkwYq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDHmK1mpdiCQf229t%2BircA%2FM8LoqgMMQnk8v%2BvBonistJFhB7VL7yniB6XuDhPnMGbRVc9MzKQIgx2XrJe%2BxC5Wrb%2BvIMRkdrs4v%2BcM47DuUUYikaqcnHQumj6kSnC3RBgXUZ9NaQuPaun7albpUsSZC8tleWC%2FCwnDhgte9CiNAGkWKregv992u9Juk6nqVtyiBfdIY%2BGEl%2FmhgdqnvKzjTKGgy%2BwwxPhw4rv3uLV6%2BmxyZCq7n%2BXnzhsqRDUCCJTczk%2BBl%2Bm10o5AoahtMPH5OmDLp9B7CyqmOTTmorgggJNoTdA%2BCAYG62la9Ta1VeTHKNRzCDzz%2FA4orTCW%2BiZrvvjIYZ1BZzDbSsenZnCIHNMSJsUY9nnXA0HnvwimBpPXuER6L4vWfTzV%2F%2FNRUOLUKSQ8kdzaAPWLuV8DDSol0Dn7FqQLh8I%2B8oCuEtBVO2WstcFMzgK34zy6rjwB8eFKMKetJ%2FZsJLzATTHk4j50CXWLBdle8Nf9xGA%2B1wUETd9Dm%2FIOpgdLAG4ThmmWt%2FZVIVk0i88xiPVA2hn0m6bEZNms9nYVNaGYbrY0VT0b%2FsyAyIvqibumv7%2FQFQewEVHmVZMk0tv1oUbxz98MfywNJ%2FvNMtxEMMlCfJo3MDXBD3fpb8cZU1Z51XCSugMKzg3csGOqUBpGZui6AegkKCpcpSbva1Qx4gGgOPwgovvK7Nn5uYrj5EkfDaGdFWHpXLGHgDK3IOndF1mK59bE9dBbT3g27vQBeg2y38vFzDr4pQKqrwIVzokO8B4Rp%2FJ4y69uQ0OO2OfSW7g8FpCadPC1vHw0Xxd3t2ZPFmzB69nOiGkKp8LlYiW%2B%2BZKNu4nMUzAuNpp%2BkuVyBFAteuIVQKw5FXKzlgK4X6myqO&X-Amz-Signature=36f92df432abdaa5c9dcce775a7755a7fcf27a02971ae6f291cd8a87624cb3af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XADUT5AP%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T151632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJFMEMCIH7XkFuX12kY%2FtCCnQZ7Tte6qXbbRXNlanK7onRdWDGmAh9wQyOvB5RimeDIq4kp3rCGkpLnlVu%2ForPDmpZdFJO4Kv8DCD8QABoMNjM3NDIzMTgzODA1IgzNipERK1DWUs3nsg8q3AOTbS%2BkrtsLJNOk4gDp9%2FbS68CV787d0OvmHMDVsulwfefD0wW%2BhQ8yfyDCwhVipI3ARNy7O2sLHu3U4eXN18kziZdWH9ekdfglGxjBuKhrQivDATxv%2FjhdpdxpO13vqucMUnjOSmk6UlBz8%2FA1oaAOynm6PD8Y9q8D6yoS5D7uRf5qkihSwvWxBowaf0InZESxIbzelUQT1ejqKByz02hjrSCI%2BUbfGmlvCXlCvhFNEtrMUlCkWtKdIZuMzDxuAJ%2B7EdNLjWBSwFIj6dGDdAZfHkoFL%2FoYCr7Huj8gOBxyQm18e2jhYLe3JEPKvqXq6y5gyVKbah24KUwRxsv9q2aWiczetPwsW7g%2FEd%2FVGSgDamAW8WxsvvXACpFs7Y2gUv5J0KYRWmLQxwOZVwzD15EKV8zTclfHUK%2Bon5NI5VRQkYXvne4j9yffmmf47Q8mrcJ55tsZoTS%2FBab1LVKCFwta3fgUSrgUpILwoVDXliDzCPu9gIkJkVzTI7hHR6gtoiJIm7oNR1wLamvx%2B3K%2BuHe7v%2FB%2FUgSLnStS%2BBSKtFpbkqLqW6cSBCZgLNcIMJ%2FVixUHwkwiUgYr8uzktOmnPebwVhyKR2iKOy73LQSBkhFM6CBzxPfv58Z0sZfUuzCx393LBjqnAWVbqmM22Yg1wTfsmtGATGFY9E6p8wHplZP6o1odTjEacNsICm%2FgM%2FKCbLvKBCBG7NR5HFF50AxVTpkdfi47TTurp8K3VhPnzWk52sTnNYf%2B%2FavuVYyo0Xid6JAGdwU5dKlLthRiASGImIabxd3ktgXixIhXQUEqF4%2BoU45i1rZu0D6GByQw9MmhA1lMVhJnTpHae5ghmaS4ra%2B%2F%2BGvNhI6%2FNkccYd9P&X-Amz-Signature=815593dc1bdd18f3183badef5e14a29a4bc66073f4b0ab16804c90f5da5251f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEKSKWS3%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T151633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQCfI0lSW%2BkbqDP1KZ0ZBoB9vsAHcsTnuqJpWhOJc24hnQIhAM8zkDSo9Vxr2WN4rzcB31myKzb2Udad8Nut4nNjgymeKv8DCD8QABoMNjM3NDIzMTgzODA1IgzTLJARwS%2F6nnM8pfYq3ANDaCzr6ZH2hyyV6%2FeLsRQ61%2FNWLOUlVMglVxQ3txgm%2Bklg5ijl0sRIXaiOyYge8qc8yl%2Brv6LRPPcozHEWIkUVG2lNFddZtugaA4NZm3R0m%2BwcxmyH%2Bx2mP6RUYl5zWuqo6eikrnfHB9ZKjoBfTd8hzVm2Juag%2FdmZbj2ujzIFYENSstzA5NWUVOuNKQl2Cp7coMiA5EoIQT91nwgrxkMdMylsnPXWiR5ubcHjVvqzk9ibJe4CztI08SalGVu17oo%2BjY4Pr%2F6AO%2BE2Zp5Xaww8AXPST6kQjLwUod7fDn4J1SrWeAK2heF6Y%2BdmWY5ubQF%2F3NoLYT2xUtsnkQmsj5sG5B4hIsx%2Fvwebn0SnrQnrFo%2F3PACpa%2FcPz1U%2BhNsCZp1S5yogmvsHpHjewVf9h5XZ8AqTlmQ%2FzqH7uLMAiS4dV5AstK1ZPFhS7%2Ftw%2Bg6eqLE5mprQiGsBXIX%2FU%2BF%2Bd9e29qfwYSSKa0GYwcDHayBpyuiMlXJ8bzHWZ06lmY7pEwXjxZe7Xcv8Y8BXwHxu%2BE82woFKZUFCuTg5b7zlB5HLAHIPtbQFony0lgwqbvGCClmAmelEz2q2h%2BZzB6XiYo5Pn9GlTZhqtFQ%2B7zUCa8iPYPqNUuvNfsTBPzF%2FbzD63t3LBjqkASnyKtqjeL4xGPMc%2B7UYDm9w80PyARD4q1sOcQHlMExteECsvMhBtZrEnx%2BkolQ121PYjw3R4mdzyYEBN7sQROsv4PVNB4DIhgSci48pxDhlH1bWz0ZHmPIp1i3qNitVu04uyy%2B9pCrZ3zEqxykXpLNQpybx37v1ppLMfWtzpLmNjGuzvlrGJ77%2BpnQiYUBZP%2FqewwxzHb093jvMN3%2BHGFRoyqgg&X-Amz-Signature=29c139a4d2c838859f92c98ad18f026783d4c218c7766fc905ee4388e1d19df4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEKSKWS3%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T151633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQCfI0lSW%2BkbqDP1KZ0ZBoB9vsAHcsTnuqJpWhOJc24hnQIhAM8zkDSo9Vxr2WN4rzcB31myKzb2Udad8Nut4nNjgymeKv8DCD8QABoMNjM3NDIzMTgzODA1IgzTLJARwS%2F6nnM8pfYq3ANDaCzr6ZH2hyyV6%2FeLsRQ61%2FNWLOUlVMglVxQ3txgm%2Bklg5ijl0sRIXaiOyYge8qc8yl%2Brv6LRPPcozHEWIkUVG2lNFddZtugaA4NZm3R0m%2BwcxmyH%2Bx2mP6RUYl5zWuqo6eikrnfHB9ZKjoBfTd8hzVm2Juag%2FdmZbj2ujzIFYENSstzA5NWUVOuNKQl2Cp7coMiA5EoIQT91nwgrxkMdMylsnPXWiR5ubcHjVvqzk9ibJe4CztI08SalGVu17oo%2BjY4Pr%2F6AO%2BE2Zp5Xaww8AXPST6kQjLwUod7fDn4J1SrWeAK2heF6Y%2BdmWY5ubQF%2F3NoLYT2xUtsnkQmsj5sG5B4hIsx%2Fvwebn0SnrQnrFo%2F3PACpa%2FcPz1U%2BhNsCZp1S5yogmvsHpHjewVf9h5XZ8AqTlmQ%2FzqH7uLMAiS4dV5AstK1ZPFhS7%2Ftw%2Bg6eqLE5mprQiGsBXIX%2FU%2BF%2Bd9e29qfwYSSKa0GYwcDHayBpyuiMlXJ8bzHWZ06lmY7pEwXjxZe7Xcv8Y8BXwHxu%2BE82woFKZUFCuTg5b7zlB5HLAHIPtbQFony0lgwqbvGCClmAmelEz2q2h%2BZzB6XiYo5Pn9GlTZhqtFQ%2B7zUCa8iPYPqNUuvNfsTBPzF%2FbzD63t3LBjqkASnyKtqjeL4xGPMc%2B7UYDm9w80PyARD4q1sOcQHlMExteECsvMhBtZrEnx%2BkolQ121PYjw3R4mdzyYEBN7sQROsv4PVNB4DIhgSci48pxDhlH1bWz0ZHmPIp1i3qNitVu04uyy%2B9pCrZ3zEqxykXpLNQpybx37v1ppLMfWtzpLmNjGuzvlrGJ77%2BpnQiYUBZP%2FqewwxzHb093jvMN3%2BHGFRoyqgg&X-Amz-Signature=c7be004a987af38abc1df4db7d630595ee97464a75584f0097fe3f51d142f099&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTHS634R%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T151624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQDcs5ROU9He9U5%2FJ3RpehK9%2F74TQtWXANbHveQ%2BpyXrLgIhALwZzrKvGMfqN3K9KLBC5Hd0QAkN%2FY84YQ4aF8Rs8zWcKv8DCD8QABoMNjM3NDIzMTgzODA1IgwooYATuu8cwNGyahsq3APM6FicXZ2lhHo1mYoJy%2BYtDy2tFFoyjfj%2FR7OAv6fiO24FYejhBff7AN%2BbVcx1qpafuBl7ZPMZw8XRpU7wmb6FYsOxLrCtJIb1QRCfpZhhAKQ26UXIgN4Hg0fbyjSZAs3WKdiagAg%2BTh9X%2BguhKkH2Dx8hAzh8CTSK3i27OQQ9jYZsaH2y9euH8kBjZPu36sfZusaYDKru%2B0LAcqK6LWeP7wtNohs3h7cThpOgZR9XD%2BOjTwzhoAEfgdXkM7CMRXivOEHenlZ0irD0JbNLRbWeuGkHQ0%2Bgqk4KUx2LwLHjLxwZOyJ%2B%2FIWua9Pf4Aug5ct7cJBTXyl7YLmhSW7Y5uqATuxbpfddbo2VankMOSEbQPWIRS6r%2F1QPKkeb8Sj0JV2fNuBXkX6ux4WdjntpsrZSNboUqP4fjPGJCUA%2BQKdpeX3Jw1hFMKuGAlxJsQM%2FrEAxccbLU8BVQ7cQGy1yVktzTuxlSYaF%2FggmEtUdMC9h6s7lrzVQPXos%2BePuBXyD9Js%2Fg8CUeSN3NPpm74iINcLiNOwOPX7OKS1k7MTZOpFMErePE8NGuBjF%2FF7bP6iFzvg8%2BER6jYfIgq1KtrPKcGc9LhBSIwDVwApY67R28ddzt6CG%2BCIUEgc60fwsHTDE393LBjqkAfxZFDyrBaRZegTUFATL%2BsiEMfZV31qQw3tMWH2%2BvI%2BFusCUxA3fYKjRyt%2FKfni4srVpGXDIVz44%2FYIOZo2sJHAkjZaJm3fOAmWdd1yjlZ4AB4AKnktzg%2FhUE9bDLk781MbnOoxmUTgcUoVRFS%2FbcjYKGNkQt8%2F6u0vlkDrvndI%2F6TRZsBTX21p49z%2Bt8%2FDH%2BYbmbwWgPyZWiegDxxETR%2BTRIebk&X-Amz-Signature=abcdad6dc26d020101254a9fd10e6ba37869e4896d92ce35664690e268588132&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OSIEHOI%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T151635Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQC9bZwCrXulCpqaCkFgRIN5v1v8waHHnx69u8QzyqTREQIgLYQVequzR5njSSLZpGlCuGKf%2FA4UwvH18T%2FOrmWzBAcq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDHCFw2NguYDw%2BrnZyyrcA5qzNFvs6LMjztCmQRby1dIIbcgLTmiNQDllvVA4l2e7O0UvzRJnn%2F1Vc6Hml8%2FftiGoeNZN%2FLcgx3ohsdItPCPKJgzuXatkgpV7QC0%2F8vWNT%2FwVbjWQM%2FW7JgssIP9MWrA%2B5lisq7wDts7fQ%2BpBuzDvN5VdGYAOZTW%2BV28HtfqY71pmWck9Q%2FYlGdv0z70KCjxd3Di0P5I%2BAeu2mhbxf0Zr7xdCrivJt6GIBQTjbm0R9UpNu4b5GUYZT2xRBj%2FaEvpYjHhr7Ux3cvaqoFtOeecEbO1r7Fymntwei2MLnFwQ2boZ4b%2BlDsIiOjAI2S2cMZKQmFCXqvfQHIJfPXmOZf9J1Vz4ls9NH7Z8kxfTFwYxYXqOnb1B3cFG0r%2BhHOlUNS%2FFWCzIlwf%2FHXITmc5BuEtRKuyjdbhgSNEZf41waKgHsQUMlYmHZSd%2Bn3jIvEQ1FIW0Cz8nfg33I4lntM8K3DGZ3wzxjk2Dw48CmxFc69SG%2B%2F6BYTbraCKQSa7GkMYzWi29ZZaE05rsIUIfkbYoTo1FyDturQUFu4H%2Butgpx3IUmwwiFmgCYqOcXaJSUrXJOnoalbSyzC4PVR84dbb%2B3nFM3twe%2Fq%2F5NAWMfJTYp1yPraKPX2YfM49q%2Fq3xMPve3csGOqUBFs30AkPChVsUPvcgH2RRYmGXNlT8P5xKn1p70dn12AstYTR5ZJyVZJmxDVQjM1wqkApYgWrAOo8FZs6U9ZdLRQJJ16fuxWa%2BWYULEjbcw6r0F0I5g3dNLXcJ6UEW4X0rGAWv7CgZTCuMqQo7p1vmYMZ5Db0mFnq1Eh%2BIeAtdHO04hvgwag8RGmFNLlF3RaErJwnU5iT4c%2FsCEd%2FYzo1shKDKPNzf&X-Amz-Signature=1773c3ec5fafaf64d9f5b32c38b6fe70fec85a0805516ab0e2778880d904b4ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OSIEHOI%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T151635Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQC9bZwCrXulCpqaCkFgRIN5v1v8waHHnx69u8QzyqTREQIgLYQVequzR5njSSLZpGlCuGKf%2FA4UwvH18T%2FOrmWzBAcq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDHCFw2NguYDw%2BrnZyyrcA5qzNFvs6LMjztCmQRby1dIIbcgLTmiNQDllvVA4l2e7O0UvzRJnn%2F1Vc6Hml8%2FftiGoeNZN%2FLcgx3ohsdItPCPKJgzuXatkgpV7QC0%2F8vWNT%2FwVbjWQM%2FW7JgssIP9MWrA%2B5lisq7wDts7fQ%2BpBuzDvN5VdGYAOZTW%2BV28HtfqY71pmWck9Q%2FYlGdv0z70KCjxd3Di0P5I%2BAeu2mhbxf0Zr7xdCrivJt6GIBQTjbm0R9UpNu4b5GUYZT2xRBj%2FaEvpYjHhr7Ux3cvaqoFtOeecEbO1r7Fymntwei2MLnFwQ2boZ4b%2BlDsIiOjAI2S2cMZKQmFCXqvfQHIJfPXmOZf9J1Vz4ls9NH7Z8kxfTFwYxYXqOnb1B3cFG0r%2BhHOlUNS%2FFWCzIlwf%2FHXITmc5BuEtRKuyjdbhgSNEZf41waKgHsQUMlYmHZSd%2Bn3jIvEQ1FIW0Cz8nfg33I4lntM8K3DGZ3wzxjk2Dw48CmxFc69SG%2B%2F6BYTbraCKQSa7GkMYzWi29ZZaE05rsIUIfkbYoTo1FyDturQUFu4H%2Butgpx3IUmwwiFmgCYqOcXaJSUrXJOnoalbSyzC4PVR84dbb%2B3nFM3twe%2Fq%2F5NAWMfJTYp1yPraKPX2YfM49q%2Fq3xMPve3csGOqUBFs30AkPChVsUPvcgH2RRYmGXNlT8P5xKn1p70dn12AstYTR5ZJyVZJmxDVQjM1wqkApYgWrAOo8FZs6U9ZdLRQJJ16fuxWa%2BWYULEjbcw6r0F0I5g3dNLXcJ6UEW4X0rGAWv7CgZTCuMqQo7p1vmYMZ5Db0mFnq1Eh%2BIeAtdHO04hvgwag8RGmFNLlF3RaErJwnU5iT4c%2FsCEd%2FYzo1shKDKPNzf&X-Amz-Signature=1773c3ec5fafaf64d9f5b32c38b6fe70fec85a0805516ab0e2778880d904b4ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGZQLFXO%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T151635Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIFwr5cTDMd3S6VBNjDHkOkrKwTOO%2BVEEZPsW0YvhvSQxAiEAlhDkyb9o%2BiZciKsglK79VjJJj48uEQga09RXdd9LnKkq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDMjd31e4hJwncP6i0SrcA3EfgIsQX6%2FEZwSt49ZbfO3hod4%2B5nj3y80XMfP6zLbjudXE36ChTRuPp7%2F7br9Z69Mu1xbHgB8YveFz%2FkofoV91ruzzYkOrz36g5scs4kUfw08kjWVQbhA%2FBxaMaA3nLu4v8uDAD5t2X649J4Acypky8HBzSX6x%2F6qMLLcnl99HrzMFOXdHCiXgtbGmuBLxMzymXMFCSAxSNvW6V0RIKn%2FC3ViyMLI%2BaMVQaVe82F7GhBcU2KY3MDS8VyYXBeaJYbOmhpJbzRp%2B2RpqdslygJS3fJjWqj%2Bg6S%2Fr9CWWnP2Nos%2BhJ5D1LY2udZvxyEghyLqNiM6lNDGTbCNgHcTJ7BXLa%2B6dC5hT5zZgi3VyuE5dc4cm72FkT6qB5Byob9hYJHBGZeodTerQY9IQkGdfqDf8SsesPkgcVyaqE8nKRvE7Q%2FM1jiT%2F4y4tkMPKa4t57lgiIlZM4Qgn1uMkz87P%2FN3HpiyQri%2BMcN6h1kBB1LwP%2F1ArATELJRD0Pvm%2Fl017m8VDwqUThcL8rQh5B%2F6Pcd8NX8taGdq7x1kDLtXyJYY7RM%2FiGJWGIIRoi%2FnZNej%2FeNLP%2F9dBuruR7B6rOokv20bHTZtC%2F%2F0dJvo%2BZ%2FBgu4vU6%2BDNQKGNAtAM6elUMMHf3csGOqUBjG7VvgwZZqx%2FElxydYsZtgPZCuTcrFaPvv6PqseSQw7q3%2FTA%2BMI8np7jvyFaFQh6gEF21%2BPOYdr7xwiF25SCAGk4V%2FFnpEXxQ6L6ZfzW%2BdYZkhPDLx48WtDoA46pA341TWDzNTtVrktcVfrOwDUkD3AvcSowhPhLKI7Q6%2FI3zm1wVjK3U7JYMXzqWIIv6%2Ftcj7w541yUlQqkTOOSGxFyNNsABdyN&X-Amz-Signature=603bcbe31c948ec1704cd43a75f95278f8c5388e769f129fcf97e164dfc2f5a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

