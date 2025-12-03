---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662R5VNTAY%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T132757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIQD1BL6BM%2B7D7XoslxvTpfg4oPMg5KXVxYX2EvjS5o4LOQIgP4GC13bWI%2BxwhSp14Ss3BrLH9SRfaIWLUjYWtu6kpZQq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDKhaZjpUorENQKbgHyrcA%2FHH3CRo12zfdkFjCQ%2BYh2TJq0wTBKJ0PZ0fFsRYKTwG8Wqb4ucg4vPMsTA50xPi6Z7wmyvkNGG7GKmgJxtcPyEah7ptDKi6u%2FT6eDxSh%2B%2B1QL8Y2HXPfENviV93UWSwsARrsgOFlwhkQTCsnwVWzgFbI6pLPCH1RKzXUKNrVHkOzFK8AwHoxP1v54Ts6RWF2JKaEZFQuwN7ljIwi38Ic8NNnYdxfWmbbggXEM7sdN3j8LChEuiJZ9404AmB%2FR1K0Evr%2BiHyz8aDmquXtPgL62RJVxxSW47TLdyQxOgWw30DXxzaXQQzERwAtcKq96GO0r2odwb6zd96UxT%2FiIWJdJGxznegpeNhe%2BZIzwOvIAA91%2BpOc9JmLEartj7QrjnT7T8HWkMsmPiI8doMGwWgUsbGjUrRR90dNK9dIwnYVoNEr4OwaeyX%2Bl0tipZHxfAhGCGI6qo5UVORQXh6PjZjpf1zz2Nor46DrQmP70J6ccv9daPaGRz6%2Bx8b0HDKQkm2lb8bDPNXCQ00V2tNEJJ8M6Qh2CIfxpqbgTbL9RxS88iXCJgXHzRjMN4fYMI%2Bi8REx%2FlzbWfAQQZiYzFnS56veb7z04XG3BrYaZRGhj7WqJqzRV0Nf2GEneJ%2F2%2BlCMJTXwMkGOqUBgEoIvoXgpQC1AmP2ZP8ph8XGlG6EQSKzL4Q0sQzSJ6JokckUcsbqgzb72LVxYXgxOwFTqMV9j4vQhVhD%2BQkW%2BbjzPV5LRT00ql53T6RIGSkloxLZINkTBe2Eqqypr1nDFCNAPBbz7ZMMKK2vy7EiB%2FRce%2Fc68k2AjxT4wURhplqD7u5tpMHlpRwDDtSKJNZGxwX1iNFIBNPBy91CUgbtFaH4EMUn&X-Amz-Signature=04cbc9c77992a122966542c1cb150b71fe30a91f5b3fd6c1b5aed76ad0db7088&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662R5VNTAY%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T132757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIQD1BL6BM%2B7D7XoslxvTpfg4oPMg5KXVxYX2EvjS5o4LOQIgP4GC13bWI%2BxwhSp14Ss3BrLH9SRfaIWLUjYWtu6kpZQq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDKhaZjpUorENQKbgHyrcA%2FHH3CRo12zfdkFjCQ%2BYh2TJq0wTBKJ0PZ0fFsRYKTwG8Wqb4ucg4vPMsTA50xPi6Z7wmyvkNGG7GKmgJxtcPyEah7ptDKi6u%2FT6eDxSh%2B%2B1QL8Y2HXPfENviV93UWSwsARrsgOFlwhkQTCsnwVWzgFbI6pLPCH1RKzXUKNrVHkOzFK8AwHoxP1v54Ts6RWF2JKaEZFQuwN7ljIwi38Ic8NNnYdxfWmbbggXEM7sdN3j8LChEuiJZ9404AmB%2FR1K0Evr%2BiHyz8aDmquXtPgL62RJVxxSW47TLdyQxOgWw30DXxzaXQQzERwAtcKq96GO0r2odwb6zd96UxT%2FiIWJdJGxznegpeNhe%2BZIzwOvIAA91%2BpOc9JmLEartj7QrjnT7T8HWkMsmPiI8doMGwWgUsbGjUrRR90dNK9dIwnYVoNEr4OwaeyX%2Bl0tipZHxfAhGCGI6qo5UVORQXh6PjZjpf1zz2Nor46DrQmP70J6ccv9daPaGRz6%2Bx8b0HDKQkm2lb8bDPNXCQ00V2tNEJJ8M6Qh2CIfxpqbgTbL9RxS88iXCJgXHzRjMN4fYMI%2Bi8REx%2FlzbWfAQQZiYzFnS56veb7z04XG3BrYaZRGhj7WqJqzRV0Nf2GEneJ%2F2%2BlCMJTXwMkGOqUBgEoIvoXgpQC1AmP2ZP8ph8XGlG6EQSKzL4Q0sQzSJ6JokckUcsbqgzb72LVxYXgxOwFTqMV9j4vQhVhD%2BQkW%2BbjzPV5LRT00ql53T6RIGSkloxLZINkTBe2Eqqypr1nDFCNAPBbz7ZMMKK2vy7EiB%2FRce%2Fc68k2AjxT4wURhplqD7u5tpMHlpRwDDtSKJNZGxwX1iNFIBNPBy91CUgbtFaH4EMUn&X-Amz-Signature=04cbc9c77992a122966542c1cb150b71fe30a91f5b3fd6c1b5aed76ad0db7088&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7SR6WIJ%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T132758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIGI%2F5JnDZiaZZNlV18cB%2BvLXNEFSIIBY2TjuewoUfjgwAiAMp9N7b5a3oo9EyPPpnoW0krmLLV%2FMRVDqs%2F1%2BRAlsayr%2FAwguEAAaDDYzNzQyMzE4MzgwNSIM0EJNh%2FB33zUO5sosKtwDuGqeojj%2Bw7VxbxAhrnUf9ro%2F33MCAnTdPxHgXzj1%2FPQy0zc2Lb%2FepOY9%2BaD4Sqe1reRZlrR9Z1YqSJSHFcXT3EUIplYHAext9qxT0vGuoAeXxGS2HnYXiNaNPbx70PVPTvI1VThLKLdvRF28cOsJf8UKg09lN73N7fM7rpMry5yo6tZQeBLnnLvzeWI0a%2Fxq0aDk4ERozd%2BG9axiLC8GdR2Hu2yIVsGxgX2Qfd6zSW0H51qYO%2BpAfAuqpGnx2bf%2BXXihvqR2%2Ffj1h71pcd8%2BkQjnXP5tYTnapCZjXQDuqUrvYFLIg0oOtI9HdP0N8HjfP6trJKQfsC0Ge%2FuCb6EG56prBw%2FIKBhdwKTrY257YhFFeBmk%2FutLU%2BMtyqDPUf4Mg4rnBWrOVBMnsmOw1VfgWqeOkrae7JGpOe3HpMu1hRDyxyP4c1QLLUMKLFXgELwyvTLLVQaQ7Qm5a10OW%2F7LqorLOH2iik2P%2FVCfMCVQaQ4TLzzEJJygz8SSBEv6G8JVU3p1T%2FGF4F4FMpsr4x2uHJUhuwZtzBOvrWLsaxtKmoaQQQ8RtRlbH7tLDmcLJCB6Cqag8F9d5IkaHyn%2Ff7pGBMWWxxYAXtrATrEV3wSsw6%2FzEK019VaPwGFx36ww9vPAyQY6pgEUMzSrRetl27Bg%2B6mk5HYccOitgPtQ%2F5ViWaqGh1IDzwsmSuYg261VtD3TEqdHQ%2BC1u7CM94bXG8UI9soFrL59xrOHLw3E1HUwpHjlHcDk3V9IkD0Kz3ZznXFZeIODxloUBweCv0D%2BFwIYrloZEspEH1JtUnTIOb2CcfW8WK9EzNNoFRnD%2Bd4C%2FZRybu6cmm7g6jSPuBYwL%2BWbxxWGEHZjLFF4X00c&X-Amz-Signature=320bf11a7f109ab2d0a36bb1ef4d314765a3f719d13062b150a1a16410f42a02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7SR6WIJ%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T132758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIGI%2F5JnDZiaZZNlV18cB%2BvLXNEFSIIBY2TjuewoUfjgwAiAMp9N7b5a3oo9EyPPpnoW0krmLLV%2FMRVDqs%2F1%2BRAlsayr%2FAwguEAAaDDYzNzQyMzE4MzgwNSIM0EJNh%2FB33zUO5sosKtwDuGqeojj%2Bw7VxbxAhrnUf9ro%2F33MCAnTdPxHgXzj1%2FPQy0zc2Lb%2FepOY9%2BaD4Sqe1reRZlrR9Z1YqSJSHFcXT3EUIplYHAext9qxT0vGuoAeXxGS2HnYXiNaNPbx70PVPTvI1VThLKLdvRF28cOsJf8UKg09lN73N7fM7rpMry5yo6tZQeBLnnLvzeWI0a%2Fxq0aDk4ERozd%2BG9axiLC8GdR2Hu2yIVsGxgX2Qfd6zSW0H51qYO%2BpAfAuqpGnx2bf%2BXXihvqR2%2Ffj1h71pcd8%2BkQjnXP5tYTnapCZjXQDuqUrvYFLIg0oOtI9HdP0N8HjfP6trJKQfsC0Ge%2FuCb6EG56prBw%2FIKBhdwKTrY257YhFFeBmk%2FutLU%2BMtyqDPUf4Mg4rnBWrOVBMnsmOw1VfgWqeOkrae7JGpOe3HpMu1hRDyxyP4c1QLLUMKLFXgELwyvTLLVQaQ7Qm5a10OW%2F7LqorLOH2iik2P%2FVCfMCVQaQ4TLzzEJJygz8SSBEv6G8JVU3p1T%2FGF4F4FMpsr4x2uHJUhuwZtzBOvrWLsaxtKmoaQQQ8RtRlbH7tLDmcLJCB6Cqag8F9d5IkaHyn%2Ff7pGBMWWxxYAXtrATrEV3wSsw6%2FzEK019VaPwGFx36ww9vPAyQY6pgEUMzSrRetl27Bg%2B6mk5HYccOitgPtQ%2F5ViWaqGh1IDzwsmSuYg261VtD3TEqdHQ%2BC1u7CM94bXG8UI9soFrL59xrOHLw3E1HUwpHjlHcDk3V9IkD0Kz3ZznXFZeIODxloUBweCv0D%2BFwIYrloZEspEH1JtUnTIOb2CcfW8WK9EzNNoFRnD%2Bd4C%2FZRybu6cmm7g6jSPuBYwL%2BWbxxWGEHZjLFF4X00c&X-Amz-Signature=320bf11a7f109ab2d0a36bb1ef4d314765a3f719d13062b150a1a16410f42a02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466336G56MI%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T132757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIANcLosuM%2FYvuPtUEMX9RGLRACBQPKBJXie2%2BfqUjrymAiEApJaQsP3ZiQKbvaPs62VD7kdpA8ok4K9bQH5nKlxO1YQq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDKAMn8Gve7LU4yZkuSrcAzq57rYC0Pcm6bRGpioux4jeHvnjSULGQhKuYQ1TJDu1UgpJ79x1sRKdQxnv3RT1%2FRUVfe9L1qomCM5jjFVNkC99Cf4a%2BVhwBNDDLqeAopsaSSJJIOqT73YqVESiqQGUXig9T9SvQUx1c4ExD9OBOzCkJbFl5KHBIfuE7FUf3qrMZxINSRJ%2FLz5I1Dn7MGZpExbbSWLfDFD%2FGmLgF9c7eWhohD3Cw51fuoiCuspYwzLovcXvjbcg5M9x%2FhBqKazL6i%2FqwqokD3KGZc%2F0fXa11Op5vC3bQPyF0JAeufTR%2FUR1ycjgpmLlpyIhRezey2cocud2U3inLSUNYNwQfgEBuHR89KEvXhm3FDxF%2BhDyC0m%2B2K8t8P14lY3jxU72mAN%2BHXuoeH1KnO9gtO7XSREocMrJZPVPMSuBSAY6kjtlu6edWsQAAlBRW3quoXA9eh%2BMmGGzOcQpD%2FliHrqaA%2FECH6IiJE6iiELQ8u%2FSvosmp20kKWzRkUJMfwXQvq2IZnr%2FM2JUaVWVi9wsfl%2BpYSXFw7CUfEhZB%2Fycp1tYkh8JFYq65XO5VWXGoh%2BZflMaOyVrwC4hPC9St7i9orMkkx5RPTxkYoxT310RUs7ChfRBJIu%2BsDpKjPeXg1ZY3vYFMKrXwMkGOqUB%2Fv5vgAVSWh79G6ABuMePK5NOdhGcpsAU7zieQz900TDiyxmCDD%2FgwU9yMRMHmmshdAVYBPKlyvxUSX6oo0QQGwBmxQ9FobXgPRwDAnHjkVDoRxViucn1dyUyxCE9CbVhksB9BsyYABFbZ0bS6bGZjibzvSVnbo4%2BCvDrxc5DQBQgeQsDptqCFP4t8l44uQCoNcrsmuQTXp1tVRtFkUHvKUpe0sjT&X-Amz-Signature=cb6997afe38e9bfa599eec430c6f2394bcb23d7545264c6482afea389a5bff52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYCASUPA%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T132801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCyJzErshz0hEWA6JRb6CcVoLQn3Pe%2FJcqQVguJtEEIxQIhAPwBKqNszUA%2F91PPcHVj9H5%2Fl2gSXK2LkLQhw41jxqnNKv8DCC4QABoMNjM3NDIzMTgzODA1IgzES1Ubm5Ue%2F67PNo0q3ANdHksbrZ2aH49F4lHb3eJRhSGUWTZ6Ms9tv%2FqI45s%2FxpJdastp%2FU2rQV1T2LUlr4Hmd5GWJIj%2F4NLTgJeMFhs90ikbu2VINr6jC0%2BTlnkUuqsqTzGnqHWcAIl9nRdMuyv3pH6Vh66MnRNSb%2B6JZ%2BN70PmRdaWgitaa8fIBJUSLQj5YoI82fMKkIU%2FPoyyJJJRfSRAj9IfdS%2BzsM%2FHHE0LcGGUdJvsSpHSK7qCRbR%2FahjzPP5wrmfqEcGe98ioP5g9I12bIQ7yrXjia641tyFO6sT8rlbbpkuGSFSRss2%2FU71zacOdZ6OguZbr7Tz0%2BnStxu3Wq%2FKeB7JrTH10hrgamx2VhwajeGkUDehcA%2B6S3pYYdT%2Fu38CBUgLODbJx3b8TZNNGBujv4dKAZOUZkZvI5w9%2F4YvJj3sWUE20ZNUp9ApCDTP%2FzAO951RN7JpqwQG%2FLkDtukL3da%2BT3HFuzZ2n5kdJ854nmK%2FCuH1LpTE3kQks7eG%2FAzWbzXuEWoQiThgrLAPBc1g3t115PEBKIQCjBBQBNbzFitK6Gc%2FUWnabD0zMlWSZ%2BzBQLduAblJjda7xEPFCfgpX6JeIMhPm04a%2Bo4%2BTIJl9yIGSA7pGw%2Ftm88ScHcDq8UAPfi9IjqDD688DJBjqkAYF7SkA0iKdc9yygDqG%2FLysaRqFGy%2BzGqxxMRFGDbOaMNihoa08tfek90NMORIfolPDA6aP3nkJugpZr4UcewPB%2F19oNBdlpUVO07OqIhKAuw1rCQu3QLV6wY7pvWfymqPHFs15zB2CMWcBGGVfkJFdzbIQsx2QQU%2BP8XIdbZTlwP%2BhIMLqNmvuDeB4GdCRBrAI9JBmWLhJfWffLKgIOByhJizqE&X-Amz-Signature=d0e46ae6cd8cf097daf57c1324b508e8c3205d575e7e0b80c1781930d8994feb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYCASUPA%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T132801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCyJzErshz0hEWA6JRb6CcVoLQn3Pe%2FJcqQVguJtEEIxQIhAPwBKqNszUA%2F91PPcHVj9H5%2Fl2gSXK2LkLQhw41jxqnNKv8DCC4QABoMNjM3NDIzMTgzODA1IgzES1Ubm5Ue%2F67PNo0q3ANdHksbrZ2aH49F4lHb3eJRhSGUWTZ6Ms9tv%2FqI45s%2FxpJdastp%2FU2rQV1T2LUlr4Hmd5GWJIj%2F4NLTgJeMFhs90ikbu2VINr6jC0%2BTlnkUuqsqTzGnqHWcAIl9nRdMuyv3pH6Vh66MnRNSb%2B6JZ%2BN70PmRdaWgitaa8fIBJUSLQj5YoI82fMKkIU%2FPoyyJJJRfSRAj9IfdS%2BzsM%2FHHE0LcGGUdJvsSpHSK7qCRbR%2FahjzPP5wrmfqEcGe98ioP5g9I12bIQ7yrXjia641tyFO6sT8rlbbpkuGSFSRss2%2FU71zacOdZ6OguZbr7Tz0%2BnStxu3Wq%2FKeB7JrTH10hrgamx2VhwajeGkUDehcA%2B6S3pYYdT%2Fu38CBUgLODbJx3b8TZNNGBujv4dKAZOUZkZvI5w9%2F4YvJj3sWUE20ZNUp9ApCDTP%2FzAO951RN7JpqwQG%2FLkDtukL3da%2BT3HFuzZ2n5kdJ854nmK%2FCuH1LpTE3kQks7eG%2FAzWbzXuEWoQiThgrLAPBc1g3t115PEBKIQCjBBQBNbzFitK6Gc%2FUWnabD0zMlWSZ%2BzBQLduAblJjda7xEPFCfgpX6JeIMhPm04a%2Bo4%2BTIJl9yIGSA7pGw%2Ftm88ScHcDq8UAPfi9IjqDD688DJBjqkAYF7SkA0iKdc9yygDqG%2FLysaRqFGy%2BzGqxxMRFGDbOaMNihoa08tfek90NMORIfolPDA6aP3nkJugpZr4UcewPB%2F19oNBdlpUVO07OqIhKAuw1rCQu3QLV6wY7pvWfymqPHFs15zB2CMWcBGGVfkJFdzbIQsx2QQU%2BP8XIdbZTlwP%2BhIMLqNmvuDeB4GdCRBrAI9JBmWLhJfWffLKgIOByhJizqE&X-Amz-Signature=d0e46ae6cd8cf097daf57c1324b508e8c3205d575e7e0b80c1781930d8994feb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

