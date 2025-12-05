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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KWTEBJS%2F20251205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251205T220106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDITLFPei5mKrom%2FdanEFhYH5kqv4APhmySm3yxZTKZaAiAGr1wRyzvfYZl2XkbDpHuNNvhI416KqNWrIdEJSrfCDSr%2FAwhnEAAaDDYzNzQyMzE4MzgwNSIMcaJiDXuRpVqSoKfqKtwDcXU2Alz9gBP%2F8uvH1avIYc1nGHkoF1mdj4XNtBnByHwbARSwDUkIC4A5lzJS0d90Az8QJ2ezbWOBRuHf%2Fwd0JBO1uSjkLJ4bdO%2FIJRRxsdP%2FKtjqWbwGpnk%2BQ80V40nC6LV%2FFRqzkwpTvnO0chVj6%2Bd0lOQlyFGDjx9mbV7b7yE%2FEBtYai%2BNiMuCLmvRc8d9Wnca9x7TaEDO2gwxHJAGRMxlE3O3UfmYYhkU06og9adXWsksfS0tHoHHG%2BR9SH5sLEJVG0OVVSbjbr1ZSTfDjv8K7yUVqZokUwzu3UN1FqYU5hvoSvVTvCLrMrfHX6cjQEuvhQ3cUuo4fLT7Q30DjkywaIyG6nkh6KFn7emwgxyQHuzYgmT5xBEY3P7eqenREA33pqmrdrxhRirYzoAgpj4DtDu6ggmVdIyS%2BJTIBMyVhFVk5AyMvsC1q%2BxsXRuJ5uEzyoMsoCZysMZHPoaSjYlOkMMzZ8Vhksuj7hKrgmkCFqSTudSkWTk%2FEugJx7i8WXTrMCbIjGrZsKpeIj%2F0MtBjNEsO1pYmcAMJ4FlqzCYfBPc4kH8XrR4ASPFXVxPvKaCWPIPu5oR3%2BMv0zzv3zWYWYuTakPuO0LD1Eni%2BMkhxLbE7kawhkvcglTkw8KfNyQY6pgH%2FkftY9lQVEan7H1cCuqfqQe3zuM1G6Xu4FPDAKsxuEzROWENqeI%2BEQGkvj6qnb1APwxPFqQYkltYGU%2BqgcUGRCCC8pgC9EPkU6tE%2FCTob7o9RfegS8RYEmHzoiTeUPyfGTHUM25SH851v27p1zfoyIjT%2BD5HjMqinaIUXNNHnBj1hPqwPU6Dt7gorsg%2Bea%2BO0D5ifGmaghEwL8PC0u1tuf7KvRLaz&X-Amz-Signature=6859f296543c4ebfa296c8682ecdcb5f18e2270ee4440418525fae02c00c768a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KWTEBJS%2F20251205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251205T220106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDITLFPei5mKrom%2FdanEFhYH5kqv4APhmySm3yxZTKZaAiAGr1wRyzvfYZl2XkbDpHuNNvhI416KqNWrIdEJSrfCDSr%2FAwhnEAAaDDYzNzQyMzE4MzgwNSIMcaJiDXuRpVqSoKfqKtwDcXU2Alz9gBP%2F8uvH1avIYc1nGHkoF1mdj4XNtBnByHwbARSwDUkIC4A5lzJS0d90Az8QJ2ezbWOBRuHf%2Fwd0JBO1uSjkLJ4bdO%2FIJRRxsdP%2FKtjqWbwGpnk%2BQ80V40nC6LV%2FFRqzkwpTvnO0chVj6%2Bd0lOQlyFGDjx9mbV7b7yE%2FEBtYai%2BNiMuCLmvRc8d9Wnca9x7TaEDO2gwxHJAGRMxlE3O3UfmYYhkU06og9adXWsksfS0tHoHHG%2BR9SH5sLEJVG0OVVSbjbr1ZSTfDjv8K7yUVqZokUwzu3UN1FqYU5hvoSvVTvCLrMrfHX6cjQEuvhQ3cUuo4fLT7Q30DjkywaIyG6nkh6KFn7emwgxyQHuzYgmT5xBEY3P7eqenREA33pqmrdrxhRirYzoAgpj4DtDu6ggmVdIyS%2BJTIBMyVhFVk5AyMvsC1q%2BxsXRuJ5uEzyoMsoCZysMZHPoaSjYlOkMMzZ8Vhksuj7hKrgmkCFqSTudSkWTk%2FEugJx7i8WXTrMCbIjGrZsKpeIj%2F0MtBjNEsO1pYmcAMJ4FlqzCYfBPc4kH8XrR4ASPFXVxPvKaCWPIPu5oR3%2BMv0zzv3zWYWYuTakPuO0LD1Eni%2BMkhxLbE7kawhkvcglTkw8KfNyQY6pgH%2FkftY9lQVEan7H1cCuqfqQe3zuM1G6Xu4FPDAKsxuEzROWENqeI%2BEQGkvj6qnb1APwxPFqQYkltYGU%2BqgcUGRCCC8pgC9EPkU6tE%2FCTob7o9RfegS8RYEmHzoiTeUPyfGTHUM25SH851v27p1zfoyIjT%2BD5HjMqinaIUXNNHnBj1hPqwPU6Dt7gorsg%2Bea%2BO0D5ifGmaghEwL8PC0u1tuf7KvRLaz&X-Amz-Signature=6859f296543c4ebfa296c8682ecdcb5f18e2270ee4440418525fae02c00c768a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ZVVZKS3%2F20251205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251205T220106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAUdQQLDMt%2BE0tduCp6A2NtWBbEfQNNvp1w0ogWybyhSAiEAuQheGS2RWNjvMoS6a308wM5Nti%2BIbPr6LsQVE9Zq7owq%2FwMIZxAAGgw2Mzc0MjMxODM4MDUiDBAOtRKR7MLPIvf9USrcA48ffpRmMcYm0iFUN%2B1c%2BthxjAWnqA5pSkXyXHMs49iNmslOhewa%2FkZrn%2Bmu2AZS6EaW6Oz8j05Nj8KZJZx93jCaK4gpgbZybKguNqIp2cWqTE42xOifvUCOxQoCYZCzpQt7mixIU%2FKPssoFuHqTEUXo2ZKoEuD6jy1XNlyCcpkKVRCR74y4j188wMS8WsuX8DxU490hxKUFN9T%2FgGH8XWiuscG0uzcHq1moj7YKNKUGKd%2F8oVSHIxallg82qXY34EpH0jnGcrhw7hGXrB0Tmvrp8LCn5XkIx2LsI%2BTSf92Jl3afmh1v%2BRyv%2FX26WTLa0VdWG7W3yenTvZwRz979dvRXFoEj4Xp14ZLsEYejGc3uxFBiS3qtkzTKYTfqsdGM%2FZU%2BoYhmGGoY5u1jPJu7sXYA3ORAv0vxF8iOt09YpHFvGdsbCIfjo%2F4NkJ43Hyk2YVn%2F%2BBfW77u7xiURw6%2FqczLnwdBOD564sz9qO13aCgn6OVfn7lkzJyok6ALEruwYhdylvMWKFydoL1Yl%2BKU2xRR%2BQTXxLxHkovhT7nnZBlQR4GYwxFgAI6V8lO7I20bwtK6oFM2pQTceuljD%2Fw5ts%2Fnx2P50IjWbd%2FFWR8E8veHhTB71qi70tflIq1OdMKyozckGOqUBqK7djVMGH0WgN3ExeoASLAF1SU8H239eLJskL%2F4XXgU5K5kDPvvkfOoBdPkHf%2BQkz80vcCnb6p51tqloIakIVpqQtmrxtsYxi9mz5XpDOys1ErEoJpaTurlloP3TqhKg8zwjPmqmja3i%2FYtE04PI27L1QWRkSJl3RGJ4CKHRfb1Ktr%2FlOKIeE%2FN9BaJb95Ddo83z01doIe2thgqJvkaIF0f1ldpq&X-Amz-Signature=6a0dc656b0cc04fde0be60c01b3951e9204da04a9aae38ea2535648ef55041b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YSQ64LI%2F20251205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251205T220109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCY1C41O3j36JJJoi6fekzeCD%2FxfuAx%2FS1UOpnJa2JpVAIhAIl%2BZIoII2Oy0A76bVDWPAMcITyDzNKYFIN3TCH0PR5iKv8DCGcQABoMNjM3NDIzMTgzODA1IgxDhsxk4zdkwrugHQAq3AOq2sAekfO1ZaihqzZj7jWdv2DDI0nKt2xZkGivmxx6leTOLo2MirSyqkwSvpdHXQl93W9s3x9SZuR2GPhTUYN2beTnEWTd9PaToF4gMcNi8NECyIWxeoh0DWCU%2B3XrMiv8INRBFXv3DPRhRlEyAwYBE14SW9OzLhr6TJyA0EQA%2Brq4ynAXH5b6u10k%2FNHvZpc04TqvjhDdCCFiWSOuV4OkaOB0EVm37cqRyxYq9iCh%2F7TwvQ60TsUeAwqYhgL2RQHRke4DpEKQmgGAOoW9KFB%2B3V7%2F3FQQIosTRLROTVAtySEhs4w9rfIEPglc14v1Hgc0kUQ1vLltQ1vr0MIMbNQ%2BU50%2FshDfVsoB9cpQcd6yV8tCij9OqlKv79xz%2Fk5X87%2B7%2Bmwy9flatOoGS7nEuDnjSFlwwlovsthjrYZQJsDNTT6W0ZV%2BZVsg4ZPj0e3dYoYmYk0mCx0tzAydE1wx40aiiK9vip8QjOiNl8XB7dmIL0xzmZUBqVfsS5KGPF13tHzcfNFc3qSjPL5BllQQXv0cHQbNAAqvvhPT5X5CQjmh0IC1Do3crqFHaPd9O9CyiYsPonpAPX1tvZnhcg4UplNjngjuFxck0SRwzES4dCIl3wfVvvXpkiZDTH9UljDOqM3JBjqkAYyT2%2BGj%2BCaUZa%2Fa1B1YZ5s3HAzzhknhEzDBkeYGrFF%2BXA6r3KZsbzesY0YXG%2B10qv6kabr%2Bj7v2%2B2%2B5H48f59oYAtttoGKE%2Fvsvfo2SYRaYv7NLmr3tNT07Hft9guWYCNhBBSiF%2BY6%2FVUyU1Mmoay8xuecGLdhh%2F1uCSQ6z4K0gHiV2hvwUj4N9zuJPqs3eOdtWEEoggdqiT3Ln5S9712Kvby0f&X-Amz-Signature=c4d9e0a8f3249669140dd31b1821429c4b68bbf153ba39444ef94ebc83f8fa4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YSQ64LI%2F20251205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251205T220109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCY1C41O3j36JJJoi6fekzeCD%2FxfuAx%2FS1UOpnJa2JpVAIhAIl%2BZIoII2Oy0A76bVDWPAMcITyDzNKYFIN3TCH0PR5iKv8DCGcQABoMNjM3NDIzMTgzODA1IgxDhsxk4zdkwrugHQAq3AOq2sAekfO1ZaihqzZj7jWdv2DDI0nKt2xZkGivmxx6leTOLo2MirSyqkwSvpdHXQl93W9s3x9SZuR2GPhTUYN2beTnEWTd9PaToF4gMcNi8NECyIWxeoh0DWCU%2B3XrMiv8INRBFXv3DPRhRlEyAwYBE14SW9OzLhr6TJyA0EQA%2Brq4ynAXH5b6u10k%2FNHvZpc04TqvjhDdCCFiWSOuV4OkaOB0EVm37cqRyxYq9iCh%2F7TwvQ60TsUeAwqYhgL2RQHRke4DpEKQmgGAOoW9KFB%2B3V7%2F3FQQIosTRLROTVAtySEhs4w9rfIEPglc14v1Hgc0kUQ1vLltQ1vr0MIMbNQ%2BU50%2FshDfVsoB9cpQcd6yV8tCij9OqlKv79xz%2Fk5X87%2B7%2Bmwy9flatOoGS7nEuDnjSFlwwlovsthjrYZQJsDNTT6W0ZV%2BZVsg4ZPj0e3dYoYmYk0mCx0tzAydE1wx40aiiK9vip8QjOiNl8XB7dmIL0xzmZUBqVfsS5KGPF13tHzcfNFc3qSjPL5BllQQXv0cHQbNAAqvvhPT5X5CQjmh0IC1Do3crqFHaPd9O9CyiYsPonpAPX1tvZnhcg4UplNjngjuFxck0SRwzES4dCIl3wfVvvXpkiZDTH9UljDOqM3JBjqkAYyT2%2BGj%2BCaUZa%2Fa1B1YZ5s3HAzzhknhEzDBkeYGrFF%2BXA6r3KZsbzesY0YXG%2B10qv6kabr%2Bj7v2%2B2%2B5H48f59oYAtttoGKE%2Fvsvfo2SYRaYv7NLmr3tNT07Hft9guWYCNhBBSiF%2BY6%2FVUyU1Mmoay8xuecGLdhh%2F1uCSQ6z4K0gHiV2hvwUj4N9zuJPqs3eOdtWEEoggdqiT3Ln5S9712Kvby0f&X-Amz-Signature=317797782b475b3af5f42e5fe7c7a139243101228fd776b5830c1cf9f70f1b0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TETRD2O%2F20251205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251205T220109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID21bAOv2H3XqIpQrdDfLFMHkbmejiNIWzLbnQUEvnAEAiBNHUWc7nOdMz%2BhYaIRqmkk9a1M7LzkJrIQZQZltu%2B1Lir%2FAwhnEAAaDDYzNzQyMzE4MzgwNSIMJ9clfpioluoGpPQkKtwDiS3ecM454%2FYbFTHEPd%2Ba73Y77td%2F6vn%2FFVczs%2BePJ0M%2FL2H5jIYEBWVhUs38AIzKc%2BvSjHlvPbllQ%2BF%2BjVphct%2FlOc15xBP40zsK1FxppDFTB%2Fgzy8wEvHHZ66PKskUDogwsoWU19R4iulxC1lWlig9WyW%2FseYeC4hVRDKrUIsJxcPuSyOUy1qark%2BD1YE8lXm%2FMBDhgs4%2BCMEkgO9lOgNjTWrJUR%2BQAIUys84iohmvYDSgpqjnID1QV3kxr8vfTKBKaOUCpeWxxt4TCQBtUHksVla%2B9MmKD%2BjFxw28KfhlPkQ%2FVsD0SXOE8DV9vyQlxOiFphvi6UGk8mbe6qVN3n8gvujFIXJHJT7%2FOwYBjj3d25ZZ6QuT4c0DaM%2FHG7oNNVZJp1bL7GFA4XbyPVTUqIMTbQLC0Q3x8lhmFz5jdRxqXM54cR4W3d4nRcjxhecHYPwO2IthHEPP%2Bh4Q2KaljmvD1iS%2BYA2kHGAAnYqaTE0VOR%2BPXhrud5p%2FIdIUxpjlyiDNqsoz6TW%2FO8ER%2BE3SdPrGh0DaAYGuDKOc8W1B1AvkMQNP9n%2BBCTjWftBGA53Yn2w93h6ECMw8uL1MtKmDG2ueWfmpo8SnLm1JjdJQcBoooEsHIHOW6GYdJ6FMwzKjNyQY6pgHg90lP%2F7gW2hcfnKo%2B265UcokM7AGXce9Ba7%2BUMIOXlM84u2jjuzLIbuqRtVnHjOFwuciPZH1URtXm5RTY8dB1MjQKJB9c9KFK0TbhqvWDeiLG6HfvQIDQpXtuSL7Dsk1L3TrurF8GlYo9CRFCl7gefxTIGjmtaf02NWv6ckaafUFqHAZkrXGHjGzDvFHhu7BUV308xbeY3DkufxwNzd4ur92Vi%2BTx&X-Amz-Signature=1ad078a966de4326d3ab8d6b7f692da30b8b9ee6b9437c708aca336f33ebab66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MCTJMAJ%2F20251205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251205T220109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCvqynoZD%2F0KwF8VFlO6I26%2F3d5WhRHsSrePpACIGOrQwIhAMSV%2BGtd03VajExV3ywDTfGsA44evkvMocBPvZDuK20xKv8DCGcQABoMNjM3NDIzMTgzODA1Igx2MXbJiYukVCqzUdwq3ANoYpIOQUz%2BKboRo3VY9ABA9wYVBgZST%2B8S6GH%2BelmI0jfS2%2B7HJw22Hc67HD19TxUZaPe5Ey9GQ4hrjbbriPGBov0w0e9e5fYbR3tKAIEgHPSPX5xH%2B6jyo57pOqBeqWTRVLfpA%2FxLBw%2BLCv6UbxGdg4UyXX8WSzWOJW9oYD3QxhL%2FsBcsK5LPfZe5at6Dn9eXyFcMaerMXcwKqN87PaBi8IfMwH4M1itOvozz4eH7tDkd32Q4atmFlTdUAZLKc1VrP8h5m60r7blYuVPqD89VbtT8F5k23SLpMsqAGsmB6avFgRmIaVvYIjDEQLVUl4SgTfSWqFkYnljCVH1Vkh0ziqgUe0Jbsl4hIVz%2FzIpq96XFiYwC8r1i2jt%2FRyMZHhVvHOWjlTYRfio6rVwa0mhSpKHCr4pRQ55w1M7zc2h79DDtN6ADlUFHuYQjRc%2F0KxULsDZ0Ec52YljwVNCXTqCvPVRRE6bLOhyz2sNpaR5KeQInBeCt8OYa5KVb2KlVpp52ZgTFPTiXRq61HFJkhGyEqCtTo%2BJChgmuLaWwWiqzpq3RIMEXEz094xThduybM%2FVBafjONppqMLexB5IOBcnZNE7MdFkqFx6XrgqpZ6VgUpJ3yH0n0SlDibxHxzDPqM3JBjqkATG%2Fkh9OZAJ2C7%2BC8vBxd2Rc2TMxknkXhh5bDf%2BX%2B%2BDZ54l71qmeJJ8fjPjvEbMbndu1c9zvy9EJ8jRSnwtOlhh5vRDdU0cYhpvzubUQf%2BTnTFNAYBF6YAyrO6uUw%2FoGmLAeTOiGqFlO9C8XmR6rXViKULEWiPuCU2O6%2BsDY4mn4pTWhwS06rTB8xqtoOuttJ1ehzGzah8SIE9TVbR0w6SHXZ8kp&X-Amz-Signature=b49edfe190a7185b0a2a3eade3b7b32d27a35eae074ddb5e488c68bb2ca0438b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TYTYRX5%2F20251205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251205T220110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFANb7fvCLBndNLqna7AeYzEVxoskSp6MPVJ3vg6n6gcAiEAhseo0LXDLM%2BPnd38y4qwU6MLiUhSrxi9Lsod3hqKEPsq%2FwMIZxAAGgw2Mzc0MjMxODM4MDUiDDB8Xs4NZ%2BdYu8up0CrcA0QXcRaLUOQZ8ueAk7xylw%2FmtGHelq8pDAFP0hlSEvk1sfv6xdZll7hQXO3gyDY9zRREo9qw2M9aGq6ynmbFXyP8cfO76s6ZZHvAt9BJWNYSqwqdrkMam0V7iUwR3pYb9EDVqQvetaJ7Kpt1wXgP1XRyC60udQ3XdXrs37cIMdbd6AmRHvVDi2XJyPGuE5Ubqiav3qLqFnmGD9NzmnFXeRSSjupMuyT80j4e07R%2BFOdMQlsiR3sa5n8knHTe1eLou4Z%2B7EcykdcQp2C7h3YJ1qUVldPTAY6owtAon05oIQ7RNv%2BU1Nz%2FYEXxghSsjTs8LcWbD9TGw863dJs4U8Zkrfd3CgHqIj35yfwbQtVzG2UqBbs%2F6twE3FDDhrna%2B1ABzdQmy8pzayJk6Z1MfW7aIoYz%2BdYrdN3I2lo7ommHq%2BhLzAaAHk9etR7WRaruJ7dpVaIWn8kISHkC%2BR%2BO0AvQXx1Ph4LT0ctmQHEn4Yi4taoshyo7U%2BP8ImdtLbS2qapjl866pmCeKFlkSHKw3%2Fz%2Fij0vC%2FeMbebs4JWedQQ4cqw%2BLezQ3PPnNTF%2B3eS84XPi3NFLJ6HRvVIHrrUXre4WfAusNUostqM8xHyF5vClMoLFxXlsenNq0blnuYF1MJ%2BozckGOqUBgGnTvK3fuRpFjpGpjOdcUxB1LwCCAOyet6qUAiPQsl37eHdXBbRy0eCbrmka6Ehx39hT4aquavLaS64js%2B3FQ3CatLRvxxkREa65zlsvzW3m1h1PL5APaBxHUddMbFSxpMfCmECgKjuNCedODS%2Ff%2FjaXuLoEL%2Fo61yIcB95y9jhMBOMVdTHEfnWKlVTMbK5jfDhDQZclt%2BOeBgbEX0KoZvejzgA2&X-Amz-Signature=ac47b2909f5a6795c6d57fc0e192aa94449c52a6185e7c577673f32d24966e1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQUDBAVJ%2F20251205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251205T220112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGHUj%2BGrbHkNDOY%2F4BTsjkws572slXErc%2Bp4frMcBRHnAiB6o1jtPbjROQJJCGRrA2mkts%2Fq9hU5KGbXfeldJhaSnCr%2FAwhnEAAaDDYzNzQyMzE4MzgwNSIMFExTzWtd1fxs0GuWKtwDedSfDbCsLnomYajMuZBIEmn00LKHichpns3DW6P7siHsAZ63r1qQWA9Z3ZQy07lBZecJt6GQEeu6TBBhz7ZfkghQX%2Ft1tXyRzTcr3ljPG8oHC8nSIYOrkIfpjBSKp%2FbLQ9jf7xUtF%2BYkfiI%2BPBo%2BbbBS9Z2Zu4ppxjXjCcIEMJG22FdzHhv3%2F4l%2BK04qK1UrOO%2FQYoDGryYJ02AA7eb%2FQDOqbp68JgUFFwUitKe04SuiECsdsAqKgfWvgETdJNNKX36DYEB48%2B3DUQ60RHxcV2o3LFJLMhpDGxXyaxHApisNLyQw4bXYq3ubugz4mV18beORKB0wXVwwFau3D%2FrhytPBAPgsQO4NE90y6qy5e6qbhQtC4O%2BZMMMWnG%2Bf6GR0F%2FEj4ULayFjSgGCKmv936bRNKJ03k2AMd%2Bc%2FaCQq3oooTzIbxjfd4qiUqSj7DRGhx%2BK6qpNgm42yveGNCQzDQ75sINNPf6KBT%2FegklySlwIsu0zOljMqY%2BUFf7gBnNLPU2pJURPZ9IrX6bNYf39n%2B7FvsmIytatf80V1xtezU9ZbZps320Cqku3yGKeuHWDET4cr03PYZgwyA6eAiVHdkH0XIl1m52TSZbKUV0uWj2oma64Cmr%2BjOlIJFVEwjajNyQY6pgGREPns3OgHB0y5Q7dvycHPx%2BE7pUmRcUFpwXkGL3wmWB6xRKMTv%2BcCnM%2FJp32XU7E4DXNdPU84aJJH5StEJJdTbsEAGFuhQ7h89fnyVo1Z3HBsKg6V43BproREii5sgKbYnahok68Ha5X8fLLHBMdRDJi%2FcRvvvUXtqalhUTEcaXWn8T7HGEG7F3B9v6LM0LRuAZ1%2FbfKhynFY12ZxxI34BsheHLsT&X-Amz-Signature=f6230263d9590717639b51185d899d7460e6b03fe6d074224258ef2d332cb544&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQUDBAVJ%2F20251205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251205T220112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGHUj%2BGrbHkNDOY%2F4BTsjkws572slXErc%2Bp4frMcBRHnAiB6o1jtPbjROQJJCGRrA2mkts%2Fq9hU5KGbXfeldJhaSnCr%2FAwhnEAAaDDYzNzQyMzE4MzgwNSIMFExTzWtd1fxs0GuWKtwDedSfDbCsLnomYajMuZBIEmn00LKHichpns3DW6P7siHsAZ63r1qQWA9Z3ZQy07lBZecJt6GQEeu6TBBhz7ZfkghQX%2Ft1tXyRzTcr3ljPG8oHC8nSIYOrkIfpjBSKp%2FbLQ9jf7xUtF%2BYkfiI%2BPBo%2BbbBS9Z2Zu4ppxjXjCcIEMJG22FdzHhv3%2F4l%2BK04qK1UrOO%2FQYoDGryYJ02AA7eb%2FQDOqbp68JgUFFwUitKe04SuiECsdsAqKgfWvgETdJNNKX36DYEB48%2B3DUQ60RHxcV2o3LFJLMhpDGxXyaxHApisNLyQw4bXYq3ubugz4mV18beORKB0wXVwwFau3D%2FrhytPBAPgsQO4NE90y6qy5e6qbhQtC4O%2BZMMMWnG%2Bf6GR0F%2FEj4ULayFjSgGCKmv936bRNKJ03k2AMd%2Bc%2FaCQq3oooTzIbxjfd4qiUqSj7DRGhx%2BK6qpNgm42yveGNCQzDQ75sINNPf6KBT%2FegklySlwIsu0zOljMqY%2BUFf7gBnNLPU2pJURPZ9IrX6bNYf39n%2B7FvsmIytatf80V1xtezU9ZbZps320Cqku3yGKeuHWDET4cr03PYZgwyA6eAiVHdkH0XIl1m52TSZbKUV0uWj2oma64Cmr%2BjOlIJFVEwjajNyQY6pgGREPns3OgHB0y5Q7dvycHPx%2BE7pUmRcUFpwXkGL3wmWB6xRKMTv%2BcCnM%2FJp32XU7E4DXNdPU84aJJH5StEJJdTbsEAGFuhQ7h89fnyVo1Z3HBsKg6V43BproREii5sgKbYnahok68Ha5X8fLLHBMdRDJi%2FcRvvvUXtqalhUTEcaXWn8T7HGEG7F3B9v6LM0LRuAZ1%2FbfKhynFY12ZxxI34BsheHLsT&X-Amz-Signature=3bd074f91ec1873b978e2702b6f5b0b6458b34d9d3660dd24e72fdc5194f2852&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4CGQ6VJ%2F20251205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251205T220057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHSX%2FRg%2BVaC%2Bktj2dSJp1qDw1mobM2ojezpPQvdbkzoZAiB5evqNw%2FI9i2mnnxGY35m2Z%2B4mHX9USNhcZmxpQJdYaSr%2FAwhnEAAaDDYzNzQyMzE4MzgwNSIMYwbF0BjiPLbyAihGKtwDAhuV7e3Hf3rDv2gRV0en4IK%2FfKwXSLO1L5H%2Bhl6%2ByRtTqUp5lx1jYvFrDpj6qgOCnWGXUeCwB1fX%2Fafk6vlRv%2F1jJJ7iJyXltZ2KWsqBXUYlumAZvTSL6PRRuRAqi1bKUid1WednXyo03KCwGeP7JDQd%2BdM090Lp0Z47tIaONlCMdcDWVW0rCTYUxf4Wkm9F%2Bodf%2BA%2B4VcapX0Y9R2QZn3jgjOM%2BniDx19Lgdk4ZUVZ99%2BjCOqX1XwYjztQSUa%2BAGOon3aXv9AerqkUkvcXNE8A4BtUj8vyjNox955UuEHtebw1fJ%2FeItLoWpOcPWQ4aPyM38xQg%2BqtvgRflUTiuM7fagyvxMDEzNUbzagEHjSDQVOJIIy5dLjwujqtnPyW%2Fv6ETzorhB5iGq6NGtbBm780Ouq6Rsrr7hPs5sj6tQ3Q62njE9kugaW8tEvEVgjwZ1S91oqde128IOos8Kd7WsishC6VZS9uh4I7PSJiMQilp9V5Wyfd1BAlktsUDjD9ItSOLhYgQJQ%2FV2nUPbjvDJmNBS4UiOzOPKgJzFVVVyzsThElNK6kpTcJdEVtutJtcHT3lDwMEzK2kpqRT4hSIJNs8HQQ7FqcWivLmPUjX0krpdh0uIkZQlYwaWh0wrKjNyQY6pgFhQUdbx%2FBf%2FoF1MUv%2B3STvq1qB6jofO3daDxx3PVyu%2FslO%2FcvvizaJQRjW360s%2B16ybd265B936bd1FIN5bYUC93U5mEgNO6iALDUJ%2Fn%2BvfgWL0qG8rbwDqdy5d11hue40559pNJT7oIzWite8bQcLDhbZxFtoefmozed2gXU6WfuWbFOmUWwzOGdA15PYKbsBSvvgZGReDqsEzx29x7jPUPbcnp5O&X-Amz-Signature=3b85504c9072ef00b4ec1c43dff9abd07fd4e9d9b30fa43146e5b9f107a522c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W42NEGKP%2F20251205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251205T220113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDoCGbDW1PyK8AT7Rd%2BgVgdU5laLhZV7f%2FLP7C45X6DigIhALO2yb24cY2ua22fPlwkhOiIRhNaC1nyKh7GjsS%2BGbtAKv8DCGcQABoMNjM3NDIzMTgzODA1Igxqblpo3mt%2BhrHc9nQq3AO5OpezYcaHDSh2cZYKk8mBhFeO4sv6CDZepgLNo3klyGOr1FMLeExxF%2FjLc0cx0Bei2kqqnIdRZAGFvV4COX3GSo%2Bwuzxs5%2FeYFzCRBE%2BZOSzj1pvj10B1%2Fua5Zl1%2BHWbcGfuRr9Y12cTjCHGanVfMwL2oyqwIG49T%2F%2FPoSH6jSAfM9WVlAR1dpCCccW2hWZ13g25fJrmMwwWqjCHThhJEePnoP0ZGQE50ZqXRhpP%2BdnaRmFgiTdG%2B1Fp%2BJXA7ruhrWV04Lj4b3ECiHYz9z%2BqBbSbYCg3I1z9thtB5zB7WXk05lonM8S3KTgAI9tp751GrbT0ozgyKvJF86iRAWFs83kwAJef8RHrc2cMR5zPKE6WIADReimtqGZVg1kBVbQoHbyWv0qeGQe2u05q7Dl45ZrBoNmT6rJu8YKiKBRHvMOtj9atkul52zBMdZgR3cqiQy5%2FdRwpTq8mW5qI%2FA7b42KHcBi10e4uoyAwx6RHUGQdRkax5hzBW%2FBsY4HtAU4Ab9WnzTLSsB3JF064G1UVutI4S3NCzUe1tMPEzWe%2B77j2%2Fh56Ey3Evwa%2FYwuAK9H5yAUjyah2ULRJoeKSdmXCP6A3myJFURcKzvPgcblen32H4cHTse152HsnIdjDuqs3JBjqkATwRTxjj2MtzTVinULpUk6uFAdLZ67juByq%2F67Ha0SLbaO06lHI%2Fyzc8RHHnTrvRCKRddcX1XGq6l2m2hpi8q7d8w9gz%2FBn9Bl%2F5XyRYoYeEGrPwjZODz%2BfsOeirKbJJCO1WkouzxMHa9e6ITU8HLKfjQtJhNNg%2BAfEzy0sXVSfWVbet0FFZD5Nbqcg6mCWeah8AuSvoQb0Fx5boFkjyQ2tE7EFp&X-Amz-Signature=231e240e2152a96f55f3531b8d119bebc4d314ebe6105f3f0dee41714e9f2075&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W42NEGKP%2F20251205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251205T220113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDoCGbDW1PyK8AT7Rd%2BgVgdU5laLhZV7f%2FLP7C45X6DigIhALO2yb24cY2ua22fPlwkhOiIRhNaC1nyKh7GjsS%2BGbtAKv8DCGcQABoMNjM3NDIzMTgzODA1Igxqblpo3mt%2BhrHc9nQq3AO5OpezYcaHDSh2cZYKk8mBhFeO4sv6CDZepgLNo3klyGOr1FMLeExxF%2FjLc0cx0Bei2kqqnIdRZAGFvV4COX3GSo%2Bwuzxs5%2FeYFzCRBE%2BZOSzj1pvj10B1%2Fua5Zl1%2BHWbcGfuRr9Y12cTjCHGanVfMwL2oyqwIG49T%2F%2FPoSH6jSAfM9WVlAR1dpCCccW2hWZ13g25fJrmMwwWqjCHThhJEePnoP0ZGQE50ZqXRhpP%2BdnaRmFgiTdG%2B1Fp%2BJXA7ruhrWV04Lj4b3ECiHYz9z%2BqBbSbYCg3I1z9thtB5zB7WXk05lonM8S3KTgAI9tp751GrbT0ozgyKvJF86iRAWFs83kwAJef8RHrc2cMR5zPKE6WIADReimtqGZVg1kBVbQoHbyWv0qeGQe2u05q7Dl45ZrBoNmT6rJu8YKiKBRHvMOtj9atkul52zBMdZgR3cqiQy5%2FdRwpTq8mW5qI%2FA7b42KHcBi10e4uoyAwx6RHUGQdRkax5hzBW%2FBsY4HtAU4Ab9WnzTLSsB3JF064G1UVutI4S3NCzUe1tMPEzWe%2B77j2%2Fh56Ey3Evwa%2FYwuAK9H5yAUjyah2ULRJoeKSdmXCP6A3myJFURcKzvPgcblen32H4cHTse152HsnIdjDuqs3JBjqkATwRTxjj2MtzTVinULpUk6uFAdLZ67juByq%2F67Ha0SLbaO06lHI%2Fyzc8RHHnTrvRCKRddcX1XGq6l2m2hpi8q7d8w9gz%2FBn9Bl%2F5XyRYoYeEGrPwjZODz%2BfsOeirKbJJCO1WkouzxMHa9e6ITU8HLKfjQtJhNNg%2BAfEzy0sXVSfWVbet0FFZD5Nbqcg6mCWeah8AuSvoQb0Fx5boFkjyQ2tE7EFp&X-Amz-Signature=231e240e2152a96f55f3531b8d119bebc4d314ebe6105f3f0dee41714e9f2075&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RRMCH6Q%2F20251205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251205T220113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE9PYv9iemodYcQTt5mOhcWlsI6YJCkQZ8hZNTaK97byAiEApGXbiZUV%2BAZ%2FYsWGemFB6TvFvo7v8CkPbRYOddt0FNkq%2FwMIZxAAGgw2Mzc0MjMxODM4MDUiDNHYuh5LbgEWMqWpsCrcAz3EslI6DffGBXvFh3qSDLEh2ZssMyD144PeUhvyGeWD9YR%2BNAsOMs6z1rK7rG5UtysmlvAtK5msWLLEFA%2B4mYQJhYpjr1fvay%2FMBzgMyNGFCXc%2F%2Bq%2FGNwTEJKEcdUSjt4s%2BLxGFAH4iCOP2LvSIUwNfFBZqLjbciJMLlgL%2FvuOP6UxXk%2FXXpz3ZtRvxyo8YlUyeHAGO9TQKOG8%2BMwpOUj57KTa96NrXoiswcxMFCXXqIgYNTopbP%2F1ttP3abQI7XEFSVYUZ3R2p5NCXu8IMy580HDMn1R3AGmLs2q26mYVXenkmhxqjuYz2mmdVfDPQMUqv%2BCRvxDCn5LqZW0d8fSKGuCiJCYMjGPNhpkow3zhQQS%2FGHtzqTtfmNTyOCNvvlEJOQJRald6eZAYT8hIgB2KrHMgyW0a1noueIqvBVgoBctHyMvOi0a3L4DPjhpQfEvXLesIi%2FanJG5uLNz0HxED3j5cn%2F%2F9SE45SbrAJYRfpwRJhICg%2BcGj5KL%2BLAFy7mIvpYmXvgbmcUBYSIUNQp8IL%2Fh7FWrZvxxYA3i0Ki9fVu4bv9%2BWo6%2BUUs3ukJYU4CsHBkv%2FUOBqR2zHL%2FCH4wSv%2FfnR4fjftIr1ZmpKLwVDYf%2BpA0eCAo1mQeSUEMK6ozckGOqUBFXv5Yp1C9utKI6G6oefLNQKBZjH6wFahWM4Snrku3QLRNcNbIZT9rwnmRbVPnRo%2BaC3xylBKmy%2FQKdWBVzFi5dnvc0aqZo%2B0Ch9Hqil3iJ3hw%2BmIEoVFKaIshcb4aoOloDzNhvV0TFcOMLEImokGYGr30KJVWclFsHgGYLl3FEgEc9MM1sZDhjUXYhVc8BOLUx2vpTA%2F4Yig8S7oXSYHoQ0QpK%2Bc&X-Amz-Signature=c3e3281d6e84f2b1c8b169ee66eb33c2c44a4cce5980b831c13bb81cb0bad5bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

