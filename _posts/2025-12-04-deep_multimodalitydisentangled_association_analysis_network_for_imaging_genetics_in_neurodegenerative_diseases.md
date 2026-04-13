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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667K6YDXQ4%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T223225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGiV5rzpNREHj1rmB%2B0Hjzbm70itSkNYlyBffnPCN%2FAwAiApuNOcVoAVdmIqbZEozNTJEHGAKpvis0ulFl9xW7PxVCr%2FAwh%2BEAAaDDYzNzQyMzE4MzgwNSIMT57Txtcaxs16vHB5KtwDoCPtlMysanIxCaVMxWZtVJ9YPs1%2BQ6MJGDMOXFLqvRpQXkZTcZh87QbrA3DSrl8g4BHOMfMINd322aHhmAFE%2FwXqADGIJVI1%2FWw9P4Fm15lflOiXhk6m%2BI%2F%2Bk665852tTbUy0AWONZBFSz1G73AtPEkicNQn%2BDFmDIjmUtBihzQqrGac7dp3S7Q%2BwHac7vpyIkXPHlbhyhpfnckino6zLB8GAMgXlR0v9HAHA4nXb8Q5S9ma6cgnnfJyymnLMLncuB2KkOOZcTM6D8WC5bVmB4Jnilzp3hhyFSTkZ8tBb92T9zAcbH4eG73AGHUd75gVE21YL7fIPKndPgdUmHAR%2B1EEHO6iNjkFVc%2FZYqM2mI%2FlpXdHsABqqBRlMJH%2FAZfgLs5W8ZWZlFUanABDYhgZtIDUAEcn4qLgVKtNtNgttFG53l0kCsaZxp2KDNffCDzCiiWslY8gD2ZUaSke2Uv106to3ik64dDLjpxIGryDJeECZGDLDt5ezLUt35nYY0SBf7RWolxyxttIMCAh%2BNJbqb7FQgF4wgiM7ofs37pxrhtJ%2BfonhvsyRZPDoGuoQJiUD5pg3NSA6gaZQZqzPxuqzK%2FWtySnZoebiPf67zQYuDiqIfEnf7n%2FxnRKK50wrrX1zgY6pgGrF7wOWT55CDha63122AJl2XCXPkhBaBKephIX7JVHNWygywfg2JsArAWW7sIZiGnLy7mWbx%2BxNPZO9bIikbkOi%2BtAiou%2FGS63oeOiifUDBQpyKKtdk2weDTKOveojx%2FraYsUadiwqAsCwHweLhpNwf46LO8rOEdubL53ZiNCxXhhxH%2BXKveD1efZQZ4%2B8eoKJTRs4aQRZAYyN2a87bO94tw5EPqyT&X-Amz-Signature=0e9cf9a908efcfcdbb0fb4808dfffa0c5bb5505341a3d6c6516d5dfe4146d31e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667K6YDXQ4%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T223225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGiV5rzpNREHj1rmB%2B0Hjzbm70itSkNYlyBffnPCN%2FAwAiApuNOcVoAVdmIqbZEozNTJEHGAKpvis0ulFl9xW7PxVCr%2FAwh%2BEAAaDDYzNzQyMzE4MzgwNSIMT57Txtcaxs16vHB5KtwDoCPtlMysanIxCaVMxWZtVJ9YPs1%2BQ6MJGDMOXFLqvRpQXkZTcZh87QbrA3DSrl8g4BHOMfMINd322aHhmAFE%2FwXqADGIJVI1%2FWw9P4Fm15lflOiXhk6m%2BI%2F%2Bk665852tTbUy0AWONZBFSz1G73AtPEkicNQn%2BDFmDIjmUtBihzQqrGac7dp3S7Q%2BwHac7vpyIkXPHlbhyhpfnckino6zLB8GAMgXlR0v9HAHA4nXb8Q5S9ma6cgnnfJyymnLMLncuB2KkOOZcTM6D8WC5bVmB4Jnilzp3hhyFSTkZ8tBb92T9zAcbH4eG73AGHUd75gVE21YL7fIPKndPgdUmHAR%2B1EEHO6iNjkFVc%2FZYqM2mI%2FlpXdHsABqqBRlMJH%2FAZfgLs5W8ZWZlFUanABDYhgZtIDUAEcn4qLgVKtNtNgttFG53l0kCsaZxp2KDNffCDzCiiWslY8gD2ZUaSke2Uv106to3ik64dDLjpxIGryDJeECZGDLDt5ezLUt35nYY0SBf7RWolxyxttIMCAh%2BNJbqb7FQgF4wgiM7ofs37pxrhtJ%2BfonhvsyRZPDoGuoQJiUD5pg3NSA6gaZQZqzPxuqzK%2FWtySnZoebiPf67zQYuDiqIfEnf7n%2FxnRKK50wrrX1zgY6pgGrF7wOWT55CDha63122AJl2XCXPkhBaBKephIX7JVHNWygywfg2JsArAWW7sIZiGnLy7mWbx%2BxNPZO9bIikbkOi%2BtAiou%2FGS63oeOiifUDBQpyKKtdk2weDTKOveojx%2FraYsUadiwqAsCwHweLhpNwf46LO8rOEdubL53ZiNCxXhhxH%2BXKveD1efZQZ4%2B8eoKJTRs4aQRZAYyN2a87bO94tw5EPqyT&X-Amz-Signature=0e9cf9a908efcfcdbb0fb4808dfffa0c5bb5505341a3d6c6516d5dfe4146d31e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLQ3TMPX%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T223225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEf%2BQBIGcyH9BNt5NS5LNUfN9Sgi2GXAphviK148UIPYAiEAngsC1i%2FV3B1Lcu8Kb1sG31KYHZCQY9UdVfrd4hiKEQUq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDHcFiP%2BHsg%2FrG%2FW3HircAw0YNWSv8roWnYIEIZLfmYISkSOTmSuIHf9632UiZzR1lOUSLXxTPBSkIEpc6B%2FW6162QMrrW%2BDzpf6AoqxAGEQXr78TVjUSShh9VEYoEBNVlyVPF2uHgrT9DTaz5AjzVy4GSWU66Q281SIw051T6kDkgZd%2FJWmfnIpobzoUD3N7nTqykjU7QjD5ptugOjdRFCg1p9%2BuVPkvj2L3MPmkUY4dponyIeImUu2ENEsAi5iOo7ro4XQBKfj6VTEdeFpSNQB0P995Y5KAfUklB%2BNqc0qkTc1WY6%2BZVVOdhfjImtiC4i6e637FTTJ7PHCv%2F0yciMBHpnJsXHrFA2z45S2%2FYdz3BFTaOhzYQCWLyWQk89cQEDLNqrMg%2F1CvWK6DtBLC9%2Fc0X9DULM6IKIXaDkfJjDey0MmdRYgiI2XueWlV%2F5cLGt6keZF84CMasPftBbk%2FaGadpooWb963ereIyvUVyTtYH4BeSaTDZrWapJ0FqVyAvaTzhl6kgayiRgZN6BY%2BfiVI2n7vlLkdiRaz8W4inaeND2fokVNcya7zkMvYxrpcirv2EkK7T6%2BXKjBXMvRaEtOLc00v08rzIDM4QAWQZjliNBnVs2QYts78Ybkz3H2f9lZ93LVZaEhJghn9MIO19c4GOqUBLqQ%2Bml8MgIroQMTp8imK0vpmAb%2B5CI%2FkGKmJB0D%2BlBpKudUGjLd2DnmFAVCghoDoNqlLST75FUDCsIqUQ0DCdVJWI6r3w3xRHWdcaOpMe4Jo0gDiyKMTBja4s8jV%2FcAHd6QUFjuDMaKtiPWoOXQ6NUO6OymJhZ%2FumqjCwNtx1C9KzQE%2Bv6PISMkodiLE%2BVhfHybdHbbEbRcgBHHLA6l3PPH9ToxY&X-Amz-Signature=62c0382eff870127425cbbee053924717f630ecce8487c38dd16c11e5c3d4cc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5KJ4IBI%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T223227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCcBASkCAxrP9mZT9lpSLh%2FCL7zKDAvUsLyY7BA1hg%2BWgIhAL9YPpNvNs%2BquCa2sJI3HfWTluWQH6N%2FqWkODDBbna4RKv8DCH4QABoMNjM3NDIzMTgzODA1IgyLzql7ddSwRbqc6psq3AOJgE%2FsNFaJODP%2Fd4NbXmg%2BpYK9pmJsOvh3JrnrdYUVwxHfQl8zU1OmUapvdQ9izuA4D2aPg9GvrixZjbEYiQif6HqwFTzDGOYGvUZMxrgejxS9Ws8nBBUgEw0c4vcLVQmhVr693b0ZcvBu8hDh64eLPehKLx9ha%2BrrF62MMirUncwCncRutK%2FK0uHWsMxSG05GBMkAbHYr1eZiSqoh2VtEjIt5c1T3uECdyY%2FqaMPWArEEZ9N%2FmitKzBlroPr6C2T%2B3T9l5tmAZNDKMonhPod7wdvXNVjMUtP0rDwK0FSp1XwkPnAt67yjsKpDoY7Ed1wyubcFqtd7hF%2BAxQvig7w4IABDoEJY8T7WNpp92UhO5ld3UK0jWpN%2Bo9Yv5HuA7ZSf6tT8fgkuBcFTliGbkqwIxNp8GC8LfZdgcwyUl9cKJyqtbk%2B72sRKMHLd%2FdTpa104Jk963dpT0P30IfYxTXutY28fnL2xjd%2BZY3%2FmiaV%2FPXVYcz78%2F4R6wWTu%2FzO7dKnkz22aPGi5nxQNBxesJPe6RMn4YvNI6Y5eahD1tkgBDAIX65nyrc5lYrFP%2Fys7p78NK2G8JegiarT4skM2owQPQ2A4DcQu51a7nbZIBLulu40yQ219id6B9KItdDCDtfXOBjqkAa9PIWUOrDNxcsleGpU5YRX2%2FMdAmCQ1zZD%2BpOk%2F1dYMvvtkK%2Fn13wg%2BCdTB%2FFi3gixbpnRmccFESWy37qMbIOEy5l%2B58MHFlBDmpzZpnRByNZNu7g5MDa952TlzvFh5CgHROnMZ2mqnY%2B5cQk3XK36eaD4h%2B3%2FNgAiR%2BsjVXLzUuTOUUHoQ3GRfLPDh%2BaYyJf3HRJEo%2BoUKD4jnVnjA7tkG0EbQ&X-Amz-Signature=45a7282fa0b1e2da6b9120f96f8137a43da0249b7ee87cf434b0c5df2d75dc8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5KJ4IBI%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T223227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCcBASkCAxrP9mZT9lpSLh%2FCL7zKDAvUsLyY7BA1hg%2BWgIhAL9YPpNvNs%2BquCa2sJI3HfWTluWQH6N%2FqWkODDBbna4RKv8DCH4QABoMNjM3NDIzMTgzODA1IgyLzql7ddSwRbqc6psq3AOJgE%2FsNFaJODP%2Fd4NbXmg%2BpYK9pmJsOvh3JrnrdYUVwxHfQl8zU1OmUapvdQ9izuA4D2aPg9GvrixZjbEYiQif6HqwFTzDGOYGvUZMxrgejxS9Ws8nBBUgEw0c4vcLVQmhVr693b0ZcvBu8hDh64eLPehKLx9ha%2BrrF62MMirUncwCncRutK%2FK0uHWsMxSG05GBMkAbHYr1eZiSqoh2VtEjIt5c1T3uECdyY%2FqaMPWArEEZ9N%2FmitKzBlroPr6C2T%2B3T9l5tmAZNDKMonhPod7wdvXNVjMUtP0rDwK0FSp1XwkPnAt67yjsKpDoY7Ed1wyubcFqtd7hF%2BAxQvig7w4IABDoEJY8T7WNpp92UhO5ld3UK0jWpN%2Bo9Yv5HuA7ZSf6tT8fgkuBcFTliGbkqwIxNp8GC8LfZdgcwyUl9cKJyqtbk%2B72sRKMHLd%2FdTpa104Jk963dpT0P30IfYxTXutY28fnL2xjd%2BZY3%2FmiaV%2FPXVYcz78%2F4R6wWTu%2FzO7dKnkz22aPGi5nxQNBxesJPe6RMn4YvNI6Y5eahD1tkgBDAIX65nyrc5lYrFP%2Fys7p78NK2G8JegiarT4skM2owQPQ2A4DcQu51a7nbZIBLulu40yQ219id6B9KItdDCDtfXOBjqkAa9PIWUOrDNxcsleGpU5YRX2%2FMdAmCQ1zZD%2BpOk%2F1dYMvvtkK%2Fn13wg%2BCdTB%2FFi3gixbpnRmccFESWy37qMbIOEy5l%2B58MHFlBDmpzZpnRByNZNu7g5MDa952TlzvFh5CgHROnMZ2mqnY%2B5cQk3XK36eaD4h%2B3%2FNgAiR%2BsjVXLzUuTOUUHoQ3GRfLPDh%2BaYyJf3HRJEo%2BoUKD4jnVnjA7tkG0EbQ&X-Amz-Signature=ce01d98e404dec3d1e1597ed84ed2aa96ad72504d0bbcbf65100055f5bf2a5f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667A7ERHTF%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T223227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEABGzMb6HrYvKMNViGS7h0dvMVH9JLo33M3J8ob1fx0AiEA8O37yF8ggjzfr4FedCoP9rihUwU12Ab2obZL0iEpMIcq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDHFhmTF%2B5yaDB2SI2yrcAzqOKihney76vS26uXxtt7BwQgDZCx4CHM6yRiWTIrdvrnMZ0PJKs51FXLh4fKYQxgnyRk8a3FxvxasYHgnKPBoOt%2BCfymr8WVu0xvHslTKurxGc7%2BNA5kz7GuRNyG5BVXUa%2Bo75rZ6ounAn%2BIGsLRnHZMcajGvbalwlPryEElI%2BvTqGWQFAd8unNyLYRPKMqMVasIYqTQ00zK7ViGOL7qfwxqAtTMqz40ViKLslfPb%2BbZnw52LeBis6lH%2F9SiH8Pc6SooByrNEPhJtefMj2eRC45wnaCOFDNPR7N3wjhmZrQHNYfq%2FH6FpK82lKeb5P%2FJ11IqnzvdpnevhMJOKmxE5XK1hMYtMUUqhAzog7OZULAOUzMK152ZLUrebBqg2y0Cvgqf1nR7QNR3wKELsC03YbYOSXn9IpwiZDTBkAeADiFwBBqFKGebaQJYfivZDzG2WLwtzoVx0MDUYFgMvQuY%2Bfu2bbdEkS9QXklrmv2x1ABfwGJI1PcDRdK%2FNC9h4zQrFEIiUtvIxFoy5z3kurBISC14jVlJpSW155DXEFVGs88rsb2Xm546DbtOXJU%2BN4b67rZXb2TIjhohxGaxKBgfvMP0UPXXrTsS1EsAwmztHA3efFbX75iyPyMax2MKuz9c4GOqUBym9bkPZZRY2kroK7eGuxsB3f8Oeso2iYYU9QoyscXfjIOzUCciC%2BGdIFDp3FqerPuDq%2ByN43YHpmhLJTKNCGdXtEoQouFH0G0%2F5GbmfmPhVPsewjoI9n8L1%2BB2gZK8i2jYRiUXYJby3yPDGdTMAq88rody%2F12jxqolCyGo0kERU2HR90IBIb9S%2BzUhZhhIR6tpR3H83%2FKc2YRwLRTVzRGh0LXfAu&X-Amz-Signature=3586ce0cb70c9c1ebe78d8f80b9db66cdef03b512e20228427b8f5598ccf0a41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRBMLRYC%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T223227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD4k9XHKDfAq4tI1bZtIXH3u%2FZdz9gDnliUJK4TL1i7mAIgO%2FtQtZ3IzXDQGou9pw6GlPwoxESEm4pXVYTM9YcAdo8q%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDM8JKlw6ziEvIzEIlCrcA%2ByUIe2cwaHQUEBvKzar8tI4axuuI8%2BjdN0nutpECZwygNMqkMba71lhBbNcLZhoTW1q0AESbWnxi8qf%2BA54KW1WHBekjNE%2Fiz7UkbpIG6FqkY5D3wsoCzDd%2FkSV3Ulq8SjT2Nz4V5Xh%2BKVH3LJP1SDGt9S2ixwthJ98vKcOjdlfisB8fw1Bl7JUumax8Dg3cvXtyIFtTJpsV9r0p1N0OAZZxtfYlPILhb%2BI%2BZtZTVwc%2BEEhUG0lcN6wcl2cra5GbNSjJs4HujsUQOHGIFmgWt%2FqoZM8MCn5FT6Vc0FeXXokvQxluTUlGMnZFwDjqSx9NsSMS13cnFP3g40z3M7GKHoWoEclwH8YyyLsUWPud0lB%2Fzge4mlw1Zpi52%2BK2HlE35wD%2F8MaF6rhRxhqeB16msopkqcLP6m3OZOhaudImggRauuR5XtxkmqZtLI6Y22ZOWsxGiwlLs3Zw5cveRNTsHPMnPnBLQUAvfPIEYdFO56Xu%2FqNHo%2Bbz6vQmD5A4UwrlFj3cfu6noVIK0SPqfzBrTjFpahn9Zws4JwIVq4m4XqEbw%2BnI2HarVWcqgZBipoE%2BDPSGZdqfTceE%2FTNRr6nPC6J9Srd%2FsEjL1NYNwG6Lp5ymeF0uLzK0ECwGr%2ByMN2y9c4GOqUBwmgo4l8JTdGmenLJF94Vuo0MD31VkLmgGuBNGTJbpd0ioG%2F7L9CDhalfwZN%2FdN0eQT0Rf%2FnzEuYJ3ZDYx5Ioq4jXfZW5bfXKqkAuNm0gqe2DJYo%2B30re6S2fN1wOOdct35BX%2FZzoefRos1olEjUAllOB%2Fs780XQuDi6DFKG3DcLDagoQe0gtllNpZ%2FsyFAhLf%2BjFoVQh9FlpKk3FnBty%2Fh9YdEi1&X-Amz-Signature=750c6441bdbbd632125c372ed316fde8e7d02c688b823c13ff0f085509085636&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666E4JUVQG%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T223228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEWQ7xXz3tR%2BwXYUX%2B2AWNdKr1%2FZ6ics6qEY8Q%2BdB5aBAiEAmyV7JgLIhOqT8hTBexljGarv4EX%2FPlUxO9DF2qldiRoq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDO0qL7oUC8miHMvSlyrcA%2FqK79DMRpabGVWlHOGn%2Fx9JrfXBT0rhn%2B%2BSR0PVHanhqF%2F6neGkfedszgP6Amtuc0DR4cRrZyF2p0K9VwTVaLBhmKSqCYzbFJ0R%2BE13ZcvovIrYuVkt7mVVZAq28NZl08AwvvpjPD5lawOFyo465xKiauIratdtjhPUwahDpJ4BuqxRe9dN97bj6qZwXR7W4tJy9jXz8aOuNBQilT1qiHj4qQljhIuzgFk9zG4IqOBclkLt4nhq3GaDPCOf7G0PyqK5ZMTAaUqSriDo7Bh7dqmOtjTSaV96Q0sJvS4GlvU2bR9BUWtTS59GO2C%2BbqqLJquKdeqo%2FHODAe2eCEADTy%2B6E3a9FsSYaSB0BOPZLK6FKVwYP%2BPWfgMr1JrRE0qlMCtts8EOyvsccQnFPEFiP%2F8A7%2BDD%2BRzJKRZ4zRAQfqMy1AG3XlRwrRq6OmMdVRQmQlTOGRXwaLXXeD2SFoOzqw4txM2vo4p3JjIZoi1jTySTY21tnPK5mHtuhOpBYKHduy4AtUJT0bRoij3oOq5njjVr8AoQduWfHCsH47LiIxSFc%2F2sdB%2FVozTED5c%2B3YLHcmt1LTXNgohwJDL7MRaqmpMHgH8MhRjvIbI23bWwnjAMthGlRpAj5XswZSG2MLC19c4GOqUBbssZZWlFwIe0SKZWT5vxBI2MpL4HrAl%2BvWd%2FRjgsUdykTNg5yB2ZLIEX8c2LXfHRb%2BGO3mlq9bTXvV6wdaqdyFcCXjI1utEfN3PP2yTESoT4%2BOSCYXnCMtBz0UcaUR%2BYzyk3WkpHma6%2BZ7o83h%2FEzI%2FFEvxhecBFVhO%2BJBureTyavAZD1GoPW06i48OwpTVCLvrgu90rPJAzn6xBWlbxfLynTBzl&X-Amz-Signature=a74c9ae20a15e82d0648b85e533f7a060ec72c6e0e9969cd8b38c19118cbbdf4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664DDCX2I%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T223228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBoN%2FqFVhwNqzecxst06H1EpW3nZkJ9f1iHhGP1noR0HAiB73WrSSZ2QPvt5jBiY3WHdDvxc9qKgyOpqjBmNCBZ88Sr%2FAwh%2BEAAaDDYzNzQyMzE4MzgwNSIMRsdlwhEdLiJ6vJHaKtwD9ccdiL%2Bosdi8QjXTL14jRiWk5yqaSq41pkxmhqf697X7Yo7zcYWcAK71jEtaK%2B61xujNSbggoi%2F3y2Yr000lcMseQjL0aVJ9n0IxXxJHrPdhIPosp3stth1lsC%2BLGyXeXWZxSSDXquTt3sXXZWX1RKnmkX7H9kf8SBdR9PGz0R1NRMj0K0k12YG%2B1LE1f5%2BxTNgH22nw7sTngQscKdAUOE0ybK6PKd5yj9LCOutybSB82vq7oHLb0DqbfBYovBBz8HD44cK5Du3%2F3gZsdOlGgJcFinX0x2PwrSZgy0heKn3e9yZemacdGbiej7Ezyalabl8RhTvzn6BLAOhKyY%2B2TA9jZdtDNx2xKjZ%2FV3MIaFRwlWR%2FZxEAGV%2BSkqi0dPPVTeuq7znP2u8HBnBdXINUmrOFu5uwP1XpTKlhEC4WfbYg0jig%2BhP2Nu3GgiSsFkpo1xjdxn%2BhQpl6OH%2FeRJ1jchfWkmjbuERtwi5pEhCaF%2Bv5vi838KKL4Cc38O9LuzO7Qb2JzTlnJ6vi82K5LPf9gXiP2eQGpB5JacUxJoLbOEHm1gEI7N%2F9AKaKnj6wQNzLyOX96VtmR4%2BrL9WL%2BdqLsQ9OgDisKq%2BrTWrGT%2FcNJDrbFNmdHPsQ3IJX7BYwgrX1zgY6pgFFJHMUH2GAUqMbiPGwqKVsDVvycg8IZjMSsGyrKgCeajJfC036nu2m7e63qm8Rf8zbm5ypJRBK%2BaR0LJtU3IsHlAgF1VylvypX6QmTyxgiBZSBYhprggOvvojPnx4LgPsWoJe%2BQarMLN51x4XAxF%2BHyoPHogVSEq8eIy8LZU74MMriSJE59%2BNdYl7Sw0Ibzev5HjV3iK24J1fSKiHfUgAaJ7wqyMZU&X-Amz-Signature=e1c2b5b0b7bab960201f161775977f0bac126e9014b27696b8c5fac82d91813a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664DDCX2I%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T223228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBoN%2FqFVhwNqzecxst06H1EpW3nZkJ9f1iHhGP1noR0HAiB73WrSSZ2QPvt5jBiY3WHdDvxc9qKgyOpqjBmNCBZ88Sr%2FAwh%2BEAAaDDYzNzQyMzE4MzgwNSIMRsdlwhEdLiJ6vJHaKtwD9ccdiL%2Bosdi8QjXTL14jRiWk5yqaSq41pkxmhqf697X7Yo7zcYWcAK71jEtaK%2B61xujNSbggoi%2F3y2Yr000lcMseQjL0aVJ9n0IxXxJHrPdhIPosp3stth1lsC%2BLGyXeXWZxSSDXquTt3sXXZWX1RKnmkX7H9kf8SBdR9PGz0R1NRMj0K0k12YG%2B1LE1f5%2BxTNgH22nw7sTngQscKdAUOE0ybK6PKd5yj9LCOutybSB82vq7oHLb0DqbfBYovBBz8HD44cK5Du3%2F3gZsdOlGgJcFinX0x2PwrSZgy0heKn3e9yZemacdGbiej7Ezyalabl8RhTvzn6BLAOhKyY%2B2TA9jZdtDNx2xKjZ%2FV3MIaFRwlWR%2FZxEAGV%2BSkqi0dPPVTeuq7znP2u8HBnBdXINUmrOFu5uwP1XpTKlhEC4WfbYg0jig%2BhP2Nu3GgiSsFkpo1xjdxn%2BhQpl6OH%2FeRJ1jchfWkmjbuERtwi5pEhCaF%2Bv5vi838KKL4Cc38O9LuzO7Qb2JzTlnJ6vi82K5LPf9gXiP2eQGpB5JacUxJoLbOEHm1gEI7N%2F9AKaKnj6wQNzLyOX96VtmR4%2BrL9WL%2BdqLsQ9OgDisKq%2BrTWrGT%2FcNJDrbFNmdHPsQ3IJX7BYwgrX1zgY6pgFFJHMUH2GAUqMbiPGwqKVsDVvycg8IZjMSsGyrKgCeajJfC036nu2m7e63qm8Rf8zbm5ypJRBK%2BaR0LJtU3IsHlAgF1VylvypX6QmTyxgiBZSBYhprggOvvojPnx4LgPsWoJe%2BQarMLN51x4XAxF%2BHyoPHogVSEq8eIy8LZU74MMriSJE59%2BNdYl7Sw0Ibzev5HjV3iK24J1fSKiHfUgAaJ7wqyMZU&X-Amz-Signature=baebb86b6c7bcc7124d0dc54f041551fc8dc7e0dc40c71570cc34cc6bb389bc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZT755LQS%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T223224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDIBEcYgFGHM0XscZdzaz8MPa4mK5oS5mn3FSLuhUECEwIgS9SoLWuvDL9aYX9%2FGG0ppW3qRkWsigxEJp4kJg5JVtEq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDApGI5CxTFYH%2BuPQAyrcA%2BzxWB7Vzs2LawnGYSKxQMZ12C18%2FNidKvtP9sQo3x7EE5v8iaFrDFGHV8Rmlt7PtUPxiH%2FitZe0CPHfiYB5d3NtWFy6InBFGOMSRvjrvFG1QqbD738w1czhJijDQlv5jdfA5fOBj848qAKkpnu2cZObxcA5mQDdyLPks9qLnUEFJJx76Tb9mctcQHl1zhyM2mkuOLbyycRsTelabUDxYAqw%2BPw9MVylMQMEOKtxHzWmm3lnOiEoDgCWGlDocQQk%2FUdDfnaHyx6OOU56GupSPtHY%2Fll%2FCi5gyA0axihPxH74%2FOnN9YYwQK7Rex7WB5FPF4YL4sPBNgwFdib3lqf5oml%2BVD5aiCIKIOX5Ck5QkkhZMMrS2gz3AipmN4EAtShbQP00n3eea1s%2FWo2VW2WzmkjX8eY88KNqGFFqLoKY%2BrI5efb5gHicLfGKnZl43Xa%2B1dBbacegfboUx%2B3Y7tFAVdOmhQwSscE0S%2FMNSjpR5KtrzQhQ2vYIXAj3MRYj6%2Bzz2EzEaniXwB7IC0i6NDXSKAMb0pv9DhjQXtRqWctOUwbDrZHxle02rsnD2X%2BnQCor%2F4wAR7rEMLBwFpEnfny83IPb2%2FfE2oSRtJ%2FBTkg5NOSr3yR%2FO4c0lJ%2Fk2h1GMJez9c4GOqUByn4HcmED1wjbDkcUx%2B8hb5PMzd6h71og5HOgTUXpn7vpBYPJfflMz9TAxs7REXQhwEluAPZ1TA0g3uvyzoAYRi%2B9KPMYVC5dYcbzQ1rstfuIfZMw5AvMZjREq4Nesf0mzfA3zLplxL2VPYMJgTj7Vr1nEiFoE4bcp1DFoHBP7WhmLZvzwoPzSBf4%2FbAE9m8YaIBifSdLVD4vnsS1jWQUC1JJPyOG&X-Amz-Signature=3d1185089116b54c95f6e4954d04fe1382d3c3b4daa804f392b2bfb292160d76&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FKOBKAT%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T223229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD42d30TmeCJNu1u6LePPObIQZ5EmRngJKEBPV6PzVCjgIhANbxjG8TWrxxfT3onqZpiMHPUX5D0wavX0PbNQ4XOGwSKv8DCH4QABoMNjM3NDIzMTgzODA1IgxT4W%2FHwHQjQzhIOUgq3ANeV8BRkwOtmcvF8du82JEDWa0qyuBTT7gxE3vkUmOuOOG8OIILWJFD1hqnfP6VjxTaVbDHT9qqIThl7OY0EBCCfyNOh8NmWekUt8vLg6gic0Sbzw95kgn6hQFxw2G1SOQq9MOMpv21WGg%2F361tzJzlII1E6rb4Am3%2FOnRbN0VC1m3BcYaFZp5%2Bap3QSDXPJ6LtkR7Q%2FxJyODZRD%2BrGVVJQfsnc%2F8i%2Bq%2Bm795wGVSab9FvmQDheZiWHq98zh60oiW4ebPb3HaJk9gs9i8BtVjPz0gZMp5UQ0XKrncHEnAT1gDFbUk7RPewkhNcyzkPDjDA2rCNB6a3hM7c7%2FUkV8OZPhi1uXbZ61dPYhNRj4RmQBg4GeLcD%2BlqHLC2kr%2FkdJZW%2B4829smolYkU304ryxm6wL8X2d8Cxl4WWVcIVXPLzm%2FXNDbh7o7nP5cH7gPjmcUOp8vN451TGIQDSyUdsgKXduHnk%2FbYAItc3IH7Smg4xh4V7WRz1%2FzTlVbBjpE6jVZ%2B%2BMvgYGxPZVFHHHpd05%2B2yWhdRgAPDmzicMcVf7S%2FP%2BMu5v5CSnkMisUnBBEOoG%2F3U49%2BFwio6M7nOqXGqcWDfrQuq0N0cTZC%2Bfe5mZxb2rphn2K12dGXtPelehDCysvXOBjqkATdcD0zJYDmqR5Rgs0FNb6bUNsywVABko9%2BBtVVRMnz5xR8vmNoLHrfgiHeSEvOKWs3FaxKvJaHWtDXyVFFfIRNt%2BAGuR1HuXJjSZzfFxFpDJAou%2FG9RoKd1kyuF3nJOejYqhzIHurkggK0QHDJh2DwIdxNwxk5k3Gix8hgd0DKyM5RL6TxFtleJE%2FMQImsGODuI9NIP0RtuicJNghNNc40bG2Wk&X-Amz-Signature=61aaf9f2f761d15061ef1085bf745fb8ff50cb70eac6327e098ca52b93b565f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FKOBKAT%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T223229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD42d30TmeCJNu1u6LePPObIQZ5EmRngJKEBPV6PzVCjgIhANbxjG8TWrxxfT3onqZpiMHPUX5D0wavX0PbNQ4XOGwSKv8DCH4QABoMNjM3NDIzMTgzODA1IgxT4W%2FHwHQjQzhIOUgq3ANeV8BRkwOtmcvF8du82JEDWa0qyuBTT7gxE3vkUmOuOOG8OIILWJFD1hqnfP6VjxTaVbDHT9qqIThl7OY0EBCCfyNOh8NmWekUt8vLg6gic0Sbzw95kgn6hQFxw2G1SOQq9MOMpv21WGg%2F361tzJzlII1E6rb4Am3%2FOnRbN0VC1m3BcYaFZp5%2Bap3QSDXPJ6LtkR7Q%2FxJyODZRD%2BrGVVJQfsnc%2F8i%2Bq%2Bm795wGVSab9FvmQDheZiWHq98zh60oiW4ebPb3HaJk9gs9i8BtVjPz0gZMp5UQ0XKrncHEnAT1gDFbUk7RPewkhNcyzkPDjDA2rCNB6a3hM7c7%2FUkV8OZPhi1uXbZ61dPYhNRj4RmQBg4GeLcD%2BlqHLC2kr%2FkdJZW%2B4829smolYkU304ryxm6wL8X2d8Cxl4WWVcIVXPLzm%2FXNDbh7o7nP5cH7gPjmcUOp8vN451TGIQDSyUdsgKXduHnk%2FbYAItc3IH7Smg4xh4V7WRz1%2FzTlVbBjpE6jVZ%2B%2BMvgYGxPZVFHHHpd05%2B2yWhdRgAPDmzicMcVf7S%2FP%2BMu5v5CSnkMisUnBBEOoG%2F3U49%2BFwio6M7nOqXGqcWDfrQuq0N0cTZC%2Bfe5mZxb2rphn2K12dGXtPelehDCysvXOBjqkATdcD0zJYDmqR5Rgs0FNb6bUNsywVABko9%2BBtVVRMnz5xR8vmNoLHrfgiHeSEvOKWs3FaxKvJaHWtDXyVFFfIRNt%2BAGuR1HuXJjSZzfFxFpDJAou%2FG9RoKd1kyuF3nJOejYqhzIHurkggK0QHDJh2DwIdxNwxk5k3Gix8hgd0DKyM5RL6TxFtleJE%2FMQImsGODuI9NIP0RtuicJNghNNc40bG2Wk&X-Amz-Signature=61aaf9f2f761d15061ef1085bf745fb8ff50cb70eac6327e098ca52b93b565f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5R3ZCFV%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T223231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCPEhKH0G6V8jy6jOs%2BezqnR1hc70rV%2BZ7soa0Kmq29dQIhAJ%2BguWZ9IOIxVppAzeQlzNaQbCDV8c8wESVhbvgfV%2F3BKv8DCH4QABoMNjM3NDIzMTgzODA1IgwZFmPhuJxlGliMsJsq3AP82EyQzyo23Mw8s0vTXSuhTj4b6U3BLWJFT5XQJqJF%2BeULR0GZKCEfc6%2BDPVhcmoHu8CI7SoUkDN8f4snGGE9Nx3kBSEe6HZWjIwlDwP7UZGqR4w4ApUvxvqySEqKzPnXvkzBgAv6HG3GMJpD5IHTfSM7XlfmHOVqAsFGevCcTEOfZW4B2eBY5GLSrtNmcfGzyEqiI8NDRl06vZ5lSyn6ALwyxgihu4K6CNJtbKg%2B9FVPDq4R0ErlEBNp6DINLSfmecgU6t1tnaaF%2Fv5vTNyFX7JDfJc4IaA7ZmbmzOB17xwlUFETsODdWrCAJ6a4FVITrl9yairiMXZ%2Fs0sp9XrkCeXAJJDeLoz2jZ296FZMExTbzF5GVxGbqb9w6dp9F6gWVBk8PgFB8uLbEO%2FYRbbb8v8D%2BXmCRAUCuJeZuTrRst06qSW7nM3ZUvDj%2FKsufWqmzZP%2FA%2FVYlrbTG8iLMnjc78Xiq2AfD4%2BmEzuLBeUVClRK8Gj3XqRB29ADUU2q8P6ZD1kQSKStrmLoqoUXNba6SVtqpa2KWh6%2FQnunkF10cLdUk8cZtyGz88WdydroDCP1FVMZREStnjub4UZhXxjCTFcYd53pK0pvZzOVB44ueSGn7CXEZzWf%2BA4tVnzC%2Bs%2FXOBjqkAZEcV%2B%2BSK%2FjGyuQ3f%2BQ1q56nMbdEtxCWl0bxVQq05yQcZteXvwrB1Y2fWk00aQhY3i72jBsfZoQt0ORwvfyf1D4tAxFBg%2FcRjWJF9GQBvDB%2BbqdILL%2BDLmUdkcXIKQDC5dGHSwaS3fITvP9HByosu6LBQ2hCNwLDd9tYlMouZNhQ65yKka4kBM7zZ7%2BeO%2FH35bTdBDdaHyEhJBthso67KGS58xGf&X-Amz-Signature=f9b24ae958f8c746a3456cd695fe0a1c336d516e642487e612699923817cf147&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

