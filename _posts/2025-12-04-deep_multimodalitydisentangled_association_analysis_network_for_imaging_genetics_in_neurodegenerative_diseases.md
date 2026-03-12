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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNEAG6YR%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T212022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH6YCBNpgIYxBZaeLP3FLJIhQaLrI2tzkpsO07%2BZgQkFAiAh%2Fu9QMEvj2JVU6y9fEZTmndjFY8XPATi0T0ODQ2fOhyr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMcnAirrSMO3YpiQoZKtwDvY2l4trFefxiHqwjwpjpT5tevzrBE3saen%2BUpNv4Pk%2F%2FZYfx6t%2B%2F0iMOdXcXc1n0d8fqYSEVl7UmCRWLP7t7pvE%2FA78bHjV172ELtqwyc9gsW3WDJvBE3OfUv%2B8%2B%2FSkP%2BvF7ZxEuM%2Bmf5e6XTJhVYe39Wo8mPZ8xGxpk8gsRAQzt%2FN%2By3PEKvIGAiA5WGMrfM2DC%2BDP3haCf0%2B%2F1UxJJSPBKI1bKM1AvVwJAW%2F%2FhKlQ1tz4eWRZ6IqKyW3mZ5MJQqRPZEzWeZiMjPSc2dGxk%2BHcqS2mZh6EOKopJz0sYgK9nJ6Dh8ui2apYBs24NyYwMCg99yiKqAM%2FOxJ1U6EDZKSTGeiGLDLFJV4iy29Iufij8acEd%2FyTEIbYiGhUMdAy8%2BkM6dNjL9pAEyGdQV3rh33B98zl0flbSXiu6K%2F7cGtoMRIUT02y0IlJjS63pzTaSFluQ3fGpCYSB3QOd5rdaCK9KM2AKcUSzNd30paXCtg%2BKEsvIYNV6Hw925tNzdIrPsZ7p%2BU2Kz8Y2ENo5aE13NauC4%2FE0whakz9qouwuYRwbudeO10VTiBGN%2F83YncFKe9SWvIep232mn54S%2BeLXmeBGAKgohF6CL%2FbV2BWMA3ZZppkz3JmLIPOKQub0wreTLzQY6pgF9OXrFxfJUDvPTEUn%2FBXb0XAfEQBdu3O2n%2BzbawKbqeeZvZI9ymleVzmRln32zZ0wRYqikN6qZ1gu%2Bgowz9uZBC5gMT21Twx4VVrrcAir1aiX%2BEFmnqTBTp0VrjfIwlAEBvXsnM4PCSzgC4dGUgpxu8xFDBrlLGQ4Ww7%2F1wGStOK2N0FxHA3Ss8RPONWSrm%2FADiUQJJCwnByYOE0OcOz6TRF2YBXYJ&X-Amz-Signature=7b53e9b6091c969a4000fa154b5191721f0b710d129df3cef2abfa522bb0bc77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNEAG6YR%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T212022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH6YCBNpgIYxBZaeLP3FLJIhQaLrI2tzkpsO07%2BZgQkFAiAh%2Fu9QMEvj2JVU6y9fEZTmndjFY8XPATi0T0ODQ2fOhyr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMcnAirrSMO3YpiQoZKtwDvY2l4trFefxiHqwjwpjpT5tevzrBE3saen%2BUpNv4Pk%2F%2FZYfx6t%2B%2F0iMOdXcXc1n0d8fqYSEVl7UmCRWLP7t7pvE%2FA78bHjV172ELtqwyc9gsW3WDJvBE3OfUv%2B8%2B%2FSkP%2BvF7ZxEuM%2Bmf5e6XTJhVYe39Wo8mPZ8xGxpk8gsRAQzt%2FN%2By3PEKvIGAiA5WGMrfM2DC%2BDP3haCf0%2B%2F1UxJJSPBKI1bKM1AvVwJAW%2F%2FhKlQ1tz4eWRZ6IqKyW3mZ5MJQqRPZEzWeZiMjPSc2dGxk%2BHcqS2mZh6EOKopJz0sYgK9nJ6Dh8ui2apYBs24NyYwMCg99yiKqAM%2FOxJ1U6EDZKSTGeiGLDLFJV4iy29Iufij8acEd%2FyTEIbYiGhUMdAy8%2BkM6dNjL9pAEyGdQV3rh33B98zl0flbSXiu6K%2F7cGtoMRIUT02y0IlJjS63pzTaSFluQ3fGpCYSB3QOd5rdaCK9KM2AKcUSzNd30paXCtg%2BKEsvIYNV6Hw925tNzdIrPsZ7p%2BU2Kz8Y2ENo5aE13NauC4%2FE0whakz9qouwuYRwbudeO10VTiBGN%2F83YncFKe9SWvIep232mn54S%2BeLXmeBGAKgohF6CL%2FbV2BWMA3ZZppkz3JmLIPOKQub0wreTLzQY6pgF9OXrFxfJUDvPTEUn%2FBXb0XAfEQBdu3O2n%2BzbawKbqeeZvZI9ymleVzmRln32zZ0wRYqikN6qZ1gu%2Bgowz9uZBC5gMT21Twx4VVrrcAir1aiX%2BEFmnqTBTp0VrjfIwlAEBvXsnM4PCSzgC4dGUgpxu8xFDBrlLGQ4Ww7%2F1wGStOK2N0FxHA3Ss8RPONWSrm%2FADiUQJJCwnByYOE0OcOz6TRF2YBXYJ&X-Amz-Signature=7b53e9b6091c969a4000fa154b5191721f0b710d129df3cef2abfa522bb0bc77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKOFJBPM%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T212022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFRHQWauKqqsjNa6b%2FUANAZ94sekp%2FIsg3YVEz9Cy6DZAiAXPX6AzMFDI5T59MMRKEt0bM5903bAlBf%2FK5bBFu3lXyr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMptOZmLCSvd7kVHyVKtwD4lS2utK2yJyeBml2VvfZ%2FWGJsxUbEpdC2P76tLW0a4m28obsaKwStiAlnQ4z4onEMxwzRusXda%2Fiu0Tmyrqn4YglJJzRYNwcQwsGEqkcU3mnegozLZ6d%2B0%2FwH575hz0rox0z%2FmiLfprBMz8WPJd1B4JwamZYvvW%2BoSw%2Bi830Fzy8DUw0CMDnjVAKU9yr2qOLykVjkYBNrOl%2FcS%2BY7GhXNhIKslCms9h%2BTnJbJ6ufrajwU1m2J4CTmt5ng8bswBX6cseZFCYLaD9mPxqcmlugSCr%2F%2BMFrAXb5m4kpAyuZb%2FKgTk2gpLVibSnx%2BUxxaVjo1fr2icKOoKgLd2ZGP%2BCckqxTQzMDEyTemloGFRll9SDff1oorh1L8gTwotyuAVVlD1bh8VFfrZxmSwltd3duLROOjNOmOy5MCiyVsh6bF5yt0qXS9EyhFuiOJRCAp6NISEMpAntsayhiUMyAbZNUggc%2Fm5xOeBtbz8lw4LHYDxA2U2MYiDI23ozaZhoEt4wEGzzX2P0tp%2BGyCjwr86f0kHgJXNQIci4C2aTS1npYsDZD85tJTeQOnu2%2FRZZju8QhNWSQV5yOU3U5jwr8L3s6IPBOLS7Z%2B2JuZVLFxg%2BeX5brdTsWggYcW2FBRjsw0ubLzQY6pgFQyh1v7rt29mle7S7xwXbCtyrPxs1oRHEL2sNHHGVhY56xwhd%2BTVHmW9xu9Tr4PIRBmg7AfMBmUN5byVGPdDR97cWmSZbNUMnMeJONygqd%2F9jIHVZeE5Nws5if4QfqgbzM4PbMV4Oug%2BG4PsSRcyhWlm%2Fe6imaxFTJLMcqtkes2xDQ5d7k9QIwyq6l4ZgGq9%2B3G%2BYTDiLTS2OuXftrY2l9N5F1FRQp&X-Amz-Signature=26ee233aaf7385ac8c26323ac44003fce1e7f62d127c2e6fd77f31fd99701f1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663R36LFGA%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T212024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEsSARAmoBMHzCna4q8H80mW2zzfDUJc3ErPosls5FYMAiB7zS5v2fOdfkTYIx0F35L7%2F8ns16Jdhv8K89SgJ82Y2yr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMiSqoLB3%2F31lepjPsKtwDkaYwUvsIc%2FWl71VIgTlmDiuZpQoPyUDm5qaQbdCLIk189A3jqJxdG9FFLeofCbwMTfoW9gwED5IMD9oo4bj0d8X2vo08Ix3ady9LYnwxZh1izqg4XNgzqrjVQxyghQzZVSkoF1HP37vc%2BCGk1vlQNoQsptFAGiFuM2o7wNAPuyu%2BWDocDMQeztLEMMuEVrt4QMbchBjWCji2zMq2QUOdVXF8XhYlvGz%2Bei16G90h9LkVR59HkiZBrnNYtxSobjVnRGee6tKbYXVn4lylSo7bQLsWdgZYfjCLsDrXAf2nhe%2Bk37%2B9i56gZ8hEMqf5cvCYLRyXYkpO9C3i634yNYqFJgHNQa15bQcxEDdLj4cJL85ZrDkD%2FbEDycxM%2BSVpRXo%2BVUTtUPESYbN9F4%2B%2FBHYl40XrgXrd%2Fx27d%2FzRLi094GpzFHNOx7L1AodtTOeHzlE92lI%2Bp%2FJKnlX7l76guTTPLjr0TdpoMnEPsrivPc9DYdOHuVCcvQwFBaG70vHoERmFNEEwmkUnMiIXQoxBxWeZX0mZSy2973zz8Wwww27AeFi%2BGcEy4zsIScc9oG2gAHfsX3EikcO243DOkwXSI9CJTAtffvUpBD9Geavwm82HGtFKkkFj9xSDPvANX1Uw3%2BTLzQY6pgHSp7M8UwCNyWJdaHzmpDywbM0IU%2BLDKwNpXWRZNGcRJcM%2Bkp%2Bx8e90XuDzEFL2wPFrdaPCzxpyUt9Eo6uTH6jozTM8Ag0YHRMQ%2B3%2F7zzQDht5SRrY6ZoBUxYyS6l2FkEkb6%2BQh3zFmsYFr7GtO3ZQXwbizMf7Plr63MvE63Fvn%2FdIMIW1RGiCFdJ10D3gWFAVAyJErYmxLc6lmA3yzyPYjOehIqEWo&X-Amz-Signature=caa8f135cb61bc7a19531814650b5a4da424104594c17301c2dad9efca6b6643&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663R36LFGA%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T212024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEsSARAmoBMHzCna4q8H80mW2zzfDUJc3ErPosls5FYMAiB7zS5v2fOdfkTYIx0F35L7%2F8ns16Jdhv8K89SgJ82Y2yr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMiSqoLB3%2F31lepjPsKtwDkaYwUvsIc%2FWl71VIgTlmDiuZpQoPyUDm5qaQbdCLIk189A3jqJxdG9FFLeofCbwMTfoW9gwED5IMD9oo4bj0d8X2vo08Ix3ady9LYnwxZh1izqg4XNgzqrjVQxyghQzZVSkoF1HP37vc%2BCGk1vlQNoQsptFAGiFuM2o7wNAPuyu%2BWDocDMQeztLEMMuEVrt4QMbchBjWCji2zMq2QUOdVXF8XhYlvGz%2Bei16G90h9LkVR59HkiZBrnNYtxSobjVnRGee6tKbYXVn4lylSo7bQLsWdgZYfjCLsDrXAf2nhe%2Bk37%2B9i56gZ8hEMqf5cvCYLRyXYkpO9C3i634yNYqFJgHNQa15bQcxEDdLj4cJL85ZrDkD%2FbEDycxM%2BSVpRXo%2BVUTtUPESYbN9F4%2B%2FBHYl40XrgXrd%2Fx27d%2FzRLi094GpzFHNOx7L1AodtTOeHzlE92lI%2Bp%2FJKnlX7l76guTTPLjr0TdpoMnEPsrivPc9DYdOHuVCcvQwFBaG70vHoERmFNEEwmkUnMiIXQoxBxWeZX0mZSy2973zz8Wwww27AeFi%2BGcEy4zsIScc9oG2gAHfsX3EikcO243DOkwXSI9CJTAtffvUpBD9Geavwm82HGtFKkkFj9xSDPvANX1Uw3%2BTLzQY6pgHSp7M8UwCNyWJdaHzmpDywbM0IU%2BLDKwNpXWRZNGcRJcM%2Bkp%2Bx8e90XuDzEFL2wPFrdaPCzxpyUt9Eo6uTH6jozTM8Ag0YHRMQ%2B3%2F7zzQDht5SRrY6ZoBUxYyS6l2FkEkb6%2BQh3zFmsYFr7GtO3ZQXwbizMf7Plr63MvE63Fvn%2FdIMIW1RGiCFdJ10D3gWFAVAyJErYmxLc6lmA3yzyPYjOehIqEWo&X-Amz-Signature=8d4b072f6134e4de0b2fe24bb80bc286660d26a24606d0d1675e8951bde16995&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5ECKNEM%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T212024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD1EqH%2FnvJ3Ag9iw4LAqtVtdNUMmOLZB%2F41B8CrsuMqMAIhAOPo6O6Hl%2FyQnl7kCRPByvVH2rWgNHpO1sQJ0ZRkuKXfKv8DCHoQABoMNjM3NDIzMTgzODA1Igx2CkvuFAe%2BPbP%2FAJ4q3AOP6f3ee%2FjJ%2B1B4S2TctdrxnUhMDuZwaXvRecq4P%2F9Q9XV%2BBN9%2BdfUmO%2F%2FBf8hXOgHA%2FSXnlLgKl5Eq7oz3LEpLm4JvGDxtP17ZFGVOKimUQQ%2BVFJppxRVfVat9RZu%2FfLf%2BuwHlIZHub05g%2Bbp77UR4093VrI5xeBT%2BUXwCTweuesubuOw8%2FTIbpTjrlgA%2F0XT%2FHPA4wFtXneV%2BEAO%2Bznvv6dHiyg%2BIk8W9sUNnqDGgjfilyZIbWOH4Ff57mm%2FS%2FgbzNAlP9zXa5mnK5%2FeDwvhuWXU%2FJ0wU4Sr9W13DaYoSTe6VJvXrAMiLgmLqxwZxYUK6eQHTglsPAfWJOAg0ALf8FNDPZuv29TCj1RleX%2FaFFP7M4q3Z2ICdiIKsvg2RdlQjj3AF%2BpwDj5Nn76ML6eMBQk720vRYVex9u7iAEUQbEg2vJb63hLtgaQK%2BumSNZcQtSXebhbNE9lA8Nov3Gf%2BwfdNlxNBDlayEBZwpmBqXhJ4vXUOyvWw%2B523t2BXmOBdWIoUH4VjIFPf1QsHCeP14mHMbdo8VKrz1RdQnGJE6qevLXTkjchrK%2BbL8UU9PISbu8FVpUPFlRtXNj398Eka6NjHbrr4e3%2F%2FxvNgQokSMdMT3ju1m4xFH5FtT8zCy5MvNBjqkAQhAcfkCEuKuN2deDdIaGwK0QRPl70KHHyN6khda6msDIDOWrWWG1SGMfA%2FJhxFK2LGjR8YhbSOb5eoeaLZHSPREKiQoEdXbbjgjuoy69G0t136Le9NOCfojEtdC1cRb21BB4rCaZAHWEJDQu0skrHLluqifv6B7V6552vgRPrX5Od4Pc2rN05gZM8hiyVWhnIGJs3CyhOud9P8zrHAihbPqNtbl&X-Amz-Signature=5ccf1d50244d6696182335884bc6092a75b4afa48a126aa8b1d24b602fe9ab28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RWF7EVE%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T212025Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBJbKS3fv%2B2dRkRz2g9lNtaN%2FtSfpO1vUuKblmA2genzAiEA2gpOO3HCkS9tianp1UEATYn%2F06qU0lwCxJ0AXTi69VYq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDDmbSGBO2IJLrfoTgyrcAyiDVh2WEikf1MUbrXtAQ4oO0z3yfHxweBahICC7ucM2O2F5T0C1FP%2FyHmjVEct%2BugCUxZ33HlO136HaYLx7dz6YrXEu2swRvK4SjfTQVgWjmcNhSzEQlDX11haD7v%2BZkqIu2y89LhaQQGOAf3biiAWe0Bpj0dHIjNH5kSxksInIIpPE4CR9Ce9nmyn%2BI1ueASWFJqAINQS8dXfjEzYnx06pM1txA7VeE2jl35ZmE8fzU08K3WaOVL7ilWAjuAz4xS5M%2FWVb3%2BQ2mx4l5AtCjflrsBTJe%2BTLNMozxah2txxTUH%2BQ4GJD1URkkzFj%2FwVBPwgDJU9gKaHdSlO8r%2BFVMz20O%2FZRfwxsqIajlxTeiXZhdxWfNJPK1tF%2Bk2kFB9nMgqM5auISi3arWdkdQy4VLVUmzyw9T0zTgF5GJGJ%2BzTt8kB8nzqOYyCKCFsmWUMF%2BvAX9lGHMYrakIU9VYoW3ZdTvtE9g6Y3kslIqgMIguUYRrpg%2BmyoT1Q1zdVjY1WUX9bzGz6D3llKKmCaBiQzusMA78dcV%2BiIPYnSbhMCf517CNwCcG7y%2B6B9LNUjfgLFdNwsoJYtS9jkMHU9a%2Fkwf7KNcZ7ZpbVLfjpuk7z9LY%2B%2FEIr0nfyFW2bTLU%2FP4MK3ky80GOqUBJz1Rczrkh53OsOe0EFvviDt3AJaoplrptxifQOEKlOxJkR9FBXLrqTULbI7KqYPIDCAAlm6cGPIHbReJCsh6Kw56yeXMSJRlowqLfI9O1gv0ONmtAlMVEeMW4qgGzTzECJ5MGZ3X2vLJkqMtokrc8svvJ6ERcTMAzaEGiYkhOdOC5prs9bIlbkEso23Z97a2Vq3E555alIEan1WnIrF%2B9ZRRypjq&X-Amz-Signature=cf0be422c14d8bef5c73c802f96ba4cc9165a0cb50242fdafaa4264df322e87f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPHC6E4H%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T212025Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDc7PzpN%2B2dc%2F5hagZwpUNpytAhmdP7Dey67YgPeAihiQIgOsKBV3uNQHhHEm6xIq3D%2Fy7KsfDdvE6zanhKvrklYDYq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDCvk4LQAtZiG8UK9zCrcA7DTLflsEBZt4mC8EvxC2esAp8JYeAqaomEmGx2RSAlmoAWhBELR0S95IKFiR8c4%2B2K%2BCE9UCJSb7kRVy9c8EY7Jv6MA1VtsBRCfeJXxWmXgFiv0tU6xAH8jQ3mjVJYImXYanDuhNLMDVpV3J1nxElJZ4GX6%2FIyBetLQsN0AkyTivnfL8HDHMOtnZcJsTGSKecQCgpjKwtuuPuisT8bPW3oiyrE4B2Id0iWmUBJnQYCkN%2FXcyIf1m5KzF3XaNorZKBOqCbxNj439YVHB2vOvDVkcIm8GtSARXj7haIwQjV9%2B9x2FkGiKD0iTA5ZHkjy8SeG5hqaOIn2lxgNTs8gVPxTgb5JKy8J0JBAtNcByet5sd9Rhxcu%2FFLB40OGTB5w6bBKCY0ly9vIg%2FJG6V4E2bBSAkbJIRU8gleoTry90UXb00cOQHtQfWs78L%2FK%2FgO7B3xKUElLHUin%2B1hEhXhRMDiuVaYzLERgFcGaAOAa839x94IPYtd11vM2X9VJnWpoEcUiYMvhIabdp4AB1pJbyWyzFsKK7JT3Wk%2B5osTCQ9iQtqik0tlefCM9e%2BZWN%2BadsGuxNekI0X8RjxkvRHaA8J8%2BWrz1%2B4eC4lzewX%2F%2FpwVfb83J9vWNfL05SbcgWMPfky80GOqUBE%2BSay79LuLYJc5gE6vrlQtJxCYFWiUfNACaSBVgyp465OP9PYzDEg235AG5ArL%2BLxrocqN4hq2li%2FlnJh%2BRY3TWZ4RbNiqhD0x4%2Bv8l1nEoF499zD6%2F8I630p02v6gaaXWtptDPgojYOHE3pPrdO1gTlaKsJCUdDImle95f%2Fu8ZRfgbKep1vyVwhRCxiJXF1vRoXrIQa2u%2BmbQVhZmWUn%2F7snf5N&X-Amz-Signature=614a2fcea9e665edd6093d76146e5db56094cc978ce86a3c83e08da3b21f2dbe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLHAGD4F%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T212026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDgEvLmZKo7FsWYiTKf%2F0fnIApswLxm59XuKhCAu16I6AiEAhCjPZYZrZffi4Or0KDD%2FhILpckC3DD5RXfMJXyMbt%2BMq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDNT6uDbuEgyg%2BVSN7CrcA2ExC4mFgFRCFmFtB8vGxwegB8jHb1tcV59WabVczKK66xN1077N%2FXbLHMIwZF7JZaOH%2FsgqKBkOBhaZLdfgSR0YmqiIs6J66j5nQmpWsCdKBbWQt0g2xfC6ndNPhzVaa2T18aEutDJIbjXJbweDqXMBkqf%2FwefO%2B3DygcksoL12bfq4EdRvyidWF5vtexq50D%2B1otY5xm50DPy1YA33a6f1Cd%2BrdvpHiVcgofSbytg%2BPSV73r2Q%2FTNGOFuwE7Zv9vUB8N%2B5qMm7T6j8X59768SOPO7i5Z7hLTSFGleORYOqZANGRLJykhRoVc3flMDBmMBeLJEB%2F8LZ4ow6I%2FRqEwWfLv8ZAJG3qqWh56MyoA5YH9eErbSQtI7CE4IVs0OErVMhvHx%2BECjBS7qSWp%2BnrVejW7jm9nrWcp8oTzGqC83%2F6riTU%2BtaVPcsWjzcBc16xyzjTxYf6L5srub%2B1cPOQHS%2BsxwhUMJihejaCo4Br%2BjlGzaX3TQYLgKd7HOHg6%2BkLQtuI6zegUcMSJV6lVWCcE%2FPAllT1pg7PKesyPQAD0uxx%2BjcvZJedxv9jJiyO7XPH2z88d4aANA2t3i8PGe99gyCgIBVNMW3ub%2Ba8j7KWfDtJVoICjo0ghOXEiwtMMHmy80GOqUBjMA5O7MurqGC3Dr4UJgnXfpM7LCv1KehNrTCb7yBJFNzQB8L7NXVLudKP9N%2B1TfQOoT1RvT7w0CO3gjYWpeXGjmF4rl1WCQUiUhHs6xBNcPS0uN5SW8oVls2aaGzSfm6fPVchMiwFf8UVysj3lAFGWAsBGgGUHZ4He4k%2B9MEI%2FWlDhO0Iw%2BNfYfOTnwG2V8MhPdVE5sy34dADYR64Gjn05%2BSP4nh&X-Amz-Signature=f9075cf59912d8b0919072acc4e604d637f3d04e3f58a9f896fb053b098c27ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLHAGD4F%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T212026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDgEvLmZKo7FsWYiTKf%2F0fnIApswLxm59XuKhCAu16I6AiEAhCjPZYZrZffi4Or0KDD%2FhILpckC3DD5RXfMJXyMbt%2BMq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDNT6uDbuEgyg%2BVSN7CrcA2ExC4mFgFRCFmFtB8vGxwegB8jHb1tcV59WabVczKK66xN1077N%2FXbLHMIwZF7JZaOH%2FsgqKBkOBhaZLdfgSR0YmqiIs6J66j5nQmpWsCdKBbWQt0g2xfC6ndNPhzVaa2T18aEutDJIbjXJbweDqXMBkqf%2FwefO%2B3DygcksoL12bfq4EdRvyidWF5vtexq50D%2B1otY5xm50DPy1YA33a6f1Cd%2BrdvpHiVcgofSbytg%2BPSV73r2Q%2FTNGOFuwE7Zv9vUB8N%2B5qMm7T6j8X59768SOPO7i5Z7hLTSFGleORYOqZANGRLJykhRoVc3flMDBmMBeLJEB%2F8LZ4ow6I%2FRqEwWfLv8ZAJG3qqWh56MyoA5YH9eErbSQtI7CE4IVs0OErVMhvHx%2BECjBS7qSWp%2BnrVejW7jm9nrWcp8oTzGqC83%2F6riTU%2BtaVPcsWjzcBc16xyzjTxYf6L5srub%2B1cPOQHS%2BsxwhUMJihejaCo4Br%2BjlGzaX3TQYLgKd7HOHg6%2BkLQtuI6zegUcMSJV6lVWCcE%2FPAllT1pg7PKesyPQAD0uxx%2BjcvZJedxv9jJiyO7XPH2z88d4aANA2t3i8PGe99gyCgIBVNMW3ub%2Ba8j7KWfDtJVoICjo0ghOXEiwtMMHmy80GOqUBjMA5O7MurqGC3Dr4UJgnXfpM7LCv1KehNrTCb7yBJFNzQB8L7NXVLudKP9N%2B1TfQOoT1RvT7w0CO3gjYWpeXGjmF4rl1WCQUiUhHs6xBNcPS0uN5SW8oVls2aaGzSfm6fPVchMiwFf8UVysj3lAFGWAsBGgGUHZ4He4k%2B9MEI%2FWlDhO0Iw%2BNfYfOTnwG2V8MhPdVE5sy34dADYR64Gjn05%2BSP4nh&X-Amz-Signature=cad4fa4b47db84cb92c21c51a881d600b53881b58cb4d086f38acab06fdfc108&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RR2WWSSG%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T212015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDuYLGmsghMB%2BVojZm7R5Tf22e8nQpufGMLxirD5rcFhwIgAe8z9xv6az170CBGUgCXilRIz3mfFaLo1dPIOt9hOfAq%2FwMIfRAAGgw2Mzc0MjMxODM4MDUiDI3g2vkpavM6RKfnECrcAy67b%2FUsqsAiwlh8fJngiW4a3odAtg%2FxLhKaa6TrUJl%2BzgdtR0EO9kndg33AKRURxeQmfRX6hGb3pMIPc85joyHnl1IbbNddwRxUds%2BPm4KPpHtwoCnzPZ0CjGP8Uajkj0Clwm5%2FvTRI9kCuYvPvZ7VFt79q8VssNe9Fu7nikm8LC917v%2B5hIfOawHBZAU%2FIblkyIW5KGBCDKDAS8AkHW4YTuxcswBmYk6KgLPsEFVcP4s32NwaPOEcCKbO%2BRfAPWY598rFqtsq%2FM3Q1xkYyU%2FcfWkB%2BKiYGfxjv2L9hK%2F8guFGmn2o2sGBUnf5EuvmS%2FrhULBRAD%2BepmMF4uZXmBXp9RQQTcfHpzOwXy8XQWbZ3X2DUtL4eiocYkdeQvV130ewqIyAparo2KaBmp6h7cAu99HfOrIQpFEilMOireIH1Pr0%2BlKQbaV3cvq8yrdzVUW93Yy%2FmL6FytIjTB2eZ9M09hBsNqIhXtoAYVpZPxYs36Tls64jU37YZwWHd80phE0CxuYL5OeZqCCvy6WhybN8ZBcz796TXGeHprMZnQEMjhOmrlHzhcg%2FLWPDVaY0yokRVyvmRhe7AH2eidzOqqClU3IVEoIY3npnohvsjgojIaChoW3QOKK3ULKuSMOi0zM0GOqUB%2FmJ0GiVta2ugaMcxYr%2BglVDPUXf%2BjOlau0qUYR%2BjMkLNByXyGbcGDWhVemz%2FOmtWm6%2FnKbB6gh16kXhPfxhDZeWOWOlcyc9OaqWWZqmUEeN0BK6TIovJcH81rRz6b08sy2s0%2B5EDPPB8dSwnZvuFdvuvyBpbWuC1nMQsEC8T9adFI47Cg1x2za3ukIhWpQCqUYcpG1gfgDapMpDs9RiglzlzzRwr&X-Amz-Signature=6d301fb436c1e2f23da9c71d54ccd0ab305c4b8fac95a7dc1eef08ce0a7170ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YHMHDHC%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T212028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCfBX24IqfnEhmZ3oGx47jwZybQKjbJ5Uew0xskzQwlGgIgacUpUz6mu2SAEDFnJGtCJ9eDlizbXBPlmfioRn0Q%2B%2FMq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDDSP6wZKiE9lt8bFTSrcA21JFWCgJvnLeBjaeTJhBAvOG6rSwBu%2Fh228Eki3ctFB6EG0C13Riz9O45Ll%2FcOUIqMoFlLJ7sc6FGa24SQQQlS9%2BQPdZs8C4V2MbcIsSd005rbhb81unSqC1NhS4kT1huoakOjIaq7T1GfWVi7k3kNAM9GBazqgRVA5SStBo6Q2fym47wIVPHic7%2Frg0JdgOVE%2FR%2FwdebetKfloXUwO7D6PahbTsRfOC%2FYlKA4vvWZCTt21RNz5GVs7dNh1V39fNmCi86wE%2F%2FShWjA%2FVPD1YeJDv3UjEja2lKRLqs2pmBl3BKnbXdzt1OHx%2F6c7mL7rPRaet1OIH25u9UjvDmz9R31IEQrTJ9O72KGqquFwkepenCc%2FTKFRuaL145FhUOF6c%2Ba6Kbfd5yHdjKO76c0f4QQN32C%2FZGR6ZbsY680%2BDekIM7isgR9tS8gFDOgkL%2Fg1ZV7y9e0QosUL6WTUstOOzEFXqlnszvaQXE%2F2TXbY%2Fo%2Fa7dTxyyrg6fUh6Mci4pkHX88SVmWpyB8uSiBNWPgsKpkpM%2FMzydMQ4EbBRN2UJcxF1K1Y9BP1IFPTxG%2FejRJmw4Cvq9hj05R%2F3fTY7lb7AgTgyO%2B0tU%2BWNwySr8zPKBEhLJAw273ZRPzgxvbZMLnly80GOqUBljIlCFsXxfvUjiJc1FbJVM4TlAv1%2FNxN%2FTG6MLYZjtn7wZECoeywYaHthqQy9ZvIX3IUlzo1g11tR3ylPhv%2F060dxJp3px2dsUzALftrWRMHXCRKqlITXudkCj2aXMlZJ%2F5bjoZoMst0zFoj1KypP9ORKzQgqPrx0xlWvHj5u5U2wQcabxUdiI3VEj7ldH%2FwEb2hsw8rBB%2BSsnzK7DdHwSXWYLF5&X-Amz-Signature=9bdca9fa77047e9d52baea7fc17a884636e0b3a770edb5621c7ee0c3430a3262&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YHMHDHC%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T212028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCfBX24IqfnEhmZ3oGx47jwZybQKjbJ5Uew0xskzQwlGgIgacUpUz6mu2SAEDFnJGtCJ9eDlizbXBPlmfioRn0Q%2B%2FMq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDDSP6wZKiE9lt8bFTSrcA21JFWCgJvnLeBjaeTJhBAvOG6rSwBu%2Fh228Eki3ctFB6EG0C13Riz9O45Ll%2FcOUIqMoFlLJ7sc6FGa24SQQQlS9%2BQPdZs8C4V2MbcIsSd005rbhb81unSqC1NhS4kT1huoakOjIaq7T1GfWVi7k3kNAM9GBazqgRVA5SStBo6Q2fym47wIVPHic7%2Frg0JdgOVE%2FR%2FwdebetKfloXUwO7D6PahbTsRfOC%2FYlKA4vvWZCTt21RNz5GVs7dNh1V39fNmCi86wE%2F%2FShWjA%2FVPD1YeJDv3UjEja2lKRLqs2pmBl3BKnbXdzt1OHx%2F6c7mL7rPRaet1OIH25u9UjvDmz9R31IEQrTJ9O72KGqquFwkepenCc%2FTKFRuaL145FhUOF6c%2Ba6Kbfd5yHdjKO76c0f4QQN32C%2FZGR6ZbsY680%2BDekIM7isgR9tS8gFDOgkL%2Fg1ZV7y9e0QosUL6WTUstOOzEFXqlnszvaQXE%2F2TXbY%2Fo%2Fa7dTxyyrg6fUh6Mci4pkHX88SVmWpyB8uSiBNWPgsKpkpM%2FMzydMQ4EbBRN2UJcxF1K1Y9BP1IFPTxG%2FejRJmw4Cvq9hj05R%2F3fTY7lb7AgTgyO%2B0tU%2BWNwySr8zPKBEhLJAw273ZRPzgxvbZMLnly80GOqUBljIlCFsXxfvUjiJc1FbJVM4TlAv1%2FNxN%2FTG6MLYZjtn7wZECoeywYaHthqQy9ZvIX3IUlzo1g11tR3ylPhv%2F060dxJp3px2dsUzALftrWRMHXCRKqlITXudkCj2aXMlZJ%2F5bjoZoMst0zFoj1KypP9ORKzQgqPrx0xlWvHj5u5U2wQcabxUdiI3VEj7ldH%2FwEb2hsw8rBB%2BSsnzK7DdHwSXWYLF5&X-Amz-Signature=9bdca9fa77047e9d52baea7fc17a884636e0b3a770edb5621c7ee0c3430a3262&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666B2YZTHQ%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T212028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID3jC7gebWmpvYHjZY7zhXzm3WFJvNj4X6EfNIxnKEPEAiEA%2BlVeY7o1cRPi1cgboG2HorlITVQoWxsK8PMfBSSFlNYq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDPJP2FXSYO8i7bNDqircA27m29iluvelC2%2BxchJGzd%2BeJcvMNPyKZQLGCjmLJv6t5xkT%2B2ob8yVWoLWj5V6p632E0gKKL044hKuhtKzJEHth0UsXRHsUgb%2Fyk%2FwuFtNB75t5VKOQF6jrohMuNDbaejEG0RTO%2FwbwXlOWjEhwGE4nh3NmHlfWfxcouAFFmRnHVLIAlo3GEnnCdJ%2BV4DZ0GtZejwxt9nych%2B7qoLOGG8qjy3h0Ahv%2BOVlyLUmct97yEG4GGCjpHhcBGi5LHFVvYThl1FstgCB2ete6kTm0QJ%2FX5RINa1f%2FLC5mTX7d6ZmwFwExpexO3Qw5gepQ%2BN4PvJBLteAnLe09ospKcqQZo36lvQVEXZ5KSecWDsX6aTAZk5O4x4ZLRHIHQfW3Q1FtjGhiK6NzrvCGmC%2FYE4ISg1CKjJyPiMzi%2BBeCGFgfJ%2FHzG2jbQbtiB4Jxl9OS1CQHGEjwmBQrgJfPsFix4R2nf8KLneozS3S3WDGaJMVc%2FTCcZB%2FYco65QjhD6O2xDiF57h5wgEehSW%2FVj%2BRM2ak%2BEmxWRHB0hbtbKEOtyDylMr%2FNW%2F5UDsgonyDVaSoku9DzfZKIIEMRrpdkIE86%2Bs0ZDODkDCyzm1PpOjEL0stdi5DPLB6uWrrk63QZ82n4MO7ky80GOqUBy1Xm6saMBWYJV5%2FSbCaR5XeULsnuG2yLrHXXW5A0uWXmrFtoYdJsiLgFgdhieSg5MZKwzehvqg0293NBbZD8ocM3GL8WEq6YBzUkIKjK2SOpd8QPgO5hn4hOaTkg%2F%2B3yoRJOgkG1mVgGGSsyAyWKMB4%2BdZgt8TWDdjhK8yhndQhfV4T8YOwWnJuIWFNkvc7URStHXWl0Gs%2Bc3IL7hJ4Z2MSdPiej&X-Amz-Signature=3b5cc511c1c51726435c295526fb1c11723194862d08caf313fa2ded380c41ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

